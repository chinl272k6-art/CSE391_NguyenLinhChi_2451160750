## CÂU A1
Đoạn 1
console.log(x);
var x = 5;
Dự đoán output
undefined
Giải thích
var được hoisting (đưa lên đầu phạm vi).
Thực tế JavaScript hiểu gần như:
var x;
console.log(x);
x = 5;
Biến tồn tại nhưng chưa có giá trị nên in ra undefined.
Đoạn 2
console.log(y);
let y = 10;
Dự đoán output
ReferenceError
Giải thích
let cũng được hoisting nhưng rơi vào Temporal Dead Zone (TDZ).
Không được sử dụng biến trước khi khai báo.

Lỗi kiểu:

ReferenceError: Cannot access 'y' before initialization
Đoạn 3
const z = 15;
z = 20;
console.log(z);
Dự đoán output
TypeError
Giải thích
const không cho phép gán lại giá trị.
Dòng:
z = 20;

gây lỗi ngay lập tức.

Lỗi thường là:

TypeError: Assignment to constant variable.
Đoạn 4
const arr = [1, 2, 3];
arr.push(4);
console.log(arr);
Dự đoán output
[1, 2, 3, 4]
Giải thích
const không cho đổi sang mảng khác:
arr = [5,6];

mới lỗi.

Nhưng vẫn được phép thay đổi nội dung bên trong mảng/object.
Đoạn 5
let a = 1;

{
    let a = 2;
    console.log("Trong block:", a);
}

console.log("Ngoài block:", a);
Dự đoán output
Trong block: 2
Ngoài block: 1
Giải thích
let có block scope.
Biến a bên trong {} là biến khác với a bên ngoài.
Các kết quả “bất ngờ”
1. var in ra undefined

Nhiều người tưởng sẽ báo lỗi, nhưng do hoisting nên biến đã tồn tại trước khi chạy console.log.

2. let lại báo lỗi

Khác với var, let bị TDZ nên không thể dùng trước khai báo.

3. const vẫn sửa được mảng

const chỉ khóa tham chiếu của biến, không khóa dữ liệu bên trong object/array.
##  Câu A2 (5đ) — Data Types & Coercion
console.log(typeof null);        // "object"
console.log(typeof undefined);   // "undefined"
console.log(typeof NaN);         // "number"

console.log("5" + 3);           // "53"
console.log("5" - 3);           // 2
console.log("5" * "3");         // 15

console.log(true + true);       // 2

console.log([] + []);           // ""
console.log([] + {});           // "[object Object]"
console.log({} + []);           // 0
Giải thích từng dòng
1.
typeof null
Kết quả
"object"
Giải thích

Đây là “bug lịch sử” của JavaScript từ phiên bản đầu tiên và vẫn giữ để tránh phá vỡ code cũ.

2.
typeof undefined
Kết quả
"undefined"

Vì undefined là kiểu dữ liệu riêng.

3.
typeof NaN
Kết quả
"number"

NaN nghĩa là:

Not a Number

nhưng bản chất vẫn thuộc kiểu number.

Ví dụ:

0 / 0

trả về NaN.

Vì sao "5" + 3 khác "5" - 3?
4.
"5" + 3
Kết quả
"53"
Giải thích

Toán tử + khi gặp chuỗi sẽ ưu tiên nối chuỗi.

JavaScript ép:

3 -> "3"

nên:

"5" + "3" = "53"
5.
"5" - 3
Kết quả
2
Giải thích

Toán tử - không dùng để nối chuỗi nên JavaScript ép chuỗi thành số:

"5" -> 5

rồi tính:

5 - 3 = 2
6.
"5" * "3"
Kết quả
15

* cũng ép kiểu sang số:

5 * 3
7.
true + true
Kết quả
2

Vì:

true -> 1

nên:

1 + 1 = 2
8.
[] + []
Kết quả
""

Hai mảng rỗng chuyển thành chuỗi rỗng:

"" + "" = ""
9.
[] + {}
Kết quả
"[object Object]"
[] → ""
{} → "[object Object]"

nên:

"" + "[object Object]"
10.
{} + []
Kết quả thường thấy
0
Giải thích

JavaScript có thể hiểu:

{}

là block rỗng, còn:

+[]

thì:

[] -> ""
"" -> 0

nên ra:

0

 Dòng này phụ thuộc môi trường chạy (browser console, Node.js...) nên đôi lúc có thể khác.

File kiểm tra
console.log(typeof null);
console.log(typeof undefined);
console.log(typeof NaN);

