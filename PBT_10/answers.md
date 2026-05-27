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
## CÂU C1 :Error Handling Strategy
Error Handling Strategy cho E-Commerce App

Một app E-Commerce thường gọi nhiều APIs:

Products API
Payment API
Auth API
Shipping API
Inventory API

Nếu xử lý lỗi không tốt:

user không checkout được
mất dữ liệu giỏ hàng
spam request server
app treo/loading vô hạn
1. Network Errors (mất mạng)
Ví dụ
mất WiFi
mạng yếu
DNS fail
server unreachable
user chuyển 4G ↔ WiFi giữa chừng
Cách xử lý
UI Strategy
Hiển thị:
Mất kết nối mạng. Vui lòng thử lại.
UX Strategy
giữ dữ liệu cart trong LocalStorage
cho retry request
disable button tạm thời
hiện trạng thái offline
Ví dụ code
async function getProducts(){

    try{

        const response = await fetch(
            "https://api.example.com/products"
        );

        if(!response.ok){

            throw new Error(
                `HTTP ${response.status}`
            );

        }

        return await response.json();

    }
    catch(error){

        // fetch reject -> network error
        console.error("Network Error:", error);

        alert(
            "Mất kết nối mạng. Vui lòng thử lại."
        );

    }

}
Vì sao fetch reject?

Fetch chỉ reject khi:

mất mạng
DNS lỗi
CORS fail
timeout abort
2. API Errors
A. 404 Not Found
Ý nghĩa

Resource không tồn tại.

Ví dụ:

product bị xóa
URL sai
Cách xử lý
UI
Sản phẩm không tồn tại
Code
if(response.status === 404){

    showError(
        "Sản phẩm không tồn tại"
    );

}
B. 500 Internal Server Error
Ý nghĩa

Lỗi phía server.

Ví dụ:

database crash
server bug
backend exception
Cách xử lý
UI
Hệ thống đang bảo trì. Vui lòng thử lại sau.
Không nên

❌ hiện raw error:

SQL ERROR LINE 123...
Code
if(response.status >= 500){

    showError(
        "Server đang gặp sự cố"
    );

}
C. 429 Too Many Requests
Ý nghĩa

User/API bị rate limit.

Ví dụ:

spam search
spam refresh
gửi quá nhiều requests
Cách xử lý
Strategy
delay retry
exponential backoff
disable button tạm thời
UI
Bạn thao tác quá nhanh. Vui lòng thử lại sau vài giây.
Code
if(response.status === 429){

    showError(
        "Too many requests"
    );

}
3. Timeout Handling (>10s)
Vì sao cần timeout?

Mặc định:

fetch KHÔNG có timeout

API treo có thể loading mãi mãi.

fetchWithTimeout
async function fetchWithTimeout(url, ms = 10000){

    const controller =
        new AbortController();

    const timeoutId =
        setTimeout(() => {

            controller.abort();

        }, ms);

    try{

        const response = await fetch(url, {

            signal: controller.signal

        });

        clearTimeout(timeoutId);

        return response;

    }
    catch(error){

        if(error.name === "AbortError"){

            throw new Error(
                "Request timeout"
            );

        }

        throw error;

    }

}
Cách hoạt động
AbortController
controller.abort()

→ hủy request nếu quá thời gian.

Ví dụ dùng
try{

    const response =
        await fetchWithTimeout(
            "https://api.example.com",
            10000
        );

}
catch(error){

    console.error(error.message);

}
4. Retry Logic
Vì sao cần retry?

Network errors đôi khi chỉ:

tạm thời
mạng chập chờn
server overload ngắn hạn

Retry giúp tăng tỉ lệ thành công.

Strategy

Retry:

network errors
timeout
502/503

Không retry:

404
401
validation errors
fetchWithRetry
async function fetchWithRetry(
    url,
    maxRetries = 3
){

    let attempt = 0;

    while(attempt < maxRetries){

        try{

            const response =
                await fetch(url);

            if(!response.ok){

                throw new Error(
                    `HTTP ${response.status}`
                );

            }

            return response;

        }
        catch(error){

            attempt++;

            console.log(
                `Retry lần ${attempt}`
            );

            // hết retry
            if(attempt >= maxRetries){

                throw error;

            }

            // delay trước retry
            await new Promise(resolve =>

                setTimeout(resolve, 1000)

            );

        }

    }

}
Ví dụ dùng
try{

    const response =
        await fetchWithRetry(
            "https://api.example.com",
            3
        );

    const data =
        await response.json();

    console.log(data);

}
catch(error){

    console.error(
        "Fetch failed:",
        error.message
    );

}
5. Exponential Backoff (Best Practice)

Thay vì retry liên tục:

1s
1s
1s

Dùng:

1s
2s
4s
8s
Ví dụ
const delay =
    1000 * Math.pow(2, attempt);
## CÂU C2
Promise.all(): resolve khi tất cả promises thành công, reject khi chỉ cần 1 promise fail, dùng cho dữ liệu phụ thuộc nhau như checkout page.

