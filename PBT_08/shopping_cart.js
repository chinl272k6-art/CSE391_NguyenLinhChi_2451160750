function createCart() {
    // Private data
    let items = [];
    let discount = 0;
    let shippingDiscount = 0;

    return {
        // Thêm sản phẩm
        addItem(product, quantity = 1) {
            const existing = items.find(
                item => item.id === product.id
            );

            if (existing) {
                existing.quantity += quantity;
            } else {
                items.push({
                    ...product,
                    quantity
                });
            }
        },

        // Xóa sản phẩm
        removeItem(productId) {
            items = items.filter(
                item => item.id !== productId
            );
        },

        // Cập nhật số lượng
        updateQuantity(productId, newQuantity) {
            const item = items.find(
                item => item.id === productId
            );

            if (item) {
                item.quantity = newQuantity;

                if (newQuantity <= 0) {
                    this.removeItem(productId);
                }
            }
        },

        // Tổng tiền trước giảm
        getTotal() {
            const subtotal = items.reduce(
                (sum, item) =>
                    sum + item.price * item.quantity,
                0
            );

            return subtotal - subtotal * discount - shippingDiscount;
        },

        // Mã giảm giá
        applyDiscount(code) {
            discount = 0;
            shippingDiscount = 0;

            const codes = {
                SALE10: 0.1,
                SALE20: 0.2
            };

            if (codes[code]) {
                discount = codes[code];
            }

            if (code === "FREESHIP") {
                shippingDiscount = 30000;
            }
        },

        // In bảng giỏ hàng
        printCart() {
            console.table(
                items.map(item => ({
                    "Sản phẩm": item.name,
                    "SL": item.quantity,
                    "Đơn giá":
                        item.price.toLocaleString() + "đ",

                    "Tổng":
                        (
                            item.price *
                            item.quantity
                        ).toLocaleString() + "đ"
                }))
            );

            console.log(
                "Tổng cộng:",
                this.getTotal().toLocaleString() + "đ"
            );
        },

        // Tổng số lượng sản phẩm
        getItemCount() {
            return items.reduce(
                (sum, item) =>
                    sum + item.quantity,
                0
            );
        },

        // Xóa giỏ
        clearCart() {
            items = [];
            discount = 0;
            shippingDiscount = 0;
        }
    };
}


// ================= TEST =================

const cart = createCart();

cart.addItem(
    {
        id:1,
        name:"iPhone 16",
        price:25990000
    },1
);

cart.addItem(
    {
        id:3,
        name:"AirPods Pro",
        price:6990000
    },2
);

cart.addItem(
    {
        id:1,
        name:"iPhone 16",
        price:25990000
    },1
);

// iPhone tăng lên 2
cart.printCart();

cart.applyDiscount("SALE10");

cart.printCart();

console.log(
    "Số SP:",
    cart.getItemCount()
);

cart.removeItem(3);

console.log(
    "Sau xóa:",
    cart.getItemCount()
);