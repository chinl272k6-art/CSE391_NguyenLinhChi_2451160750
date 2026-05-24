## CÂU A1
Kích thước	      < 768px	        768px - 991px	≥ 992px
Số cột mỗi box	  12	            6	            3
Box layout	      1 box / hàng	    2 box / hàng	4 box / hàng
Vẽ layout:
< 768px
[ Box 1 ]
[ Box 2 ]
[ Box 3 ]
[ Box 4 ]
768px – 991px
[ Box 1 ] [ Box 2 ]
[ Box 3 ] [ Box 4 ]
≥ 992px
[ Box 1 ] [ Box 2 ] [ Box 3 ] [ Box 4 ]
Câu hỏi thêm
col-md-6 nghĩa là gì?
md = màn hình từ 768px trở lên
6 = chiếm 6/12 cột của Bootstrap Grid
Tức là: mỗi box chiếm 1/2 chiều rộng hàng
Tại sao không cần viết col-sm-12?
Vì Bootstrap mặc định khi chưa khai báo cho kích thước nhỏ hơn thì phần tử sẽ tự động chiếm 100% chiều rộng (col-12).
Ở đây đã có:
col-12
nên màn hình nhỏ (<768px) tự mỗi box chiếm toàn bộ hàng rồi, không cần thêm:
col-sm-12
## CÂU A2
1. d-none d-md-block
d-none → ẩn phần tử (display: none)
d-md-block → từ kích thước md (≥768px) hiển thị dạng block

Kết quả:

Kích thước	Trạng thái
<768px	Ẩn
≥768px	Hiển thị
2. 5 spacing utilities
mt-3
m = margin
t = top
3 = mức khoảng cách 3

→ Thêm khoảng cách phía trên.

mb-auto
m = margin
b = bottom
auto = tự động

→ Margin dưới tự động.

px-4
p = padding
x = trái + phải
4 = mức khoảng cách 4

→ Thêm padding trái và phải.

py-2
p = padding
y = trên + dưới
2 = mức khoảng cách 2

→ Thêm padding trên và dưới.

ms-3
m = margin
s = start (trái trong LTR)
3 = mức khoảng cách 3

→ Thêm khoảng cách bên trái.

3. Phân biệt .container, .container-fluid, .container-md
.container
Có chiều rộng cố định theo từng breakpoint.
Tự căn giữa trang.

Ví dụ:

Màn hình lớn → không kéo full chiều ngang
.container-fluid
Luôn chiếm 100% chiều rộng màn hình

Ví dụ:

Chiều rộng luôn full màn hình
.container-md
Dưới md (<768px) → full chiều rộng
Từ md (≥768px) → chuyển sang chiều rộng cố định

Ghi ngắn kiểu thi:

.container: rộng cố định theo breakpoint
.container-fluid: luôn rộng 100%
.container-md: dưới md full width, từ md trở lên cố định.
## CÂU C1
Câu 1: Quy trình đổi $primary sang #E63946

Muốn đổi màu mặc định của Bootstrap cần dùng:

Bootstrap source (SCSS)
SASS compiler (Ví dụ: Live Sass Compiler hoặc Dart Sass)

Các bước:

Cài Bootstrap bằng npm hoặc tải source SCSS
Tạo file:
custom.scss
Override biến trước khi import Bootstrap:
$primary: #E63946;

@import "bootstrap/scss/bootstrap";
Compile:
custom.scss
↓
custom.css
Link file CSS mới vào HTML:
<link rel="stylesheet" href="custom.css">
Câu 2: Tại sao không nên:
.btn-primary{
background:red;
}

Mà nên dùng SASS variables?

Vì:

Không đồng bộ
Chỉ đổi .btn-primary
Các thành phần khác như:
alert-primary
bg-primary
text-primary
border-primary
link-primary

vẫn giữ màu cũ.

Khó bảo trì

Nếu sau này đổi màu:

đỏ → xanh lá

phải sửa nhiều chỗ.

Mất tính kế thừa của Bootstrap

SASS variable:

$primary:#E63946;

sẽ tự cập nhật toàn bộ component dùng primary

## CÂU C2
CSS thuần và Bootstrap có nhiều điểm khác nhau. Với CSS thuần, lập trình viên phải tự viết nhiều mã hơn để tạo giao diện như navbar responsive hoặc product card, thường cần khoảng 50–100 dòng CSS hoặc nhiều hơn. Điều này làm thời gian phát triển lâu hơn nhưng bù lại khả năng tùy biến rất cao vì có thể kiểm soát hoàn toàn giao diện. Ngoài ra, để làm responsive cần tự viết media query.

Trong khi đó, Bootstrap giúp giảm đáng kể số dòng CSS cần viết vì đã cung cấp sẵn các component, grid system và utility classes. Nhờ vậy thời gian phát triển nhanh hơn và việc tạo giao diện responsive trở nên đơn giản hơn. Tuy nhiên, khả năng tùy biến của Bootstrap thấp hơn CSS thuần do phải tuân theo cấu trúc và quy tắc của framework.

