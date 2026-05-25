//////////////////////////////
// 1. pipe()
//////////////////////////////

function pipe(...fns) {
    return value =>
        fns.reduce(
            (result, fn) => fn(result),
            value
        );
}

const process = pipe(
    x => x * 2,
    x => x + 10,
    x => x.toString(),
    x => "Kết quả: " + x
);

console.log(process(5));
// → "Kết quả: 20"



//////////////////////////////
// 2. memoize()
//////////////////////////////

function memoize(fn) {
    const cache = {};

    return (...args) => {
        const key = JSON.stringify(args);

        if (key in cache) {
            return cache[key];
        }

        const result = fn(...args);
        cache[key] = result;

        return result;
    };
}

const expensiveCalc = memoize((n) => {
    console.log("Đang tính...");

    let result = 0;

    for(let i = 0; i < n; i++) {
        result += i;
    }

    return result;
});

console.log(expensiveCalc(1000000));
// → Đang tính...
// → 499999500000

console.log(expensiveCalc(1000000));
// → 499999500000
// (không in "Đang tính...")



//////////////////////////////
// 3. debounce()
//////////////////////////////

function debounce(fn, delay) {
    let timeoutId;

    return (...args) => {
        clearTimeout(timeoutId);

        timeoutId = setTimeout(
            () => fn(...args),
            delay
        );
    };
}

const search = debounce((query) => {
    console.log(
        "Searching:",
        query
    );
},500);

// test
search("ip");
search("iphone");
search("iphone 16");

// Chỉ in:
// Searching: iphone 16



//////////////////////////////
// 4. retry()
//////////////////////////////

async function retry(
    fn,
    maxAttempts = 3
){
    let attempts = 0;

    while(attempts < maxAttempts){

        try{
            return await fn();
        }

        catch(error){

            attempts++;

            console.log(
                `Lần ${attempts} thất bại`
            );

            if(
                attempts === maxAttempts
            ){
                throw new Error(
                    "Đã vượt quá số lần thử"
                );
            }
        }
    }
}


// Test retry

let count = 0;

retry(async () => {

    count++;

    if(count < 3){
        throw Error("Lỗi");
    }

    return "Thành công";

})
.then(console.log)
.catch(console.error);


// Output:
// Lần 1 thất bại
// Lần 2 thất bại
// Thành công