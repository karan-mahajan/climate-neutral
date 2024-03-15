const provinceData = [];
const userData = [];

/**
 * The `startCar` function displays a loader, shows a table, fetches an emission coefficient, hides the
 * loader, and starts an animation for a car.
 */
const startCar = (e) => {
    const loader = document.getElementById("loader-wrapper");
    loader.style.display = 'flex';
    const start = document.querySelector('.start-car');
    const table = document.querySelector('.table-cont');
    table.classList.remove('display-none');
    fetchEmissionCoefficient();
    loader.style.display = 'none';
    var car = document.querySelector('.car');
    if (start.innerHTML == 'Stop the Car') {
        start.innerHTML = 'Start the Car';
        car.style.animationPlayState = 'paused';
    }
    else {
        start.innerHTML = 'Stop the Car';
        car.style.animationPlayState = 'running';
    }
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
    table.innerHTML = '<thead><tr>' +
        '<th scope="col"><div class="aui-th">Description</div></th>' +
        '<th scope="col"><div class="aui-th">Type</div></th>' +
        '<th scope="col"><div class="aui-th">Year</div></th>' +
        '<th scope="col"><div class="aui-th">Make</div></th>' +
        '<th scope="col"><div class="aui-th">Model</div></th>' +
        '<th scope="col"><div class="aui-th">Annual VKT</div></th>' +
        '<th scope="col"><div class="aui-th">Annual Fuel</div></th>' +
        '<th scope="col"><div class="aui-th">Fuel Type</div></th>' +
        '<th scope="col"><div class="aui-th">Fuel Fuel</div></th>' +
        '<th scope="col"><div class="aui-th">Quantity</div></th>' +
        '</tr></thead>';
    const tbody = document.createElement("tbody");
    table.appendChild(tbody)
    addNewRow(true);
}

/**
 * The function `addNewRow` adds a new row to a table with input fields and dropdown menus.
 */
