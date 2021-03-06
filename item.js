var Item = function(name, price){
  if( name !== undefined ) this.name = name;
  if( price !== undefined ) this.setPrice(price);
  this.detail = {};
  this.enabled = true;
}

Item.prototype.name = "no name";
Item.prototype.price = 0;
Item.prototype.detail = {};
Item.prototype.comment = "";
Item.prototype.enabled = true;

Item.prototype.getName = function(){ return this.name; };
Item.prototype.setName = function(name){ this.name = name; return this;};
Item.prototype.getPrice = function(){ return this.price; };
Item.prototype.setPrice = function(price){ this.price = parseInt(price); return this;};

Item.prototype.setDetail = function(l, v){
  if( l !== undefined ){
    if( v !== undefined && v !== null ){
      this.detail[l] = v;
    }else{
      delete this.detail[l];
    }
  }
  return this;
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
    str += p + ":" + this.detail[p] + ";";
  }
  return str;
}

Item.prototype.getComment = function(){ return this.comment; };
Item.prototype.setComment = function(com){ this.comment = com; return this;};
Item.prototype.isEnabled = function(){ return this.enabled; };
Item.prototype.setEnabled = function(b){ this.enabled = b; return this;};

Item.prototype.toString = function(){
  var str = "Item@";
  str += this.name;
  str += "[" + this.price + "]";
  str += "(" + this.getDetailString() + ")";
  return str;
}

Item.stringifyJson = function(item){
  var data = {}
  data.name = item.name;
  data.price = item.price;
  data.detail = item.detail;
  data.enabled = item.enabled;
  data.comment = item.comment;
  return JSON.stringify(data);
}

Item.parseJson = function(json){
  var pdata;
  try{pdata = JSON.parse(json);}
  catch(e){return null;}

  var item = new Item(pdata.name, pdata.price);
  item.detail = pdata.detail;
  item.comment = pdata.comment;
  item.enabled = pdata.enabled;

  return item;
}
