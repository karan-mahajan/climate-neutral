const provinceData = [];
const userData = [];

/**
 * The `startCar` function displays a loader, shows a table, fetches an emission coefficient, hides the
 * loader, and starts an animation for a car.
 */
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

/**
 * The function `displayConsumptionIntensity` retrieves the selected province from a dropdown menu,
 * finds the corresponding data for that province, and updates the DOM with the consumption intensity
 * value for that province.
 */
const displayConsumptionIntensity = () => {
    const selectedProvince = document.querySelector('.province-select-type').value;
    const selectedData = provinceData.find(data => data.province === selectedProvince);

    if (selectedData) {
        const consumptionIntensityElement = document.querySelector('.province-value');
        consumptionIntensityElement.textContent = `${selectedData.consumptionIntensity} g CO2e/kWh`;
        localStorage.setItem("intensity", selectedData.consumptionIntensity);
    }
}

/**
 * The function fetches emission coefficients for different provinces in Canada from a website and
 * populates a select element with the province names, and sets the default value to Ontario.
 */
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

window.onscroll = function () { scrollFunction() };

/**
 * The scrollFunction checks if the user has scrolled down a certain distance and displays or hides a
 * "go to top" button accordingly.
 */
function scrollFunction() {
    const topButton = document.querySelector("#gototop");
    const header = document.querySelector(".header");
    const sticky = header.offsetTop;
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        topButton.style.display = "block";
    } else {
        topButton.style.display = "none";
    }
}

/**
 * The function `goToTop` scrolls the page to the top, clears the content of a table with the id
 * "user-details-table", and adds a new row to the table.
 */
const goToTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    var table = document.getElementById("user-details-table");
    // Clearing the existing values
    table.innerHTML = '<tr><th>Description</th><th>Type</th><th>Year</th><th>Make</th><th>Model</th><th>Annual VKT</th><th>Annual Fuel</th><th>Fuel Type</th><th>Flex-Fuel</th><th>Quantity</th></tr > ';
    addNewRow();
}

/**
 * The function `addNewRow` adds a new row to a table with input fields and dropdown menus.
 */
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
    var cell10 = newRow.insertCell(9);
    const nextRow = table.rows.length - 1;
    cell1.innerHTML = '<input type="text" name="description' + nextRow + '0">';
    cell2.innerHTML = `<select name="type${nextRow}1" class="input-select-type">
                                    <option value="Light Duty Truck" selected>Light Duty Truck</option>
                                    <option value="Car">Car</option>
                                    <option value="Biofuel Car">Biofuel Car</option>
                                    <option value="Biofuel E85 Car">Biofuel E85 Car</option>
                                    <option value="Biofuel Truck">Biofuel Truck</option>
                                </select>`
    cell3.innerHTML = '<input type="number" name="year' + nextRow + '2">';
    cell4.innerHTML = '<input type="text" name="make' + nextRow + '3">';
    cell5.innerHTML = '<input type="text" name="model' + nextRow + '4">';
    cell6.innerHTML = '<input type="number" name="annual-vkt' + nextRow + '5">';
    cell7.innerHTML = '<input type="number" name="annual-fuel' + nextRow + '6">';
    cell8.innerHTML = `<select name="fuel-type${nextRow}7" class="input-select-fuel-type">
                                    <option value="Gasoline" selected>Gasoline</option>
                                    <option value="E10 Gasoline">E10 Gasoline</option>
                                    <option value="Diesel">Diesel</option>
                                </select>`
    cell9.innerHTML = `<select name="flex-fuel${nextRow}8" class="input-select">
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>`;
    cell10.innerHTML = '<input type="number" name="quantity' + nextRow + '9">';
}


/**
 * The `saveData` function retrieves data from an HTML table, validates it, and then downloads it as a
 * JSON file if all values are provided.
 */
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

/**
 * The `loadData` function reads a JSON file, parses its contents, and populates a table with the data.
 */
