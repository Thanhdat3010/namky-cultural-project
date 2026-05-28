import React from 'react';
import './Footer.css';

export default function Footer() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content">
          <div className="footer__brand">
            Phương Ngữ <em>Nam Kỳ</em> Xưa & Nay
          </div>

          <nav className="footer__nav" aria-label="Footer navigation">
            <button className="footer__link" onClick={() => scrollTo('hero')}>Trang chủ</button>
            <button className="footer__link" onClick={() => scrollTo('timeline')}>Dòng thời gian</button>
            <button className="footer__link" onClick={() => scrollTo('dictionary')}>Từ điển</button>
            <button className="footer__link" onClick={() => scrollTo('about')}>Về dự án</button>
          </nav>

          <div className="footer__divider" />

          <div className="footer__tagline">
            Made with <span className="footer__tagline-heart">❤️</span> for the preservation of Nam Bộ culture
          </div>

          <div className="footer__copyright">
            © 2026 — Cuộc thi "50 năm Thành phố trong tôi (1976–2026)"
          </div>
        </div>
      </div>
    </footer>
  );
}
