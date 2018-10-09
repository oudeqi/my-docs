# Class的继承

## 继承的基本写法
``` bash
class ColorPoint extends Point {
    constructor(x, y, color) {
        super(x, y); // 调用父类的constructor(x, y)
        this.color = color;
    }
    toString() {
        return this.color + ' ' + super.toString(); // 调用父类的toString()
    }
}
```
1. 子类必须在constructor方法中调用super方法，否则新建实例时会报错。这是因为子类自己的this对象，必须先通过父类的构造函数完成塑造，得到与父类同样的实例属性和方法，然后再对其进行加工，加上子类自己的实例属性和方法。如果不调用super方法，子类就得不到this对象。
2. 子类如果没有提供constructor，默认的constructor和默认的super方法调用会被添加。
3. ES5 的继承，实质是先创造子类的实例对象this，然后再将父类的方法添加到this上面（Parent.apply(this)）。ES6 的继承机制完全不同，实质是先创造父类的实例对象this（所以必须先调用super方法），然后再用子类的构造函数修改this。
4. 在子类的构造函数中，只有调用super之后，才可以使用this关键字，否则会报错。这是因为子类实例的构建，是基于对父类实例加工，只有super方法才能返回父类实例。
5. 实例对象cp同时是ColorPoint和Point两个类的实例，这与 ES5 的行为完全一致。
``` bash
let cp = new ColorPoint(25, 8, 'green');
cp instanceof ColorPoint // true
cp instanceof Point // true
```
6. 父类的静态方法，也会被子类继承
``` bash
class A {
    static hello() {
        console.log('hello world');
    }
}
class B extends A { }
B.hello()  // hello world
// hello()是A类的静态方法，B继承A，也继承了A的静态方法
```

## Object.getPrototypeOf()
1. 从子类上获取父类
``` bash
Object.getPrototypeOf(ColorPoint) === Point // true
// 可以使用这个方法判断，一个类是否继承了另一个类。
```
2. 获取一个对象的原型对象
``` bash
var p1 = new Point(2,3);
var p2 = new Point(3,2);
console.log(Object.getPrototypeOf(p1) === Object.getPrototypeOf(p2)) //true
```

## super 关键字
1. 作为函数，代表父类的构造函数。
``` bash
class A {}
class B extends A {
    constructor() {
        super();// 这是必须的，否则 JavaScript 引擎会报错。
    }
}
// ES6 要求，子类的构造函数必须执行一次super函数。
// super虽然代表了父类A的构造函数，但是返回的是子类B的实例，即super内部的this指的是B
// 作为函数时，super()只能用在子类的构造函数之中，用在其他地方就会报错
```
2. 作为对象，在普通方法中，指向父类的原型对象。
``` bash
class A {
    p() {
        return 2;
    }
}
class B extends A {
    constructor() {
        super();
        console.log(super.p()); // 2
    }
}
let b = new B();
// 这时，super在普通方法之中作为一个对象，指向A.prototype，所以super.p()就相当于A.prototype.p()。
// 这里需要注意，由于super指向父类的原型对象，所以定义在父类实例上的方法或属性，是无法通过super调用的。

// ES6 规定，在子类普通方法中通过super调用父类的方法时，方法内部的this指向当前的子类实例。
class A {
    constructor() {
        this.x = 1;
    }
    print() {
        console.log(this.x);
    }
}
class B extends A {
    constructor() {
        super();
        this.x = 2;
    }
    m() {
        super.print();
    }
}
let b = new B();
b.m() // 2

// 由于this指向子类实例，所以如果通过super对某个属性赋值，这时super就是this，赋值的属性会变成子类实例的属性。
class A {
    constructor() {
        this.x = 1;
    }
}
class B extends A {
    constructor() {
        super();
        this.x = 2;
        super.x = 3;
        console.log(super.x); // undefined
        console.log(this.x); // 3
        // super.x赋值为3，这时等同于对this.x赋值为3。而当读取super.x的时候，读的是A.prototype.x，所以返回undefined。
    }
}
let b = new B();


```
3. 作为对象，用在静态方法之中，这时super将指向父类，而不是父类的原型对象。
``` bash
class Parent {
    static myMethod(msg) {
        console.log('static', msg);
    }
    myMethod(msg) {
        console.log('instance', msg);
    }
}
class Child extends Parent {
    static myMethod(msg) {
        super.myMethod(msg);
    }
    myMethod(msg) {
        super.myMethod(msg);
    }
}
Child.myMethod(1); // static 1
var child = new Child();
child.myMethod(2); // instance 2
// super在静态方法之中指向父类，在普通方法之中指向父类的原型对象。

// 在子类的静态方法中通过super调用父类的方法时，方法内部的this指向当前的子类，而不是子类的实例
class A {
    constructor() {
        this.x = 1;
    }
    static print() {
        console.log(this.x);
    }
}
class B extends A {
    constructor() {
        super();
        this.x = 2;
    }
    static m() {
        super.print();
    }
}
B.x = 3;
B.m() // 3
```
4. 注意，使用super的时候，必须显式指定是作为函数、还是作为对象使用，否则会报错。
``` bash
class A {}
class B extends A {
    constructor() {
        super();
        console.log(super); // 报错
    }
}
// console.log(super)当中的super，无法看出是作为函数使用，还是作为对象使用，所以 JavaScript 引擎解析代码的时候就会报错

class A {}
class B extends A {
    constructor() {
        super();
        console.log(super.valueOf() instanceof B); // true
    }
}
let b = new B();
// super.valueOf()表明super是一个对象，因此就不会报错。同时，由于super使得this指向B的实例，所以super.valueOf()返回的是一个B的实例。
```
5. 对象总是继承其他对象的，所以可以在任意一个对象中，使用super关键字。
``` bash
var obj = {
    toString() {
        return "MyObject: " + super.toString();
    }
};
obj.toString(); // MyObject: [object Object]
```

