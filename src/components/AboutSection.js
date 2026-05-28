import React from 'react';
import { motion } from 'framer-motion';
import './AboutSection.css';

const VALUES = [
  {
    icon: '🏛️',
    title: 'Kỷ niệm 50 năm',
    desc: 'Kỷ niệm 50 năm Thành phố Hồ Chí Minh mang tên Bác (1976–2026), hành trình xây dựng và phát triển.',
  },
  {
    icon: '🎭',
    title: 'Tôn vinh văn hóa',
    desc: 'Tôn vinh lịch sử, văn hóa và con người thành phố qua kho tàng ngôn ngữ phương ngữ độc đáo.',
  },
  {
    icon: '📜',
    title: 'Lưu giữ ký ức',
    desc: 'Lưu giữ ký ức đô thị và bản sắc Nam Bộ — những từ ngữ, cách nói đang dần mai một theo thời gian.',
  },
  {
    icon: '🔗',
    title: 'Kết nối thời đại',
    desc: 'Kết nối quá khứ – hiện tại – tương lai thông qua sự đối chiếu ngôn ngữ xưa và nay.',
  },
  {
    icon: '💻',
    title: 'Công nghệ số',
    desc: 'Ứng dụng công nghệ số để bảo tồn và lan tỏa giá trị văn hóa dân tộc đến mọi người.',
  },
  {
    icon: '🌱',
    title: 'Thế hệ trẻ',
    desc: 'Truyền cảm hứng cho thế hệ trẻ khám phá di sản ngôn ngữ và văn hóa địa phương.',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  }),
};

export default function AboutSection({ stats }) {
  return (
    <section className="about" id="about">
      <div className="container">
        <motion.div
          className="about__header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="about__badge">
            🏆 Cuộc thi
          </div>
          <h2 className="about__title">
            50 năm <em>Thành phố trong tôi</em>
            <br />(1976–2026)
          </h2>
          <p className="about__desc">
            Dự án được xây dựng nhằm hưởng ứng cuộc thi "50 năm Thành phố trong tôi",
            sử dụng công nghệ số để bảo tồn và trực quan hóa kho tàng phương ngữ
            Lục tỉnh Nam Kỳ — một phần không thể tách rời của bản sắc văn hóa Nam Bộ.
          </p>
        </motion.div>

        {/* Values */}
        <div className="about__values">
          {VALUES.map((value, i) => (
            <motion.div
              key={i}
              className="about__value"
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="about__value-icon">{value.icon}</div>
              <h3 className="about__value-title">{value.title}</h3>
              <p className="about__value-desc">{value.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Dataset info */}
        {stats && (
          <motion.div
            className="about__dataset"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="about__dataset-title">📊 Về bộ dữ liệu</h3>
            <div className="about__dataset-stats">
              <div className="about__dataset-stat">
                <div className="about__dataset-stat-value">{stats.total_entries?.toLocaleString()}</div>
                <div className="about__dataset-stat-label">Tổng mục từ</div>
              </div>
              <div className="about__dataset-stat">
                <div className="about__dataset-stat-value">{stats.with_modern_equivalent}</div>
                <div className="about__dataset-stat-label">Cặp đối chiếu xưa–nay</div>
              </div>
              <div className="about__dataset-stat">
                <div className="about__dataset-stat-value">{stats.with_examples?.toLocaleString()}</div>
                <div className="about__dataset-stat-label">Có ví dụ sử dụng</div>
              </div>
              <div className="about__dataset-stat">
                <div className="about__dataset-stat-value">{Object.keys(stats.parts_of_speech || {}).length}</div>
                <div className="about__dataset-stat-label">Từ loại</div>
              </div>
            </div>
            <p className="about__dataset-note">
              Nguồn: Từ điển phương ngữ Nam Bộ — bộ dữ liệu được số hóa và phân loại tự động
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
