# Cầm Đồ Toro — Landing Page

Landing page một trang (single-page) cho dịch vụ **Cầm đồ Toro**: cầm ô tô, xe máy, nhà đất, hỗ trợ xe đang nợ ngân hàng, đáo hạn ngân hàng. Code **vanilla HTML/CSS/JS**, không framework, không phụ thuộc build tool.

## Cấu trúc

| File | Vai trò |
| --- | --- |
| `index.html` | Toàn bộ nội dung &amp; cấu trúc 12 khối section |
| `style.css` | Design system (CSS custom properties), layout, hiệu ứng |
| `script.js` | Menu mobile, accordion FAQ, validate form, máy tính lãi, reveal-on-scroll |

## Chạy thử

Chỉ cần mở `index.html` bằng trình duyệt. Hoặc chạy static server cho mượt:

```bash
python3 -m http.server 5500
# rồi mở http://localhost:5500
```

## Tuỳ chỉnh nhanh

- **Màu sắc / spacing / bo góc**: sửa các biến trong `:root` ở đầu `style.css`. Màu nhấn chính là `--gold: #F5B301`.
- **Font**: cặp `Oswald` (tiêu đề) + `Be Vietnam Pro` (nội dung), nạp qua Google Fonts ở `<head>`.
- **Nội dung &amp; placeholder**: các điểm cần điền có comment tiếng Việt trong `index.html` (địa chỉ, bản đồ, link Zalo/Messenger, nội dung "Về chúng tôi").
- **Gửi form thật**: trong `script.js`, mục số 6 có chỗ đánh dấu `TÍCH HỢP THẬT TẠI ĐÂY` để nối API/email/Google Sheet/Telegram. Mặc định form chỉ mô phỏng gửi thành công phía client.
- **Số hotline / email**: tìm `tel:`, `mailto:` trong `index.html`.

## Thông tin doanh nghiệp

- Hotline: 0828 796 266 · 0922 270 222
- Email: dungcoma19@gmail.com
- Website: camdooto.com

## Ghi chú kỹ thuật

- Responsive, kiểm tra tới 360px.
- Accessibility: nhãn form, `aria` cho menu &amp; accordion, focus state, contrast cao.
- Hiệu ứng dùng `transform`/`opacity` (GPU-safe), tôn trọng `prefers-reduced-motion`.
- Không dùng hình/logo có bản quyền; toàn bộ icon là SVG nội tuyến tự vẽ.
