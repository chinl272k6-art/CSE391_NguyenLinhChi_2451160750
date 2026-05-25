// Random số từ 1 -> 100
const randomNumber = Math.floor(Math.random() * 100) + 1;

// Số lần đoán tối đa
const maxTurns = 7;

// Đếm số lần đoán
let attempts = 0;

// Lưu các số đã đoán
let guessedNumbers = [];

// Game loop
while (attempts < maxTurns) {

    // Nhập số
    let input = prompt(
        `Nhập số từ 1 đến 100\nLượt còn lại: ${maxTurns - attempts}`
    );

    // Nếu bấm Cancel
    if (input === null) {
        alert("Bạn đã thoát game!");
        break;
    }

    // Chuyển sang number
    let guess = Number(input);

    // Validate input
    if (
        isNaN(guess) ||
        guess < 1 ||
        guess > 100
    ) {
        alert("Vui lòng nhập số từ 1 đến 100!");
        continue;
    }

    // Kiểm tra đoán trùng
    if (guessedNumbers.includes(guess)) {
        alert("Bạn đã đoán số này rồi!");
        continue;
    }

    // Lưu số đã đoán
    guessedNumbers.push(guess);

    // Tăng số lần đoán
    attempts++;

    // So sánh
    if (guess === randomNumber) {

        alert(
            `Đúng rồi!\nBạn đoán đúng sau ${attempts} lần!`
        );

        break;
    }
    else if (guess < randomNumber) {
        alert("Cao hơn!");
    }
    else {
        alert("Thấp hơn!");
    }

    // Hết lượt
    if (attempts === maxTurns) {
        alert(
            `Bạn đã thua!\nĐáp án là: ${randomNumber}`
        );
    }
}