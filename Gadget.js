var Gadget = function(name, category, price){
  this.name = name !== undefined ? name : "no name";
  this.category = category !== undefined ? category : "others";
  this.price = price !== undefined ? price : 0;
};

Gadget.prototype.name = "no name";
Gadget.prototype.category = "others";
Gadget.prototype.price = 0;
Gadget.prototype.specs = {};

Gadget.prototype.getName = function(){
  return this.name;
};

Gadget.prototype.setName = function(name){
  this.name = name;
};

Gadget.prototype.getCategory = function(){
  return this.category;
};

Gadget.prototype.setCategory = function(category){
  this.category = category;
};

Gadget.prototype.getPrice = function(){
  return this.price;
};

Gadget.prototype.setPrice = function(price){
  this.price = price;
};

Gadget.prototype.clearSpecs = function(){
  this.specs = {};
};

Gadget.prototype.setSpec = function(l0, v0){
  this.specs[l0] = v0;
};

Gadget.prototype.getSpec = function(l0){
  return this.specs[l0];
};

Gadget.prototype.getSpecs = function(){
  var list = [];
  for(var p in this.specs){
    list.push({label:p, value:this.specs[p]});
  }
  return list;
};

Gadget.prototype.getSpecString = function(){
  var str = "";
  for(var p in this.specs){
    str += this.specs[p] + ";";
  }
}
