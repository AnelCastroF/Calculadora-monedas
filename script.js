// Clave API y URL base
const apiKey = 'a8d5c0fdd509a5387b4048bd';
const apiURL = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

// Elementos del DOM
const fromCurrency = document.getElementById('fromCurrency');
const toCurrency = document.getElementById('toCurrency');
const amountInput = document.getElementById('amount');
const resultDiv = document.getElementById('result');
const conversionRateDiv = document.getElementById('conversionRate');
const updateRatesLink = document.getElementById('updateRates');
const convertButton = document.getElementById('convert');

// Cargar las monedas al inicio
async function loadCurrencies() {
    try {
        const response = await fetch(apiURL);
        const data = await response.json();
        const currencies = Object.keys(data.conversion_rates);

        // Rellenar los selects con las monedas disponibles
        currencies.forEach(currency => {
            const optionFrom = document.createElement('option');
            const optionTo = document.createElement('option');
            optionFrom.value = currency;
            optionFrom.textContent = currency;
            optionTo.value = currency;
            optionTo.textContent = currency;
            fromCurrency.appendChild(optionFrom);
            toCurrency.appendChild(optionTo);
        });
    } catch (error) {
        console.error('Error al cargar las monedas:', error);
    }
}

// Realizar la conversión
async function convertCurrency() {
    const amount = parseFloat(amountInput.value);
    const from = fromCurrency.value;
    const to = toCurrency.value;

    if (isNaN(amount) || from === "" || to === "") {
        resultDiv.textContent = "0";
        return;
    }

    try {
        const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/pair/${from}/${to}/${amount}`);
        const data = await response.json();

        if (data.result === 'success') {
            const convertedAmount = data.conversion_result;
            const rate = data.conversion_rate;
            resultDiv.textContent = `${convertedAmount.toFixed(2)}`;
            conversionRateDiv.textContent = `1 ${from} = ${rate.toFixed(4)} ${to}`;
        } else {
            resultDiv.textContent = "Error";
        }
    } catch (error) {
        console.error('Error al realizar la conversión:', error);
        resultDiv.textContent = "Error";
    }
}

// Eventos
convertButton.addEventListener('click', convertCurrency);
updateRatesLink.addEventListener('click', loadCurrencies);

// Cargar monedas cuando se carga la página
loadCurrencies();
