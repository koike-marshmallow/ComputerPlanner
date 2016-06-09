var Gadget = function(name, category, price){
  this.name = name !== undefined ? name : "no name";
  this.category = category !== undefined ? category : "others";
  this.price = price !== undefined ? price : 0;
}

Gadget.prototype.name = "no name";
Gadget.prototype.category = "others";
Gadget.prototype.price = 0;
Gadget.prototype.specs = {};

Gadget.getName = function(){
  return this.name;
}

Gadget.setName = function(name){
  this.name = name;
}

Gadget.getCategory = function(){
  return this.category;
}

Gadget.setCategory = function(category){
  this.category = category;
}

Gadget.getPrice = function(){
  return this.price;
}

Gadget.setPrice = function(price){
  this.price = price;
}

Gadget.clearSpecs = function(){
  this.specs = {};
}

Gadget.setSpec = function(l0, v0){
  this.specs[l0] = v0;
}

Gadget.getSpec = function(l0){
  return this.specs[l0];
}

Gadget.getSpecs = function(){
  var list = [];
  for(var p in this.specs){
    list.push({label:p, value:this.specs[p]});
  }
  return list;
}
