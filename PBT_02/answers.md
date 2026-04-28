## CÂU A1-Input Types (10 loại)
1. type = "email" -> Ô nhập text -> Tự kiểm tra có kí tự @ và định dạng email hợp lệ -> Dùng cho form đăng ký/đăng nhập 
2. type = "password" -> Ô nhập text nhưng ký tự bị ẩn (....) -> Không có validation mặc định (chỉ ẩn nội dung) -> Dùng nhập mật khẩu tài khoản 
3. type = "text" -> Ô nhập văn bản 1 dòng -> Không có validation mặc định -> Dùng nhập tên sản phẩm , tên khách hàng
4. type="number" → Ô nhập số, có nút tăng/giảm → Chỉ cho nhập số, có thể giới hạn min/max → Dùng nhập số lượng sản phẩm
5. type="tel" → Ô nhập số điện thoại → Không kiểm tra chặt chẽ (chỉ hỗ trợ bàn phím số trên mobile) → Dùng nhập số điện thoại khách hàng
6. type="url" → Ô nhập đường link → Kiểm tra định dạng URL (phải có http/https) → Dùng nhập link website (ví dụ shop đối tác)
7. type="date" → Hiển thị lịch để chọn ngày → Kiểm tra định dạng ngày hợp lệ → Dùng chọn ngày giao hàng / ngày sinh
8. type="radio" → Nút chọn 1 trong nhiều lựa chọn → Chỉ chọn được 1 option → Dùng chọn phương thức thanh toán (COD / Online)
9. type="checkbox" → Ô tích chọn nhiều lựa chọn → Có thể chọn nhiều option → Dùng chọn đồng ý điều khoản hoặc chọn nhiều sản phẩm
10. type="file" → Nút upload file → Kiểm tra loại file (qua accept nếu có) → Dùng upload ảnh sản phẩm hoặc avatar

## CÂU A2- Validation Attributes
Trường hợp 1
<input type="text" required value="">
→ Kết quả: Không submit được, trình duyệt báo lỗi “Please fill out this field.”
→ Giải thích: Thuộc tính required bắt buộc phải nhập dữ liệu. Ô đang rỗng (value="") nên vi phạm validation.

Trường hợp 2
<input type="email" value="abc">
→ Kết quả: Không submit được, báo lỗi sai định dạng email
→ Giải thích: type="email" yêu cầu đúng định dạng email (phải có @ và domain). Giá trị "abc" không hợp lệ nên bị chặn.

Trường hợp 3
<input type="number" min="1" max="10" value="15">
→ Kết quả: Không submit được, báo lỗi giá trị vượt quá max
→ Giải thích: Giá trị hợp lệ phải nằm trong khoảng [1, 10]. User nhập 15 > 10 nên vi phạm max.

Trường hợp 4
<input type="text" pattern="[0-9]{10}" value="abc123">
→ Kết quả: Không submit được, báo lỗi không khớp pattern
→ Giải thích: Pattern yêu cầu đúng 10 chữ số. "abc123" vừa có chữ vừa không đủ 10 số → sai định dạng.

Trường hợp 5
<input type="password" minlength="8" value="123">
→ Kết quả: Không submit được, báo lỗi mật khẩu quá ngắn
→ Giải thích: minlength="8" yêu cầu ít nhất 8 ký tự, nhưng "123" chỉ có 3 ký tự → không hợp lệ.

# Kết quả thực tế
![Validation Result](validation.png)
# So sánh dự đoán với thực tế 
Tất cả các trường hợp đều không submit được 
Trình duyệt sẽ tự động hiển thị thông báo lỗi tương ứng 
Dự đoán khớp với thực tế vì HTML5 validation hoạt động phía client

## CÂU A3
1. Vai trò của <label for="email">:
<label> giúp liên kết giữa tên trường và ô input. Screen reader sẽ đọc nội dung của label để người dùng biết cần nhập gì.
Nếu không có <label>, screen reader chỉ đọc “edit text” → người dùng không hiểu mục đích của ô nhập.
Ngoài ra, click vào label sẽ focus vào input → cải thiện trải nghiệm người dùng.

2. Khi nào dùng <fieldset> + <legend>?
Dùng khi cần nhóm các input có liên quan (radio, checkbox,...).
Ví dụ:
<fieldset>
  <legend>Phương thức thanh toán</legend>

  <label>
    <input type="radio" name="payment" value="cash"> Tiền mặt
  </label>

  <label>
    <input type="radio" name="payment" value="card"> Thẻ
  </label>
</fieldset>
<legend> mô tả nhóm, giúp screen reader hiểu các input thuộc cùng một chủ đề.

3. aria-label dùng khi nào?
Dùng khi không có text hiển thị nhưng vẫn cần mô tả cho screen reader.
Ví dụ:
<button aria-label="Đóng">❌</button>

4. Vì sao không nên dùng aria-label khi đã có <label>?
Gây trùng hoặc ghi đè thông tin
Làm mất semantic HTML chuẩn
Khó bảo trì
-> Nên ưu tiên dùng <label>, chỉ dùng aria-label khi không có cách nào khác.

