var ItemList = function(label){
  if( label !== undefined ) this.label = label;
  this.list = [];
};

ItemList.prototype.label = "";
ItemList.prototype.list = [];

ItemList.prototype.getLabel = function(){ return this.label; };
ItemList.prototype.setLabel = function(label){ this.label = label; };

ItemList.prototype.add = function(item){
  this.list.push(item);
}

ItemList.prototype.insert = function(idx, item){
  this.list.splice(idx, 0, item);
}

ItemList.prototype.set = function(idx, item){
  this.list[idx] = item;
}

ItemList.prototype.get = function(idx){
  return this.list[idx];
}

ItemList.prototype.remove = function(idx){
  this.list.splice(idx, 1);
}

ItemList.prototype.setEnabled = function(idx, b){
    this.list[idx].setEnabled(b);
}

ItemList.prototype.filter = function(filter){
  var result = [];
  if( filter.eval() ){
    for(var i=0; i<this.list.length; i++){
      if( filter.eval(this.list[i]) ){
        result.push({index:i, item:this.list[i]});
      }
    }
  }
  return result;
}

ItemList.prototype.length = function(){
  return this.list.length;
}

ItemList.prototype.getSumPrice = function(all){
    var price = 0;
    for(var i=0; i<this.list.length; i++){
        if( this.list[i].isEnabled() || all ){
            price += this.list[i].getPrice();
        }
    }
    return price;
}

ItemList.prototype.toString = function(){
  str = "ItemList@\"" + this.label + "\"(" + this.length() + ")\n";
  for(var i=0; i<this.list.length; i++){
    str += "  " + i + ": ";
    if( this.list[i].toString() ){
      str += this.list[i].toString();
    }else{
      str += "unexpected format";
    }
    if( i !== (this.list.length - 1) ) str += "\n";
  }
  return str;
}

ItemList.stringifyJson = function(items){
  var data = {};
  data.label = items.label;
  data.itemJsons = [];
  for(var i=0; i<items.length(); i++){
    data.itemJsons.push(Item.stringifyJson(items.get(i)));
  }
  return JSON.stringify(data);
}

ItemList.parseJson = function(json){
  var pdata;
  try{pdata = JSON.parse(json);}
  catch(e){return null;}

  var li = new ItemList(pdata.label);
  for(var i=0; i<pdata.itemJsons.length; i++){
    var tmp = Item.parseJson(pdata.itemJsons[i]);
    if( tmp != null ){
      li.add(tmp);
    }
  }

  return li;
}
