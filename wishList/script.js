var ITEMLIST = null;

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
  for(var i=0; i<list.length(); i++){
    var item = list.get(i);
    tbody.append(
      $("<tr></tr>").append(
        $("<td></td>").text(i),
        $("<td></td>").text(item.getName()),
        $("<td></td>").text(item.getPrice()),
        $("<td></td>").append(
          $("<button></button>")
          .attr("data-toggle", "modal")
          .attr("data-target", "#myModal")
          .attr("data-command", "edit")
          .attr("data-index", i).append(
            $("<span></span>").attr("class", "glyphicon glyphicon-pencil"),
            "編集"
          ).attr("class", "btn btn-default")
        )
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