console.log("5" + 3);
console.log("5" - 3);
console.log("5" * "3");

console.log(true + true);

console.log([] + []);
console.log([] + {});
console.log({} + []);
## Câu A3 (5đ) — So sánh == vs ===
console.log(5 == "5");          // true
console.log(5 === "5");         // false

console.log(null == undefined); // true
console.log(null === undefined);// false

console.log(NaN == NaN);        // false

console.log(0 == false);        // true
console.log(0 === false);       // false

console.log("" == false);       // true
Giải thích từng dòng
1.
5 == "5"
Kết quả
true
Vì sao?
== cho phép ép kiểu.
JavaScript đổi:
"5" -> 5
rồi so sánh:
5 == 5
2.
5 === "5"
Kết quả
false
Vì sao?
=== so sánh:
giá trị
và kiểu dữ liệu
Ở đây:
5        // number
"5"      // string
khác kiểu nên false.
3.
null == undefined
Kết quả
true
Vì sao?
JavaScript có quy tắc đặc biệt:
null chỉ bằng undefined khi dùng ==
4.
null === undefined
Kết quả
false
Vì sao?
Khác kiểu:
null       // object đặc biệt
undefined  // undefined
5.
NaN == NaN
Kết quả
false
Vì sao?
NaN là giá trị đặc biệt:
NaN không bằng bất kỳ giá trị nào,
kể cả chính nó.
Muốn kiểm tra NaN:
Number.isNaN(value)
6.
0 == false
Kết quả
true
Vì sao?
false bị ép thành:
0
nên:
0 == 0
7.
0 === false
Kết quả
false
Vì sao?
Khác kiểu:
0         // number
false     // boolean
8.
"" == false
Kết quả
true
Vì sao?
JavaScript ép kiểu:
"" -> 0
false -> 0
nên:
0 == 0
Nên dùng == hay ===?
Nên dùng:
===
Vì sao?
===:
không ép kiểu
kết quả rõ ràng
tránh bug khó hiểu
Ví dụ:
0 == false     // true
"" == false    // true
rất dễ gây lỗi logic.
Quy tắc thực tế
Dùng:
===
gần như mọi trường hợp.
Chỉ dùng:
==
khi bạn hiểu rõ quy tắc ép kiểu và cố tình dùng nó.
## Câu A4 (5đ) — Truthy & Falsy
Tất cả giá trị Falsy trong JavaScript
Các giá trị sau khi chuyển sang boolean sẽ thành false:
false
0
-0
0n
""
null
undefined
NaN
 Ngoài những giá trị trên, hầu hết còn lại đều là truthy.
Dự đoán kết quả
1.
if ("0") console.log("A");
Kết quả
In A
Vì sao?
"0"
là chuỗi KHÔNG rỗng → truthy.
2.
if ("") console.log("B");
Kết quả
Không in
Vì sao?
Chuỗi rỗng:
""
là falsy.
3.
if ([]) console.log("C");
Kết quả
In C
Vì sao?
Mảng rỗng vẫn là object → truthy.
4.
if ({}) console.log("D");
Kết quả
In D
Vì sao?
Object rỗng vẫn là truthy.
5.
if (null) console.log("E");
Kết quả
Không in
Vì sao?
null là falsy.
6.
if (0) console.log("F");
Kết quả
Không in
Vì sao?
0 là falsy.
7.
if (-1) console.log("G");
Kết quả
In G
Vì sao?
Chỉ:
0 và -0
mới falsy.
Số âm khác vẫn truthy.
8.
if (" ") console.log("H");
Kết quả
In H
Vì sao?
" "
không phải chuỗi rỗng.
Nó chứa 1 dấu cách nên vẫn là truthy.
## Câu A5 (5đ) — Template Literals
Cách 1
Code cũ
var greeting = "Xin chào " + name + "! Bạn " + age + " tuổi.";
Viết bằng template literal
var greeting = `Xin chào ${name}! Bạn ${age} tuổi.`;
Cách 2
Code cũ
var url = "https://api.example.com/users/" + userId + "/orders?page=" + page;
Viết bằng template literal
var url = `https://api.example.com/users/${userId}/orders?page=${page}`;
Cách 3
Code cũ
var html = "<div class=\"card\">" +
    "<h2>" + title + "</h2>" +
    "<p>" + description + "</p>" +
    "<span>Giá: " + price + "đ</span>" +
    "</div>";
