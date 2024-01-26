const addNewRow = () => {
    var table = document.getElementById("user-details-table");
    var newRow = table.insertRow(table.rows.length);
    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);
    var cell4 = newRow.insertCell(3);
    var cell5 = newRow.insertCell(4);
    var cell6 = newRow.insertCell(5);
    var cell7 = newRow.insertCell(6);
    var cell8 = newRow.insertCell(7);
    var cell9 = newRow.insertCell(8);
    const nextRow = table.rows.length - 1;
    cell1.innerHTML = '<input type="text" name="description' + nextRow + '1">';
    cell2.innerHTML = '<input type="text" name="type' + nextRow + '2">';
    cell3.innerHTML = '<input type="text" name="year' + nextRow + '3">';
    cell4.innerHTML = '<input type="text" name="make' + nextRow + '4">';
    cell5.innerHTML = '<input type="text" name="model' + nextRow + '5">';
    cell6.innerHTML = '<input type="text" name="annual-vkt' + nextRow + '6">';
    cell7.innerHTML = '<input type="text" name="fuel-type' + nextRow + '7">';
    cell8.innerHTML = '<input type="text" name="flex-fuel' + nextRow + '8">';
    cell9.innerHTML = '<input type="text" name="quantity' + nextRow + '9">';
}