class Animal {
    name: string
    move(distance: number) {
        console.log(`${this.name} can move ${distance} m`);
    }
    constructor(theName: string) { this.name = theName }
}

class Dog extends Animal {
    bark() {
        console.log("can bark");
    }
}

class Cat extends Animal {
    constructor(name: string) { super(name) }
    move(distance = 20) {
        console.log("猫")
        super.move(distance)
    }
}

const dog = new Dog("米诺")
dog.move(10)
dog.bark()
const cat = new Cat("米若")
cat.move()