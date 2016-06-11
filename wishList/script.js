var ITEMLIST = null;

$(document).ready(function(){
  ITEMLIST = new ItemList("test");
  ITEMLIST.add(new Item("粒あんパン", 145));
  ITEMLIST.add(new Item("デニッシュロール", 105));
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
        $("<th></th>").text("価格")
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
        $("<td></td>").text(item.getPrice())
      )
    );
  }
  tbody.append(
    $("<tr></tr>").append(
      $("<td></td>").attr("colspan", "2")
        .text("合計"),
      $("<td></td>").text(list.getSumPrice())
    )
  );
  table.append(tbody);
}
