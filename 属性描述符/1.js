let obj = {
    a: 2,
    b: 'aaa'
}

// 得到单个属性型描述符
console.log(Object.getOwnPropertyDescriptor(obj, 'a'))
// { value: 2, writable: true, enumerable: true, configurable: true }

// 得到全部的属性描述
console.log(Object.getOwnPropertyDescriptors(obj))
// {
//   a: { value: 2, writable: true, enumerable: true, configurable: true },
//   b: {
//     value: 'aaa',
//     writable: true,
//     enumerable: true,
//     configurable: true
//   }
// }

// 设置属性描述符
Object.defineProperty(obj, 'a', {
    value: 111,
    writable: false,  // 不可重写
    enumerable: false,  // 不可遍历
    configurable: false // 不可修改描述符本身
})

obj.a = 3
console.log(obj.a)

// 遍历不到a
for(let k in obj) {
    console.log(k)
}

// 上面已经定义了obj.a不可配置，这里会报错
Object.defineProperty(obj, 'a', {
    configurable: true // 不可修改描述符本身
})

