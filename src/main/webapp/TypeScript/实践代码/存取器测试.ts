class Employee {
    private _fullName: string

    get fullName(): string {
        console.log("执行了get")
        return this.fullName
    }

    set fullName(newName: string) {
        console.log("执行了set")
        this._fullName = newName
    }
}
let employee = new Employee()
employee.fullName = "米诺"
//打印：“执行了set”