const loadData = () => {
    var fileInput = document.getElementById('fileInput');
    var file = fileInput.files[0];

    if (file) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var data = JSON.parse(e.target.result);
            var table = document.getElementById("user-details-table");



            // Clearing the existing values
            table.innerHTML = '<tr><th>Description</th><th>Type</th><th>Year</th><th>Make</th><th>Model</th><th>Annual VKT</th><th>Annual Fuel</th><th>Fuel Type</th><th>Flex-Fuel</th><th>Quantity</th></tr > ';


            for (var i = 0; i < data.length; i++) {
                var newRow = table.insertRow(table.rows.length);
                var propertyOrder = Object.keys(data[i]);
                for (var j = 0; j < propertyOrder.length; j++) {
                    var propertyName = propertyOrder[j];
                    var cell = newRow.insertCell();
                    var propertyValue = data[i][propertyName];
                    if (propertyName.startsWith('flex-fuel')) {
                        if (propertyValue === 'No') {
                            cell.innerHTML = `<select name="${propertyName}" class="input-select">
                                    <option value="Yes">Yes</option>
                                    <option value="No" selected>No</option>
                                </select>`;
                        }
                        else {
                            cell.innerHTML = `<select name="${propertyName}" class="input-select">
                                    <option value="Yes" selected>Yes</option>
                                    <option value="No">No</option>
                                </select>`;
                        }
                    }
                    else if (propertyName.startsWith('fuel-type')) {
                        if (propertyValue === 'Gasoline') {
                            cell.innerHTML = `<select name="${propertyName}" class="input-select-fuel-type">
                                    <option value="Gasoline" selected>Gasoline</option>
                                    <option value="E10 Gasoline">E10 Gasoline</option>
                                    <option value="Diesel">Diesel</option>
                                </select>`
                        }
                        else if (propertyValue === 'Diesel') {
                            cell.innerHTML = `<select name="${propertyName}" class="input-select-fuel-type">
                                    <option value="Gasoline">Gasoline</option>
                                    <option value="E10 Gasoline">E10 Gasoline</option>
                                    <option value="Diesel" selected>Diesel</option>
                                </select>`
                        } else {
                            cell.innerHTML = `<select name="${propertyName}" class="input-select-fuel-type">
                                    <option value="Gasoline">Gasoline</option>
                                    <option value="E10 Gasoline" selected>E10 Gasoline</option>
                                    <option value="Diesel">Diesel</option>
                                </select>`
                        }
                    }
                    else if (propertyName.startsWith('type')) {
                        if (propertyValue === 'Car') {
                            cell.innerHTML = `<select name="${propertyName}" class="input-select-type">
                                    <option value="Light Duty Truck">Light Duty Truck</option>
                                    <option value="Car" selected>Car</option>
                                    <option value="Biofuel Car">Biofuel Car</option>
                                    <option value="Biofuel E85 Car">Biofuel E85 Car</option>
                                    <option value="Biofuel Truck">Biofuel Truck</option>
                                </select>`
                        }
                        else if (propertyValue === 'Light Duty Truck') {
                            cell.innerHTML = `<select name="${propertyName}" class="input-select-type">
                                    <option value="Light Duty Truck" selected>Light Duty Truck</option>
                                    <option value="Car">Car</option>
                                    <option value="Biofuel Car">Biofuel Car</option>
                                    <option value="Biofuel E85 Car">Biofuel E85 Car</option>
                                    <option value="Biofuel Truck">Biofuel Truck</option>
                                </select>`
                        }
                        else if (propertyValue === 'Biofuel Car') {
                            cell.innerHTML = `<select name="${propertyName}" class="input-select-type">
                                    <option value="Light Duty Truck">Light Duty Truck</option>
                                    <option value="Car">Car</option>
                                    <option value="Biofuel Car" selected>Biofuel Car</option>
                                    <option value="Biofuel E85 Car">Biofuel E85 Car</option>
                                    <option value="Biofuel Truck">Biofuel Truck</option>
                                </select>`
                        }
                        else if (propertyValue === 'Biofuel E85 Car') {
                            cell.innerHTML = `<select name="${propertyName}" class="input-select-type">
                                    <option value="Light Duty Truck">Light Duty Truck</option>
                                    <option value="Car">Car</option>
                                    <option value="Biofuel Car">Biofuel Car</option>
                                    <option value="Biofuel E85 Car" selected>Biofuel E85 Car</option>
                                    <option value="Biofuel Truck">Biofuel Truck</option>
                                </select>`
                        }
                        else if (propertyValue === 'Biofuel Truck') {
                            cell.innerHTML = `<select name="${propertyName}" class="input-select-type">
                                    <option value="Light Duty Truck">Light Duty Truck</option>
                                    <option value="Car">Car</option>
                                    <option value="Biofuel Car">Biofuel Car</option>
                                    <option value="Biofuel E85 Car" selected>Biofuel E85 Car</option>
                                    <option value="Biofuel Truck" selected>Biofuel Truck</option>
                                </select>`
                        }
                    }
                    else if (propertyName.startsWith('year') || propertyName.startsWith('annual') || propertyName.startsWith('quantity') || propertyName.startsWith('annual-fuel')) {
                        cell.innerHTML = `<input type="number" name="${propertyName}" value="${propertyValue}">`;
                    }
                    else {
                        cell.innerHTML = `<input type="text" name="${propertyName}" value="${propertyValue}">`;
                    }
                }
            }
        };

        reader.readAsText(file);
    }

    document.querySelector('.calculate').scrollIntoView();
}

