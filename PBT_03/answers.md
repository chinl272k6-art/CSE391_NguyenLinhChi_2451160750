## Câu A1-3 cách nhúng CSS
1. Inline CSS (Viết trực tiếp trong thẻ HTML)
-Ví dụ:
<h1 style="color: red; font-size: 24px;">Tiêu đề</h1>
-Ưu điểm:
+ Nhanh, tiện khi test/debug
+ Áp dụng trực tiếp cho 1 phần tử
-Nhược điểm
+ Khó bảo trì
+ Lặp code nhiều
+ Không tái sử dụng được
+ Làm HTML bị rối
-Khi nào nên dùng:
+ Debug nhanh
+ Test tạm thời
+ Không dùng trong dự án thực tế

2. Internal CSS (viết trong thẻ <style> trong <head>)
- Ví dụ:
<head>
    <style>
        h1 {
            color: red;
            font-size: 24px;
        }
    </style>
</head>
- Ưu điểm:
+ Dễ quản lý hơn inline
+ Áp dụng cho nhiều phần tử trong 1 trang
- Nhược điểm:
+ Chỉ dùng được cho 1 file HTML
+ Không tái sử dụng giữa nhiều trang
+ Khi project lớn sẽ khó quản lý
- Khi nào nên dùng:
+ Prototype
+ Bài tập nhỏ
+ Demo nhanh

3. External CSS (file CSS riêng)
- Ví dụ:
<head>
    <link rel="stylesheet" href="styles.css">
</head>
styles.css:
h1 {
    color: red;
    font-size: 24px;
}
- Ưu điểm:
+ Tách biệt HTML và CSS → sạch code
+ Tái sử dụng cho nhiều trang
+ Dễ bảo trì, mở rộng
+ Chuẩn dùng trong thực tế
- Nhược điểm:
+ Cần thêm file riêng
+ Load thêm request (nhưng không đáng kể)
- Khi nào nên dùng:
+ Dự án thực tế
+ Website nhiều trang
→ Đây là cách chuẩn production (100%)

4. Câu hỏi thêm : Cách nào thắng?
- Thứ tự ưu tiên (CSS specificity + priority):
   Inline CSS (cao nhất)
   Internal CSS
   External CSS (thấp nhất)
- Giải thích:
+ Inline CSS viết trực tiếp trên phần tử → có độ ưu tiên cao nhất
+ Internal và External phụ thuộc vào selector và thứ tự load
+ CSS hoạt động theo nguyên tắc:
   Càng cụ thể → càng mạnh
   Viết sau → có thể ghi đè trước
## Câu A2  — CSS Selectors — Dự đoán kết quả   
1. h1
→ Chọn tất cả thẻ <h1>
Kết quả:
 ShopTLU
2. .price
→ Chọn tất cả phần tử có class price
Kết quả:
 25.990.000đ
 45.990.000đ
3. #app header
→ Chọn thẻ <header> nằm bên trong phần tử có id app
Kết quả (toàn bộ nội dung header):
 ShopTLU Home Products About
4. nav a:first-child
→ Chọn thẻ <a> là con đầu tiên trong <nav>
Kết quả:
 Home
5. .product.featured h2
→ Chọn <h2> nằm trong phần tử có cả 2 class: product và featured
Kết quả:
 MacBook Pro
6. article > p
→ Chọn tất cả <p> là con trực tiếp của <article>
Có 2 <article>, mỗi cái có 2 <p> → tổng 4 thẻ
Kết quả:
 25.990.000đ
 Mô tả sản phẩm...
 45.990.000đ
 Mô tả sản phẩm...
7. a[href="/"]
→ Chọn <a> có thuộc tính href="/"
Kết quả:
 Home
8. .top-bar.dark h1
→ Chọn <h1> nằm trong phần tử có cả 2 class top-bar và dark
Kết quả:
 ShopTLU
## Câu A3 (7đ) — Box Model — Tính toán kích thước
/* Trường hợp 1:content-box (mặc định) */
  Chiều rộng hiển thị = width + padding x 2 + border x 2 = 400+20x2+5x2= 450px
  Không gian chiếm trên trang = Chiều rộng hiển thị + margin x2= 450 + 10x2= 470px
/* Trường hợp 2: border-box */
  Chiều rộng hiển thị =400px (giữ nguyên)
  Kích thước content thực tế = Chiều rộng hiển thị - padding - border =400-40-10=350px
  Không gian chiếm trên trang = Chiều rộn hiển thị+margin =400+20=420px
/* Trường hợp 3: Margin collapse */
  Khoảng cách giữa box-a và box-b: 40px (Vì margin dọc ko cộng , mà lấy giá trị lớn hơn)
  Không phải 56px vì: Xảy ra margin collapse-> 2 margin chồng lên nhau -> lấy cái lớn nhất
Nâng cao:
  Khi có số âm:
    Khoảng cách = margin lớn = margin nhỏ (có thể âm)= 40+(-10)=30px
## Câu A4 (5đ) — Specificity (Độ ưu tiên)
1. Tính specificity từng rule
Rule A
p { color: black; }
→ (0, 0, 1)
Rule B
.price { color: blue; }
→ (0, 1, 0)
Rule C
#main-price { color: red; }
→ (1, 0, 0)
Rule D
p.price { color: green; }
→ (0, 1, 1)    
2. Element sẽ có màu gì?
<p class="price" id="main-price">
Rule áp dụng: A,B,C,D
->C thắng → màu đỏ

