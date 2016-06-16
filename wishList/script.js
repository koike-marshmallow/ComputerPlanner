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
}

$(document).ready(function(){
  DETAILS_TABLE = new DetailsTable();
  DETAILS_TABLE.addRow("key1");
  updateDetailsTable();
});
