var ITEM_LIST = null;
var DETAILS_TABLE = null;

function generateInitialItemList(){
  var list = new ItemList("test");
  list.add(new Item("item1", 300).setDetail("key1", "5b33"));
  list.add(new Item("item2", 500));
  return list;
}

function updateItemListTable(){
  var tbody = $("<tbody></tbody>");
  var sumPrice = 0;

  var dlabels = ITEM_LIST.allDetailLabels();

  for(var i=0; i<ITEM_LIST.length(); i++){
    var item = ITEM_LIST.get(i);

    var editBtn = $("<button></button>")
      .attr("type", "button")
      .addClass("btn btn-default")
      .attr("data-toggle", "modal")
      .attr("data-target", "#itemEditModal")
      .data("command", "edit")
      .data("index", i)
      .append(Utils.glyphicon("pencil"), "編集");
    var deleteBtn = $("<button></button>")
      .attr("type", "button")
      .addClass("btn btn-default")
      .attr("data-toggle", "modal")
      .attr("data-target", "#itemRemoveModal")
      .data("index", i)
      .append(Utils.glyphicon("trash"), "削除");

    var tr = $("<tr></tr>").append(
      $("<td></td>").text(i + 1),
      $("<td></td>").text(item.getName())
    );
    for(var j=0; j<dlabels.length; j++){
      var tmp = item.getDetail(dlabels[j]);
      tr.append($("<td></td>").text(tmp ? tmp : ""));
    }
    tr.append(
      $("<td></td>").text(item.getPrice()),
      $("<td></td>").append(editBtn, deleteBtn)
    );

    tbody.append(tr);
    sumPrice += item.getPrice();
  }
  tbody.append(
    $("<tr></tr>").append(
      $("<td></td>").attr("colspan", "2")
        .text("合計"),
      $("<td></td>").attr("colspan", 2 + dlabels.length)
        .text(sumPrice)
    )
  );

  $(".itemlist-table").empty().append(
    Utils.tableHead("id", "名前", dlabels, "価格", "操作"),
    tbody
  );

  localStorage.setItem('itemlist', ItemList.stringifyJson(ITEM_LIST));
}

function updateDetailsTable(){
  if( DETAILS_TABLE != null ){
    $("#itemFormDetailsTable").empty().append(
      $("<thead></thead>").append(
        $("<tr></tr>").append(
          $("<th></th>").text("項目"),
          $("<th></th>").text("値"),
          $("<th></th>").text("")
        )
      ),
      DETAILS_TABLE.generateTableBody()
    );
  }
  $(".details-table-remove-btn").on('click', function(event){
    var label = $(this).data("label");
    if( label && confirm("項目名" + label + "を除去してもよろしいですか？") ){
      DETAILS_TABLE.removeRow(label);
      updateDetailsTable();
    }
  });
}

function initItemEditDialog(com, idx){
  var submitBtn = $(".item-edit-dialog-submit-btn");

  $("#itemFormInputName").val("");
  $("#itemFormInputPrice").val("");
  DETAILS_TABLE.clearRows();
  DETAILS_TABLE.setInitialRows(ITEM_LIST.allDetailLabels());
  $("#itemFormInputComment").val("");

  if( com == "add" ){
    submitBtn.data("command", "add");
  }else if( com == "edit" ){
    var item = ITEM_LIST.get(idx);
    if( item ){
      $("#itemFormInputName").val(item.getName());
      $("#itemFormInputPrice").val(item.getPrice());
      $("#itemFormInputComment").val(item.getComment());
      var details = item.getDetailList();
      for(var i=0; i<details.length; i++){
        DETAILS_TABLE.setValue(details[i].label, details[i].value, true);
      }
    }
    submitBtn.data("command", "edit").data("index", idx);
  }

  updateDetailsTable();
}

function parseItemForm(){
  var item = new Item();
  item.setName($("#itemFormInputName").val());
  item.setPrice($("#itemFormInputPrice").val());
  var details = DETAILS_TABLE.getValues();
  console.log(details);
  for(var i=0; i<details.length; i++){
    item.setDetail(details[i].label, details[i].value);
  }
  item.setComment($("#itemFormInputComment").val());
  console.log(item.toString());
  return item;
}

$(document).ready(function(){
  var resource = localStorage.getItem('itemlist');
  if( resource !== undefined && resource != null ){
    ITEM_LIST = ItemList.parseJson(resource);
  }else{
    ITEM_LIST = generateInitialItemList();
  }
  DETAILS_TABLE = new DetailsTable();
  updateItemListTable();
  updateDetailsTable();
});

$(".init-btn").on('click', function(event){
  if( confirm("ウィッシュリストを初期化します。よろしいですか？") ){
    localStorage.removeItem('itemlist');
    ITEM_LIST = generateInitialItemList();
    updateItemListTable();
  }
});

$(".item-edit-dialog").on('show.bs.modal', function(event){
  var rel = $(event.relatedTarget);
  var rel_command = rel.data("command");
  var rel_index = rel.data("index");
  initItemEditDialog(rel_command, rel_index);
})

$(".item-remove-dialog").on('show.bs.modal', function(event){
  var rel = $(event.relatedTarget);
  var rel_index = rel.data("index");
  var idx = parseInt(rel_index);
  if( idx >= 0 && idx < ITEM_LIST.length() ){
    $(".item-remove-dialog-item-name").text(ITEM_LIST.get(idx).getName());
    $(".item-remove-dialog-submit-btn").on('click', function(){
      ITEM_LIST.remove(idx);
      updateItemListTable();
    });
  }else{
    alert("error");
  }
});

$(".details-table-add-btn").on('click', function(event){
  var label = prompt("新しい項目名を入力してください");
  if( label ){
    DETAILS_TABLE.addRow(label);
    updateDetailsTable();
  }
});

$(".item-edit-dialog-submit-btn").on('click', function(event){
  var t = $(this);
  var t_command = t.data("command");
  if( t_command == "add" ){
    var item = parseItemForm();
    ITEM_LIST.add(item);
    updateItemListTable();
  }else{
    var item = parseItemForm();
    var t_index = parseInt(t.data("index"));
    ITEM_LIST.set(t_index, item);
    updateItemListTable();
  }
});
