import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import WordCard from './WordCard';
import './DictionarySearch.css';

const VIETNAMESE_ALPHABET = [
  'A', 'Ă', 'Â', 'B', 'C', 'D', 'Đ', 'E', 'Ê', 'G', 'H', 'I',
  'K', 'L', 'M', 'N', 'O', 'Ô', 'Ơ', 'P', 'Q', 'R', 'S', 'T',
  'U', 'Ư', 'V', 'X', 'Y',
];

const ITEMS_PER_PAGE = 18;

export default function DictionarySearch({ data, searchQuery, setSearchQuery }) {
  const [activeLetter, setActiveLetter] = useState(null);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [localQuery, setLocalQuery] = useState(searchQuery || '');
  const debounceRef = useRef(null);

  // Debounced search
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setSearchQuery(localQuery);
    }, 300);
    return () => clearTimeout(debounceRef.current);
  }, [localQuery, setSearchQuery]);

  // Available letters
  const availableLetters = useMemo(() => {
    const letters = new Set();
    data.forEach(item => {
      if (item.chu_cai) letters.add(item.chu_cai);
    });
    return letters;
  }, [data]);

  // Filtered data by letter + search
  const filteredData = useMemo(() => {
    let results = data;

    if (activeLetter) {
      results = results.filter(item => item.chu_cai === activeLetter);
    }

    if (localQuery.trim()) {
      const q = localQuery.toLowerCase().trim();
      results = results.filter(item =>
        item.tu.toLowerCase().includes(q) ||
        item.tu_hien_nay.toLowerCase().includes(q) ||
        item.nghia.toLowerCase().includes(q)
      );
    }

    return results;
  }, [data, activeLetter, localQuery]);

  const displayData = filteredData.slice(0, visibleCount);
  const hasMore = visibleCount < filteredData.length;

  const handleLetterClick = useCallback((letter) => {
    setActiveLetter(activeLetter === letter ? null : letter);
    setVisibleCount(ITEMS_PER_PAGE);
    setLocalQuery('');
  }, [activeLetter]);

  const handleClear = () => {
    setLocalQuery('');
    setSearchQuery('');
    setActiveLetter(null);
    setVisibleCount(ITEMS_PER_PAGE);
  };

  return (
    <section className="dictionary-search" id="dictionary">
      <div className="container">
        <motion.div
          className="dictionary-search__header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="dictionary-search__title">Từ Điển Phương Ngữ</h2>
          <p className="dictionary-search__desc">
            Tra cứu toàn bộ kho tàng từ vựng Nam Bộ — tìm kiếm theo từ, nghĩa, hoặc chữ cái
          </p>
        </motion.div>

        {/* Search bar */}
        <div className="dictionary-search__bar">
          <div className="dictionary-search__input-wrapper">
            <span className="dictionary-search__icon">🔍</span>
            <input
              type="text"
              className="dictionary-search__input"
              placeholder="Tìm từ phương ngữ..."
              value={localQuery}
              onChange={(e) => {
                setLocalQuery(e.target.value);
                setVisibleCount(ITEMS_PER_PAGE);
              }}
              aria-label="Tìm kiếm từ phương ngữ"
              id="dictionary-search-input"
            />
            {localQuery && (
              <button
                className="dictionary-search__clear"
                onClick={handleClear}
                aria-label="Xóa tìm kiếm"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Alphabet index */}
        <div className="dictionary-search__alphabet" role="navigation" aria-label="Chỉ mục chữ cái">
          {VIETNAMESE_ALPHABET.map((letter) => {
            const isAvailable = availableLetters.has(letter);
            const isActive = activeLetter === letter;

            return (
              <button
                key={letter}
                className={`dictionary-search__letter ${isActive ? 'dictionary-search__letter--active' : ''} ${!isAvailable ? 'dictionary-search__letter--disabled' : ''}`}
                onClick={() => isAvailable && handleLetterClick(letter)}
                aria-label={`Lọc chữ ${letter}`}
                disabled={!isAvailable}
              >
                {letter}
              </button>
            );
          })}
        </div>

        {/* Results info */}
        {(localQuery || activeLetter) && (
          <div className="dictionary-search__results-info">
            Tìm thấy <strong>{filteredData.length.toLocaleString()}</strong> kết quả
            {activeLetter && <> cho chữ <strong>{activeLetter}</strong></>}
            {localQuery && <> với từ khóa "<strong>{localQuery}</strong>"</>}
          </div>
        )}

        {/* Results grid */}
        {displayData.length > 0 ? (
          <>
            <div className="dictionary-search__grid">
              {displayData.map((entry, i) => (
                <WordCard key={`search-${entry.id}-${i}`} entry={entry} index={i} />
              ))}
            </div>

            {hasMore && (
              <div className="dictionary-search__load-more">
                <motion.button
                  className="dictionary-search__load-btn"
                  onClick={() => setVisibleCount(prev => prev + ITEMS_PER_PAGE)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Xem thêm ({(filteredData.length - visibleCount).toLocaleString()} còn lại)
                </motion.button>
              </div>
            )}
          </>
        ) : (
          <div className="dictionary-search__empty">
            <div className="dictionary-search__empty-icon">📖</div>
            <div className="dictionary-search__empty-text">
              {localQuery ? `Không tìm thấy kết quả cho "${localQuery}"` : 'Bắt đầu tìm kiếm để khám phá kho từ vựng'}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
