# Cầm Đồ Toro — Landing Page

Landing page một trang (single-page) cho dịch vụ **Cầm đồ Toro**: cầm ô tô, xe máy, nhà đất, hỗ trợ xe đang nợ ngân hàng, đáo hạn ngân hàng. Code **vanilla HTML/CSS/JS**, không framework, không phụ thuộc build tool.

## Cấu trúc

| File | Vai trò |
| --- | --- |
| `index.html` | **Bản v1** (không ảnh) — nội dung &amp; cấu trúc các khối section |
| `style.css` | Design system dùng chung (CSS custom properties), layout, hiệu ứng |
| `script.js` | Menu mobile, accordion FAQ, validate form, máy tính lãi, reveal-on-scroll |
| `v2.html` | **Bản v2** (giàu hình ảnh) — hero ảnh nền, gallery tài sản, ảnh "về chúng tôi", CTA ảnh nền |
| `v2.css` | Bổ sung thành phần dùng ảnh cho v2 (nạp sau `style.css`) |

Hai bản dùng chung `style.css` + `script.js`, tông màu **teal sáng (uy tín)**. Trên topbar của v2 có link qua lại **Bản v1 / v2**.

## Ảnh (quan trọng)

Ảnh trong `v2.html` (và 2 ảnh accent ở hero + "về chúng tôi" của `index.html`) hiện là **ảnh DEMO** lấy từ `loremflickr.com` (Flickr CC ngẫu nhiên) — chỉ để minh hoạ bố cục. **Trước khi chạy thật phải thay bằng ảnh của chính cửa hàng / tài sản (đúng bản quyền)**; ảnh thật còn giúp tăng độ tin cậy. Mỗi ảnh đã có comment `ẢNH DEMO` để dễ tìm và thay.

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
