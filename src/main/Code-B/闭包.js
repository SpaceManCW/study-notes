var name = "The Window";
var object = {
 name : "My Object",
  getNameFunc : function(){
    return function(){
      return this.name;
    }
  }
};
console.log(object.getNameFunc()());


// var name2 = "The Window";
// var object2 = {
//   name2 : "My Object",
//   getNameFunc : function(){
//     var that = this;
//     return function(){
//       return that.name2;
//     };
//   }
// };
// console.log(object2.getNameFunc()());