## CÂU A4- Media
1. Thuộc tính loading="lazy" trên <img>:
loading="lazy" giúp trì hoãn việc tải ảnh cho đến khi ảnh gần xuất hiện trong vùng nhìn (viewport).
Lợi ích:
-Giảm thời gian tải trang ban đầu
-Tiết kiệm băng thông
-Tăng hiệu năng (đặc biệt với trang nhiều ảnh)
Khi KHÔNG nên dùng:
-Ảnh quan trọng nằm trên đầu trang (hero image)
-Ảnh cần hiển thị ngay khi load trang
-> Vì lazy loading có thể làm ảnh hiển thị chậm hơn
2. Tại sao nên cung cấp nhiều <source> trong <video>?
Vì các trình duyệt hỗ trợ định dạng video khác nhau. Cung cấp nhiều <source> giúp video chạy được trên nhiều trình duyệt.
Ví dụ:
<video controls>
  <source src="video.mp4" type="video/mp4">
  <source src="video.webm" type="video/webm">
  <source src="video.ogg" type="video/ogg">
</video>
Các format video phổ biến:
-MP4 (phổ biến nhất)
-WebM
-OGG

3. Thuộc tính alt trên <img>:
alt cung cấp mô tả thay thế cho ảnh khi:
-Ảnh không tải được
-Người dùng sử dụng screen reader
Viết alt cho các trường hợp:
-Ảnh sản phẩm iPhone 16:
    alt="iPhone 16 màu đen, góc chụp nghiêng hiển thị mặt trước và camera sau"
-Ảnh trang trí (decorative):
    alt="" (để rỗng để screen reader bỏ qua)
-Ảnh biểu đồ doanh thu Q1/2026:
    alt="Biểu đồ doanh thu quý 1 năm 2026, doanh thu tăng dần từ tháng 1 đến tháng 3"

## Câu A5 — So sánh <figure> vs <img>

1. Khi nào dùng Cách 1 (<img>):
Dùng khi ảnh chỉ để hiển thị đơn lẻ, không cần chú thích (caption) hoặc không mang ý nghĩa độc lập.
Ví dụ:
Ảnh icon sản phẩm trong danh sách (ví dụ: ảnh nhỏ iPhone trong list sản phẩm)
Ảnh trang trí trong banner hoặc background
2. Khi nào dùng Cách 2 (<figure> + <figcaption>):
Dùng khi ảnh có nội dung quan trọng, cần chú thích để giải thích hoặc bổ sung thông tin.
<figure> giúp nhóm ảnh và chú thích thành một khối có ý nghĩa (semantic).
Ví dụ:
Ảnh sản phẩm kèm giá hoặc mô tả (như iPhone 16 Pro Max — 25.990.000đ)
Ảnh biểu đồ, sơ đồ cần chú thích (ví dụ: biểu đồ doanh thu kèm mô tả bên dưới)

## CÂU C1-Debug form
Lỗi 1: Dòng 2 — Input "Tên" không có <label for="...">, vi phạm accessibility
Sửa:
<label for="name">Tên:</label>
<input type="text" id="name" name="name" required>

Lỗi 2: Dòng 3 — Input email không có <label>
Sửa:
<label for="email">Email:</label>
<input type="email" id="email" name="email" placeholder="Email của bạn" required>

Lỗi 3: Dòng 4-5 — Password không có <label>
Sửa:
<label for="password">Mật khẩu:</label>
<input type="password" id="password" name="password" required>

<label for="confirm">Nhập lại mật khẩu:</label>
<input type="password" id="confirm" name="confirm" required>

Lỗi 4: Dòng 6 — Phone dùng type="text" thay vì type="tel"
Sửa:
<label for="phone">Phone:</label>
<input type="tel" id="phone" name="phone" pattern="[0-9]{10}" required>

Lỗi 5: Dòng 6 — Dùng value làm dữ liệu mặc định không hợp lý (nên dùng placeholder)
Sửa:

<input type="tel" id="phone" name="phone" placeholder="0901234567">

Lỗi 6: Dòng 7 — <select> không có <label>
Sửa:
<label for="city">Thành phố:</label>
<select id="city" name="city" required>
    <option value="">-- Chọn --</option>
    <option>Hà Nội</option>
    <option>TP.HCM</option>
</select>

Lỗi 7: Dòng 12 — Checkbox không có <input> và không liên kết label
Sửa:
<input type="checkbox" id="terms" name="terms" required>
<label for="terms">Tôi đồng ý điều khoản</label>

Lỗi 8: Dòng 14 — Nút submit nên dùng <button> để linh hoạt hơn (best practice)
Sửa:
<button type="submit">Gửi</button>

## CÂU C2-Thiết kế chiến lược Validation
1. Regex pattern:
CMND/CCCD (12 chữ số):
pattern="^[0-9]{12}$"
Số tài khoản (10–15 chữ số):
pattern="^[0-9]{10,15}$"

2. HTML5 validation có đủ an toàn cho ứng dụng ngân hàng không?
Không đủ an toàn.
Lý do:
- HTML5 validation chỉ chạy ở phía client (trình duyệt)
- Người dùng có thể:
    Tắt validation
    Sửa HTML bằng DevTools
    Gửi request trực tiếp (bỏ qua form)
-> Do đó, không thể tin tưởng dữ liệu chỉ được kiểm tra ở frontend.

3. loại validation HTML5 KHÔNG làm được (cần JavaScript):
So sánh 2 trường (ví dụ: confirm password phải giống password)
Kiểm tra logic phức tạp (ví dụ: ngày sinh > 18 tuổi)
Validation động theo dữ liệu khác (ví dụ: mã OTP, kiểm tra username đã tồn tại)

4. rủi ro bảo mật nếu chỉ validate frontend:
Người dùng gửi dữ liệu sai/độc hại lên server (bypass validation)
Dễ bị tấn công như:
SQL Injection
XSS (Cross-Site Scripting)
->Backend bắt buộc phải validate lại toàn bộ dữ liệu.

    