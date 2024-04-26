class Employee {
    get fullName() {
        console.log("执行了get");
        return this.fullName;
    }
    set fullName(newName) {
        console.log("执行了set");
        this._fullName = newName;
    }
}
let employee = new Employee();
employee.fullName = "米诺";
