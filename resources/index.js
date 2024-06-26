

const provinceData = [];
const userData = [];
const oldEmissions = [];
const newEmissions = [];
let vehiclesList = [];
const emissionsIntensity = [];

/**
* The `startCar` function displays a loader, shows a table, fetches an emission coefficient, hides the
* loader, and starts an animation for a car.
*/
const startCar = async (e) => {
    const start = document.querySelector('.start-car');
    const table = document.querySelector('.table-cont');
    table.classList.remove('display-none');
    fetchEmissionCoefficient();
    var car = document.querySelector('.car');
    // car.style.animation = 'run 10s linear infinite';
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
        topButton.classList.remove('display-none');
    } else {
        topButton.classList.add('display-none');
    }
}

/**
* The function `goToTop` scrolls the page to the top, clears the content of a table with the id
* "user-details-table", and adds a new row to the table.
*/
const goToTop = () => {
    location.reload();
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
                '<th scope="col" data-toggle="tooltip" data-placement="top" title="Annual Vehicle Kilometer Traveled"><div class="aui-th">Annual VKT</div></th>' +
                '<th scope="col" data-toggle="tooltip" data-placement="top" title="Annual Fuel Consumption"><div class="aui-th">Annual Fuel</div></th>' +
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
                        cell.setAttribute('data-title', 'Flex Fuel');
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
                        cell.setAttribute('data-title', 'Fuel Type');
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
                        cell.setAttribute('data-title', 'Type');
                        if (propertyValue === 'Car') {
                            cell.innerHTML = `<div class="aui-td"><select name="${propertyName}" class="input-select-type">
                                    <option value="Light Duty Truck">Light Duty Truck</option>
                                    <option value="Car" selected>Car</option>
                                </select></div>`
                        }
                        else if (propertyValue === 'Light Duty Truck') {
                            cell.innerHTML = `<div class="aui-td"><select name="${propertyName}" class="input-select-type">
                                    <option value="Light Duty Truck" selected>Light Duty Truck</option>
                                    <option value="Car">Car</option>
                                </select></div>`
                        }
                    }
                    else if (propertyName.startsWith('year') || propertyName.startsWith('annual') || propertyName.startsWith('quantity') || propertyName.startsWith('annual-fuel')) {
                        if (propertyName.startsWith('year')) {
                            cell.setAttribute('data-title', 'Year');
                        }
                        else if (propertyName.startsWith('annual-vk')) {
                            cell.setAttribute('data-title', 'Annual VKT');
                        }
                        else if (propertyName.startsWith('quantity')) {
                            cell.setAttribute('data-title', 'Quantity');
                        }
                        else {
                            cell.setAttribute('data-title', 'Annual Fuel');
                        }
                        cell.innerHTML = `<div class="aui-td"><input type="number" name="${propertyName}" value="${propertyValue}"></div>`;
                    }
                    else {
                        if (propertyName.startsWith('description')) {
                            cell.setAttribute('data-title', 'Description');
                        }
                        else if (propertyName.startsWith('make')) {
                            cell.setAttribute('data-title', 'Make');
                        }
                        else {
                            cell.setAttribute('data-title', 'Model');
                        }
                        cell.innerHTML = `<div class="aui-td"><input type="text" name="${propertyName}" value="${propertyValue}"></div>`;
                    }
                }
            }
        };

        reader.readAsText(file);
    }

    setTimeout(() => {
        document.querySelector('.calculate')?.scrollIntoView();
    }, 100)
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
    else if (type === 'Light Duty Truck' && flexFuel === 'Yes' && fuelType === 'Gasoline') {
        return ['E85 Biofuel Usage', 'Replace w/ EV Light Duty Truck', 'Right Size to Car', 'Right Size to Biofuel Car'];
    }
    else if (type === 'Light Duty Truck' && flexFuel === 'No' && fuelType === 'Diesel') {
        return ['Replace w/ EV Light Duty Truck', 'Replace w/ Biofuel E85 Light Duty Truck', 'Right Size to Car', 'Right Size to Biofuel E85 Car'];
    }
    else if (type === 'Light Duty Truck' && flexFuel === 'Yes' && fuelType === 'Diesel') {
        return ['B20 Biodiesel Usage', 'Replace w/ EV Light Duty Truck', 'Replace w/ Biofuel E85 Light Duty Truck', 'Right Size to Car', 'Right Size to Biofuel E85 Car'];
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
        const greenWizardContainer = document.querySelectorAll('.green-wizard-container');
        if (greenWizardContainer.length) {
            greenWizardContainer.forEach((wizard) => {
                wizard.remove();
            })
        }
        data.map((val) => {
            greenOptionsWizard[i] = `${getDescriptionValue(val)} - ${getTypeValue(val)} - ${getYearValue(val)} - ${getMakeValue(val)} - ${getModelValue(val)}`
            const options = calculateOptions(val);
            addGreenWizardContainer(greenOptionsWizard[i], options, i);
            i++;
        });
        const loader = document.querySelector('.wrapper');
        loader.classList.remove('display-none');
        setTimeout(() => {
            const loader = document.querySelector('.wrapper');
            loader.classList.add('display-none');
            const greenWizard = document.querySelector('.green-wizard');
            greenWizard.style.display = "flex";
            greenWizard.scrollIntoView();
        }, 1500)
    }
    else {
        alert('Please provide all the values');
    }
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
    document.querySelector('.button-emission-result').style.display = 'block'
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
    const hoverName = [];
    vehicleValues.map((vechile, index) => {
        const description = getDescriptionValue(userData[index]);
        const annualFuel = getAnnualFuelValue(userData[index]);
        annualEmissionName.push(description);
        hoverName.push(`${getDescriptionValue(userData[index])} - ${getTypeValue(userData[index])} - ${getYearValue(userData[index])} - ${getMakeValue(userData[index])} - ${getModelValue(userData[index])}`)
        annualEmissionValues.push((annualFuel * getFactor(getFuelTypeValue(userData[index]))) / 1000000);
        vehicleEmissionValues.push((annualFuel * getFactor(getFuelTypeValue(userData[index])) / getAnnualKmValue(userData[index])).toFixed(2))
    })
    const annualData = [
        {
            y: annualEmissionName,
            x: annualEmissionValues,
            type: 'bar',
            orientation: 'h',
            text: annualEmissionValues,
            hoverinfo: 'none',
            marker: {
                color: '#304D6D',
            },
            width: Array.from({ length: annualEmissionName.length }, () => 0.5),
            bargap: 0.2,
        }
    ];
    const annuallayout = {
        title: 'Total Emissions by Vehicle (In Tons)',
        font: {
            color: '#304D6D',
            size: 24
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
        barcornerradius: 8
    }

    const vehicleData = [
        {
            y: annualEmissionName,
            x: vehicleEmissionValues,
            type: 'bar',
            orientation: 'h',
            text: vehicleEmissionValues,
            hoverinfo: 'none',
            marker: {
                color: '#A7CCED',
            },
            width: Array.from({ length: annualEmissionName.length }, () => 0.5),
            bargap: 0.2,
        }
    ];
    const vehiclelayout = {
        title: 'Emission Intensity by Vehicle',
        font: {
            color: '#272635',
            size: 24
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
        barcornerradius: 10
    }

    Plotly.newPlot('annual-emission', annualData, annuallayout, { displaylogo: false });
    Plotly.newPlot('vehicle-emission', vehicleData, vehiclelayout, { displaylogo: false });
}

/**
 * The function `showEmissions` collects data from elements on a webpage, calculates total emissions
 * based on the collected data, and then displays the results.
 */
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
    const loader = document.querySelector('.wrapper');
    loader.classList.remove('display-none');
    setTimeout(() => {
        const loader = document.querySelector('.wrapper');
        loader.classList.add('display-none');
        document.querySelector('.emission-container').classList.remove('display-none');
        document.querySelector('.button-saving-result').classList.remove('display-none');
        document.querySelector('.button-saving-result').scrollIntoView();
    }, 1500)
}

