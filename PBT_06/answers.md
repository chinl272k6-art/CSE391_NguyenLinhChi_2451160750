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