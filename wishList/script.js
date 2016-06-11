var ITEMLIST = null;

function createItemDialogButton(contents, classValue, params){
  console.log(params.index);
  var button = $("<button></button>")
    .append(contents)
    .attr("class", classValue);
  if( params.target ) button.attr("data-toggle", "modal")
    .attr("data-target", params.target);
  if( params.command ) button.attr("data-command", params.command);
  if( params.index !== undefined ) button.attr("data-index", params.index);
  if( params.onClickCallback ) button.on('click', params.onClickCallback);
  return button;
}

function createGlyphiconElement(glyphiconName){
  return $("<span></span>").attr("class", "glyphicon " + glyphiconName);
}


$(document).ready(function(){
  ITEMLIST = new ItemList("test");
  ITEMLIST.add(new Item("粒あんパン", 145));
  ITEMLIST.add(new Item("デニッシュロール", 105));
  setItemlistToTable($(".itemlist-table"), ITEMLIST);
});

$(".itemDialog").on('show.bs.modal', function(event){
  var btn = $(event.relatedTarget);
  var applyBtn = $(".itemFormApplyBtn");
  var command = btn.data("command");
  var index = btn.data("index");
  var form_name = $("#itemForm-ItemName");
  var form_price = $("#itemForm-ItemPrice");

  if( command == "add" ){
    applyBtn.data("command", "add");
    form_name.val("");
    form_price.val("");

  }else if( command == "edit" ){
    if( index >= 0 && index < ITEMLIST.length() ){
      applyBtn.data("command", "edit");
      applyBtn.data("index", index);
      form_name.val(ITEMLIST.get(index).getName());
      form_price.val(ITEMLIST.get(index).getPrice());
    }

  }else{
    console.log("undefined command:" + command);
  }
});

$(".itemFormApplyBtn").on('click', function(event){
  var iname = $("#itemForm-ItemName").val();
  var iprice = $("#itemForm-ItemPrice").val();
  var com = $(this).data("command");
  $(this).data("command", null);
  var idx = $(this).data("index");
  $(this).data("index", null);

  if( com == "add" ){
    ITEMLIST.add(new Item(iname, iprice));

  }else if( com == "edit" ){
    if( idx >= 0 && idx < ITEMLIST.length() ){
      ITEMLIST.set(idx, new Item(iname, iprice));
    }

  }else{
    console.log("undefined command: " + com);
  }
  $(".itemDialog").modal('hide');
  setItemlistToTable($(".itemlist-table"), ITEMLIST);
});

function setItemlistToTable(table, list){
  console.log("reload");
  console.log(list.toString());
  table.empty();
  table.append(
    $("<thead></thead>").append(
      $("<tr></tr>").append(
        $("<th></th>").text("id"),
        $("<th></th>").text("名前"),
        $("<th></th>").text("価格"),
        $("<th></th>").text("操作")
      )
    )
  );

  var tbody = $("<tbody></tbody>");
  var deleteBtnCallback = function(event){
    var idx = $(this).data("index");
    if( idx >= 0 && idx < ITEMLIST.length() ){
      if( confirm(ITEMLIST.get(idx).getName() + "を削除しますか？") ){
        ITEMLIST.remove(idx);
        updateItemList();
      }
    }
  }

  for(var i=0; i<list.length(); i++){
    var item = list.get(i);
    var editBtn = createItemDialogButton(
      [createGlyphiconElement("dlyphicon-pencil"), "編集"],
      "btn btn-default",
      {target:"#myModal", command: "edit", index:i});
    var deleteBtn = createItemDialogButton(
      [createGlyphiconElement("glyphicon-trash"), "削除"],
      "btn btn-default",
      {command:"edit", index:i, onClickCallback:deleteBtnCallback});

    tbody.append(
      $("<tr></tr>").append(
        $("<td></td>").text(i),
        $("<td></td>").text(item.getName()),
        $("<td></td>").text(item.getPrice()),
        $("<td></td>").append(editBtn, deleteBtn)
      )
    );
  }
  
  tbody.append(
    $("<tr></tr>").append(
      $("<td></td>").attr("colspan", "2")
        .text("合計"),
      $("<td></td>").text(list.getSumPrice()),
      $("<td></td>")
    )
  );
  table.append(tbody);
}


function updateItemList(){
  setItemlistToTable($(".itemlist-table"), ITEMLIST);
}
