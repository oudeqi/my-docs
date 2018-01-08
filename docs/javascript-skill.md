# JavaScript技巧

## 使用!!操作符转换布尔值
只要变量的值为:0、null、" "、undefined或者NaN都将返回的是false，反之返回的是true。

## 使用+将字符串转换成数字
``` bash
// 只适合用于字符串数据，否则将返回NaN，比如下面的示例：
function toNumber(strNumber) {
    return +strNumber;
}
console.log(toNumber("1234")); // 1234
console.log(toNumber("ACB")); // NaN
//这个也适用于Date，它将返回的是时间戳数字：
console.log(+new Date()) // 1461288164385
```

## 并条件符
``` bash
// 如果你有一段这样的代码：
if (conected) {
    login();
}
// 可以简写成这样：
conected && login();
// 如果一些属性或函数存在于一个对象中，你也可以这样做检测：
user && user.login();
```

## 使用||运算符
``` bash
// 在ES6中有默认参数这一特性,为了在老版本的浏览器中模拟这一特性，可以使用||操作符
function User(name, age) {
    this.name = name || "Oliver Queen";
    this.age = age || 27;
}
var user1 = new User();
console.log(user1.name); // Oliver Queen
console.log(user1.age); // 27
var user2 = new User("Barry Allen", 25);
console.log(user2.name); // Barry Allen
console.log(user2.age); // 25
```

## 在循环中缓存array.length
``` bash
// 这个技巧很简单，这个在处理一个很大的数组循环时，对性能影响将是非常大的。
// 基本上，大家都会写一个这样的同步迭代的数组：
for(var i = 0; i < array.length; i++) {
    console.log(array[i]);
}
// 如果你要处理的是一个大的数组，这段代码在每次迭代都将会重新计算数组的大小，这将会导致一些延误。
// 为了避免这种现象出现，可以将array.length做一个缓存：
var length = array.length;
for(var i = 0; i < length; i++) {
    console.log(array[i]);
}
// 你也可以写成这样：
for(var i = 0, length = array.length; i < length; i++) {
    console.log(array[i]);
}
```

## 检测对象中属性
``` bash
// 当你需要检测一些属性是否存在，避免运行未定义的函数或属性时，这个小技巧就显得很有用。
// 如果你打算定些一些跨兼容的浏览器代码，你也可能会用到这个小技巧。
// 例如，你想使用document.querySelector()来选择一个id，并且让它能兼容IE6浏览器，但是在IE6浏览器中这个函数是不存在的，那么使用这个操作符来检测这个函数是否存在就显得非常的有用，如下面的示例：
if ('querySelector' in document) {
    document.querySelector("#id");
} else {
    document.getElementById("id");
}
// 在这个示例中，如果document不存在querySelector函数，那么就会调用docuemnt.getElementById("id")。
```

## 获取数组中最后一个元素
``` bash
// Array.prototype.slice(begin,end)用来获取begin和end之间的数组元素。
// 如果你不设置end参数，将会将数组的默认长度值当作end值。
// 但有些同学可能不知道这个函数还可以接受负值作为参数。
// 如果你设置一个负值作为begin的值，那么你可以获取数组的最后一个元素。如：
var array = [1, 2, 3, 4, 5, 6];
console.log(array.slice(-1)); // [6]
console.log(array.slice(-2)); // [5,6]
console.log(array.slice(-3)); // [4,5,6]
```

## 数组截断
``` bash
// 这个小技巧主要用来锁定数组的大小，如果用于删除数组中的一些元素来说，是非常有用的。
// 例如，你的数组有10个元素，但你只想只要前五个元素，那么你可以通过array.length=5来截断数组。如下面这个示例：
var array = [1, 2, 3, 4, 5, 6];
console.log(array.length); // 6
array.length = 3;
console.log(array.length); // 3
console.log(array); // [1,2,3]
```

## 替换所有
``` bash
// String.replace()函数允许你使用字符串或正则表达式来替换字符串，
// 本身这个函数只替换第一次出现的字符串，不过你可以使用正则表达多中的/g来模拟replaceAll()函数功能：
var string = "john john";
console.log(string.replace(/hn/, "ana")); // "joana john"
console.log(string.replace(/hn/g, "ana")); // "joana joana"
```

## 合并数组
``` bash
// 如果你要合并两个数组，一般情况之下你都会使用Array.concat()函数：
var array1 = [1,2,3];
var array2 = [4,5,6];
console.log(array1.concat(array2)); // [1,2,3,4,5,6];

// 然后这个函数并不适合用来合并两个大型的数组，因为其将消耗大量的内存来存储新创建的数组。
// 在这种情况之个，可以使用Array.push().apply(arr1,arr2)来替代创建一个新数组。
// 这种方法不是用来创建一个新的数组，其只是将第一个第二个数组合并在一起，同时减少内存的使用：
var array1 = [1,2,3];
var array2 = [4,5,6];
console.log(array1.push.apply(array1, array2)); // [1,2,3,4,5,6];
```

## 将NodeList转换成数组
``` bash
// 如果你运行document.querySelectorAll(“p”)函数时，它可能返回DOM元素的数组，也就是NodeList对象。
// 但这个对象不具有数组的函数功能，比如sort()、reduce()、map()、filter()等。
// 为了让这些原生的数组函数功能也能用于其上面，需要将节点列表转换成数组。
// 可以使用[].slice.call(elements)来实现：
var elements = document.querySelectorAll("p"); // NodeList
var arrayElements = [].slice.call(elements); // Now the NodeList is an array
var arrayElements = Array.from(elements); // This is another way of converting NodeList to Array
```

## 数组元素的洗牌
``` bash
// 对于数组元素的洗牌，不需要使用任何外部的库，比如Lodash，只要这样做：
var list = [1,2,3];
console.log(list.sort(function() { Math.random() - 0.5 })); // [2,1,3]
```






