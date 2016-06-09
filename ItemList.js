var ItemList = function(label){
  if( label !== undefined ) this.label = label;
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

ItemList.prototype.get = function(idx){
  return this.list[idx];
}

ItemList.prototype.remove = function(idx){
  this.list.splice(idx, 1);
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

ItemList.prototype.toString = function(){
  str = "ItemList@\"" + this.label + "\"\n";
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