const calculateEmissionSavings = (dropdownValue, emissionsIntensity, annualEmission, annualFuel, annualKM) => {
    var electricalEfficiency;
    var percentageSavings;
    var totalEmissionSavings;
    switch (dropdownValue) {
        case 'Replace w/ EV Light Duty Truck':
            electricalEfficiency = (annualFuel / annualKM) * 8.9;
            break;
        case 'Replace w/ EV Car':
            electricalEfficiency = (annualFuel / annualKM) * 8.9;
            break;
        case 'Replace w/ EV Vehicle':
            electricalEfficiency = (annualFuel / annualKM) * 8.9;
            break;
        case 'Right Size to Car':
            electricalEfficiency = (annualFuel / annualKM) * 8.9;
            break;
        case 'Right-Size to smaller vehicle':
            electricalEfficiency = (annualFuel / annualKM) * 8.9;
            break;
        case 'E85 Ethanol Usage':
            percentageSavings = 79;
            totalEmissionSavings = ((annualEmission * 0.80) / 1000000).toFixed(2);
            const lowerBoundE85 = percentageSavings - 1;
            const upperBoundE85 = percentageSavings + 1;
            percentageSavings = `${lowerBoundE85}-${upperBoundE85}%`;
            oldEmissions.push(annualEmission)
            newEmissions.push(0.80 * annualEmission);
            return {
                totalEmissionSavings,
                percentageSavings
            }

        case 'B20 Biodiesel Usage':
            percentageSavings = 15;
            totalEmissionSavings = ((annualEmission * 0.15) / 1000000).toFixed(2);
            const lowerBoundB20 = percentageSavings - 1;
            const upperBoundB20 = percentageSavings + 1;
            percentageSavings = `${lowerBoundB20}-${upperBoundB20}%`;
            oldEmissions.push(annualEmission)
            newEmissions.push(0.15 * annualEmission);
            return {
                totalEmissionSavings,
                percentageSavings
            }

        default:
            electricalEfficiency = 0;
    }
    const coefficientValue = localStorage.getItem("intensity");
    const evEmissionIntensity = electricalEfficiency * coefficientValue;
    const intialpercentageSavings = (emissionsIntensity - evEmissionIntensity) / emissionsIntensity;
    percentageSavings = intialpercentageSavings * 100;
    percentageSavings = Math.round(percentageSavings);
    if (percentageSavings < 99) {
        const lowerBound = percentageSavings - 1;
        const upperBound = percentageSavings + 1;
        percentageSavings = `${lowerBound}-${upperBound}%`;
    }
    else {
        percentageSavings = `${percentageSavings}%`;
    }
    totalEmissionSavings = ((intialpercentageSavings * annualEmission) / 1000000).toFixed(2);
    oldEmissions.push(annualEmission)
    newEmissions.push(intialpercentageSavings * annualEmission);
    const values = {
        totalEmissionSavings,
        percentageSavings
    }
    return values
}


