## Câu A1 (5đ) — Sync vs Async
Thứ tự output sẽ là:

1 - Start
4 - End
3 - Promise
6 - Promise 2
2 - Timeout 0ms
7 - Nested timeout
5 - Timeout 100ms
Giải thích từng bước
Code:
console.log("1 - Start");

setTimeout(() => console.log("2 - Timeout 0ms"), 0);

Promise.resolve().then(() => console.log("3 - Promise"));

console.log("4 - End");

setTimeout(() => console.log("5 - Timeout 100ms"), 100);

Promise.resolve().then(() => {
    console.log("6 - Promise 2");
    setTimeout(() => console.log("7 - Nested timeout"), 0);
});
1. Chạy Call Stack (đồng bộ trước)

JavaScript luôn chạy code sync trước.

console.log("1 - Start");

→ in:

1 - Start
setTimeout(...0)

Không chạy ngay.

→ đưa callback vào Macrotask Queue

Promise.resolve().then(...)

→ đưa vào Microtask Queue

console.log("4 - End");

→ in:

4 - End
setTimeout(...100)

→ chờ 100ms rồi mới vào Macrotask Queue

Promise.resolve().then(...)

→ thêm vào Microtask Queue

Lúc này:
Call Stack rỗng
Microtask Queue:
3 - Promise
6 - Promise 2
Macrotask Queue:
2 - Timeout 0ms

(Timeout 100ms chưa đủ thời gian)

2. Event Loop xử lý Microtask trước

JavaScript ưu tiên chạy hết Microtask trước Macrotask.

Chạy:
3 - Promise

→ output:

3 - Promise
Chạy tiếp:
6 - Promise 2

→ output:

6 - Promise 2

Trong callback này có:

setTimeout(() => console.log("7 - Nested timeout"), 0);

→ thêm vào Macrotask Queue

Macrotask Queue lúc này:
2 - Timeout 0ms
7 - Nested timeout
3. Chạy Macrotask
Chạy timeout đầu:
2 - Timeout 0ms
Chạy timeout lồng:
7 - Nested timeout
4. Sau 100ms

Timeout cuối đủ thời gian.

5 - Timeout 100ms
Tổng kết Event Loop
Call Stack

Nơi thực thi code hiện tại.

Microtask Queue

Ưu tiên cao hơn.

Thường chứa:

Promise.then()
queueMicrotask()
MutationObserver
Macrotask Queue

Ưu tiên thấp hơn.

Thường chứa:

