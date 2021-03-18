function UpdateData() {
  var updateStatement =
    "UPDATE Emp SET firstName = ?, lastName = ?,city=?,state=? ,phone = ?,email=? WHERE id = ?";
  db.transaction(function (tx) {
    tx.executeSql(
      updateStatement,
      [
        firstName.value,
        lastName.value,
        city.value,
        state.value,
        phone.value,
        email.value,
        id.value
      ],
      showdatacleardata,
      ShowErrorMessage
    );
  });
}
var loadFile = function (event) {
  var image = document.getElementById("output");
  image.src = URL.createObjectURL(event.target.files[0]);
};
