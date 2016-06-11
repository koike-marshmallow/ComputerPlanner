var ITEMLIST = null;
var FORM = null;

function initList(){
  ITEMLIST = new ItemList();
}

function initForm(dest, idx){
  FORM = {};
  FORM.target = idx !== undefined ? idx : null;
  FORM.finame = $("<input></input>")
    .attr("type", "text");
  FORM.fiprice = $("<input></input>")
    .attr("type", "text");

  if( idx !== undefined && idx !== null ){
    FORM.finame.val(ITEMLIST.get(idx).getName());
    FORM.fiprice.val(ITEMLIST.get(idx).getPrice());
  }

  dest.append(
    $("<table></table>").append(
      $("<tr></tr>").append(
        $("<td></td>").text("名前"),
        $("<td></td>").append(FORM.finame)
      ),
      $("<tr></tr>").append(
        $("<td></td>").text("価格"),
        $("<td></td>").append(FORM.fiprice)
      )
    )
  );
}


}
