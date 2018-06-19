# Class 的基本用法

1. 类即是构造函数 
``` bash
function Point (x, y) {
    this.x = x
    this.y = y
}
class Point {
    constructor (x, y) {
        this.x = x
        this.y = y
    }
}
```

2. 类的数据类型是函数
``` bash
typeof Point === "function"

```

3. ES5中构造函数的写法的prototype属性在类上也存在，类的所有方法都定义在类的prototype属性上面。
``` bash
class Point {
    constructor(x, y) { }
    toString() { }
}
console.log(Point.prototype)
// {
//     constructor : Point(x, y)
//     toString : toString()
// }
```

4. 类的新方法可以添加在prototype对象上面。Object.assign方法可以很方便地一次向类添加多个方法
``` bash
Object.assign(Point.prototype, {
    toValue () { },
    toString () { },
})
```

5. 类的prototype对象的constructor属性，直接指向“类”的本身
``` bash
Point.prototype.constructor === Point // true
```

6. 类的内部所有定义的方法，都是不可枚举的（non-enumerable）
``` bash
class Point {
    constructor(x, y) { }
    toString() { }
}
Object.keys(Point.prototype)// []
Object.getOwnPropertyNames(Point.prototype) // ["constructor","toString"]
```


7. Object.assign定义的方法是可枚举的
``` bash
class Point {
    constructor(x, y) { }
    toString() { }
}
Object.keys(Point.prototype) // []
Object.assign(Point.prototype, {
    toValue: function () {
        return 'toValue'
    }
})
Object.keys(Point.prototype) // ["toValue"]
```

8. 用es5的写法添加的属性是可枚举的
``` bash
var Point = function (x, y) { };
Point.prototype.toString = function() { }; //toString可枚举
Object.keys(Point.prototype) // ["toString"]
Object.getOwnPropertyNames(Point.prototype) // ["constructor","toString"]
```

9. 类构造器里定义的属性，是对象的可枚举属性
``` bash
class Point {
    constructor (x, y) {
        this.x = x
        this.y = y
    }
    toString () {
        return '(' + this.x + ', ' + this.y + ')'
    }
}
var p = new Point(2, 3)
console.log(Object.keys(p)) // ["x", "y"]
console.log(Object.getOwnPropertyNames(p)) // ["x", "y"]
```

10. 类产生的对象上的属性即是该类的prototype对象上对应的属性
``` bash
class Point {
    constructor (x, y) {
        this.x = x
        this.y = y
    }
    toString () {
        return '(' + this.x + ', ' + this.y + ')'
    }
}
var p = new Point(2, 3)
Object.assign(Point.prototype, {
    toValue: function () { }
})
console.log(p.constructor === Point.prototype.constructor) // true
console.log(p.toString === Point.prototype.toString) // true
console.log(p.toValue === Point.prototype.toValue) // true
```

11. 类的属性名，可以采用表达式
``` bash
let methodName = 'getArea';
class Square {
    constructor(length) { }
    [methodName]() { }
}
```

12. 类和模块的内部，只有严格模式可用。考虑到未来所有的代码，其实都是运行在模块之中，所以 ES6 实际上把整个语言升级到了严格模式

13. constructor方法是类的默认方法，通过new命令生成对象实例时，自动调用该方法。如果没有显式定义，一个空的constructor方法会被默认添加。
``` bash
class Point { }
// 等同于
class Point {
    constructor() {}
}
```

14. constructor方法默认返回实例对象（即this），完全可以指定返回另外一个对象
``` bash
class Koo {
    constructor() {}
}
console.log(new Koo() instanceof Koo) // true
class Foo {
    constructor() { return Object.create(null); }
}
console.log(new Foo() instanceof Foo) // false

console.log(typeof new Koo()) // 'object'
console.log(typeof new Foo()) // 'object'
```

15. 像函数那样调用Class，将会报错。
``` bash
class Point { }
var point = Point(2, 3); // 报错
var point = new Point(2, 3); // 正确
```

16. 像函数那样调用构造函数，将会报错。
``` bash
function Point (x, y) {
    this.x = x
    this.y = y
}
var point = Point(2, 3); // 报错
var point = new Point(2, 3); // 正确
```

17. 系统默认提供的类可以像方法一样调用，返回字符串类型的值,使用new调用的话，返回对应的对象
``` bash
console.log(typeof String('zxczxczxc')) // 'string'
console.log(typeof new String('zxczxczxc')) // 'object'
console.log(typeof Date()) // 'string'
console.log(typeof new Date()) // 'object'
```

