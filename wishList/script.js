var ITEM_LIST = null;
var DETAILS_TABLE = null;

function generateInitialItemList(){
  var list = new ItemList("test");
  list.add(new Item("item1", 300).setDetail("key1", "5b33"));
  list.add(new Item("item2", 500));
  console.log("init: " + ItemList.stringifyJson(list));
  console.log(list.allDetailLabels());
  return list;
}

function updateItemListTable(){
  var tbody = $("<tbody></tbody>");
  var sumPrice = 0;

  for(var i=0; i<ITEM_LIST.length(); i++){
    var item = ITEM_LIST.get(i);
    tbody.append(
      $("<tr></tr>").append(
        $("<td></td>").text(i + 1),
        $("<td></td>").text(item.getName()),
        $("<td></td>").text(item.getPrice()),
        $("<td></td>").append(
          $("<button></button>")
            .attr("type", "button")
            .addClass("btn btn-default")
            .append(Utils.glyphicon("pencil"), "編集"),
          $("<button></button>")
            .attr("type", "button")
            .addClass("btn btn-default")
            .append(Utils.glyphicon("trash"), "削除")
        )
      )
    );
    sumPrice += item.getPrice();
  }
  tbody.append(
    $("<tr></tr>").append(
      $("<td></td>").attr("colspan", "2")
        .text("合計"),
      $("<td></td>").attr("colspan", "2")
        .text(sumPrice)
    )
  );

  $(".itemlist-table").empty().append(
    Utils.tableHead("id", "名前", "価格", "操作"),
    tbody
  );
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
  console.log(DETAILS_TABLE.getValues());
}

function initItemEditDialog(com, idx){
  $("#itemFormInputName").val("");
  $("#itemFormInputPrice").val("");
  DETAILS_TABLE.clearRows();
  DETAILS_TABLE.setInitialRows(ITEM_LIST.allDetailLabels());
  updateDetailsTable();
  $("#itemFormInputComment").val("");

  if( com == "add" ){
    //addのとき
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
  }
}

$(document).ready(function(){
  DETAILS_TABLE = new DetailsTable();
  ITEM_LIST = generateInitialItemList();
  updateItemListTable();
  updateDetailsTable();
});

$(".item-edit-dialog").on('show.bs.modal', function(event){
  var rel = $(event.relatedTarget);
  var rel_command = rel.data("command");
  var rel_index = rel.data("index");
  console.log("item-edit-dialog:show.bs.modal > comannd\"" + rel_command + "\"");
  initItemEditDialog(rel_command, rel_index);
})

$(".details-table-add-btn").on('click', function(event){
  var label = prompt("新しい項目名を入力してください");
  if( label ){
    DETAILS_TABLE.addRow(label);
    updateDetailsTable();
  }
});
