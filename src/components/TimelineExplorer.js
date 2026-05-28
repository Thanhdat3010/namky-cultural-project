import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WordCard from './WordCard';
import CategoryFilter from './CategoryFilter';
import './TimelineExplorer.css';

const ERAS = [
  {
    id: 'khai-pha',
    name: 'Khai phá',
    period: '1698–1858',
    color: '#40916C',
    description: 'Thời kỳ Chúa Nguyễn mở cõi Nam tiến. Cư dân Việt, Hoa, Khmer cùng khai phá vùng đất phương Nam. Ngôn ngữ giao thoa giữa tiếng Việt cổ, tiếng Khmer và tiếng Hoa, tạo nên lớp từ vựng đặc trưng của phương ngữ Nam Bộ.',
  },
  {
    id: 'phap-thuoc',
    name: 'Pháp thuộc',
    period: '1858–1945',
    color: '#a29bfe',
    description: 'Giai đoạn thực dân Pháp đô hộ. Nhiều từ vay mượn từ tiếng Pháp được Việt hóa và trở thành phần không thể thiếu trong đời sống hàng ngày: xà bông (savon), ga ra (garage), xi măng (ciment)...',
  },
  {
    id: 'khang-chien',
    name: 'Kháng chiến',
    period: '1945–1975',
    color: '#E56B4F',
    description: 'Hai cuộc kháng chiến chống Pháp và chống Mỹ. Ngôn ngữ phản ánh đời sống chiến trường, tinh thần yêu nước và sự kiên cường của người dân Nam Bộ.',
  },
  {
    id: 'thong-nhat',
    name: 'Thống nhất',
    period: '1975–2000',
    color: '#E8C97A',
    description: 'Thời kỳ đất nước thống nhất, đổi mới và hội nhập. TP.HCM mang tên Bác từ 1976. Ngôn ngữ Nam Bộ giao thoa mạnh mẽ với tiếng Việt phổ thông, nhiều từ cổ dần ít được sử dụng.',
  },
  {
    id: 'hien-dai',
    name: 'Hiện đại',
    period: '2000–2026',
    color: '#48C9B0',
    description: 'Thời đại số hóa và toàn cầu hóa. Phương ngữ Nam Bộ đối mặt thách thức bảo tồn khi thế hệ trẻ ít sử dụng. Dự án này ra đời để lưu giữ và tôn vinh di sản ngôn ngữ quý giá.',
  },
];

const ITEMS_PER_PAGE = 12;