## 类的 `prototype` 属性和`__proto__`属性
大多数浏览器的 ES5 实现之中，每一个对象都有__proto__属性，指向对应的构造函数的prototype属性。Class 作为构造函数的语法糖，同时有prototype属性和__proto__属性，因此同时存在两条继承链。
``` bash
class A {
class B extends A { }
B.__proto__ === A // true
// 子类的__proto__属性，表示构造函数的继承，总是指向父类
B.prototype.__proto__ === A.prototype // true
// 子类prototype属性的__proto__属性，表示方法的继承，总是指向父类的prototype属性。

```

## extends 的继承目标
``` bash
1. 只要是一个有prototype属性的函数，就能被B继承。
class B extends A { }
// 由于函数都有prototype属性（除了Function.prototype函数），因此A可以是任意函数。
// 除了Function.prototype属性是函数外，所有对象或者函数的prototype属性都是对象

2. 子类继承Object类
class A extends Object { }
A.__proto__ === Object // true
A.prototype.__proto__ === Object.prototype // true
// A其实就是构造函数Object的复制，A的实例就是Object的实例

3. 不存在任何继承
class A { }
A.__proto__ === Function.prototype // true
A.prototype.__proto__ === Object.prototype // true
// A作为一个基类（即不存在任何继承），就是一个普通函数，所以直接继承Function.prototype。
// 但是，A调用后返回一个空对象（即Object实例），所以A.prototype.__proto__指向构造函数（Object）的prototype属性。

4. 子类继承null
class A extends null { }
A.__proto__ === Function.prototype // true
A.prototype.__proto__ === undefined // true
// A也是一个普通函数，所以直接继承Function.prototype。
//但是，A调用后返回的对象不继承任何方法，所以它的__proto__指向undefined。
```

## 实例的 `__proto__` 属性
子类实例的__proto__属性的__proto__属性，指向父类实例的__proto__属性。也就是说，子类的原型的原型，是父类的原型
``` bash
var p1 = new Point(2, 3);
var p2 = new ColorPoint(2, 3, 'red');
p2.__proto__.__proto__ === p1.__proto__ // true

// 因此，通过子类实例的__proto__.__proto__属性，可以修改父类实例的行为
p2.__proto__.__proto__.printName = function () {
    console.log('Ha');
};
p1.printName() // "Ha"
// 在ColorPoint的实例p2上向Point类添加方法，结果影响到了Point的实例p1。
```