Promise.allSettled(): resolve khi tất cả promises hoàn tất (success hoặc fail), không reject, dùng cho dashboard/widget độc lập.

Promise.race(): resolve hoặc reject theo promise hoàn thành đầu tiên, dùng cho timeout hoặc lấy response nhanh nhất.

Promise.any(): resolve khi có promise đầu tiên thành công, reject khi tất cả promises đều fail, dùng cho fallback servers hoặc multi-CDN.

1. Promise.all()
Cách hoạt động
ALL success
→ resolve

1 fail
→ reject ngay
Khi dùng?

Khi:

tất cả dữ liệu đều bắt buộc
thiếu 1 cái là không render được
Scenario thực tế
E-Commerce Checkout Page

Cần:

user info
cart
payment methods

Nếu thiếu 1 API:
→ không checkout được.

Ví dụ code
async function loadCheckoutPage(){

    try{

        const [
            user,
            cart,
            paymentMethods
        ] = await Promise.all([

            fetch("/api/user")
                .then(r => r.json()),

            fetch("/api/cart")
                .then(r => r.json()),

            fetch("/api/payment-methods")
                .then(r => r.json())

        ]);

        console.log("User:", user);

        console.log("Cart:", cart);

        console.log(
            "Payment:",
            paymentMethods
        );

    }
    catch(error){

        console.error(
            "Checkout load failed"
        );

    }

}
Nếu 1 API fail

Ví dụ:

payment-methods → 500

→ toàn bộ .all() reject ngay.

Ưu điểm

✅ nhanh hơn fetch tuần tự

Nhược điểm

❌ 1 fail → fail toàn bộ

2. Promise.allSettled()
Cách hoạt động
Đợi TẤT CẢ promises xong
(success hoặc fail)
Không reject

Kết quả trả về:

[
   { status: "fulfilled", value: ... },

   { status: "rejected", reason: ... }
]
Khi dùng?

Khi:

APIs độc lập
1 API lỗi không được ảnh hưởng phần khác
Scenario thực tế
Dashboard

Widget:

weather
news
stocks
crypto

Weather fail:
→ crypto vẫn hiển thị.

Ví dụ code
async function loadDashboard(){

    const results =
        await Promise.allSettled([

            fetch("/api/weather")
                .then(r => r.json()),

            fetch("/api/news")
                .then(r => r.json()),

            fetch("/api/stocks")
                .then(r => r.json())

        ]);


    results.forEach((result,index) => {

        if(result.status === "fulfilled"){

            console.log(
                `Widget ${index} success`
            );

        }
        else{

            console.log(
                `Widget ${index} failed`
            );

        }

    });

}
Ưu điểm

✅ fail riêng lẻ
✅ phù hợp dashboard

Nhược điểm

❌ phải tự xử lý từng kết quả

3. Promise.race()
Cách hoạt động
Promise nào xong đầu tiên
→ lấy kết quả đó

Có thể:

resolve đầu tiên
reject đầu tiên
Khi dùng?

Khi:

cần timeout
cần response nhanh nhất
Scenario thực tế
Timeout API

Nếu API > 5s:
→ tự timeout.

Ví dụ code
async function fetchWithTimeout(){

    const apiRequest =
        fetch("/api/products");

    const timeout =
        new Promise((_,reject) => {

            setTimeout(() => {

                reject(
                    new Error("Timeout")
                );

            },5000);

        });

    return Promise.race([
        apiRequest,
        timeout
    ]);

}
Nếu API nhanh
fetch resolve trước

→ thành công.

Nếu API chậm
timeout reject trước

→ reject.

Use case khác
CDN nhanh nhất
CDN US
CDN Asia
CDN Europe

Lấy server phản hồi nhanh nhất.

4. Promise.any()
Cách hoạt động
Promise đầu tiên SUCCESS
→ resolve

Khác race:

bỏ qua reject
chỉ quan tâm success đầu tiên
Reject khi nào?
TẤT CẢ promises đều fail
Khi dùng?

Khi:

có nhiều fallback servers
chỉ cần 1 server sống
Scenario thực tế
Multi-CDN Image Loader  

Ảnh nằm ở: 

CDN A
CDN B
CDN C

Chỉ cần 1 CDN hoạt động.

Ví dụ code
async function loadAvatar(){

    try{

        const response =
            await Promise.any([

                fetch(
                    "https://cdn1.com/avatar.jpg"
                ),

                fetch(
                    "https://cdn2.com/avatar.jpg"
                ),

                fetch(
                    "https://cdn3.com/avatar.jpg"
                )

            ]);

        console.log(
            "Loaded from fastest working CDN"
        );

        return response;

    }
    catch(error){

        console.error(
            "All CDNs failed"  
        );

    }

}    .
Nếu:
CDN	Kết quả
CDN1	fail
CDN2	fail
CDN3	success

→ Promise.any() vẫn resolve.

Nếu tất cả fail

→ reject với:

AggregateError