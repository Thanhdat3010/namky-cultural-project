import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './HeroSection.css';

const FLOATING_WORDS = [
  'ác nhơn', 'a lê hấp', 'áo bà ba', 'ạch đụi', 'ẩm nhầm',
  'bán xới', 'bậu', 'bọt bèo', 'bùi nhùi', 'bưng',
  'cắc chú', 'chèo ghe', 'chớ gì', 'coi bộ', 'dầu',
  'đờn ca', 'ghe', 'giỡn', 'hổng', 'ký cóp',
  'làm biếng', 'mần', 'mắc cỡ', 'nhậu', 'phù sa',
  'rạch', 'sình', 'thương hồ', 'vàm', 'xuồng',
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  },
};

const statVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] },
  },
};

export default function HeroSection({ stats, onExplore }) {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const generated = FLOATING_WORDS.map((word, i) => ({
      id: i,
      word,
      left: `${Math.random() * 90 + 5}%`,
      delay: Math.random() * 12,
      duration: 12 + Math.random() * 8,
      size: 10 + Math.random() * 4,
    }));
    setParticles(generated);
  }, []);

  return (
    <section className="hero" id="hero">
      {/* Background */}
      <div className="hero__bg" />
      <div className="hero__grid" />

      {/* Floating word particles */}
      <div className="hero__particles" aria-hidden="true">
        {particles.map((p) => (
          <span
            key={p.id}
            className="hero__particle"
            style={{
              left: p.left,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              fontSize: `${p.size}px`,
            }}
          >
            {p.word}
          </span>
        ))}
      </div>

      {/* Content */}
      <motion.div
        className="hero__content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="hero__badge" variants={itemVariants}>
          <span className="hero__badge-dot" />
          50 năm Thành phố trong tôi · 1976–2026
        </motion.div>

        <motion.h1 className="hero__title" variants={itemVariants}>
          Phương Ngữ
          <br />
          Nam Kỳ Xưa & Nay
        </motion.h1>

        <motion.p className="hero__subtitle" variants={itemVariants}>
          Hành trình qua dòng thời gian — khám phá kho tàng ngôn ngữ
          <em> Lục tỉnh Nam Kỳ</em>, đối chiếu phương ngữ xưa và nay,
          lưu giữ bản sắc văn hóa <em>Nam Bộ</em>.
        </motion.p>

        <motion.div className="hero__stats" variants={containerVariants}>
          <motion.div className="hero__stat" variants={statVariants}>
            <div className="hero__stat-icon">📚</div>
            <div className="hero__stat-value">
              {stats ? stats.total_entries.toLocaleString() : '···'}
            </div>
            <div className="hero__stat-label">Mục từ</div>
          </motion.div>
          <motion.div className="hero__stat" variants={statVariants}>
            <div className="hero__stat-icon">🏷️</div>
            <div className="hero__stat-value">
              {stats ? Object.keys(stats.categories).length : '·'}
            </div>
            <div className="hero__stat-label">Danh mục</div>
          </motion.div>
          <motion.div className="hero__stat" variants={statVariants}>
            <div className="hero__stat-icon">🔄</div>
            <div className="hero__stat-value">
              {stats ? stats.with_modern_equivalent : '·'}
            </div>
            <div className="hero__stat-label">Cặp đối chiếu</div>
          </motion.div>
        </motion.div>

        <motion.button
          className="hero__cta"
          variants={itemVariants}
          onClick={onExplore}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          Bắt đầu khám phá
          <span className="hero__cta-arrow">↓</span>
        </motion.button>
      </motion.div>

      {/* Scroll indicator */}
      <div className="hero__scroll" aria-hidden="true">
        <span>Cuộn xuống</span>
        <div className="hero__scroll-line" />
      </div>
    </section>
  );
}
