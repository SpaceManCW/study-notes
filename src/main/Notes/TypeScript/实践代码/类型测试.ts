//元组类型
let x: [string, number] = ['hello', 20]
console.log(x);

//枚举类型
//如果不给赋值就默认是0,1,2
enum Color { Red = 1, Green = 2, Blue = 4 }
let c: Color = Color.Green
console.log(c);
let colorName: string = Color[2]
console.log(colorName)//Green

enum ShapeKind {
    Circle,
    Square
}

interface Circle {
    kind: ShapeKind.Circle;
    radius: number
}
interface Square {
    kind: ShapeKind.Square;
    sideLength: number
}
let cir: Circle = {
    kind: ShapeKind.Circle,
    radius: 100
}

console.log(cir)//{kind: 0, radius: 100}