18. 与 ES5 一样，实例的属性除非显式定义在其本身（即定义在this对象上），否则都是定义在原型上（即定义在class上）。
``` bash
function Point (x, y) {
    this.x = x
    this.y = y
}
Point.prototype.toString = function () {
    return '(' + this.x + ', ' + this.y + ')';
}

// 另一种写法
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }
}

var point = new Point(2, 3);
point.hasOwnProperty('x') // true
point.hasOwnProperty('y') // true
point.hasOwnProperty('toString') // false
point.__proto__.hasOwnProperty('toString') // true
// 上面代码中，x和y都是实例对象point自身的属性（因为定义在this变量上），所以hasOwnProperty方法返回true，
// 而toString是原型对象的属性（因为定义在Point类上），所以hasOwnProperty方法返回false。这些都与 ES5 的行为保持一致。
```
19. 与 ES5 一样，类的所有实例共享一个原型对象。
``` bash
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }
}
var p1 = new Point(2,3);
var p2 = new Point(3,2);
console.log(Object.getPrototypeOf(p1) === Object.getPrototypeOf(p2)) //true
// 对于Object.getPrototypeOf方法，各大厂商具体实现时添加的私有属性 p1.__proto__来获取对象的原型对象，
// 虽然目前很多现代浏览器的 JS 引擎中都提供了这个私有属性，但依旧不建议在生产中使用该属性，避免对环境产生依赖
```

20. 与函数一样，类也可以使用表达式的形式定义
``` bash
const MyClass = class Me {
    getClassName() {
        return Me.name;
    }
};
let i = new MyClass();
i.getClassName() // Me
Me.name // ReferenceError: Me is not defined
// 这个类的名字是MyClass而不是Me，Me只在 Class 的内部代码可用，指代当前类。
// 如果类的内部没用到的话，可以省略Me，const MyClass = class { }
```

21. 采用 Class 表达式，可以写出立即执行的 Class。
``` bash
let person = new class {
  constructor(name) {
    this.name = name;
  }
  sayName() {
    console.log(this.name);
  }
}('张三');
person.sayName(); // "张三"
```

22. 类不存在变量提升（hoist），这一点与 ES5 完全不同。
``` bash
new Foo(); // ReferenceError
class Foo {}
Foo类使用在前，定义在后，这样会报错，因为 ES6 不会把类的声明提升到代码头部
```

23. es6的类没有提供私有方法，只能通过变通方法模拟实现，一种做法是在命名上加以区别。
``` bash
// 这种命名是不保险的，在类的外部，还是可以调用到这个方法
class Widget {
    // 公有方法
    foo (baz) {
        this._bar(baz);
    }
    // 私有方法
    _bar(baz) {
        return this.snaf = baz;
    }
}

// 另一种方法就是将私有方法移出类，因为类内部的所有方法都是对外可见的。
class Widget {
    foo (baz) {
        bar.call(this, baz);
    }
}
function bar(baz) {
    return this.snaf = baz;
}

// 还有一种方法是利用Symbol值的唯一性，将私有方法的名字命名为一个Symbol值
const bar = Symbol('bar');
const snaf = Symbol('snaf');
export default class myClass{
    // 公有方法
    foo(baz) {
        this[bar](baz);
    }
    // 私有方法
    [bar](baz) {
        return this[snaf] = baz;
    }
};
// bar和snaf都是Symbol值，导致第三方无法获取到它们，因此达到了私有方法和私有属性的效果
```

24. ES6 不支持私有属性、私有方法。有一个提案，为class加了私有属性、私有方法。方法是在属性名之前，使用#表示。
``` bash
class Foo {
    #a;
    #b;
    #sum() { return #a + #b; }
    printSum() { console.log(#sum()); }
    constructor(a, b) { #a = a; #b = b; }
}
// #a、#b 就是私有属性
// #sum()就是一个私有方法
```

25. 私有属性也可以设置 getter 和 setter 方法。
``` bash
class Counter {
    #xValue = 0;
    get #x() { return #xValue; }
    set #x(value) {
        this.#xValue = value;
    }
    constructor() {
        super();
    }
}
// #x是一个私有属性，它的读写都通过get #x()和set #x()来完成
```

26. 类的方法内部如果含有this，它默认指向类的实例。但是，必须非常小心，一旦单独使用该方法，很可能报错
``` bash
// 这里将对象的实例方法提取出来单独使用，this会指向该方法运行时所在的环境，因为找不到print方法而导致报错。
class Logger {
    printName(name = 'there') {
        this.print(`Hello ${name}`);
    }
    print(text) {
        console.log(text);
    }
}
const logger = new Logger();
const { printName } = logger;
printName(); // TypeError: Cannot read property 'print' of undefined

// 解决方法是，在构造方法中绑定this，这样就不会找不到print方法了。
class Logger {
    constructor() {
        this.printName = this.printName.bind(this);
    }
}

另一种解决方法是使用箭头函数。
class Logger {
    constructor() {
        this.printName = (name = 'there') => {
            this.print(`Hello ${name}`);
        };
    }
}
```

27. 类的name属性总是返回紧跟在class关键字后面的类名
``` bash
class Point {}
Point.name // "Point"
```

