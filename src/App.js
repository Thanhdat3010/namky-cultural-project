import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import headingBg from './assets/Heading_BG.svg';
import logo from './assets/Logo.svg';
import bitexco from './assets/bitexco.webp';
import charner from './assets/charner.webp';
import choLon from './assets/cho_lon.webp';
import congVien from './assets/cong_vien_23_9.webp';
import saiGon1966 from './assets/sai_gon_1966.webp';
import saiGon1969 from './assets/sai_gon_1969.webp';
import saiGon1970 from './assets/sai_gon_1970.webp';

function App() {
  const galleryImages = useMemo(
    () => [
      { src: saiGon1969, alt: 'Sài Gòn những năm 1960' },
      { src: saiGon1970, alt: 'Đường phố Sài Gòn đông đúc' },
      { src: choLon, alt: 'Nhịp sống khu Chợ Lớn' },
      { src: congVien, alt: 'Công viên 23/9' },
      { src: bitexco, alt: 'Bitexco về đêm' },
    ],
    []
  );

  const timelineItems = useMemo(
    () => [
      {
        year: '1975',
        title: 'Tiếng radio và những con hẻm nhỏ',
        body: 'Một Sài Gòn của radio cassette, tiếng rao bánh mì mỗi buổi sáng và những con hẻm chật chội đầy ký ức.',
        img: charner,
        left: '8%',
        top: '36%',
        align: 'left',
      },
      {
        year: '1986',
        title: 'Thành phố bắt đầu chuyển mình',
        body: 'Sau thời kỳ Đổi Mới, Sài Gòn trở nên nhộn nhịp hơn với tiếng xe máy.',
        img: saiGon1966,
        left: '46%',
        top: '12%',
        align: 'right',
      },
      {
        year: '2000',
        title: 'Nhịp sống hiện đại dần xuất hiện',
        body: 'Internet, điện thoại di động và văn hóa trẻ bắt đầu thay đổi cách con người giao tiếp.',
        img: congVien,
        left: '34%',
        top: '58%',
        align: 'left',
      },
      {
        year: '2026',
        title: 'Ký ức được lưu giữ bằng công nghệ',
        body: 'Giữa thành phố Hồ Chí Minh hiện đại, nhiều cách nói xưa dần ít xuất hiện hơn.',
        img: bitexco,
        left: '66%',
        top: '82%',
        align: 'right',
      },
    ],
    []
  );

  const memoryWords = useMemo(
    () => [
      'a còng',
      'a dao',
      'a hành a tỏi',
      'a lê hấp',
      'a lê húp',
      'a móc',
      'à há',
      'â nả',
      'á khẩu',
      'á ngộ',
      'ác',
      'ác đạn',
      'ác nhơn',
      'ác ôn',
      'ác xiêm la',
      'ách',
      'ách ách',
      'ách xì xằng',
      'ạch',
      'ạch đụi',
      'ai dè',
      'ái chà',
      'ái chà chà',
      'an nam',
    ],
    []
  );

  const memoryColumns = useMemo(() => {
    const columns = [[], [], [], []];
    memoryWords.forEach((item, index) => {
      columns[index % columns.length].push(item.toUpperCase());
    });
    return columns;
  }, [memoryWords]);

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [relevantWords, setRelevantWords] = useState([]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (selector) => {
    const target = document.querySelector(selector);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const handleConvert = async () => {
    if (!inputText.trim() || loading) return;

    setLoading(true);
    setOutputText('');
    setRelevantWords([]);

    try {
      const response = await fetch('https://fivec-bau-rag-backend.hf.space/api/convert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputText.trim() }),
      });

      if (!response.ok) {
        throw new Error('Không thể kết nối đến máy chủ.');
      }

      const data = await response.json();
      setOutputText(data.converted);
      setRelevantWords(data.relevant_words || []);
    } catch (err) {
      setOutputText('Có lỗi xảy ra, vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bau-page" id="top">
      <nav className={`bau-navbar ${scrolled ? 'is-scrolled' : ''}`} aria-label="Điều hướng chính">
        <div className="container">
          <div className={`bau-nav-shell d-flex align-items-center justify-content-between ${scrolled ? 'show-shell' : ''}`}>
            <button className="bau-logo" onClick={() => handleScrollTo('#hero')} aria-label="BẬU">
              <img src={logo} alt="BẬU" />
            </button>
            <div className="bau-nav-links d-none d-lg-flex">
              <a href="#hero" onClick={(e) => { e.preventDefault(); handleScrollTo('#hero'); }}>
                Trang chủ
              </a>
              <a href="#section-phuong-ngu" onClick={(e) => { e.preventDefault(); handleScrollTo('#section-phuong-ngu'); }}>
                Sài Gòn xưa
              </a>
              <a href="#section-converter" onClick={(e) => { e.preventDefault(); handleScrollTo('#section-converter'); }}>
                Tiếng cũ
              </a>
            </div>
            <button
              className="bau-nav-toggle d-lg-none"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Mở menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
          <div className={`bau-nav-mobile ${mobileMenuOpen ? 'open' : ''} d-lg-none`}>
            <a href="#hero" onClick={(e) => { e.preventDefault(); handleScrollTo('#hero'); }}>
              Trang chủ
            </a>
            <a href="#section-phuong-ngu" onClick={(e) => { e.preventDefault(); handleScrollTo('#section-phuong-ngu'); }}>
              Sài Gòn xưa
            </a>
            <a href="#section-converter" onClick={(e) => { e.preventDefault(); handleScrollTo('#section-converter'); }}>
              Tiếng cũ
            </a>
          </div>
        </div>
      </nav>

      <main>
        <section id="hero" className="hero-section">
          <div className="hero-banner">
            <img src={headingBg} alt="" loading="eager" decoding="async" aria-hidden="true" />
          </div>
        </section>

        <section className="story-section">
          <div className="container">
            <div className="row g-4 align-items-start">
              <div className="col-12 col-lg-4">
                <h1 className="story-title">
                  TIẾNG NÓI
                  <br />
                  CỦA MỘT
                  <br />
                  THÀNH PHỐ
                </h1>
              </div>
              <div className="col-12 col-lg-8 story-text">
                <p>
                  "Bậu" là một cách xưng hô đặc biệt của Nam Bộ xưa. Không đơn thuần mang nghĩa là
                  "bạn", "người thương" hay "mình", từ ấy còn chứa trong đó sự gần gũi, chân tình
                  mộc mạc của người Sài Gòn – miền Nam qua nhiều thế hệ.
                </p>
                <p>
                  BẬU được tạo ra như một không gian số để lưu giữ lại và kể lại những ký ức ấy
                  thông qua ngôn ngữ Nam Bộ xưa – thứ ngôn ngữ từng hiện diện trong đời sống thường
                  nhật của người Sài Gòn suốt nhiều thập kỷ.
                </p>
                <p>
                  BẬU mong muốn mang lại trải nghiệm cho các bạn trẻ về tiếng nói Nam Bộ xưa bằng
                  tính năng AI chuyển đổi ngôn ngữ hiện đại sang phương ngữ Nam Bộ, đưa người xem
                  bước vào nơi quá khứ và hiện tại cùng tồn tại trong từng lời nói quen thuộc.
                </p>
              </div>
            </div>
            <div className="story-carousel">
              <div className="story-track">
                {[...galleryImages, ...galleryImages].map((item, index) => (
                  <figure className="story-card" key={`${item.alt}-${index}`}>
                    <img src={item.src} alt={item.alt} loading="lazy" decoding="async" />
                  </figure>
                ))}
              </div>
            </div>
            <div className="story-credit">Bản quyền hình ảnh: Zing News</div>
          </div>
        </section>

        <section id="section-phuong-ngu" className="phuong-ngu-section">
          <div className="container">
            <div className="row g-4 align-items-start">
              <div className="col-12 col-lg-5 order-lg-1 order-2">
                <div className="demo-block">
                  <div className="demo-label">TIẾNG NÓI HIỆN NAY</div>
                  <div className="demo-box">
                    Hôm nay mẹ đi chợ về, thấy bố đang ngồi xem ti vi, bà ấy tức giận lắm vì căn nhà
                    bừa bộn quá mà ông ấy chẳng dọn dẹp gì cả.
                  </div>
                  <div className="demo-label demo-label--accent">PHƯƠNG NGỮ NAM BỘ</div>
                  <div className="demo-box demo-box--accent">
                    Hôm rày má đi chợ dạ, dòm thấy tía đang ngồi coi ti vi, bả tức thiệt dữ bởi cái
                    nhà bừa bộn quá mà ổng hổng chịu dọn dẹp chi cả, bả la hoài hết trơn.
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-7 order-lg-2 order-1">
                <h2 className="section-title">PHƯƠNG NGỮ NAM BỘ HÌNH THÀNH THẾ NÀO?</h2>
                <p>
                  Phương ngữ Nam Bộ được hình thành từ quá trình người Việt mở cõi từ khoảng thế kỷ
                  XVII. Trong hành trình ấy, ngôn ngữ từ nhiều vùng miền đã dần hòa trộn và thích
                  nghi với cuộc sống mới nơi sông nước, chợ nổi và những đô thị đang hình thành.
                </p>
                <p>
                  Qua nhiều thế hệ, tiếng Nam Bộ trở thành một cách nói mang màu sắc riêng – mộc
                  mạc gần gũi và phóng khoáng như chính con người Sài Gòn.
                </p>
                <p>
                  Ngày nay, giữa nhịp sống hiện đại của Thành phố Hồ Chí Minh, nhiều cách nói xưa
                  dần ít sử dụng hơn. Tuy nhiên, chúng vẫn là một phần ký ức văn hóa thành phố.
                  Thông qua BẬU, chúng tôi mong muốn lưu giữ và tái hiện lại những âm thanh ngôn
                  ngữ ấy bằng công nghệ, để người trẻ hôm nay có thể lắng nghe và cảm nhận một Sài
                  Gòn xưa qua chính tiếng nói của con người nơi đây.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="section-converter" className="converter-section">
          <div className="container">
            <div className="row">
              <div className="col-12 col-lg-6">
                <h2 className="section-title">NGƯỜI SÀI GÒN XƯA SẼ NÓI THẾ NÀO?</h2>
                <p>
                  BẬU mong muốn tái hiện lại cách người Nam Bộ xưa từng trò chuyện thông qua trải
                  nghiệm chuyển đổi ngôn ngữ bằng AI. Hãy nhập một câu nói hiện đại vào khung bên
                  dưới, hệ thống sẽ chuyển đổi sang phương ngữ Nam Bộ dựa trên từ điển và cách diễn
                  đạt đặc trưng của người Sài Gòn qua nhiều thời kỳ.
                </p>
                <p>
                  Không chỉ thay đổi từ ngữ, BẬU còn cố gắng giữ lại sắc thái gần gũi, mộc mạc và
                  chân tình rất riêng của tiếng Nam Bộ.
                </p>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-12 col-lg-8">
                <div className="converter-example">Ví dụ: Mình làm gì bây giờ?</div>
                <label htmlFor="input-text" className="form-label sr-only">Câu nói hiện đại</label>
                <textarea
                  id="input-text"
                  className="form-control bau-textarea"
                  placeholder="Hãy cho BẬU biết câu nói của bạn"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                />
                <div className="text-center mt-2">
                  <button
                    id="btn-convert"
                    className="btn bau-btn"
                    onClick={handleConvert}
                    disabled={loading || !inputText.trim()}
                    style={{ opacity: loading || !inputText.trim() ? 0.6 : 1 }}
                  >
                    {loading ? 'Đang chuyển đổi...' : 'Chuyển đổi'}
                  </button>
                </div>
                <label htmlFor="output-text" className="form-label sr-only">Câu nói phương ngữ</label>
                <textarea
                  id="output-text"
                  className="form-control bau-textarea bau-textarea--output"
                  placeholder={loading ? 'Đang chuyển đổi ngôn ngữ... (có thể mất 20-30 giây nếu server đang khởi động)' : 'Câu nói tiếng Phương ngữ sẽ hiện ra ở đây'}
                  value={outputText}
                  readOnly
                />

                {relevantWords.length > 0 && (
                  <div className="bau-vocab-section">
                    <h3 className="bau-vocab-title">
                      📖 Từ vựng Nam Bộ tham chiếu ({relevantWords.length})
                    </h3>
                    <div className="bau-vocab-grid">
                      {relevantWords.map((wordObj, idx) => {
                        let posList = [];
                        let viDuList = [];

                        try {
                          posList = JSON.parse(wordObj.pos || '[]');
                        } catch (e) {
                          posList = Array.isArray(wordObj.pos) ? wordObj.pos : [];
                        }

                        try {
                          viDuList = JSON.parse(wordObj.vi_du || '[]');
                        } catch (e) {
                          viDuList = Array.isArray(wordObj.vi_du) ? wordObj.vi_du : [];
                        }

                        return (
                          <div key={idx} className="bau-vocab-card">
                            <div className="bau-vocab-header">
                              <span className="bau-vocab-word">{wordObj.tu}</span>
                              <div className="bau-vocab-pos-container">
                                {posList.map((pos, pIdx) => (
                                  <span key={pIdx} className="bau-vocab-pos-badge">
                                    {pos}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {wordObj.tu_hien_nay && (
                              <div className="bau-vocab-modern-eq">
                                Nói cách khác: <strong>{wordObj.tu_hien_nay}</strong>
                              </div>
                            )}

                            <p className="bau-vocab-meaning">{wordObj.nghia}</p>

                            {viDuList.length > 0 && (
                              <div className="bau-vocab-examples">
                                <span className="bau-vocab-example-label">Ví dụ ngữ cảnh xưa:</span>
                                {viDuList.map((vidu, vIdx) => (
                                  <p key={vIdx} className="bau-vocab-example-item">
                                    💡 <em>"{vidu}"</em>
                                  </p>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                <p className="converter-note text-center">
                  Mỗi câu nói được chuyển đổi không chỉ là sự thay đổi về ngôn ngữ, mà còn là một
                  cách để lắng nghe lại âm thanh Sài Gòn xưa trong đời sống hôm nay.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="timeline" className="timeline-section">
          <div className="container">
            <h2 className="section-title text-center">SÀI GÒN QUA ÂM THANH</h2>
            <div className="timeline-desktop d-none d-lg-block">
              <div className="timeline-canvas">
                <svg className="timeline-path" viewBox="0 0 1200 520" aria-hidden="true">
                  <path
                    d="M90 120 C280 40, 360 220, 520 200 S 770 140, 910 290 S 1040 430, 1160 420"
                    fill="none"
                    stroke="#01204E"
                    strokeWidth="2"
                  />
                </svg>
                {timelineItems.map((item) => (
                  <div
                    key={item.year}
                    className={`timeline-item timeline-item--${item.align}`}
                    style={{ left: item.left, top: item.top }}
                  >
                    <div className="timeline-badge">
                      <img src={item.img} alt={item.title} loading="lazy" decoding="async" />
                    </div>
                    <div className="timeline-text">
                      <h3>{item.year}</h3>
                      <p className="timeline-title">{item.title}</p>
                      <p className="timeline-body">{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="timeline-mobile d-lg-none">
              {timelineItems.map((item) => (
                <div className="timeline-mobile-item" key={`mobile-${item.year}`}>
                  <div className="timeline-badge">
                    <img src={item.img} alt={item.title} loading="lazy" decoding="async" />
                  </div>
                  <div className="timeline-text">
                    <h3>{item.year}</h3>
                    <p className="timeline-title">{item.title}</p>
                    <p className="timeline-body">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="memory-wall" className="memory-section">
          <div className="container">
            <h2 className="section-title">BỨC TƯỜNG KÝ ỨC</h2>
            <div className="memory-cloud">
              <div className="memory-center">
                <span>BẬU</span>
                <span className="accent">NAM BỘ</span>
              </div>
              <div className="memory-columns">
                {memoryColumns.map((column, index) => (
                  <div className="memory-column" key={`col-${index}`}>
                    {column.map((word, wordIndex) => (
                      <span
                        className={`memory-vertical ${wordIndex % 2 === 0 ? 'accent' : ''}`}
                        key={`${word}-${wordIndex}`}
                      >
                        {word}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="ticket" className="ticket-section">
          <div className="container">
            <div className="row g-0 ticket-wrap">
              <div className="col-12 col-lg-6">
                <div className="ticket-photo">
                  <img src={bitexco} alt="Thành phố Hồ Chí Minh" loading="lazy" decoding="async" />
                </div>
              </div>
              <div className="col-12 col-lg-6">
                <div className="ticket-card">
                  <div className="ticket-title">VÉ KHỞI HÀNH</div>
                  <h3>TRỞ VỀ SÀI GÒN XƯA</h3>
                  <div className="ticket-stars">★★★★★</div>
                  <p>Địa điểm: Thành phố Hồ Chí Minh</p>
                  <p>Chi phí: Miễn phí</p>
                  <p>
                    Tấm vé này là lời mời dành cho bạn – đến với Thành phố Hồ Chí Minh, để cảm nhận
                    một Sài Gòn vừa hiện đại, vừa hoài niệm; nơi quá khứ vẫn còn hiện diện trong từng
                    lời nói quen thuộc của con người nơi đây.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <div className="row g-4">
            <div className="col-12 col-lg-4">
              <div className="footer-brand">BẬU – MỘT CÂU NÓI, HAI THỜI ĐẠI</div>
            </div>
            <div className="col-12 col-lg-4">
              <p className="footer-label">Điều hướng</p>
              <a href="#section-phuong-ngu" onClick={(e) => { e.preventDefault(); handleScrollTo('#section-phuong-ngu'); }}>
                Sài Gòn xưa
              </a>
              <a href="#section-converter" onClick={(e) => { e.preventDefault(); handleScrollTo('#section-converter'); }}>
                Tiếng cũ
              </a>
              <p>Nguồn tham khảo từ điển: “Từ điển từ ngữ Nam Bộ” do Huỳnh Công Tín biên soạn – NXB Khoa học xã hội</p>
            </div>
            <div className="col-12 col-lg-4">
              <p className="footer-label">Liên hệ với BẬU</p>
              <p className="footer-signature">Trần Duy Nhân — nhantd.rs@gmail.com</p>
              <p className="footer-signature">Trương Thành Đạt — ttdat2540@clc.fitus.edu.vn</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
