var Item = function(name, price){
  if( name !== undefined ) this.name = name;
  if( price !== undefined ) this.price = price;
}

Item.prototype.name = "no name";
Item.prototype.price = 0;
Item.prototype.detail = {};
Item.prototype.comment = "";

Item.prototype.getName = function(){ return this.name; };
Item.prototype.setName = function(name){ this.name = name; };
Item.prototype.getPrice = function(){ return this.price; };
Item.prototype.setPrice = function(price){ this.price = price };

Item.prototype.setDetail = function(l, v){
  if( l !== undefined ){
    if( v !== undefined && v !== null ){
      this.detail[l] = v;
    }else{
      delete this.detail[l];
    }
  }
}

Item.prototype.getDetail = function(l){
  return this.detail[l];
}

Item.prototype.getDetailList = function(){
  var list = [];
  for(var p in this.detail){
    list.push({label:p, value:this.detail[p]});
  }
  return list;
}

Item.prototype.getDetailString = function(){
  var str = "";
  for(var p in this.detail){
    str += this.detail[p] + ";";
  }
  return str;
}

Item.prototype.getComment = function(){ return this.comment; };
Item.prototype.setComment = function(com){ this.comment = com; };

Item.prototype.toString = function(){
  var str = "Item@";
  str += this.name;
  str += "[" + this.price + "]";
  str += "(" + this.getDetailString() + ")";
}
