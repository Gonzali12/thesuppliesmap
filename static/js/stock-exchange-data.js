let countryMetadata = []; 

// Load countriesData from localStorage
let countriesData = localStorage.getItem('countriesData');
countriesData = countriesData ? JSON.parse(countriesData) : null;

if (!countriesData) {
    console.error('No countriesData found in localStorage!');
}

document.addEventListener('DOMContentLoaded', async function () {

    async function fetchData() {
        try {
            const response = await fetch('http://127.0.0.1:5000/finhub-api/country-metadata', { method: 'GET' });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            countryMetadata = await response.json();
            console.log(`Fetched Data: ${JSON.stringify(countryMetadata)}`); // Log the fetched data for debugging
            if (countryMetadata.length === 0) {
                console.warn('No country metadata available! Ensure the POST request has been made.');
            }
        } catch (error) {
            console.error("Error fetching country metadata:", error);
        }
    }

    await fetchData();

    function finHub() {
        if (!countriesData || !countriesData['name']) {
            console.error('countriesData is missing or malformed in localStorage');
            return;
        }

        const countryName = countriesData['name']; // Use the global `countriesData`
        const countryData = countryMetadata.find(item => item.name === countryName); // Use `countryData` for clarity

        if (!countryData) {
            console.error(`No country data found for: ${countryName}`);
            return;
        }

        const DataOne = document.getElementById('finhub-data-1');
        const DataTwo = document.getElementById('finhub-data-2');

        DataOne.innerText = `Credit Rating: ${countryData['Credit_Rating']}`;
        DataTwo.innerText = `Equity Risk Premium: ${countryData['Equity_Risk_Premium']}`;
    }

    finHub();
});