setTimeout
setInterval
DOM events
Quy tắc cực quan trọng
## Câu A2 (5đ) — Fetch API
Giải thích từng dòng
1. async function getData()
async function getData()
Khai báo hàm bất đồng bộ (asynchronous).
Hàm async:
luôn trả về Promise
cho phép dùng await bên trong
Ví dụ:
async function test() {
    return 123;
}
Thực chất trả về:
Promise.resolve(123)
2. await fetch(...)
const response = await fetch("https://api.example.com/data");
fetch() trả về gì?
fetch() trả về:
Promise<Response>
Tức là một Promise chứa object Response.
Vì sao cần await?
Vì request HTTP cần thời gian:
gửi request
chờ server phản hồi
nhận response
Nếu không await:
const response = fetch(...);
console.log(response);
→ sẽ ra:
Promise { <pending> }
Khi dùng await
const response = await fetch(...);
JavaScript:
tạm dừng hàm async
đợi Promise hoàn thành
lấy object Response
3. response.ok
if (!response.ok)
response.ok là gì?
Là boolean:
true nếu status từ 200 → 299
false nếu ngoài khoảng đó
Khi nào false?
Ví dụ:
Status Code	Ý nghĩa
404	Not Found
401	Unauthorized
500	Internal Server Error
Ví dụ
fetch("/abc")
Nếu server trả:
404 Not Found
thì:
response.ok === false
4. throw new Error(...)
throw new Error(`HTTP ${response.status}`);
Tự tạo lỗi để nhảy xuống catch.
Ví dụ:
HTTP 404
HTTP 500
5. await response.json()
const data = await response.json();
Tại sao cần await lần nữa?
Vì .json() cũng trả về Promise.
Tại sao parse JSON lại async?
Server gửi dữ liệu dạng text:
'{"name":"Chi"}'
Browsercần:
đọc body
parse JSON
chuyển thành object JS
Quá trình này mất thời gian → async.
Nếu không await
const data = response.json();
console.log(data);
→ ra:
Promise { <pending> }
Sau await
const data = await response.json();
→ nhận object thật:
{
   name: "Chi"
}
6. return data
return data;
Trả dữ liệu cho nơi gọi hàm.
7. catch
catch (error)
Bắt lỗi xảy ra trong try.
try...catch bắt những lỗi gì?
✅ 1. Network Error
Ví dụ:
mất mạng
DNS lỗi
server sập
CORS fail
await fetch(...)
sẽ reject Promise.
→ catch bắt được.
✅ 2. JSON Parse Error
Ví dụ server trả:
Hello World
thay vì JSON hợp lệ.
Khi:
await response.json()
→ lỗi parse JSON.
→ catch bắt được.
❌ 3. HTTP 404 / 500 KHÔNG tự động vào catch
Đây là điểm rất quan trọng.
Fetch:
chỉ reject khi lỗi mạng
KHÔNG reject với HTTP errors
Ví dụ:
404 Not Found
vẫn được xem là response hợp lệ.
Nên phải tự kiểm tra:
if (!response.ok)
Flow thực tế
Thành công
fetch → response → json → return data
HTTP 404
fetch thành công
response.ok = false
throw Error
catch chạy
Mất mạng
fetch reject Promise
catch chạy ngay
## Câu A3 (5đ) — Promise States
1. Sơ đồ 3 trạng thái của Promise
                Promise
                   |
                Pending
              /         \
             /           \
      resolve()       reject()
          |                |
          v                v
     Fulfilled         Rejected
Giải thích các trạng thái
State	Ý nghĩa
Pending	Đang chờ xử lý
Fulfilled	Thành công (resolve)
Rejected	Thất bại (reject)
Ví dụ Promise
const promise = new Promise((resolve, reject) => {

    let success = true;

    if (success) {
        resolve("Thành công");
    } else {
        reject("Thất bại");
    }

});
Nếu resolve
Pending → Fulfilled
Nếu reject
Pending → Rejected
Quan trọng

Promise chỉ đổi trạng thái 1 lần duy nhất.

Ví dụ:

resolve();
reject();

→ reject() bị bỏ qua.

2. Callback Hell là gì?
Định nghĩa

Callback Hell là tình trạng:

callback lồng callback
code bị thụt vào quá nhiều
khó đọc
khó debug
khó bảo trì

Còn gọi là:

Pyramid of Doom
Ví dụ Callback Hell (4 cấp)
loginUser(function(user) {

    getProfile(user.id, function(profile) {

        getPosts(profile.id, function(posts) {

            getComments(posts[0].id, function(comments) {

                console.log(comments);

            });

        });

    });

});
Nhược điểm
1. Khó đọc

Code bị lệch phải liên tục.

2. Khó xử lý lỗi

Mỗi callback phải tự xử lý error.

3. Khó maintain

Sửa logic rất cực.

Refactor bằng Promise + async/await
Bước 1 — Các hàm trả Promise
function loginUser() {
    return Promise.resolve({ id: 1 });
}

function getProfile(userId) {
    return Promise.resolve({ id: 10 });
}

function getPosts(profileId) {
    return Promise.resolve([{ id: 100 }]);
}

function getComments(postId) {
    return Promise.resolve(["Good post"]);
}
Bước 2 — Dùng async/await
async function main() {

    try {

        const user = await loginUser();

        const profile = await getProfile(user.id);

        const posts = await getPosts(profile.id);

        const comments = await getComments(posts[0].id);

        console.log(comments);

    } catch (error) {

        console.error(error);

    }

}

main();
So sánh
Callback Hell	Async/Await
Lồng nhiều tầng	Code thẳng
Khó đọc	Dễ đọc
Khó debug	Dễ debug
Error khó xử lý	try...catch
Maintain khó	Maintain dễ
Flow async/await
await loginUser()
        ↓
await getProfile()
        ↓
await getPosts()
        ↓
await getComments()
