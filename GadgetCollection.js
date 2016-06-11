var GadgetCollection = function(){
    this.groups = [];
};

GadgetCollection.prototype.groups = null;

GadgetCollection.prototype.getGroupIndex = function(groupLabel){
    for(var i=0; i<this.groups.length; i++){
        if( this.groups[i].getLabel() == groupLabel ){
            return i;
        }
    }
    return null;
}

GadgetCollection.prototype.createGroup = function(groupName){
    if( this.getGroupIndex(groupName) == null ){
        var idx = this.groups.length;
        this.groups.push(new ItemList(groupName));
        return idx;
    }
    return null;
}

GadgetCollection.prototype.add = function(groupName, item){
    var gidx = this.getGroupIndex(groupName);
    if( gidx != null ){
        this.groups[gidx].add(item);
    }else{
        gidx = this.createGroup(groupName);
        this.groups[gidx].add(item);
    }
}