## 原生构造函数的继承
1. 原生构造函数是指语言内置的构造函数，通常用来生成数据结构。ECMAScript 的原生构造函数大致有下面这些。
``` bash
    Boolean()
    Number()
    String()
    Array()
    Date()
    Function()
    RegExp()
    Error()
    Object()
```
2. ES5中，这些原生构造函数是无法继承的，比如，不能自己定义一个Array的子类。
``` bash
function MyArray() {
    Array.apply(this, arguments);
}
MyArray.prototype = Object.create(Array.prototype, {
    constructor: {
        value: MyArray,
        writable: true,
        configurable: true,
        enumerable: true
    }
});
// 上面代码定义了一个继承 Array 的MyArray类。但是，这个类的行为与Array完全不一致。
var colors = new MyArray();
colors[0] = "red";
colors.length  // 0
colors.length = 0;
colors[0]  // "red"
// 之所以会发生这种情况，是因为子类无法获得原生构造函数的内部属性，通过Array.apply()或者分配给原型对象都不行。
// 原生构造函数会忽略apply方法传入的this，也就是说，原生构造函数的this无法绑定，导致拿不到内部属性。
// ES5 是先新建子类的实例对象this，再将父类的属性添加到子类上，由于父类的内部属性无法获取，导致无法继承原生的构造函数。
// 比如，Array构造函数有一个内部属性[[DefineOwnProperty]]，用来定义新属性时，更新length属性，这个内部属性无法在子类获取，导致子类的length属性行为不正常
```

3. ES6 允许继承原生构造函数定义子类
``` bash
class MyArray extends Array {
    constructor(...args) {
        super(...args);
    }
}
var arr = new MyArray();
arr[0] = 12;
arr.length // 1
arr.length = 0;
arr[0] // undefined
// 因为 ES6 是先新建父类的实例对象this，然后再用子类的构造函数修饰this，使得父类的所有行为都可以继承。

//extends关键字不仅可以用来继承类，还可以用来继承原生的构造函数。
//因此可以在原生数据结构的基础上，定义自己的数据结构。下面就是定义了一个带版本功能的数组。
class VersionedArray extends Array {
    constructor() {
        super();
        this.history = [[]];
    }
    commit() {
        this.history.push(this.slice());
    }
    revert() {
        this.splice(0, this.length, ...this.history[this.history.length - 1]);
    }
}
var x = new VersionedArray();
x.push(1);
x.push(2);
x // [1, 2]
x.history // [[]]
x.commit();
x.history // [[], [1, 2]]
x.push(3);
x // [1, 2, 3]
x.history // [[], [1, 2]]
x.revert();
x // [1, 2]
// 上面代码中，VersionedArray会通过commit方法，将自己的当前状态生成一个版本快照，存入history属性。
// revert方法用来将数组重置为最新一次保存的版本。
// 除此之外，VersionedArray依然是一个普通数组，所有原生的数组方法都可以在它上面调用。

class ExtendableError extends Error {
    constructor(message) {
        super();
        this.message = message;
        this.stack = (new Error()).stack;
        this.name = this.constructor.name;
    }
}
class MyError extends ExtendableError {
    constructor(m) {
        super(m);
    }
}
var myerror = new MyError('ll');
myerror.message // "ll"
myerror instanceof Error // true
myerror.name // "MyError"
myerror.stack
// Error
//     at MyError.ExtendableError
//     ...
// 自定义Error子类的例子，可以用来定制报错时的行为

class NewObj extends Object{
    constructor(){
        super(...arguments);
    }
}
var o = new NewObj({attr: true});
o.attr === true  // false
// 注意，继承Object的子类，有一个行为差异。
// NewObj继承了Object，但是无法通过super方法向父类Object传参。
// 这是因为 ES6 改变了Object构造函数的行为，一旦发现Object方法不是通过new Object()这种形式调用，Object构造函数会忽略参数。
```

## Mixin 模式的实现
1. Mixin 指的是多个对象合成一个新的对象，新对象具有各个组成成员的接口。它的最简单实现如下。
``` bash
const a = {
    a: 'a'
};
const b = {
     b: 'b'
};
const c = {...a, ...b}; // {a: 'a', b: 'b'}
```
2. 将多个类的接口“混入”（mix in）另一个类。
``` bash
function mix(...mixins) {
    class Mix {}
    for (let mixin of mixins) {
        copyProperties(Mix, mixin); // 拷贝实例属性
        copyProperties(Mix.prototype, mixin.prototype); // 拷贝原型属性
    }
    return Mix;
}
function copyProperties(target, source) {
    for (let key of Reflect.ownKeys(source)) {
        if ( key !== "constructor" && key !== "prototype" && key !== "name" ) {
            let desc = Object.getOwnPropertyDescriptor(source, key);
            Object.defineProperty(target, key, desc);
        }
    }
}
// 上面代码的mix函数，可以将多个对象合成为一个类。使用的时候，只要继承这个类即可。
class DistributedEdit extends mix(Loggable, Serializable) { }
```