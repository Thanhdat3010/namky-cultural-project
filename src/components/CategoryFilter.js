import React from 'react';
import { motion } from 'framer-motion';
import './CategoryFilter.css';

const CATEGORY_ICONS = {
  'Tất cả': '🌐',
  'Ẩm thực': '🍜',
  'Gia đình & Xã hội': '👨‍👩‍👧‍👦',
  'Ngôn ngữ & Biểu cảm': '💬',
  'Thiên nhiên & Động vật': '🌿',
  'Giao thông & Phương tiện': '🚤',
  'Trang phục & Dáng vẻ': '👘',
  'Nghề nghiệp & Lao động': '⚒️',
  'Tổng hợp': '📦',
};

export default function CategoryFilter({ categories, selected, onSelect, stats }) {
  const getCategoryCount = (cat) => {
    if (!stats || !stats.categories) return null;
    if (cat === 'Tất cả') return stats.total_entries;
    return stats.categories[cat] || 0;
  };

  return (
    <div className="category-filter" role="tablist" aria-label="Lọc theo danh mục">
      {categories.map((cat) => {
        const isActive = selected === cat;
        const count = getCategoryCount(cat);

        return (
          <motion.button
            key={cat}
            className={`category-filter__chip ${isActive ? 'category-filter__chip--active' : ''}`}
            onClick={() => onSelect(cat)}
            role="tab"
            aria-selected={isActive}
            whileTap={{ scale: 0.95 }}
          >
            <span className="category-filter__icon">
              {CATEGORY_ICONS[cat] || '📁'}
            </span>
            <span>{cat}</span>
            {count !== null && (
              <span className="category-filter__count">
                {count >= 1000 ? `${(count / 1000).toFixed(1)}k` : count}
              </span>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
