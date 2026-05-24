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