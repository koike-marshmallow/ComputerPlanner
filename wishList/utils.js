var Utils = {};

Utils.tableHead = function (labels){
  var container = $("<tr></tr>");
  for(var i=0; i<arguments.length; i++){
    if( jQuery.isArray(arguments[i]) ){
      for(var j=0; j<arguments[i].length; j++){
        container.append($("<th></th>").text(arguments[i][j]));
      }
    }else{
      container.append($("<th></th>").text(arguments[i]));
    }
  }
  return $("<thead></thead>").append(container);
}

Utils.glyphicon = function(unique){
  return $("<span></span>").addClass("glyphicon")
    .addClass("glyphicon-" + unique);
}
