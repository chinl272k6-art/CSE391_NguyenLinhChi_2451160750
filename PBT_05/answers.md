## CÂU A1:
1. Thẻ meta viewport chuẩn
<meta name="viewport" content="width=device-width, initial-scale=1.0">

2. Giải thích từng thuộc tính
Thuộc tính	Ý nghĩa
width=device-width	Chiều rộng trang = chiều rộng thiết bị
initial-scale=1.0	Mức zoom ban đầu = 100%
3. Nếu thiếu thẻ viewport thì sao?
Trên iPhone/mobile:
Browser giả lập trang như desktop (~980px)
Trang bị thu nhỏ toàn bộ
Chữ rất nhỏ
User phải zoom tay
Ví dụ:
Desktop web bị "mini size" trên điện thoại
Responsive gần như hỏng.

4. Mobile-First vs Desktop-First
Mobile-First
Ý tưởng:
Viết CSS cho mobile trước
Sau đó mở rộng cho màn hình lớn hơn
Ví dụ breakpoint 768px
/* MOBILE */
.container {
  display: block;
}
/* TABLET/DESKTOP */
@media (min-width: 768px) {
  .container {
    display: flex;
  }
}
Desktop-First
Ý tưởng:
Viết CSS cho desktop trước
Sau đó giảm xuống mobile
Ví dụ breakpoint 768px
/* DESKTOP */
.container {
  display: flex;
}
/* MOBILE */
@media (max-width: 768px) {
  .container {
    display: block;
  }
}
5. Tại sao Mobile-First được khuyên dùng?
Vì:
Mobile hiện chiếm đa số traffic
Performance tốt hơn
CSS gọn hơn
Responsive dễ mở rộng hơn
Ngoài ra:
Google ưu tiên:
Mobile-First Indexing
=> tốt cho SEO.
## Câu A2 — Breakpoints
Breakpoint	Pixel	Thiết bị	Ví dụ grid sản phẩm
Extra Small	<576px	Mobile nhỏ	1 cột
Small	≥576px	Mobile lớn	2 cột
Medium	≥768px	Tablet	2–3 cột
Large	≥992px	Laptop	3–4 cột
Extra Large	≥1200px	Desktop lớn	4 cột
XXL	≥1400px	Màn hình rất lớn	5–6 cột
Ví dụ responsive grid
/* Mobile */
grid-template-columns: 1fr;
/* Tablet */
@media (min-width: 768px) {
  grid-template-columns: repeat(2, 1fr);
}
/* Desktop */
@media (min-width: 1200px) {
  grid-template-columns: repeat(4, 1fr);
}
## Câu A3
Chiều rộng màn hình	.container width
375px (iPhone SE)	100%
600px	540px
800px	720px
1000px	960px
1400px	1140px
Giải thích
375px
Không đạt:
min-width: 576px
nên dùng:
width: 100%;
600px
Thoả:
@media (min-width: 576px)
=> width:
540px
800px
Thoả:
@media (min-width: 768px)
=> CSS mới ghi đè:
720px
1000px
Thoả:
@media (min-width: 992px)
=> width:
960px
1400px
Thoả:
@media (min-width: 1200px)
=> width:
1140px
## Câu A4
1. Variables
Ý nghĩa
SCSS cho phép tạo biến để lưu:
màu sắc
font
kích thước
spacing
Giúp:
tái sử dụng
sửa nhanh toàn project
Ví dụ
$primary-color: #3498db;
.button {
  background: $primary-color;
}
2. Nesting
Ý nghĩa
Cho phép viết CSS lồng nhau giống cấu trúc HTML.
Giúp:
code gọn hơn
dễ đọc hơn
Ví dụ
.navbar {
  background: black;
  ul {
    display: flex;
  }
  li {
    list-style: none;
  }
  a {
    color: white;
  }
}
Sau khi compile thành CSS
.navbar {
  background: black;
}
.navbar ul {
  display: flex;
}
.navbar li {
  list-style: none;
}
.navbar a {
  color: white;
}
3. Mixins
Ý nghĩa
Tạo đoạn CSS dùng lại nhiều lần.
Giống function trong lập trình.
Ví dụ
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.box {
  @include flex-center;
}
Compile ra CSS
.box {
  display: flex;
  justify-content: center;
  align-items: center;
}
4. @extend / Inheritance
Ý nghĩa
Cho class kế thừa CSS từ class khác.
Giúp tránh lặp code.
Ví dụ
.button {
  padding: 10px;
  border-radius: 5px;
}
.primary-btn {
  @extend .button;
  background: blue;
}
Compile ra CSS
.button,
.primary-btn {
  padding: 10px;
  border-radius: 5px;
}
.primary-btn {
  background: blue;
}
Tại sao trình duyệt KHÔNG đọc được file .scss?
Vì:
.scss không phải CSS chuẩn
Browser chỉ hiểu:
.css
SCSS có:
variables
mixins
nesting
extend
=> trình duyệt không parse được.
Cần bước gì để chuyển SCSS → CSS?
Cần:
Compile / Transpile
dùng:
Sass compiler
Live Sass Compiler
webpack
vite
gulp
Ví dụ
sass style.scss style.css
Kết quả:
style.scss  →  style.css
Sau đó HTML sẽ link:
<link rel="stylesheet" href="style.css">