3. Nếu thêm inline CSS
<p class="price" id="main-price" style="color: orange;">
->Inline CSS có độ ưu tiên cao nhất
   ->Specificity kiểu đặc biệt: (1,0,0,0)
-> Kết quả: màu cam (orange)

4. Nếu Rule A có !important
p { color: black !important; }
-> !important ghi đè toàn bộ specificity
-> kể cả ID cũng thua
->Kết quả: Màu đen
Giải thích: !important ưu tiên cao nhất (trừ khi có !important khác mạnh hơn)
            Rule A trở thành mạnh nhất dù specificity thấp
## Câu B2 - Box Model Lab        
1. Phần 1
Hộp 1 (content-box): chiều rộng thực tế = 350px
Hộp 2 (border-box): chiều rộng thực tế = 300px

Giải thích:
- Content-box: width chỉ là nội dung → padding + border cộng thêm → tổng lớn hơn
- Border-box: width đã bao gồm padding + border → giữ nguyên 300px 
2. Phần 2
Phần 2:
- Khi dùng content-box: tổng width > 1000px → layout bị vỡ
- Khi dùng border-box: tổng width = 1000px → layout chuẩn

Giải thích:
- Content-box không tính padding vào width
- Border-box đã tính padding + border vào width
## Bài B3
## 1. Danh sách 10 rules + specificity

| Rule | Specificity |
|------|--------------|
| p | 0,0,1 |
| body p | 0,0,2 |
| html body p | 0,0,3 |
| .text | 0,1,0 |
| p.text | 0,1,1 |
| .text.highlight | 0,2,0 |
| p.text.highlight | 0,2,1 |
| #demo | 1,0,0 |
| #demo.highlight | 1,1,0 |
| body #demo.text.highlight | 1,2,1 |

## 2. Element cuối cùng hiển thị màu gì? Tại sao?

Element cuối cùng hiển thị màu đen.

Vì rule:

body #demo.text.highlight

có specificity cao nhất: 1,2,1 nên nó ghi đè tất cả các rule còn lại.

## 3. Nếu thay đổi thứ tự rules thì kết quả có đổi không?

Thông thường kết quả KHÔNG đổi vì CSS ưu tiên specificity cao hơn.

Tuy nhiên nếu hai rules có specificity bằng nhau thì rule viết SAU sẽ được ưu tiên.

## Câu C1 
width thực tế = width + padding + border
Slide bar
  width: 300px
  padding: 20px *2=40px
  border: 1px *2 =2px
  => tổng = 342 px
Content
  width: 660px
  padding: 30px *2 = 60px
  border: 1px * 2=2px
  => tổng = 722px
Tổng layout
  342+722=1064px
Trong khi container chỉ: 960 px
2. Tại sao layout bị vỡ 
Vì chiều rộng thực tế: 1064px > 960px   
Nên .container không đủ chỗ để nằm cạnh .sidebar, vì vậy nó bị rớt xuống dòng mới 
3. Giải thích 2 cách sửa
Cách 1 — border-box
box-sizing: border-box;
Khi dùng:
width sẽ bao gồm:
content
padding
border
Nên:
300px vẫn là 300px thật
660px vẫn là 660px thật
Layout không bị tràn.

Cách 2 — Không dùng border-box
Tự giảm width content area để cộng thêm padding + border vẫn đúng 960px.
Ví dụ:
sidebar:
300 - 40 - 2 = 258px
content:
660 - 60 - 2 = 598px
Sau khi cộng padding + border:
sidebar = 300px
content = 660px
=> vừa khít container 960px.

## Câu C2
1. "Sản phẩm A" (h2)
<h2 class="title highlight">Sản phẩm A</h2>
Font-size = 20px
Vì có rule:
.card .title {
    font-size: 20px;
}
Specificity:
.card .title = 0,2,0
Nó apply trực tiếp lên h2 nên:
font-size = 20px
Rule .container { font-size: 14px } chỉ inheritance thôi, nhưng bị override bởi rule trực tiếp.
Color = green
Các rule liên quan:
.card {
    color: blue;
}
#featured .title {
    color: red;
}
.highlight {
    color: green !important;
}
Cascade:
.card → blue
#featured .title → red
.highlight → green !important
Dù specificity của #featured .title cao hơn:
#featured .title = 1,1,0
.highlight = 0,1,0
Nhưng:
!important thắng specificity thường
=> cuối cùng:
color = green

2. "Mô tả sản phẩm" (p trong featured)
<p>Mô tả sản phẩm</p>
Color = blue
Rule liên quan:
.car {
    color: blue;
}
.card p {
    color: inherit;
}
Quá trình:
.card có:
color: blue
p có:
color: inherit;
inherit nghĩa là lấy color từ parent.
Parent của <p> là .card.
=> kế thừa:
blue

3. "Sản phẩm B" (h2)
<h2 class="title">Sản phẩm B</h2>
Font-size = 20px
Áp dụng:
.card .title {
    font-size: 20px;
}
=> trực tiếp lên h2.
Nên:
font-size = 20px
Color = blue
Không có:
.highlight
#featured
Nên h2 không có color riêng.
Color được inheritance từ .card:
.card {
    color: blue;
}
=> kết quả:
color = blue

4. "Mô tả sản phẩm B" (p.highlight)
<p class="highlight">Mô tả sản phẩm B</p>
Color = green
Rule liên quan:
.card {
    color: blue;
}
.card p {
    color: inherit;
}
.highlight {
    color: green !important;
}
Cascade:
p nhận:
inherit → blue
.highlight → green !important
!important thắng.
=> cuối cùng:
color = green
