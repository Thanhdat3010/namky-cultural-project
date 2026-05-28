import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './WordCard.css';

export default function WordCard({ entry, index = 0, onClick }) {
  const [expanded, setExpanded] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleClick = (e) => {
    setExpanded(!expanded);
    if (onClick) onClick(entry);
  };

  const handleMouseMove = (e) => {
    if (expanded) return;
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    // Calculate angles (max 8 degrees tilt)
    const rotateX = -(y / (box.height / 2)) * 8;
    const rotateY = (x / (box.width / 2)) * 8;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => {
    if (!expanded) setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  const hasModern = entry.has_modern && entry.tu_hien_nay;
  const hasExamples = entry.vi_du && entry.vi_du.length > 0;

  // Combine standard scale up and custom 3D tilt coordinates
  const transformStyle = hovered && !expanded
    ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.02)`
    : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';

  return (
    <motion.article
      className={`word-card ${expanded ? 'word-card--expanded' : ''}`}
      onClick={handleClick}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: Math.min(index * 0.05, 0.5),
        ease: [0.4, 0, 0.2, 1],
      }}
      style={{ transform: transformStyle }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="button"
      tabIndex={0}
      aria-expanded={expanded}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleClick(); }}}
    >
      {/* 3D Shimmer lighting effect overlay */}
      {hovered && !expanded && (
        <div
          className="word-card__shimmer"
          style={{
            background: `radial-gradient(circle at ${(tilt.y + 8) * 6}% ${(tilt.x + 8) * 6}%, rgba(195, 139, 53, 0.08) 0%, transparent 60%)`
          }}
        />
      )}

      {/* Header */}
      <div className="word-card__header">
        <h3 className="word-card__word">{entry.tu}</h3>
        <div className="word-card__badges">
          {entry.pos && entry.pos.map((p, i) => (
            <span key={i} className="word-card__badge word-card__badge--pos">{p}</span>
          ))}
          <span className="word-card__badge word-card__badge--category">{entry.danh_muc}</span>
          {entry.giai_doan && (
            <span className="word-card__badge word-card__badge--era">{entry.giai_doan}</span>
          )}
        </div>
      </div>

      {/* Past ↔ Present comparison */}
      {hasModern && (
        <div className="word-card__comparison">
          <div className="word-card__old">
            <div className="word-card__old-label">Xưa</div>
            <div className="word-card__old-word">{entry.tu}</div>
          </div>
          <div className="word-card__arrow">⇄</div>
          <div className="word-card__new">
            <div className="word-card__new-label">Nay</div>
            <div className="word-card__new-word">{entry.tu_hien_nay}</div>
          </div>
        </div>
      )}

      {/* Meaning */}
      <p className="word-card__meaning">{entry.nghia}</p>

      {/* Expanded content */}
      <AnimatePresence>
        {expanded && hasExamples && (
          <motion.div
            className="word-card__examples"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="word-card__examples-title">Ví dụ sử dụng</div>
            {entry.vi_du.slice(0, 3).map((ex, i) => (
              <div key={i} className="word-card__example">"{ex}"</div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expand hint */}
      {!expanded && (hasExamples || entry.nghia.length > 100) && (
        <div className="word-card__expand-hint">
          <span>Nhấn để xem thêm</span>
          <span>↓</span>
        </div>
      )}
    </motion.article>
  );
}
