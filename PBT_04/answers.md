## CÂU A1
Position	Vẫn chiếm chỗ trong flow? Tham chiếu vị trí	                Cuộn theo trang? Use case
static	    Có	                      Theo flow bình thường của trang	    Có	         Layout mặc định
relative	Có	                      So với vị trí ban đầu của chính nó	Có	         Dịch nhẹ phần tử, làm mốc cho abs
absolute	Không	                  So với phần tử cha gần nhất có        Có	         Popup nhỏ, badge, icon góc
                                      position khác static	
fixed	    Không	                  So với cửa sổ trình duyệt (viewport)	Không	     Nút chat, menu cố định
sticky	    Có	                      Ban đầu theo flow,                    Một phần	Thanh menu dính khi cuộn
                                      sau đó dính theo viewport	
Khi nào absolute tham chiếu body?
Khi không có phần tử cha nào có position là:
 relative
 absolute
 fixed
 sticky
thì nó sẽ tham chiếu tới body (hoặc viewport).   
## CÂU A2
Trường hợp 1
.container { display: flex; }
.item { flex: 1; }
display: flex → các item nằm trên cùng 1 hàng
flex: 1 → chia đều chiều rộng
4 items → bố cục:
| 1 | 2 | 3 | 4 |
1 hàng
4 cột bằng nhau
Trường hợp 2
.container { display: flex; flex-wrap: wrap; }
.item { width: 45%; margin: 2.5%; }
flex-wrap: wrap → hết chỗ sẽ xuống hàng
Mỗi item:
width = 45%
margin trái/phải tổng ≈ 5%
→ mỗi item chiếm khoảng 50%

=> mỗi hàng chứa được 2 item

6 items → bố cục:
| 1 | 2 |
| 3 | 4 |
| 5 | 6 |
3 hàng
2 cột
Trường hợp 3
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
Ý nghĩa:
space-between
→ item đầu sát trái
→ item cuối sát phải
→ item giữa nằm giữa với khoảng cách đều
align-items: center
→ căn giữa theo trục dọc
3 items → bố cục:
|1               2               3|

Nếu container cao:

-------------------------
                         
1         2            3
                         
-------------------------
cùng 1 hàng
căn giữa theo chiều dọc
Trường hợp 4
.container {
  display: grid;
  grid-template-columns: 200px 1fr 200px;
  gap: 20px;
}
Ý nghĩa:

Grid có 3 cột:

cột 1 = 200px
cột 2 = chiếm phần còn lại (1fr)
cột 3 = 200px
3 items → bố cục:
|  item1  |     item2     |  item3  |
| 200px   | flexible width| 200px   |
1 hàng
3 cột
cột giữa co giãn
Trường hợp 5
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}
Ý nghĩa:
Grid có 3 cột bằng nhau
Item tự động xuống hàng
7 items → bố cục:
| 1 | 2 | 3 |
| 4 | 5 | 6 |
| 7 |

Hoặc:

| 1 | 2 | 3 |
| 4 | 5 | 6 |
| 7 |   |   |
3 hàng
3 cột
item 7 nằm:
hàng 3
cột 1
2 ô cuối hàng 3 trống                                   