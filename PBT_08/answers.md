## Câu A1 (5đ) — Function Declaration vs Expression vs Arrow
1. Function Declaration
function tinhThueBaoHiem(luong) {

    let thue = 0;

    if (luong > 11000000) {
        thue = luong * 0.1;
    }

    return {
        thue: thue,
        thuc_nhan: luong - thue
    };
}
2. Function Expression
const tinhThueBaoHiem2 = function(luong) {

    let thue = 0;

    if (luong > 11000000) {
        thue = luong * 0.1;
    }

    return {
        thue: thue,
        thuc_nhan: luong - thue
    };
};
3. Arrow Function
const tinhThueBaoHiem3 = (luong) => {

    let thue = 0;

    if (luong > 11000000) {
        thue = luong * 0.1;
    }

    return {
        thue: thue,
        thuc_nhan: luong - thue
    };
};
Ví dụ chạy
console.log(tinhThueBaoHiem(15000000));

console.log(tinhThueBaoHiem2(15000000));

console.log(tinhThueBaoHiem3(15000000));
Output
{
    thue: 1500000,
    thuc_nhan: 13500000
}
Hoisting khác nhau như thế nào?
1. Function Declaration
Có hoisting hoàn chỉnh
Ví dụ
hello();

function hello() {
    console.log("Xin chào");
}
Kết quả
Xin chào
Vì sao?

Function Declaration được hoisting toàn bộ:

tên hàm
và nội dung hàm

JavaScript hiểu gần như:

function hello() {
    console.log("Xin chào");
}

hello();
2. Function Expression
Không hoisting function
Ví dụ
hello();

const hello = function() {
    console.log("Xin chào");
};
Kết quả
ReferenceError
Vì sao?

Chỉ biến:

hello

được hoisting.

Nhưng giá trị function chưa được gán.

3. Arrow Function
Hoisting giống Function Expression
Ví dụ
hello();

const hello = () => {
    console.log("Xin chào");
};
Kết quả
ReferenceError
## Câu A2 (5đ) — Scope & Closure
Đoạn 1: Dự đoán output
function counter() {
    let count = 0;
    return {
        increment: () => ++count,
        decrement: () => --count,
        getCount: () => count
    };
}
const c = counter();

console.log(c.increment());  
console.log(c.increment());  
console.log(c.increment());  
console.log(c.decrement());  
console.log(c.getCount());   

Output:

1
2
3
2
2

Giải thích:

Khi gọi counter(), biến count được tạo và khởi tạo bằng 0.
increment(), decrement(), getCount() đều là closure, nghĩa là chúng vẫn giữ quyền truy cập vào biến count dù hàm counter() đã chạy xong.
Quá trình:
Lệnh	      count mới	Output
c.increment()	1	    1
c.increment()	2	    2
c.increment()	3	    3
c.decrement()	2	    2
c.getCount()	2	    2
Đoạn 2: Dự đoán output
for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log("var:", i), 100);
}

for (let j = 0; j < 3; j++) {
    setTimeout(() => console.log("let:", j), 200);
}

Output sau khoảng 200ms:

var: 3
var: 3
var: 3

let: 0
let: 1
let: 2
Giải thích chi tiết: Tại sao var và let cho kết quả khác nhau?

setTimeout() không chạy ngay mà đưa hàm vào hàng đợi để thực hiện sau một khoảng thời gian.

Trường hợp var
for (var i = 0; i < 3; i++)

var có function scope, nên cả vòng lặp chỉ dùng một biến i duy nhất.

Khi vòng lặp kết thúc:

i = 3

Sau 100ms, các setTimeout mới thực thi và tất cả đều đọc cùng một biến i, nên:

var: 3
var: 3
var: 3
Trường hợp let
for (let j = 0; j < 3; j++)

let có block scope, và mỗi lần lặp sẽ tạo một bản sao biến j riêng:

Lần 1 → j = 0
Lần 2 → j = 1
Lần 3 → j = 2

Mỗi setTimeout giữ closure của biến riêng nó, nên:

let: 0
let: 1
let: 2
## Câu A3 (5đ) — Array Methods
const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// 1. Lấy các số chẵn
const evenNums = nums.filter(n => n % 2 === 0);

// [2, 4, 6, 8, 10]

// 2. Nhân mỗi số với 3
const multiplyBy3 = nums.map(n => n * 3);

// [3, 6, 9, 12, 15, 18, 21, 24, 27, 30]

// 3. Tính tổng tất cả
const total = nums.reduce((sum, n) => sum + n, 0);

// 55

// 4. Tìm số đầu tiên > 7
const firstGreaterThan7 = nums.find(n => n > 7);

// 8

// 5. Kiểm tra CÓ số > 10 không
const hasGreaterThan10 = nums.some(n => n > 10);

// false

// 6. Kiểm tra TẤT CẢ đều > 0
const allGreaterThan0 = nums.every(n => n > 0);

// true

// 7. Tạo mảng "Số X là [chẵn/lẻ]"
const numberType = nums.map(
    n => `Số ${n} là ${n % 2 === 0 ? 'chẵn' : 'lẻ'}`
);

// ["Số 1 là lẻ", "Số 2 là chẵn", ...]

// 8. Đảo ngược mảng (không mutate gốc)
const reversed = [...nums].reverse();

