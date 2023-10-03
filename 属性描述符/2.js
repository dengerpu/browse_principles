let obj = {
    a: 1
}
let temp = obj.a
Object.defineProperty(obj, 'a', {
    get: function() {
        return temp
        // return obj.a  这种写法是错误的，会造成无限循环，因为obj.a就相当于调用get函数
    },
    set: function(val) {
        temp = val;
    }
})

// obj.a就相当于执行get()函数
obj.a = '111'
console.log(obj.a)