Bootstrap nên được sử dụng khi cần phát triển nhanh các dự án như landing page, dashboard hoặc các ứng dụng cần responsive trong thời gian ngắn. Ngược lại, không nên dùng Bootstrap khi dự án yêu cầu giao diện quá đặc thù, cần tối ưu kích thước CSS hoặc muốn kiểm soát chi tiết toàn bộ hệ thống thiết kế.

Khi nào NÊN dùng Bootstrap?
Làm prototype nhanh
Dashboard/Admin
Landing page
Deadline ngắn
Muốn responsive nhanh
Khi nào KHÔNG NÊN dùng Bootstrap?
Giao diện thiết kế quá riêng biệt
Dự án cần tối ưu kích thước CSS
Cần kiểm soát từng chi tiết UI
Muốn tự xây hệ thống thiết kế riêng

## TRACK B — TAILWINDCSS
## CÂU A1
flex → display: flex (hiển thị theo Flexbox)
items-center → align-items: center (căn giữa các phần tử theo trục dọc)
justify-between → justify-content: space-between (đẩy các phần tử ra hai đầu, khoảng cách đều ở giữa)
p-4 → padding: 1rem (16px) (tạo khoảng cách bên trong phần tử)
bg-white → background-color: white (màu nền trắng)
shadow-md → box-shadow: shadow mức trung bình (tạo bóng đổ vừa phải)
rounded-lg → border-radius: 0.5rem (8px) (bo góc lớn)
hover:shadow-xl → khi rê chuột vào (hover) sẽ đổi thành bóng đổ lớn (shadow-xl)
transition-shadow → thêm hiệu ứng chuyển đổi cho thuộc tính shadow
duration-300 → thời gian hiệu ứng là 300ms

Trong thẻ <img>:

w-16 → width: 4rem (64px) (chiều rộng ảnh)
h-16 → height: 4rem (64px) (chiều cao ảnh)
rounded-full → border-radius: 9999px (bo tròn thành hình tròn)
object-cover → object-fit: cover (ảnh phủ kín khung mà không méo)

Trong thẻ <div> chứa nội dung:

ml-4 → margin-left: 1rem (16px) (khoảng cách bên trái)
flex-1 → flex: 1 1 0% (chiếm phần không gian còn lại)

Trong thẻ <h3>:

text-lg → font-size: 1.125rem (18px) (cỡ chữ lớn)
font-semibold → font-weight: 600 (chữ đậm vừa)
text-gray-800 → màu chữ xám đậm
truncate → cắt nội dung dài bằng dấu ... nếu vượt quá kích thước

Trong thẻ <p>:

text-sm → font-size: 0.875rem (14px) (cỡ chữ nhỏ)
text-gray-500 → màu chữ xám trung bình

Trong thẻ <button>:

px-4 → padding-left/right: 1rem (16px)
py-2 → padding-top/bottom: 0.5rem (8px)
bg-blue-500 → nền màu xanh dương
text-white → màu chữ trắng
rounded-md → border-radius: 0.375rem (6px) (bo góc vừa)
hover:bg-blue-600 → khi rê chuột vào sẽ đổi sang xanh đậm hơn
focus:ring-2 → khi được chọn (focus) tạo viền sáng độ dày 2px
focus:ring-blue-300 → màu viền sáng là xanh nhạt (blue-300)
## CÂU A2
1. Giải thích Responsive Prefix

Trong Tailwind, các prefix md:, lg:, xl: được dùng để áp dụng CSS theo kích thước màn hình (responsive design).

md: → áp dụng từ màn hình tablet trở lên (min-width: 768px)
lg: → áp dụng từ màn hình desktop nhỏ trở lên (min-width: 1024px)
xl: → áp dụng từ màn hình desktop lớn trở lên (min-width: 1280px)

Ví dụ:

md:grid-cols-2 lg:grid-cols-4

Ý nghĩa:

Mặc định (mobile): số cột theo cấu hình mặc định hoặc 1 cột
md:grid-cols-2 → từ tablet trở lên hiển thị 2 cột
lg:grid-cols-4 → từ desktop trở lên hiển thị 4 cột

2. Giải thích State Modifiers

State modifiers dùng để thay đổi giao diện khi phần tử ở trạng thái nhất định.

hover: → áp dụng khi rê chuột vào phần tử

Ví dụ:

hover:bg-blue-500

→ khi đưa chuột vào đổi nền thành màu xanh.

focus: → áp dụng khi phần tử được chọn (focus)

Ví dụ:

focus:ring-2

→ khi click vào input hoặc button sẽ xuất hiện viền sáng.

active: → áp dụng khi phần tử đang được nhấn

Ví dụ:

active:scale-95

→ khi nhấn nút sẽ thu nhỏ nhẹ.

group-hover: → thay đổi phần tử con khi phần tử cha được hover

Ví dụ:

<div class="group">
   <p class="group-hover:text-red-500">
      Nội dung
   </p>
</div>

→ khi rê chuột vào div, chữ trong p đổi sang màu đỏ.

3. Class Tailwind cho yêu cầu:

"Ẩn trên mobile, hiện dạng flex trên tablet trở lên"
(tương đương d-none d-md-flex trong Bootstrap)

