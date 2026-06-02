# Hướng dẫn kết nối ReactJS với BẬU RAG Backend

Tài liệu này hướng dẫn cách kết nối giao diện ReactJS frontend của bạn với backend RAG đã được triển khai trên Hugging Face Spaces.

## 1. Thông tin API Endpoint

*   **URL:** `https://fivec-bau-rag-backend.hf.space/api/convert`
*   **Phương thức (Method):** `POST`
*   **Headers:**
    *   `Content-Type: application/json`
*   **Dữ liệu gửi lên (Request Body):**
    ```json
    {
      "text": "Câu tiếng Việt hiện đại cần chuyển đổi"
    }
    ```
*   **Dữ liệu phản hồi (Response Body):**
    ```json
    {
      "original": "Câu tiếng Việt hiện đại gốc",
      "converted": "Câu phương ngữ Nam Bộ đã chuyển đổi"
    }
    ```

---

## 2. Mã nguồn tích hợp mẫu (React Component)

Dưới đây là một Component React hoàn chỉnh, giao diện tối giản và hiện đại để bạn có thể sao chép và tích hợp thẳng vào dự án ReactJS:

```jsx
import React, { useState } from 'react';

export default function BauConverter() {
  const [inputText, setInputText] = useState('');
  const [convertedText, setConvertedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleConvert = async () => {
    if (!inputText.trim()) return;

    setLoading(true);
    setError(null);
    setConvertedText('');

    try {
      const response = await fetch("https://fivec-bau-rag-backend.hf.space/api/convert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: inputText.trim() }),
      });

      if (!response.ok) {
        throw new Error("Không thể kết nối đến máy chủ backend.");
      }

      const data = await response.json();
      setConvertedText(data.converted);
    } catch (err) {
      console.error(err);
      setError(err.message || "Đã xảy ra lỗi không xác định.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>BẬU — Chuyển Đổi Phương Ngữ Nam Bộ</h2>
      
      <div style={styles.workspace}>
        {/* Khung nhập liệu */}
        <div style={styles.card}>
          <label style={styles.label}>Tiếng Việt hiện đại:</label>
          <textarea
            style={styles.textarea}
            placeholder="Nhập câu tiếng Việt muốn chuyển đổi tại đây..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
        </div>

        {/* Khung kết quả */}
        <div style={styles.card}>
          <label style={styles.label}>Phương ngữ Nam Bộ xưa:</label>
          <div style={styles.resultBox}>
            {loading ? (
              <span style={styles.loadingText}>Đang chuyển đổi ngôn ngữ... (Có thể mất 20-30 giây nếu server đang khởi động lại)</span>
            ) : error ? (
              <span style={styles.errorText}>Lỗi: {error}</span>
            ) : (
              convertedText || <span style={styles.placeholder}>Kết quả chuyển đổi sẽ hiển thị tại đây...</span>
            )}
          </div>
        </div>
      </div>

      <button
        style={{
          ...styles.button,
          opacity: loading || !inputText.trim() ? 0.6 : 1,
          cursor: loading || !inputText.trim() ? 'not-allowed' : 'pointer'
        }}
        onClick={handleConvert}
        disabled={loading || !inputText.trim()}
      >
        {loading ? "Đang xử lý..." : "Chuyển Đổi Ngay"}
      </button>
    </div>
  );
}

// Inline CSS styles (Bạn có thể chuyển thành CSS/Tailwind theo dự án của bạn)
const styles = {
  container: {
    maxWidth: '800px',
    margin: '40px auto',
    padding: '24px',
    backgroundColor: '#1e1e24',
    borderRadius: '16px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
    color: '#f3f4f6',
    fontFamily: 'system-ui, -apple-system, sans-serif',
  },
  title: {
    textAlign: 'center',
    marginBottom: '24px',
    color: '#f59e0b', // Màu cam vàng vintage
  },
  workspace: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px',
    marginBottom: '20px',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#9ca3af',
  },
  textarea: {
    height: '120px',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #4b5563',
    backgroundColor: '#111827',
    color: '#f3f4f6',
    resize: 'none',
    fontSize: '15px',
    outline: 'none',
  },
  resultBox: {
    height: '120px',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #4b5563',
    backgroundColor: '#111827',
    color: '#fbbf24', // Kết quả màu vàng nổi bật
    fontSize: '15px',
    overflowY: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  placeholder: {
    color: '#6b7280',
    fontStyle: 'italic',
  },
  button: {
    width: '100%',
    padding: '14px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#d97706',
    color: '#ffffff',
    fontSize: '16px',
    fontWeight: 'bold',
    transition: 'all 0.2s',
  },
  loadingText: {
    color: '#60a5fa',
  },
  errorText: {
    color: '#f87171',
  }
};
```

---

## 3. Một số lưu ý vận hành quan trọng

1.  **Cấu hình CORS (Đã xử lý):**
    Phần backend FastAPI đã được thiết lập `allow_origins=["*"]` cho phép tất cả các tên miền kết nối. Bạn không cần lo lắng về lỗi CORS khi chạy localhost ở máy tính hay khi deploy lên Vercel, Netlify.
2.  **Khởi động nguội (Cold Start):**
    Hugging Face Spaces phiên bản miễn phí sẽ **tự động ngủ (sleep) sau 48 giờ** không có lượt truy cập nào.
    *   Lượt truy cập đầu tiên sau khi app ngủ sẽ kích hoạt quá trình khởi động lại máy chủ (mất khoảng **30 - 45 giây**).
    *   Hãy đảm bảo giao diện React của bạn hiển thị dòng thông báo hoặc hiệu ứng loading phù hợp để người dùng không tưởng ứng dụng bị đơ trong lần chạy đầu tiên.
3.  **Tối ưu hóa Trải nghiệm:**
    Nếu ứng dụng của bạn có lưu lượng truy cập lớn và bạn muốn tránh tình trạng ngủ đông của Hugging Face, bạn có thể mua gói nâng cấp phần cứng (khoảng $9/tháng) trên Hugging Face để giữ server luôn thức 24/7.
