var DetailsTable = function(){
  this.labels = [];
  this.inputs = [];
}

DetailsTable.prototype.createDetailsInput = function(labelName){
  return $("<input></input>").attr("type", "text")
    .attr("class", "form-control details-table-input")
    .data("label", labelName);
}

DetailsTable.prototype.clearRows = function(){
  this.labels = [];
  this.inputs = [];
}

DetailsTable.prototype.setInitialRows = function(labels){
  for(var i=0; i<arguments.length; i++){
    if( jQuery.isArray(arguments[i]) ){
      for(var j=0; j<arguments[i].length; j++){
        this.addRow(arguments[i][j]);
      }
    }else{
      this.addRow(arguments[i]);
    }
  }
}

DetailsTable.prototype.addRow = function(labelName){
  var aryFilter = function(elm, idx, ary){ return elm == labelName; };
  if( this.labels.filter(aryFilter) <= 0 ){
    this.labels.push(labelName);
    this.inputs.push(this.createDetailsInput(labelName));
  }
  return this;
}

DetailsTable.prototype.removeRow = function(labelName){
  for(var i=0; i<this.labels.length; i++){
    if( this.labels[i] == labelName ){
      this.labels.splice(i, 1);
      this.inputs.splice(i, 1);
      return true;
    }
  }
  return false;
}

DetailsTable.prototype.setValue = function(label, value, force_insert){
  for(var i=0; i<this.labels.length; i++){
    if( this.labels[i] == label ){
      this.inputs[i].val(value);
      return true;
    }
  }
  if( force_insert ){
    this.addRow(label);
    this.inputs[this.inputs.length - 1].val(value);
    return true;
  }
  return false;
}

DetailsTable.prototype.generateTableRow = function(label, input){
  return $("<tr></tr>").append(
    $("<td></td>").text(label),
    $("<td></td>").append(input),
    $("<td></td>").append(
      $("<button></button>").append(
        $("<span></span>").addClass("glyphicon glyphicon-remove"))
        .addClass("details-table-remove-btn")
        .data("label", label)
        .addClass("btn btn-default btn-xs")
    )
  );
}

DetailsTable.prototype.generateTableBody = function(){
  var tbody = $("<tbody></tbody>");
  for(var i=0; i<this.labels.length; i++){
    tbody.append(
      this.generateTableRow(this.labels[i], this.inputs[i])
    )
  }
  return tbody;
}

DetailsTable.prototype.getValues = function(){
  var values = {};
  for(var i=0; i<this.labels.length; i++){
    values[this.labels[i]] = this.inputs[i].val();
  }
  return values;
}
