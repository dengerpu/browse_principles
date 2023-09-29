setTimeout(function () {
    console.log(1);
}, 0);

function delay(duration) {
    var start = Date.now();
    while (Date.now() - start < duration) { }
}
delay(3000);
console.log(2);

// 3秒后  输出 2 1
// delay会占用主线程