/**
 * The function calculates options based on user values for type, flex fuel, and fuel type.
 * @param userValues - An object containing the user's input values for the type of vehicle, whether it
 * is flex fuel capable, and the fuel type.
 * @returns An array of options based on the user values.
 */
const calculateOptions = (userValues) => {
    const type = getTypeValue(userValues);
    const flexFuel = getFlexFuelValue(userValues);
    const fuelType = getFuelTypeValue(userValues);
    if (type === 'Car' && flexFuel === 'Yes' && fuelType === 'Gasoline') {
        return ['Replace w/ EV Vehicle', 'E85 Ethanol Usage'];
    }
    else if (type === 'Car' && flexFuel === 'No' && fuelType === 'Gasoline') {
        return ['Replace w/ EV Car', 'Replace w/ Biofuel Car E85'];
    }
    else if (type === 'Light Duty Truck' && flexFuel === 'No' && fuelType === 'Gasoline') {
        return ['Replace w/ EV Light Duty Truck', 'Replace w/ Biofuel E85 Light Duty Truck', 'Right Size to Car', 'Right Size to Biofuel Car'];
    }
    else if (type === 'Light Duty Truck' && flexFuel === 'No' && fuelType === 'Diesel') {
        return ['Replace w/ EV Light Duty Truck', 'Replace w/ Biofuel E85 Light Duty Truck', 'Right Size to Car', 'Right Size to Biofuel E85 Car'];
    }
    else if (type === 'Light Duty Truck' && flexFuel === 'Yes' && fuelType === 'Diesel') {
        return ['B20 Diesel Usage', 'Replace w/ EV Light Duty Truck', 'Replace w/ Biofuel E85 Light Duty Truck', 'Right Size to Car', 'Right Size to Biofuel E85 Car'];
    }
    else {
        return ['Replace w/ EV Vehicle', 'Right-size to smaller vehicle', 'E85 Ethanol Usage', 'B20 Biodiesel Usage', 'Replace w/ Biofuel car', 'Replace w/ Biofuel Truck', 'Nothing'];
    }
}

/**
 * The `calculate` function retrieves data from a table, validates it, and then performs calculations
 * based on the data.
 */
const calculate = () => {
    const loader = document.getElementById("loader-wrapper");
    loader.style.display = 'flex';
    var table = document.getElementById("user-details-table")
    var data = [];
    var isValid = true;
    for (var i = 1; i < table.rows.length; i++) {
        var rowData = {};
        for (var j = 1; j <= 10; j++) {
            var input = table.rows[i].cells[j - 1].querySelector('input');
            var select = table.rows[i].cells[j - 1].querySelector('select');
            if (input) {
                if (!input.value) {
                    isValid = false;
                }
                rowData[input.name] = input.value;
            }
            else {
                rowData[select.name] = select.value;
            }
        }
        data.push(rowData);
        userData.push(rowData);
    }
    // userData.push([...data]);
    if (isValid) {
        const greenOptionsWizard = []
        var i = 0;
        const greenWizardContainer = document.querySelector('.green-wizard-container');
        if (greenWizardContainer) {
            greenWizardContainer.remove();
        }
        data.map((val) => {
            greenOptionsWizard[i] = `${getDescriptionValue(val)} - ${getTypeValue(val)} - ${getYearValue(val)} - ${getMakeValue(val)} - ${getModelValue(val)}`
            const options = calculateOptions(val);
            addGreenWizardContainer(greenOptionsWizard[i], options, i);
            i++;
        });
        const greenWizard = document.querySelector('.green-wizard');
        greenWizard.style.display = "flex";
        greenWizard.scrollIntoView();
    }
    else {
        alert('Please provide all the values');
    }
    loader.style.display = 'none';
}

/**
 * The function `addGreenWizardContainer` creates a container element with a result text and a dropdown
 * menu, and appends it to a specific element on the page.
 * @param resultText - The `resultText` parameter is a string that represents the text to be displayed
 * in the result element of the green wizard container.
 * @param options - An array of options for the dropdown menu. Each option should be a string.
 * @param index - The `index` parameter is used to uniquely identify each green wizard container. It is
 * typically used when creating the `id` attribute for the select element, as well as when creating the
 * `for` attribute for the result element.
 */
