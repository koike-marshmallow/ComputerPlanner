var DETAILS_TABLE = null;

function updateDetailsTable(){
  console.log("details table update");
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

$(document).ready(function(){
  DETAILS_TABLE = new DetailsTable();
  DETAILS_TABLE.addRow("key1");
  updateDetailsTable();
});

$(".details-table-add-btn").on('click', function(event){
  var label = prompt("新しい項目名を入力してください");
  if( label ){
    DETAILS_TABLE.addRow(label);
    updateDetailsTable();
  }
});
