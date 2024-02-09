const provinceData = [];
const userData = [];

const startCar = () => {
    const loader = document.getElementById("loader-wrapper");
    loader.style.display = 'flex';
    const start = document.querySelector('.start-car');
    const table = document.querySelector('.table-cont');
    table.classList.remove('display-none');
    table.scrollIntoView();
    fetchEmissionCoefficient();
    loader.style.display = 'none';
    var car = document.querySelector('.car');
    // car.style.animation = 'run 10s linear infinite';
    car.style.animationPlayState = 'running';
}

const fetchEmissionCoefficient = () => {
    fetch('https://www.canada.ca/en/environment-climate-change/services/climate-change/pricing-pollution-how-it-will-work/output-based-pricing-system/federal-greenhouse-gas-offset-system/emission-factors-reference-values.html')
        .then(response => response.text())
        .then(htmlResponse => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlResponse, 'text/html');

            const table = doc.querySelector('#table_6');
            const rows = table.querySelectorAll('tbody tr');


            rows.forEach(row => {
                const columns = row.querySelectorAll('th, td');
                const province = columns[0].textContent.trim();
                const consumptionIntensity = parseFloat(columns[1].textContent.trim());

                provinceData.push({ province, consumptionIntensity });
            });

            const selectElement = document.querySelector('.province-select-type');
            provinceData.forEach(province => {
                const option = document.createElement('option');
                option.value = province.province;
                option.textContent = province.province;
                selectElement.appendChild(option);
            });
            selectElement.value = 'Ontario'
            const selectedData = provinceData.find(data => data.province === 'Ontario');

            if (selectedData) {
                const consumptionIntensityElement = document.querySelector('.province-value');
                consumptionIntensityElement.textContent = `${selectedData.consumptionIntensity} g CO2e/kWh`;
                localStorage.setItem("intensity", selectedData.consumptionIntensity);
            }
        })
        .catch(error => console.error('Error fetching data:', error));

}

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


const saveData = () => {
    var table = document.getElementById("user-details-table")
    var data = [];
    var isValid = true;
    for (var i = 1; i < table.rows.length; i++) {
        var rowData = {};
        for (var j = 1; j <= 9; j++) {
            var input = table.rows[i].cells[j - 1].querySelector('input');
            if (!input.value) {
                isValid = false;
            }
            rowData[input.name] = input.value;
        }
        if (!isValid) {
            alert('Please provide all the values');
            break;
        }
        data.push(rowData);
    }

    if (isValid) {
        var jsonData = JSON.stringify(data, null, 2);
        var blob = new Blob([jsonData], { type: 'application/json' });
        var a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'saved_data.json';
        a.click();
    }
}
const loadData = () => {
    var fileInput = document.getElementById('fileInput');
    var file = fileInput.files[0];

    if (file) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var data = JSON.parse(e.target.result);
            var table = document.getElementById("user-details-table")
            // Clearing the existing values
            table.innerHTML = '<tr><th>Description</th><th>Type</th><th>Year</th><th>Make</th><th>Model</th><th>Annual VKT</th><th>Fuel Type</th><th>Flex-Fuel</th><th>Quantity</th></tr > ';

            // Populating data
            for (var i = 0; i < data.length; i++) {
                var newRow = table.insertRow(table.rows.length);
                for (var j = 1; j <= 9; j++) {
                    var cell = newRow.insertCell(j - 1);
                    console.log(data[i], cell);
                    cell.innerHTML = '<input type="text" name="data' + (i + 1) + j + '" value="' + data[i]['Column' + j] + '">';
                }
            }
        };

        reader.readAsText(file);
    }
}


const calculate = () => {
    var table = document.getElementById("user-details-table")
    var data = [];
    var isValid = true;
    for (var i = 1; i < table.rows.length; i++) {
        var rowData = {};
        for (var j = 1; j <= 9; j++) {
            var input = table.rows[i].cells[j - 1].querySelector('input');
            if (!input.value) {
                isValid = false;
                break;
            }
            rowData[input.name] = input.value;
        }
        data.push(rowData);
    }
    if (isValid) {
        console.log(data);
        data.map((val) => {

        })
    }
    else {
        alert('Please provide all the values');
    }
}