28. 与 ES5 一样，在“类”的内部可以使用get和set关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为。
``` bash
// prop属性有对应的存值函数和取值函数，因此赋值和读取行为都被自定义了。
class MyClass {
    constructor() { }
    get prop() {
        return 'getter';
    }
    set prop(value) {
        console.log('setter: '+value);
    }
}
let inst = new MyClass();
inst.prop = 123; // setter: 123
inst.prop // 'getter'

// 存值函数和取值函数是设置在属性的 Descriptor 对象上的。
class CustomHTMLElement {
    constructor(element) {
        this.element = element;
    }
    get html() {
        return this.element.innerHTML;
    }
    set html(value) {
        this.element.innerHTML = value;
    }
}
var descriptor = Object.getOwnPropertyDescriptor(CustomHTMLElement.prototype, "html");
"get" in descriptor  // true
"set" in descriptor  // true
// 存值函数和取值函数是定义在html属性的描述对象上面，这与 ES5 完全一致。
```

29. Symbol.iterator方法返回一个类的默认遍历器,for...of循环会自动调用这个遍历器。
``` bash
class Foo {
    constructor(...args) {
        this.args = args;
    }
    * [Symbol.iterator]() {
        for (let arg of this.args) {
            yield arg;
        }
    }
}
for (let x of new Foo('hello', 'world')) {
    console.log(x);
}
// hello
// world
```

30. 类的“静态方法”
``` bahs
class Foo {
    static classMethod() {
        return 'hello';
    }
}
Foo.classMethod() // 'hello'
var foo = new Foo();
foo.classMethod()
// TypeError: foo.classMethod is not a function

// 如果静态方法包含this关键字，这个this指的是类，而不是实例。
class Foo {
    static bar () {
        this.baz();
    }
    static baz () {
        console.log('hello');
    }
    baz () {
        console.log('world');
    }
}
Foo.bar() // hello
// 静态方法bar调用了this.baz，这里的this指的是Foo类，而不是Foo的实例，等同于调用Foo.baz。
// 从这个例子还可以看出，静态方法可以与非静态方法重名

// 父类的静态方法，可以被子类继承
class Foo {
    static classMethod() {
        return 'hello';
    }
}
class Bar extends Foo { }
Bar.classMethod() // 'hello'

// 静态方法也可以从super对象上调用
class Foo {
    static classMethod() {
        return 'hello';
    }
}
class Bar extends Foo {
    static classMethod() {
        return super.classMethod() + ', too';
    }
}
Bar.classMethod() // "hello, too"
```

31.  ES6 明确规定 Class 内部只有静态方法，没有静态属性。静态属性的定义只能通过变通写法
``` bash
class Foo {}
Foo.prop = 1;
Foo.prop // 1
```

32. 类的实例属性、静态属性的提案，对实例属性、静态属性都规定了新的写法。
``` bash
// myProp就是MyClass的实例属性。在MyClass的实例上，可以读取这个属性。
// 以前，我们定义实例属性，只能写在类的constructor方法里面
class MyClass {
    myProp = 42;
    constructor() {
        console.log(this.myProp); // 42
    }
}

// 为了可读性的目的，对于那些在constructor里面已经定义的实例属性，新写法允许直接列出。
class ReactCounter extends React.Component {
    state;
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        };
    }
}

//  "myStaticProp" 即是静态属性
class MyClass {
    static myStaticProp = 42;
    constructor() {
        console.log(MyClass.myStaticProp); // 42
    }
}
```

33. es6新增的new.target 属性只用在构造函数之中，在函数外部使用new.target会报错。
返回new命令作用于的那个构造函数,如果不是通过new命令调用的,会返回undefined
``` bash
// 确保构造函数只能通过new命令调用
// 因此这个属性可以用来确定构造函数是怎么调用的。
function Person(name) {
    if (new.target !== undefined) {
        this.name = name;
    } else {
        throw new Error('必须使用 new 命令生成实例');
    }
}
// 另一种写法
function Person(name) {
    if (new.target === Person) {
        this.name = name;
    } else {
        throw new Error('必须使用 new 命令生成实例');
    }
}
var person = new Person('张三'); // 正确
var notAPerson = Person.call(person, '张三');  // 报错

// 需要注意的是，子类继承父类时，new.target会返回子类
class Rectangle {
    constructor(length, width) {
        console.log(new.target === Rectangle);
    }
}
class Square extends Rectangle {
    constructor(length) {
        super(length, length);
    }
}
var obj = new Square(3); // 输出 false

// 利用这个特点，可以写出不能独立使用、必须继承后才能使用的类，Shape类不能被实例化，只能用于继承。
class Shape {
    constructor() {
        if (new.target === Shape) {
            throw new Error('本类不能实例化');
        }
    }
}
class Rectangle extends Shape {
    constructor(length, width) {
        super();
    }
}
var x = new Shape();  // 报错
var y = new Rectangle(3, 4);  // 正确
```



