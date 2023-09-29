// // 死循环指定的时间
// function delay(duration) {
//   var start = Date.now();
//   while (Date.now() - start < duration) {}
// }

setTimeout(function () {
    console.log(1);
}, 0);

Promise.resolve().then(function () {
    console.log(2);
});

console.log(3);

// 输出： 3 2 1
// setTimeout 加入延时队列中，（原来称为宏队列）
// Promise加入微队列中
// 同步任务，直接执行， 微队列优先级高于延时对列