/**
 * The function `getFactor` returns a specific factor value based on the input fuel type.
 * @param fuelType - The `fuelType` parameter in the `getFactor` function represents the type of fuel
 * for which you want to retrieve a specific factor value. The function uses a `switch` statement to
 * determine the factor based on the provided `fuelType`. The function returns a numerical factor value
 * corresponding to the input
 * @returns The function `getFactor` returns a factor value based on the input `fuelType`. The factor
 * values returned are:
 * - For 'Gasoline': 2299
 * - For 'E10 Gasoline': 2071
 * - For 'Diesel': 2730
 * - For any other fuel type not recognized: 0
 */
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


// function createComparisonGraph(emissionsIntensity) {
//     // Retrieve data for the selected vehicle
//     var selectedVehicleEmissionsIntensity = emissionsIntensity;

//     // Create dummy data for comparison (replace this with actual data)
//     var comparisonLabels = ['Existing Vehicle', 'Vehicle 2', 'Vehicle 3', 'Vehicle 4', 'Vehicle 5', 'Vehicle 6', 'Vehicle 7', 'Vehicle 8', 'Vehicle 9', 'Vehicle 10'];
//     var comparisonData = [selectedVehicleEmissionsIntensity, 2.5, 3.0, 3.2, 2.8, 3.5, 2.9, 3.1, 2.7, 3.3];
//     const vehicleData = [
//         {
//             x: comparisonLabels,
//             y: comparisonData,
//             type: 'bar',
//             marker: {
//                 color: 'rgba(75, 192, 192, 0.2)',
//                 line: {
//                     color: '#rgba(75, 192, 192, 1)',
//                     width: 1.5
//                 }
//             },
//             width: Array.from({ length: comparisonData.length }, () => 0.5),
//             bargap: 0.2,
//         }
//     ];
//     const vehiclelayout = {
//         title: 'Emissions Intensity Comparison (gCO2e/km)',
//         font: {
//             color: '#5caaff',
//             size: 16
//         },
//         width: 700,
//     }