export default function TimelineExplorer({
  data,
  filteredData,
  stats,
  categories,
  selectedCategory,
  setSelectedCategory,
  showModernOnly,
  setShowModernOnly,
}) {
  const [activeEra, setActiveEra] = useState(null);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  // Get words for active era (only verified ones)
  const eraWords = useMemo(() => {
    if (!activeEra) return [];
    const era = ERAS.find(e => e.id === activeEra);
    if (!era) return [];
    // Find words with matching giai_doan
    return data.filter(item =>
      item.giai_doan && item.giai_doan.includes(era.period.split('–')[0])
    );
  }, [activeEra, data]);

  // Displayed data
  const displayData = useMemo(() => {
    const source = activeEra && eraWords.length > 0 ? eraWords : filteredData;
    return source.slice(0, visibleCount);
  }, [activeEra, eraWords, filteredData, visibleCount]);

  const totalResults = activeEra && eraWords.length > 0 ? eraWords.length : filteredData.length;
  const hasMore = visibleCount < totalResults;

  const handleEraClick = (eraId) => {
    setActiveEra(activeEra === eraId ? null : eraId);
    setVisibleCount(ITEMS_PER_PAGE);
  };

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + ITEMS_PER_PAGE);
  };

  const activeEraData = ERAS.find(e => e.id === activeEra);

  return (
    <section className="timeline-explorer" id="timeline">
      <div className="container">
        {/* Header */}
        <motion.div
          className="timeline-explorer__header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="timeline-explorer__title">
            Dòng Thời Gian Ngôn Ngữ
          </h2>
          <p className="timeline-explorer__desc">
            Khám phá hành trình biến đổi phương ngữ Nam Kỳ qua các giai đoạn lịch sử.
            Nhấn vào mỗi giai đoạn để tìm hiểu bối cảnh ngôn ngữ.
          </p>
        </motion.div>

        {/* Timeline Axis */}
        <motion.div
          className="timeline-axis"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Year markers */}
          <div className="timeline-axis__markers">
            {['1698', '1858', '1945', '1975', '2000', '2026'].map((year) => (
              <div
                key={year}
                className={`timeline-axis__marker ${activeEraData && activeEraData.period.includes(year) ? 'timeline-axis__marker--active' : ''}`}
              >
                <div className="timeline-axis__marker-dot" />
                <span className="timeline-axis__marker-year">{year}</span>
              </div>
            ))}
          </div>

          {/* Colored segments */}
          <div className="timeline-axis__track">
            <div className="timeline-axis__segments">
              {ERAS.map((era) => (
                <div
                  key={era.id}
                  className={`timeline-axis__segment ${activeEra === era.id ? 'timeline-axis__segment--active' : ''}`}
                  onClick={() => handleEraClick(era.id)}
                  role="button"
                  tabIndex={0}
                  aria-label={`${era.name} (${era.period})`}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleEraClick(era.id); }}
                />
              ))}
            </div>
          </div>

          {/* Era labels */}
          <div className="timeline-axis__labels">
            {ERAS.map((era) => (
              <div
                key={era.id}
                className={`timeline-axis__label ${activeEra === era.id ? 'timeline-axis__label--active' : ''}`}
                onClick={() => handleEraClick(era.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter') handleEraClick(era.id); }}
              >
                <div className="timeline-axis__label-name">{era.name}</div>
                <div className="timeline-axis__label-period">{era.period}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Era detail panel */}
        <AnimatePresence>
          {activeEraData && (
            <motion.div
              className="timeline-era-panel"
              initial={{ opacity: 0, height: 0, marginBottom: 0 }}
              animate={{ opacity: 1, height: 'auto', marginBottom: 'var(--space-7)' }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            >
              <h3 className="timeline-era-panel__title">{activeEraData.name}</h3>
              <div className="timeline-era-panel__period">{activeEraData.period}</div>
              <p className="timeline-era-panel__desc">{activeEraData.description}</p>
              <div className="timeline-era-panel__stats">
                <div className="timeline-era-panel__stat">
                  <span className="timeline-era-panel__stat-value">{eraWords.length}</span>
                  <span>từ được xác minh thuộc giai đoạn này</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Category filter */}
        <div className="timeline-explorer__filters">
          <CategoryFilter
            categories={categories}
            selected={selectedCategory}
            onSelect={(cat) => {
              setSelectedCategory(cat);
              setActiveEra(null);
              setVisibleCount(ITEMS_PER_PAGE);
            }}
            stats={stats}
          />
        </div>

        {/* Results info */}
        <div className="timeline-explorer__results-info">
          <div className="timeline-explorer__results-count">
            Hiển thị <strong>{Math.min(visibleCount, totalResults)}</strong> / <strong>{totalResults.toLocaleString()}</strong> kết quả
          </div>
          <button
            className={`timeline-explorer__modern-toggle ${showModernOnly ? 'timeline-explorer__modern-toggle--active' : ''}`}
            onClick={() => {
              setShowModernOnly(!showModernOnly);
              setVisibleCount(ITEMS_PER_PAGE);
            }}
          >
            🔄 Chỉ hiện cặp đối chiếu xưa–nay
          </button>
        </div>

        {/* Word grid */}
        {displayData.length > 0 ? (
          <>
            <div className="timeline-explorer__grid">
              {displayData.map((entry, i) => (
                <WordCard key={`${entry.id}-${i}`} entry={entry} index={i} />
              ))}
            </div>

            {hasMore && (
              <div className="timeline-explorer__load-more">
                <motion.button
                  className="timeline-explorer__load-btn"
                  onClick={handleLoadMore}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Xem thêm ({totalResults - visibleCount} còn lại)
                </motion.button>
              </div>
            )}
          </>
        ) : (
          <div className="timeline-explorer__empty">
            <div className="timeline-explorer__empty-icon">🔍</div>
            <div className="timeline-explorer__empty-text">Không tìm thấy kết quả</div>
            <div className="timeline-explorer__empty-hint">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</div>
          </div>
        )}
      </div>
    </section>
  );
}