// [10, 9, 8, ..., 1]

Array methods đã dùng:

filter() → lọc phần tử
map() → biến đổi từng phần tử
reduce() → gộp thành một giá trị
find() → tìm phần tử đầu tiên thỏa điều kiện
some() → kiểm tra có ít nhất một phần tử đúng
every() → kiểm tra tất cả phần tử đúng
reverse() + spread (...) → đảo mảng nhưng không thay đổi mảng gốc
## Câu A4 (5đ) — Object Destructuring & Spread
Dự đoán output
const product = {
    name: "iPhone 16",
    price: 25990000,
    specs: { ram: 8, storage: 256, color: "Titan" }
};
// Destructuring
const { name, price, specs: { ram, color } } = product;
console.log(name, price, ram, color);
console.log(specs);
// Spread
const updated = { ...product, price: 23990000, sale: true };
console.log(updated.price);
console.log(updated.sale);
console.log(product.price);
// Spread gotcha
const copy = { ...product };
copy.specs.ram = 16;
console.log(product.specs.ram);
Output:
iPhone 16 25990000 8 Titan
ReferenceError: specs is not defined
23990000
true
25990000
16
Giải thích chi tiết
1. Destructuring
const { name, price, specs: { ram, color } } = product;
Dòng này lấy:
name = "iPhone 16"
price = 25990000
ram = 8
color = "Titan"
Nên:
console.log(name, price, ram, color);
Kết quả:
iPhone 16 25990000 8 Titan
2. Tại sao console.log(specs) lỗi?
Trong destructuring:
specs: { ram, color }
ta chỉ lấy các thuộc tính bên trong specs, chứ không tạo biến tên specs.
Vì vậy:
console.log(specs);
sẽ báo:
ReferenceError: specs is not defined
Nếu muốn dùng cả specs:
const { specs, specs:{ram,color} } = product;
3. Spread operator
const updated = {
    ...product,
    price:23990000,
    sale:true
}
Spread sao chép thuộc tính của product, sau đó:
price bị ghi đè thành 23990000
thêm sale: true
Kết quả:
console.log(updated.price);
→
23990000
console.log(updated.sale);
→
true
console.log(product.price);
→
25990000
Object gốc không đổi.
4. Spread gotcha (bẫy thường gặp)
const copy = { ...product };
copy.specs.ram = 16;
Nhiều người nghĩ spread sẽ copy toàn bộ sâu (deep copy), nhưng thực tế:
{...product}
chỉ là shallow copy.
Nó tạo object mới ở cấp đầu:
copy !== product
Nhưng object lồng bên trong:
copy.specs === product.specs
vẫn cùng tham chiếu tới một vùng nhớ.
Nên khi:
copy.specs.ram = 16;
thì:
product.specs.ram
cũng đổi thành:
16
Output:
16
## Câu C1 (10đ) — Refactor Code
Phiên bản refactor ≤ 10 dòng, dùng filter, map, sort, destructuring, arrow function:

const processOrders = orders =>
    orders
        .filter(({ status, total }) =>
            status === "completed" && total > 100000
        )
        .map(({ id, customer, total }) => ({
            id,
            customer,
            total,
            discount: total * 0.1,
            finalTotal: total - total * 0.1
        }))
        .sort((a, b) => b.finalTotal - a.finalTotal);

Giải thích:

filter() → lọc đơn hàng có:
status === "completed"
total > 100000
map() → tạo object mới:
dùng destructuring lấy id, customer, total
tính:
discount = total × 10%
finalTotal = total − discount
sort() → sắp xếp giảm dần theo finalTotal
b.finalTotal - a.finalTotal

Nếu b > a thì b đứng trước → thứ tự giảm dần.
## Câu C2 (10đ) — Thiết kế API
Cài đặt miniArray không dùng built-in map(), filter(), reduce():

const miniArray = {
    map(arr, fn) {
        const result = [];
        for (let i = 0; i < arr.length; i++) {
            result.push(fn(arr[i], i, arr));
        }
        return result;
    },

    filter(arr, fn) {
        const result = [];
        for (let i = 0; i < arr.length; i++) {
            if (fn(arr[i], i, arr)) {
                result.push(arr[i]);
            }
        }
        return result;
    },

    reduce(arr, fn, initialValue) {
        let accumulator = initialValue;

        for (let i = 0; i < arr.length; i++) {
            accumulator = fn(accumulator, arr[i], i, arr);
        }

        return accumulator;
    }
};

// Test
console.log(miniArray.map([1,2,3], x => x * 2));
// → [2,4,6]

console.log(miniArray.filter([1,2,3,4], x => x > 2));
// → [3,4]

console.log(miniArray.reduce([1,2,3,4], (a,b) => a+b, 0));
// → 10

Giải thích:

map()
Duyệt từng phần tử bằng for
Gọi callback fn()
Lưu kết quả mới vào result
filter()
Duyệt từng phần tử
Nếu điều kiện trả về true thì thêm vào mảng mới
reduce()
Dùng accumulator để tích lũy giá trị
Mỗi lần lặp cập nhật:
accumulator = fn(accumulator, arr[i])

Ví dụ:

[1,2,3,4]

quá trình:

0+1 = 1
1+2 = 3
3+3 = 6
6+4 = 10

Kết quả cuối:

10