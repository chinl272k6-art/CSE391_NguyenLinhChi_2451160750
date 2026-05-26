## CÂU A1-DOM Tree
1. Sơ đồ cây
div#app
├── header
│   ├── h1
│   │   └── "Todo App"
│   │
│   └── nav
│       ├── a.active
│       │   └── "All"
│       ├── a
│       │   └── "Active"
│       └── a
│           └── "Completed"
│
└── main
    ├── form#todoForm
    │   ├── input#todoInput
    │   └── button
    │       └── "Add"
    │
    └── ul#todoList
        ├── li.todo-item
        │   └── "Learn HTML"
        │
        └── li.todo-item.completed
            └── "Learn CSS"
2. QuerySelector cho từng yêu cầu

Chọn thẻ <h1>

document.querySelector("h1");

Chọn input trong form

document.querySelector("#todoForm input");

Chọn tất cả .todo-item

document.querySelectorAll(".todo-item");

Chọn link đang active

document.querySelector("a.active");

Chọn <li> đầu tiên trong #todoList

document.querySelector("#todoList li:first-child");

Chọn tất cả <a> bên trong <nav>

document.querySelectorAll("nav a");            
## CÂU A2-innerHTML vs textContent
1. Sự khác nhau
    innerHTML	
- Đọc hoặc ghi nội dung dưới dạng HTML	
- Các thẻ HTML sẽ được trình duyệt phân tích	
- Có thể thêm phần tử HTML mới	
- Có nguy cơ bảo mật XSS nếu dùng dữ liệu từ người dùng
    textContent
- Các thẻ HTML sẽ được trình duyệt phân tích	HTML không được phân tích
- HTML không được phân tích
- Chỉ hiển thị chữ
- An toàn hơn khi hiển thị dữ liệu người dùng
Ví dụ khi dùng

Dùng innerHTML khi muốn chèn HTML:

document.querySelector("#box").innerHTML =
"<h2>Xin chào</h2><p>Chào mừng bạn!</p>";

Kết quả:

Xin chào
Chào mừng bạn!

Dùng textContent khi chỉ muốn hiển thị văn bản:

document.querySelector("#box").textContent =
"<h2>Xin chào</h2>";

Kết quả hiển thị:

<h2>Xin chào</h2>

Trình duyệt sẽ không tạo thẻ <h2> mà chỉ hiển thị nguyên chuỗi.

2. Câu hỏi bảo mật: Tại sao innerHTML gây lỗ hổng XSS?

XSS (Cross-Site Scripting) xảy ra khi dữ liệu do người dùng nhập vào được trình duyệt xử lý như mã HTML hoặc JavaScript.

Ví dụ:

// User nhập:
<img src=x onerror="alert('Hacked!')">

const userInput =
document.querySelector("#search").value;

document.querySelector("#result").innerHTML =
userInput;

Vấn đề:

innerHTML sẽ coi chuỗi nhập vào là HTML
Trình duyệt tạo thẻ <img>
Vì ảnh x không tồn tại nên onerror chạy
alert('Hacked!') được thực thi

=> Người khác có thể chèn mã độc, đánh cắp thông tin hoặc thay đổi nội dung trang.

Cách sửa

Dùng textContent:

const userInput =
document.querySelector("#search").value;

document.querySelector("#result").textContent =
userInput;

Lúc này:

<img src=x onerror="alert('Hacked!')">

chỉ được hiển thị như văn bản bình thường, không chạy mã JavaScript.
## Câu A3 (5đ) — Event Bubbling
Khi click vào button, sự kiện xảy ra ở phần tử được click trước rồi nổi bọt (bubbling) lên phần tử cha.
Thứ tự:
button → inner → outer
Code:
document.querySelector("#outer").addEventListener("click", () => {
    console.log("OUTER");
});

document.querySelector("#inner").addEventListener("click", () => {
    console.log("INNER");
});

document.querySelector("#btn").addEventListener("click", (e) => {
    console.log("BUTTON");
});
Output khi click button:
BUTTON
INNER
OUTER
Giải thích:
Click xảy ra ở #btn → in "BUTTON"
Sau đó event nổi lên #inner → in "INNER"
Tiếp tục nổi lên #outer → in "OUTER"
Nếu bỏ comment:
e.stopPropagation();
Code:
document.querySelector("#btn").addEventListener("click", (e) => {
    console.log("BUTTON");
    e.stopPropagation();
});
Output:
BUTTON
Giải thích:
stopPropagation() chặn sự kiện tiếp tục nổi lên phần tử cha, nên INNER và OUTER sẽ không chạy.