//     Plotly.newPlot('comparisonGraph', vehicleData, vehiclelayout, { displaylogo: false });
// }

const showSavings = () => {
    var data = [];
    var names = [];
    var totalSavings = 0;
    var totalEmissionsInTon = 0;
    var containers = document.querySelectorAll('.green-wizard-container');
    containers.forEach(function (container, index) {
        var resultText = container.querySelector('.green-wizard-result p').textContent;
        names.push(resultText.split('-')[0]);
        var dropdownValue = container.querySelector('select').value;
        const annualFuel = getAnnualFuelValue(userData[index]);
        const annualEmission = annualFuel * getFactor(getFuelTypeValue(userData[index]));
        const emissionsIntensity = annualEmission / getAnnualKmValue(userData[index]);
        const emissionValues = calculateEmissionSavings(dropdownValue, emissionsIntensity, annualEmission, annualFuel, getAnnualKmValue(userData[index]));
        totalSavings += Number(emissionValues.totalEmissionSavings);
        totalEmissionsInTon += Number(annualEmission / 1000000);
        data.push({ fleetVehicle: resultText, actionApplied: dropdownValue, emissionSavings: emissionValues.totalEmissionSavings, savingsPercentage: emissionValues.percentageSavings });
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
    var trace1 = {
        x: names,
        y: oldEmissions,
        name: 'Existing Emissions',
        type: 'bar'
    };

    var trace2 = {
        x: names,
        y: newEmissions,
        name: 'New Emissions',
        type: 'bar'
    };

    var data = [trace1, trace2];

    var layout = { barmode: 'group' };

    Plotly.newPlot('emission-comparison', data, layout, { displaylogo: false });
    document.querySelector('.total-emission-savings').textContent = `${(totalSavings).toFixed(2)} Tonnes / Year`;
    document.querySelector('.total-emission-percentage').textContent = `${(((totalEmissionsInTon - totalSavings) / totalEmissionsInTon) * 100).toFixed(0)} %`
    const loader = document.querySelector('.wrapper');
    loader.classList.remove('display-none');
    setTimeout(() => {
        const loader = document.querySelector('.wrapper');
        loader.classList.add('display-none');
        document.querySelector('.savings-chart').classList.remove('display-none');
        document.querySelector('.total-savings-charts').classList.remove('display-none');
        document.querySelector('.emission-comparison').classList.remove('display-none');
        document.querySelector('.save-buttons').classList.remove('display-none');
        document.querySelector('.show-comparison').classList.remove('display-none');
        document.querySelector('.save-buttons').classList.add('d-flex');
        if (document.querySelector('.chart-container'))
            document.querySelector('.chart-container').scrollIntoView();
        else
            document.querySelector('.savings-chart').scrollIntoView();
    }, 1500)
}

const printResult = () => {
    window.print();
}


/**
 * The `saveResult` function saves the content of an HTML element as a PDF file using html2pdf library.
 */
const saveResult = () => {
    var element = document.getElementById('save-content');
    var opt = {
        margin: [5, 10, 5, 10],
        filename: 'emissionresults.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 1, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().from(element).set(opt).save();
}

$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();
});



function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


// Function to suggest vehicles based on emissions data
async function suggestVehicles(emissionThreshold, index) {
    fetch('resources/database.json')
        .then(response => response.json())
        .then(jsonData => {
            const smallCarCategories = ["Subcompact", "Compact"];
            const filteredRecords = jsonData.records.filter(record => smallCarCategories.includes(record[4])).filter(record => parseFloat(record[13]) < emissionThreshold);

            // Extract top vehicles with lowest emission intensity as suggestions
            const suggestions = filteredRecords.map(record => {
                return `${record[2]} ${record[3]} - ${record[13]} g/km`;
            });


            const shuffledArray = shuffleArray(suggestions);
            emissionsIntensity[index].suggestions = shuffledArray.slice(0, 5);
        })
        .catch(error => console.error('Error fetching JSON:', error));
}


function createDynamicHTML(data) {
    const container = document.getElementById('tabsTemplate1');
    container.setAttribute('class', 'd-flex flex-wrap aui-accordion-tab2 justify-content-center');
    container.setAttribute('role', 'tablist');

    data.forEach((item, index) => {
        // Create a button for the name
        const button = document.createElement('button');
        button.setAttribute('class', 'aui-acc-tab-item btn btn-text');
        button.setAttribute('data-toggle', 'collapse');
        button.setAttribute('data-target', `#${item.name}`);
        button.setAttribute('aria-expanded', `${index === 0 ? 'true' : 'false'}`);
        button.setAttribute('role', 'tab');
        button.innerHTML = `${item.name.split('-')[0].trim()} <i class="aha-icon-arrow-down mx-2 d-inline-block d-md-none"></i>`;
        // Append the button and the suggestions div to the container
        container.appendChild(button);
    });

    data.forEach((item, index) => {
        const contentDiv = document.createElement('div');
        contentDiv.setAttribute('id', item.name);
        contentDiv.setAttribute('class', `collapse ${index === 0 ? 'show' : ''} row w-100 no-gutters aui-accordion-content pt-4`);
        contentDiv.setAttribute('data-parent', '#tabsTemplate1');
        contentDiv.setAttribute('role', 'tabpanel');
        const suggestionsDiv = document.createElement('div');
        if (item.suggestions && item.suggestions.length > 0) {
            const ul = document.createElement('ul');
            ul.classList.add('suggestion-list');
            item.suggestions.forEach(suggestion => {
                const li = document.createElement('li');
                li.innerText = suggestion;
                ul.appendChild(li);
            });
            contentDiv.appendChild(ul);
        } else {
            contentDiv.innerHTML = '<p>No suggestions available.</p>';
        }
        container.appendChild(contentDiv);
    })
}



const showReplacements = async () => {
    const loader = document.querySelector('.wrapper');
    loader.classList.remove('display-none');
    var containers = document.querySelectorAll('.green-wizard-container');
    containers.forEach(function (container, index) {
        var resultText = container.querySelector('.green-wizard-result p').textContent;
        var dropdownValue = container.querySelector('select').value;
        const annualFuel = getAnnualFuelValue(userData[index]);
        emissionsIntensity.push({
            name: resultText,
            drop: dropdownValue,
            value: Number((annualFuel * getFactor(getFuelTypeValue(userData[index])) / getAnnualKmValue(userData[index])).toFixed(2))
        });
    });

    emissionsIntensity.map(async (vehicleData, index) => {
        await suggestVehicles(vehicleData.value, index);
    })
    setTimeout(() => {
        createDynamicHTML(emissionsIntensity);
        loader.classList.add('display-none');
        document.getElementById('tabsTemplate1').scrollIntoView();
    }, 1500)
}