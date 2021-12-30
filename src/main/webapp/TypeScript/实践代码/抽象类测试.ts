abstract class Person {
    constructor(public name: string) { }
    abstract printfun(): void
    printName(): void {
        console.log(this.name);
    }
}

class robTomb extends Person {
    constructor() { super("张起灵") }
    printfun(): void {
        console.log("盗墓笔记");
    }
    uncertainty(): void {
        console.log("不知道能否实现");
    }
}

let person = new robTomb()
person.printName()
person.printfun()
person.uncertainty()