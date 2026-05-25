// ===============================
// DỮ LIỆU MÓN ĂN
// ===============================

const orders = [
    { name: "Phở bò", price: 65000, quantity: 2 },
    { name: "Trà đá", price: 5000, quantity: 3 },
    { name: "Bún chả", price: 55000, quantity: 1 },
];


// ===============================
// CẤU HÌNH
// ===============================

const isWednesday = true;
const hasTip = true;


// ===============================
// HÀM FORMAT TIỀN
// ===============================

function formatMoney(number) {
    return number.toLocaleString("vi-VN") + "đ";
}


// ===============================
// TÍNH TỔNG
// ===============================

let subtotal = 0;

for (let i = 0; i < orders.length; i++) {

    const item = orders[i];

    item.total = item.price * item.quantity;

    subtotal += item.total;
}


// ===============================
// TÍNH GIẢM GIÁ
// ===============================

let discountPercent = 0;

// Giảm theo tổng hóa đơn
if (subtotal > 1000000) {
    discountPercent += 15;
}
else if (subtotal > 500000) {
    discountPercent += 10;
}

// Giảm thêm thứ 4
if (isWednesday) {
    discountPercent += 5;
}

const discountAmount =
    subtotal * discountPercent / 100;


// ===============================
// SAU GIẢM GIÁ
// ===============================

const afterDiscount =
    subtotal - discountAmount;


// ===============================
// VAT
// ===============================

const vatPercent = 8;

const vatAmount =
    afterDiscount * vatPercent / 100;


// ===============================
// TIP
// ===============================

let tipPercent = 0;
let tipAmount = 0;

if (hasTip) {
    tipPercent = 5;

    tipAmount =
        afterDiscount * tipPercent / 100;
}


// ===============================
// THANH TOÁN
// ===============================

const finalTotal =
    afterDiscount + vatAmount + tipAmount;


// ===============================
// IN HÓA ĐƠN
// ===============================

console.log("╔══════════════════════════════════════════════╗");
console.log("║             HÓA ĐƠN NHÀ HÀNG                ║");
console.log("╠══════════════════════════════════════════════╣");

for (let i = 0; i < orders.length; i++) {

    const item = orders[i];

    console.log(
        `║ ${i + 1}. ${item.name.padEnd(12)} x${item.quantity} ` +
        ` @${Math.floor(item.price / 1000)}k ` +
        ` = ${Math.floor(item.total / 1000)}k`.padEnd(17) +
        "║"
    );
}

console.log("╠══════════════════════════════════════════════╣");

console.log(
    `║ Tổng cộng:        ${formatMoney(subtotal).padStart(18)} ║`
);

console.log(
    `║ Giảm giá (${discountPercent}%): ${formatMoney(discountAmount).padStart(15)} ║`
);

console.log(
    `║ VAT (8%):         ${formatMoney(vatAmount).padStart(18)} ║`
);

console.log(
    `║ Tip (${tipPercent}%):         ${formatMoney(tipAmount).padStart(15)} ║`
);

console.log("╠══════════════════════════════════════════════╣");

console.log(
    `║ THANH TOÁN:       ${formatMoney(finalTotal).padStart(18)} ║`
);

console.log("╚══════════════════════════════════════════════╝");