## CÂU C1
Website: YouTube

Mobile (375px)

Navigation:
Menu thu gọn, ưu tiên icon
Sidebar đầy đủ bị ẩn
Content grid:
Video hiển thị khoảng 1 cột
Elements bị ẩn:
Sidebar chi tiết
Một số nút phụ
Font:
Nhỏ hơn để phù hợp màn hình

Tablet (768px)

Navigation:
Menu bắt đầu mở rộng hơn
Content grid:
Khoảng 2–3 cột
Elements bị ẩn:
Ít thành phần bị ẩn hơn mobile
Font:
Tăng nhẹ

Desktop (1440px)

Navigation:
Sidebar đầy đủ xuất hiện
Thanh tìm kiếm rộng hơn
Content grid:
Khoảng 4–6 cột
Elements bị ẩn:
Hầu như không
Font:
Kích thước lớn hơn và dễ đọc hơn

## Câu C2
Mobile (<768px)
┌──────────────────┐
│ Logo     ☰       │
│ Phone            │
├──────────────────┤
│    HERO IMAGE    │
├──────────────────┤
│ Food 1           │
│ Food 2           │
│ Food 3           │
│ Food 4           │
│ Food 5           │
│ Food 6           │
├──────────────────┤
│ Reservation Form │
│ Date             │
│ Time             │
│ People           │
│ Note             │
├──────────────────┤
│ Google Maps      │
├──────────────────┤
│ Footer           │
└──────────────────┘

Mobile phân tích

Ẩn:
Menu đầy đủ → đổi thành hamburger ☰
Form:
Đặt dưới grid ảnh
Grid:
1 cột
Tablet (768px–1023px)
┌─────────────────────────────┐
│ Logo      Phone      Menu   │
├─────────────────────────────┤
│         HERO IMAGE          │
├─────────────────────────────┤
│ Food1 │ Food2 │ Food3       │
│ Food4 │ Food5 │ Food6       │
├─────────────────────────────┤
│ Reservation Form            │
├─────────────────────────────┤
│ Google Maps                 │
├─────────────────────────────┤
│ Footer                      │
└─────────────────────────────┘

Tablet phân tích

Grid ảnh: 3 cột
Maps: nằm dưới form
Menu: hiện đầy đủ hơn
Desktop (≥1024px)
┌──────────────────────────────────────────┐
│ Logo     Menu           Phone            │
├──────────────────────────────────────────┤
│              HERO IMAGE                  │
├──────────────────┬───────────────────────┤
│ Food Grid        │ Reservation Form      │
│ 3x2              │                       │
│                  │ Google Maps           │
├──────────────────┴───────────────────────┤
│ Footer                                  │
└──────────────────────────────────────────┘

Desktop phân tích

Layout: 2 cột
Sidebar: không cần
Grid ảnh: 3 × 2
Form và Maps nằm bên phải