Viết bằng template literal
var html = `
<div class="card">
    <h2>${title}</h2>
    <p>${description}</p>
    <span>Giá: ${price}đ</span>
</div>
`;
Ưu điểm của Template Literal
1. Dễ đọc hơn
Không cần:
+
liên tục.
2. Hỗ trợ xuống dòng trực tiếp
Đặc biệt hữu ích khi viết HTML.
3. Chèn biến dễ dàng
Dùng:
${variable}

## Câu C1 (10đ) — Debug JavaScript
Các lỗi trong code
Lỗi 1 — Dùng = thay vì ===
Code lỗi
if (giaSauGiam = 0)
Vấn đề

= là phép gán, không phải so sánh.

Dòng này:

giaSauGiam = 0

sẽ:

gán giaSauGiam thành 0
điều kiện nhận giá trị 0
0 là falsy nên if luôn false
Cách sửa
if (giaSauGiam === 0)
Lỗi 2 — giaBan truyền vào là string
Code
tinhGiaGiamGia("100000", 20)
Vấn đề
"100000"

là string, không phải number.

JavaScript vẫn ép kiểu được nhưng dễ gây bug.

Cách sửa

Nên truyền number:

tinhGiaGiamGia(100000, 20)

hoặc ép kiểu trong function:

giaBan = Number(giaBan)
Lỗi 3 — Thiếu kiểm tra dữ liệu đầu vào
Vấn đề

Nếu:

giaBan = "abc"

thì phép tính sẽ ra:

NaN
Cách sửa

Kiểm tra kiểu dữ liệu:

if (isNaN(giaBan) || isNaN(phanTramGiam)) {
    return "Dữ liệu không hợp lệ"
}
Lỗi 4 — Thiếu dấu ;
Ví dụ
return "Phần trăm giảm không hợp lệ"
Vấn đề

JavaScript vẫn chạy do ASI (Automatic Semicolon Insertion), nhưng dễ gây lỗi trong project lớn.

Cách sửa
return "Phần trăm giảm không hợp lệ";
Lỗi 5 — Dùng var trong vòng lặp với setTimeout
Code lỗi
for (var i = 0; i < 5; i++) {
    setTimeout(function() {
        console.log("Item " + i)
    }, 1000)
}
Đây là lỗi "ẩn"
Kết quả thực tế

Sau 1 giây sẽ in:

Item 5
Item 5
Item 5
Item 5
Item 5
Vì sao?

var có:

function scope

Toàn bộ callback trong setTimeout dùng chung 1 biến i.

Khi callback chạy:

vòng lặp đã kết thúc

nên:

i = 5
Cách sửa bằng let
for (let i = 0; i < 5; i++) {
    setTimeout(function() {
        console.log("Item " + i);
    }, 1000);
}
Vì sao let sửa được?

let có:

block scope

Mỗi vòng lặp tạo ra một biến i riêng.

Lỗi 6 — Function có thể trả về nhiều kiểu dữ liệu
Hiện tại

Có lúc trả:

string

Có lúc trả:

number

Ví dụ:

return "Phần trăm giảm không hợp lệ"

và:

return giaSauGiam
Vấn đề

Dễ gây bug khi xử lý tiếp.

Cách sửa tốt hơn

Có thể:

throw Error
hoặc luôn trả object

Ví dụ:

return {
    success: false,
    message: "Phần trăm giảm không hợp lệ"
}
Code sửa hoàn chỉnh

function tinhGiaGiamGia(giaBan, phanTramGiam) {

    giaBan = Number(giaBan);
    phanTramGiam = Number(phanTramGiam);

    if (isNaN(giaBan) || isNaN(phanTramGiam)) {
        return "Dữ liệu không hợp lệ";
    }

    if (phanTramGiam < 0 || phanTramGiam > 100) {
        return "Phần trăm giảm không hợp lệ";
    }

    let giamGia = giaBan * phanTramGiam / 100;
    let giaSauGiam = giaBan - giamGia;

    if (giaSauGiam === 0) {
        console.log("Sản phẩm miễn phí!");
    }

    return giaSauGiam;
}

// Test
const gia = tinhGiaGiamGia(100000, 20);
console.log("Giá sau giảm: " + gia + "đ");

const gia2 = tinhGiaGiamGia(50000, 110);
console.log("Giá: " + gia2);

// Sửa var -> let
for (let i = 0; i < 5; i++) {
    setTimeout(function () {
        console.log("Item " + i);
    }, 1000);
}   