hidden md:flex

Ý nghĩa:

hidden → ẩn trên mobile
md:flex → từ tablet (768px) trở lên hiển thị dạng flex
## CÂU C1
HTML file size (CSS thuần vs Tailwind HTML)

Với CSS thuần, phần HTML thường ngắn hơn vì chỉ cần gán class:

<div class="product-card">

Phần giao diện sẽ được định nghĩa trong file CSS riêng:

.product-card{
    border-radius:10px;
    box-shadow:...
}

Với Tailwind, không cần file CSS riêng nhưng HTML dài hơn:

<div class="bg-white rounded-lg shadow-md hover:shadow-xl p-4">

So sánh:

CSS thuần → HTML ngắn, CSS dài hơn
Tailwind → HTML dài hơn do nhiều utility classes
Tổng kích thước dự án nhỏ hơn khi Tailwind loại bỏ CSS không dùng (purge)

Maintainability (dễ đọc và dễ sửa)

CSS thuần:

Dễ đọc HTML vì ít class
Khi sửa giao diện phải tìm cả file HTML và CSS
Với dự án lớn dễ xuất hiện CSS dư thừa hoặc xung đột class

Tailwind:

HTML dài hơn nên ban đầu có thể khó đọc
Sửa trực tiếp trên class trong HTML, không cần chuyển file
Hạn chế trùng class và dễ quản lý hơn ở dự án lớn

Ví dụ muốn đổi khoảng cách:

CSS thuần:

.product-card{
    padding:20px;
}

Tailwind:

p-4 → p-6

Chỉ sửa trực tiếp trong HTML.

Reusability (khả năng dùng lại)

CSS thuần:

Tái sử dụng bằng class:
.product-card
.button-primary
Một class có thể áp dụng cho nhiều phần tử

Tailwind:

Có thể copy component trực tiếp
Có thể dùng @apply để gom nhiều utility classes:
.product-card{
   @apply bg-white rounded-lg shadow-md p-4 hover:shadow-xl;
}

So sánh:

CSS thuần → tái sử dụng bằng class truyền thống
Tailwind → tái sử dụng bằng component hoặc @apply
Tailwind linh hoạt hơn khi cần chỉnh sửa nhanh từng thành phần riêng lẻ
## CÂU C2
1. Tại sao file CSS cuối của Tailwind thường nhỏ hơn Bootstrap dù HTML dài hơn?

Mặc dù Tailwind làm file HTML dài hơn vì chứa nhiều utility classes, nhưng file CSS cuối cùng thường nhỏ hơn Bootstrap vì Tailwind chỉ tạo và giữ lại những class thực sự được sử dụng trong dự án.

Bootstrap:

Chứa sẵn rất nhiều component và utility
Bao gồm nhiều CSS có thể không dùng đến
Ví dụ: carousel, modal, tooltip, alert, navbar,...

Tailwind:

Chỉ sinh CSS cho các class xuất hiện trong HTML
CSS không dùng sẽ bị loại bỏ

Vì vậy:

Bootstrap → HTML ngắn nhưng CSS lớn
Tailwind → HTML dài hơn nhưng CSS tối ưu hơn

2. Giải thích Tailwind PurgeCSS (Tailwind JIT)

PurgeCSS hoặc cơ chế JIT (Just In Time) của Tailwind sẽ quét toàn bộ project (HTML, JS, Vue, React,...) để tìm các class được sử dụng.

Ví dụ:

<div class="bg-blue-500 p-4 rounded-lg">

Tailwind chỉ tạo CSS cho:

bg-blue-500
p-4
rounded-lg

Nó loại bỏ:

Các utility class không được dùng
CSS dư thừa
Component không xuất hiện trong project

Ví dụ các class sau sẽ bị xóa nếu không dùng:

bg-red-500
m-10
text-green-700
grid-cols-6

Kết quả:

Giảm kích thước CSS
Tăng tốc độ tải trang
Giảm tài nguyên trình duyệt phải xử lý

3. Khi nào KHÔNG nên dùng TailwindCSS?

Tình huống 1: Dự án nhỏ hoặc trang rất đơn giản

Ví dụ:

Trang giới thiệu cá nhân chỉ có vài phần tử
Landing page đơn giản chỉ gồm văn bản và ảnh

Lý do:

Viết CSS thuần nhanh hơn
Không cần cài đặt và cấu hình Tailwind

Tình huống 2: Dự án có giao diện cố định theo hệ thống thiết kế lớn

Ví dụ:

Website doanh nghiệp đã có bộ class riêng
Hệ thống UI sử dụng CSS/SCSS component có cấu trúc chặt chẽ

Lý do:

HTML có thể quá dài vì nhiều utility classes
Việc quản lý component lớn có thể khó hơn
CSS thuần hoặc SCSS có thể dễ tổ chức hơn

Kết luận:

Tailwind phù hợp với dự án cần phát triển nhanh, responsive và tùy biến cao; không phù hợp khi dự án quá đơn giản hoặc đã có hệ thống CSS riêng ổn định.