const addGreenWizardContainer = (resultText, options, index) => {
    var container = document.createElement('div');
    container.classList.add('green-wizard-container');

    var resultElement = document.createElement('div');
    resultElement.classList.add('green-wizard-result');
    resultElement.innerHTML = `<p for="result${index}">` + resultText + '</p>';

    var dropdownContainer = document.createElement('div');
    dropdownContainer.classList.add('green-wizard-dropdown-container');

    var dropdown = document.createElement('div');
    dropdown.classList.add('dropdown');

    var select = document.createElement('select');
    select.id = `result${index}`;

    options.forEach(function (option, index) {
        var optionElement = document.createElement('option');
        optionElement.value = option
        optionElement.textContent = option;
        select.appendChild(optionElement);
    });

    dropdown.appendChild(select);
    dropdownContainer.appendChild(dropdown);

    container.appendChild(resultElement);
    container.appendChild(dropdownContainer);

    document.getElementsByClassName('green-wizard')[0].appendChild(container);
    document.querySelector('.btn-emission-result').style.display = 'block'
}

/**
 * The function `getDescriptionValue` returns the value of the first property in an object that starts
 * with the string "description".
 * @param value - The `value` parameter is an object that contains properties.
 * @returns The value of the property that starts with 'description' in the given object.
 */
const getDescriptionValue = (value) => {
    for (const property in value) {
        if (property.startsWith('description')) {
            return value[property]
        }
    }
}


/**
 * The function `getTypeValue` returns the value of the property that starts with 'type' in the given
 * object.
 * @param value - The `value` parameter is the object that we want to extract the value from.
 * @returns The value of the property that starts with 'type' in the given object.
 */
const getTypeValue = (value) => {
    for (const property in value) {
        if (property.startsWith('type')) {
            return value[property]
        }
    }
}


/**
 * The function `getYearValue` returns the value of the first property in an object that starts with
 * the word "year".
 * @param value - The `value` parameter is an object that contains properties.
 * @returns The value of the property that starts with 'year' in the given object.
 */
const getYearValue = (value) => {
    for (const property in value) {
        if (property.startsWith('year')) {
            return value[property]
        }
    }
}


/**
 * The function `getMakeValue` returns the value of the first property in an object that starts with
 * the string "make".
 * @param value - The `value` parameter is an object that contains properties.
 * @returns The value of the property that starts with 'make' in the given object.
 */
const getMakeValue = (value) => {
    for (const property in value) {
        if (property.startsWith('make')) {
            return value[property]
        }
    }
}
/**
 * The function `getModelValue` returns the value of the first property in an object that starts with
 * the string "model".
 * @param value - The `value` parameter is an object that contains properties.
 * @returns The value of the property that starts with 'model' is being returned.
 */

const getModelValue = (value) => {
    for (const property in value) {
        if (property.startsWith('model')) {
            return value[property]
        }
    }
}

/**
 * The function `getFlexFuelValue` returns the value of the first property in an object that starts
 * with 'flex-fuel'.
 * @param value - The `value` parameter is an object that contains properties.
 * @returns The value of the property that starts with 'flex-fuel' is being returned.
 */
const getFlexFuelValue = (value) => {
    for (const property in value) {
        if (property.startsWith('flex-fuel')) {
            return value[property]
        }
    }
}

/**
 * The function `getFuelTypeValue` returns the value of the property that starts with 'fuel-type' from
 * the given object.
 * @param value - The `value` parameter is an object that contains properties.
 * @returns The value of the property that starts with 'fuel-type' is being returned.
 */
const getFuelTypeValue = (value) => {
    for (const property in value) {
        if (property.startsWith('fuel-type')) {
            return value[property]
        }
    }
}

/**
 * The function `getAnnualFuelValue` returns the value of the first property in the given object that
 * starts with "annual-fuel".
 * @param value - The `value` parameter is an object that contains properties.
 * @returns The value of the property that starts with 'annual-fuel' is being returned.
 */
const getAnnualFuelValue = (value) => {
    for (const property in value) {
        if (property.startsWith('annual-fuel')) {
            return value[property]
        }
    }
}

/**
 * The function `getAnnualKmValue` returns the value of the first property in the `value` object that
 * starts with "annual-vkt".
 * @param value - The `value` parameter is an object that contains properties.
 * @returns The value of the property that starts with 'annual-vkt' is being returned.
 */
const getAnnualKmValue = (value) => {
    for (const property in value) {
        if (property.startsWith('annual-vkt')) {
            return value[property]
        }
    }
}