const addNewRow = (startagain = false) => {
    var table = document.getElementById("user-details-table");
    var newRow;
    if (!startagain) {
        newRow = table.insertRow(table.rows.length);
    }
    else {
        var tbody = table.querySelector('tbody');
        if (!tbody) {
            tbody = document.createElement('tbody');
            table.appendChild(tbody);
        }
        newRow = tbody.insertRow(tbody.rows.length);
    }
    newRow.classList.add('aui-table-status-success');
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
    cell1.setAttribute('data-title', 'Description');
    cell1.setAttribute('data-title', 'Type');
    cell1.setAttribute('data-title', 'Year');
    cell1.setAttribute('data-title', 'Make');
    cell1.setAttribute('data-title', 'Model');
    cell1.setAttribute('data-title', 'Annual VKT');
    cell1.setAttribute('data-title', 'Annual Fuel');
    cell1.setAttribute('data-title', 'Quantity');

    cell1.innerHTML = `<div class="aui-td"><input type="text" name="description${newRow}0"></div>`
    cell2.innerHTML = `<div class="aui-td"><select name="type${nextRow}1" class="input-select-type">
                                    <option value="Light Duty Truck" selected>Light Duty Truck</option>
                                    <option value="Car">Car</option>
                                    <option value="Biofuel Car">Biofuel Car</option>
                                    <option value="Biofuel E85 Car">Biofuel E85 Car</option>
                                    <option value="Biofuel Truck">Biofuel Truck</option>
                                </select></div>`
    cell3.innerHTML = '<div class="aui-td"><input type="number" name="year' + nextRow + '2"></div>';
    cell4.innerHTML = '<div class="aui-td"><input type="text" name="make' + nextRow + '3"></div>';
    cell5.innerHTML = '<div class="aui-td"><input type="text" name="model' + nextRow + '4"></div>';
    cell6.innerHTML = '<div class="aui-td"><input type="number" name="annual-vkt' + nextRow + '5"></div>';
    cell7.innerHTML = '<div class="aui-td"><input type="number" name="annual-fuel' + nextRow + '6"></div>';
    cell8.innerHTML = `<div class="aui-td"><select name="fuel-type${nextRow}7" class="input-select-fuel-type">
                                    <option value="Gasoline" selected>Gasoline</option>
                                    <option value="E10 Gasoline">E10 Gasoline</option>
                                    <option value="Diesel">Diesel</option>
                                </select></div>`
    cell9.innerHTML = `<div class="aui-td"><select name="flex-fuel${nextRow}8" class="input-select">
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select></div>`;
    cell10.innerHTML = '<div class="aui-td"><input type="number" name="quantity' + nextRow + '9"></div>';
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
        for (var j = 1; j <= 10; j++) {
            var input = table.rows[i].cells[j - 1].querySelector('input');
            var select = table.rows[i].cells[j - 1].querySelector('select');
            if (input) {
                if (!input.value) {
                    isValid = false;
                }
                rowData[input.name] = input.value;
            }
            else if (select) {
                rowData[select.name] = select.value;
            }
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
            table.innerHTML = '<thead><tr>' +
                '<th scope="col"><div class="aui-th">Description</div></th>' +
                '<th scope="col"><div class="aui-th">Type</div></th>' +
                '<th scope="col"><div class="aui-th">Year</div></th>' +
                '<th scope="col"><div class="aui-th">Make</div></th>' +
                '<th scope="col"><div class="aui-th">Model</div></th>' +
                '<th scope="col"><div class="aui-th">Annual VKT</div></th>' +
                '<th scope="col"><div class="aui-th">Annual Fuel</div></th>' +
                '<th scope="col"><div class="aui-th">Fuel Type</div></th>' +
                '<th scope="col"><div class="aui-th">Fuel Fuel</div></th>' +
                '<th scope="col"><div class="aui-th">Quantity</div></th>' +
                '</tr></thead>';

            var tbody = table.querySelector('tbody');
            if (!tbody) {
                tbody = document.createElement('tbody');
                table.appendChild(tbody);
            }
            for (var i = 0; i < data.length; i++) {
                var newRow = tbody.insertRow(tbody.rows.length);
                var propertyOrder = Object.keys(data[i]);
                newRow.classList.add('aui-table-status-success');
                for (var j = 0; j < propertyOrder.length; j++) {
                    var propertyName = propertyOrder[j];
                    var cell = newRow.insertCell();
                    var propertyValue = data[i][propertyName];
                    if (propertyName.startsWith('flex-fuel')) {
                        if (propertyValue === 'No') {
                            cell.innerHTML = `<div class="aui-td"><select name="${propertyName}" class="input-select">
                                    <option value="Yes">Yes</option>
                                    <option value="No" selected>No</option>
                                </select></div>`;
                        }
                        else {
                            cell.innerHTML = `<div class="aui-td"><select name="${propertyName}" class="input-select">
                                    <option value="Yes" selected>Yes</option>
                                    <option value="No">No</option>
                                </select></div>`;
                        }
                    }
                    else if (propertyName.startsWith('fuel-type')) {
                        if (propertyValue === 'Gasoline') {
                            cell.innerHTML = `<div class="aui-td"><select name="${propertyName}" class="input-select-fuel-type">
                                    <option value="Gasoline" selected>Gasoline</option>
                                    <option value="E10 Gasoline">E10 Gasoline</option>
                                    <option value="Diesel">Diesel</option>
                                </select></div>`
                        }
                        else if (propertyValue === 'Diesel') {
                            cell.innerHTML = `<div class="aui-td"><select name="${propertyName}" class="input-select-fuel-type">
                                    <option value="Gasoline">Gasoline</option>
                                    <option value="E10 Gasoline">E10 Gasoline</option>
                                    <option value="Diesel" selected>Diesel</option>
                                </select></div>`
                        } else {
                            cell.innerHTML = `<div class="aui-td"><select name="${propertyName}" class="input-select-fuel-type">
                                    <option value="Gasoline">Gasoline</option>
                                    <option value="E10 Gasoline" selected>E10 Gasoline</option>
                                    <option value="Diesel">Diesel</option>
                                </select></div>`
                        }
                    }
                    else if (propertyName.startsWith('type')) {
                        if (propertyValue === 'Car') {
                            cell.innerHTML = `<div class="aui-td"><select name="${propertyName}" class="input-select-type">
                                    <option value="Light Duty Truck">Light Duty Truck</option>
                                    <option value="Car" selected>Car</option>
                                    <option value="Biofuel Car">Biofuel Car</option>
                                    <option value="Biofuel E85 Car">Biofuel E85 Car</option>
                                    <option value="Biofuel Truck">Biofuel Truck</option>
                                </select></div>`
                        }
                        else if (propertyValue === 'Light Duty Truck') {
                            cell.innerHTML = `<div class="aui-td"><select name="${propertyName}" class="input-select-type">
                                    <option value="Light Duty Truck" selected>Light Duty Truck</option>
                                    <option value="Car">Car</option>
                                    <option value="Biofuel Car">Biofuel Car</option>
                                    <option value="Biofuel E85 Car">Biofuel E85 Car</option>
                                    <option value="Biofuel Truck">Biofuel Truck</option>
                                </select></div>`
                        }
                        else if (propertyValue === 'Biofuel Car') {
                            cell.innerHTML = `<div class="aui-td"><select name="${propertyName}" class="input-select-type">
                                    <option value="Light Duty Truck">Light Duty Truck</option>
                                    <option value="Car">Car</option>
                                    <option value="Biofuel Car" selected>Biofuel Car</option>
                                    <option value="Biofuel E85 Car">Biofuel E85 Car</option>
                                    <option value="Biofuel Truck">Biofuel Truck</option>
                                </select></div>`
                        }
                        else if (propertyValue === 'Biofuel E85 Car') {
                            cell.innerHTML = `<div class="aui-td"><select name="${propertyName}" class="input-select-type">
                                    <option value="Light Duty Truck">Light Duty Truck</option>
                                    <option value="Car">Car</option>
                                    <option value="Biofuel Car">Biofuel Car</option>
                                    <option value="Biofuel E85 Car" selected>Biofuel E85 Car</option>
                                    <option value="Biofuel Truck">Biofuel Truck</option>
                                </select></div>`
                        }
                        else if (propertyValue === 'Biofuel Truck') {
                            cell.innerHTML = `<div class="aui-td"><select name="${propertyName}" class="input-select-type">
                                    <option value="Light Duty Truck">Light Duty Truck</option>
                                    <option value="Car">Car</option>
                                    <option value="Biofuel Car">Biofuel Car</option>
                                    <option value="Biofuel E85 Car" selected>Biofuel E85 Car</option>
                                    <option value="Biofuel Truck" selected>Biofuel Truck</option>
                                </select></div>`
                        }
                    }
                    else if (propertyName.startsWith('year') || propertyName.startsWith('annual') || propertyName.startsWith('quantity') || propertyName.startsWith('annual-fuel')) {
                        cell.innerHTML = `<div class="aui-td"><input type="number" name="${propertyName}" value="${propertyValue}"></div>`;
                    }
                    else {
                        cell.innerHTML = `<div class="aui-td"><input type="text" name="${propertyName}" value="${propertyValue}"></div>`;
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
const calculateTotalEmissions = (vehicleValues) => {
    const annualEmissionName = [];
    const annualEmissionValues = [];
    const vehicleEmissionValues = [];
    const coefficientValue = localStorage.getItem("intensity");
    vehicleValues.map((vechile, index) => {
        const description = getDescriptionValue(userData[index]);
        const annualFuel = getAnnualFuelValue(userData[index]);
        annualEmissionName.push(description);
        annualEmissionValues.push(annualFuel * coefficientValue);
        vehicleEmissionValues.push((annualFuel * coefficientValue) / getAnnualKmValue(userData[index]))
    })
    const annualData = [
        {
            y: annualEmissionName,
            x: annualEmissionValues,
            type: 'bar',
            orientation: 'h',
            marker: {
                color: '#0c1c81',
                line: {
                    color: '#5caaff',
                    width: 1.5
                }
            },
            width: Array.from({ length: annualEmissionName.length }, () => 0.5),
            bargap: 0.2,
        }
    ];
    const annuallayout = {
        title: 'Total Emissions by Vehicle',
        font: {
            color: '#5caaff',
            size: 16
        },
        yaxis: {
            side: 'left',
            automargin: true,
            ticksuffix: '    '
        },
        xaxis: {
            zeroline: false,
            showline: false,
            showgrid: false,
            showticklabels: false,
        },
        width: 600,
    }

    const vehicleData = [
        {
            y: annualEmissionName,
            x: vehicleEmissionValues,
            type: 'bar',
            orientation: 'h',
            marker: {
                color: '#26b170',
                line: {
                    color: '#5caaff',
                    width: 1.5
                }
            },
            width: Array.from({ length: annualEmissionName.length }, () => 0.5),
            bargap: 0.2,
        }
    ];
    const vehiclelayout = {
        title: 'Emission Intensity by Vehicle',
        font: {
            color: '#5caaff',
            size: 16
        },
        yaxis: {
            side: 'left',
            automargin: true,
            ticksuffix: '    '
        },
        xaxis: {
            zeroline: false,
            showline: false,
            showgrid: false,
            showticklabels: false,
        },
        width: 600,
    }

    Plotly.newPlot('annual-emission', annualData, annuallayout, { displaylogo: false });
    Plotly.newPlot('vehicle-emission', vehicleData, vehiclelayout, { displaylogo: false });
}

const showEmissions = () => {
    const currentValues = [];
    const greenWizardValues = document.querySelectorAll('.green-wizard-container');
    greenWizardValues.forEach((indiValue) => {
        const result = indiValue.querySelector('.green-wizard-result').getElementsByTagName('p');
        const forElement = result[0].getAttribute('for');
        const value = result[0].textContent;
        const dropValue = indiValue.querySelector(`#${forElement}`);
        currentValues.push({
            "name": value,
            "dropValue": dropValue.value
        })
    })

    calculateTotalEmissions(currentValues);
    document.querySelector('.emission-container').classList.remove('display-none');
    document.querySelector('.emission-bar-graphs').scrollIntoView();
    document.querySelector('.btn-saving-result').classList.remove('display-none');
}

const calculateEmissionSavings = (dropdownValue, emissionsIntensity, annualEmission) => {
    var electricalEfficiency;
    var percentageSavings;
    var totalEmissionSavings;
    switch (dropdownValue) {
        case 'Replace w/ EV Light Duty Truck':
            electricalEfficiency = 3.3 * 8.9;
            break;
        case 'Replace w/ EV Car':
            electricalEfficiency = 3 * 8.9;
            break;
        case 'Replace w/ EV Vehicle':
            electricalEfficiency = 3.2 * 8.9;
            break;
        case 'Right Size to Car':
            const avgICEintensityDatabase = 3;
            percentageSavings = (emissionsIntensity - avgICEintensityDatabase) / emissionsIntensity * 100;
            totalEmissionSavings = ((annualEmission * percentageSavings) / 1000000).toFixed(2);
            return {
                totalEmissionSavings,
                percentageSavings
            }
        case 'E85 Ethanol Usage':
            percentageSavings = 79;
            totalEmissionSavings = (annualEmission * 0.80) / 1000000;
            return {
                totalEmissionSavings,
                percentageSavings
            }

        case 'B20 Diesel Usage':
            percentageSavings = 15;
            totalEmissionSavings = '';
            return {
                totalEmissionSavings,
                percentageSavings
            }

        default:
            electricalEfficiency = 0;
    }
    const coefficientValue = localStorage.getItem("intensity");
    const evEmissionIntensity = electricalEfficiency / 100 * coefficientValue;
    const intialpercentageSavings = (emissionsIntensity - evEmissionIntensity) / emissionsIntensity;
    percentageSavings = intialpercentageSavings * 100;
    totalEmissionSavings = ((intialpercentageSavings * annualEmission) / 1000000).toFixed(2);
    const values = {
        totalEmissionSavings,
        percentageSavings
    }
    return values
}


const getFactor = (fuelType) => {
    switch (fuelType) {
        case 'Gasoline':
            return 2299;
        case 'E10 Gasoline':
            return 2071;
        case 'Diesel':
            return 2730;
        default:
            return 0; // Default value if fuel type not recognized
    }
}
function createComparisonGraph(emissionsIntensity) {
    // Retrieve data for the selected vehicle
    var selectedVehicleEmissionsIntensity = emissionsIntensity;

    // Create dummy data for comparison (replace this with actual data)
    var comparisonLabels = ['Existing Vehicle', 'Vehicle 2', 'Vehicle 3', 'Vehicle 4', 'Vehicle 5', 'Vehicle 6', 'Vehicle 7', 'Vehicle 8', 'Vehicle 9', 'Vehicle 10'];
    var comparisonData = [selectedVehicleEmissionsIntensity, 2.5, 3.0, 3.2, 2.8, 3.5, 2.9, 3.1, 2.7, 3.3];
    // Display the comparison graph
    var comparisonGraphCtx = document.getElementById('comparisonGraph').getContext('2d');
    var comparisonGraph = new Chart(comparisonGraphCtx, {
        type: 'bar',
        data: {
            labels: comparisonLabels,
            datasets: [{
                label: 'Emissions Intensity Comparison (gCO2e/km)',
                data: comparisonData,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

const showSavings = () => {
    var data = [];
    var containers = document.querySelectorAll('.green-wizard-container');
    const coefficientValue = localStorage.getItem("intensity");
    containers.forEach(function (container, index) {
        var resultText = container.querySelector('.green-wizard-result p').textContent;
        var dropdownValue = container.querySelector('select').value;
        const annualFuel = getAnnualFuelValue(userData[index]);
        const annualEmission = annualFuel * getFactor(getFuelTypeValue(userData[index]));
        const emissionsIntensity = annualEmission / getAnnualKmValue(userData[index]);
        const emissionValues = calculateEmissionSavings(dropdownValue, emissionsIntensity, annualEmission);
        data.push({ fleetVehicle: resultText, actionApplied: dropdownValue, emissionSavings: emissionValues.totalEmissionSavings, savingsPercentage: emissionValues.percentageSavings });
        if (dropdownValue === 'Right Size to Car')
            createComparisonGraph(index, emissionsIntensity);
    });

    var parentElement = document.querySelector('.action-savings-wizard');

    if (parentElement) {
        for (var i = parentElement.children.length - 1; i > 0; i--) {
            parentElement.removeChild(parentElement.children[i]);
        }
    }

    data.forEach(function (item) {
        const containerBody = document.createElement('div');
        containerBody.classList.add('action-savings-wizard-body')
        document.querySelector('.action-savings-wizard').appendChild(containerBody);
        var fleetVehicleDiv = document.createElement('div');
        fleetVehicleDiv.textContent = item.fleetVehicle;
        containerBody.appendChild(fleetVehicleDiv);

        var actionAppliedDiv = document.createElement('div');
        actionAppliedDiv.textContent = item.actionApplied;
        containerBody.appendChild(actionAppliedDiv);

        var emissionSavingsDiv = document.createElement('div');
        emissionSavingsDiv.textContent = item.emissionSavings;
        containerBody.appendChild(emissionSavingsDiv);

        var savingsPercentageDiv = document.createElement('div');
        savingsPercentageDiv.textContent = item.savingsPercentage;
        containerBody.appendChild(savingsPercentageDiv);
    });
    document.querySelector('.savings-chart').classList.remove('display-none');
    document.querySelector('.savings-chart').scrollIntoView();
}