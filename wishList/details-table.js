var DetailsTable = function(){
  this.labels = [];
  this.inputs = [];
}

DetailsTable.prototype.createDetailsInput = function(labelName){
  return $("<input></input>").attr("type", "text")
    .attr("class", "form-control details-table-input")
    .data("label", labelName);
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
