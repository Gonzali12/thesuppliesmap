const PromiseThrottle = require('promise-throttle');
require('dotenv').config();

// 40 requests

const eurozone_countries = [
    {"name": "United Kingdom", "SeriesID":"IR3TIB01GBM156N", "Interest_Rate": null},
    {"name": "Japan", "SeriesID":"IR3TIB01JPM156N", "Interest_Rate": null},
    {"name": "Canada", "SeriesID":"IR3TIB01CAM156N", "Interest_Rate": null},
    {"name": "Norway", "SeriesID":"IR3TIB01NOM156N", "Interest_Rate": null},
    {"name": "South Africa", "SeriesID":"IR3TIB01ZAM156N", "Interest_Rate": null},
    {"name": "Australia", "SeriesID":"IR3TIB01AUM156N", "Interest_Rate": null},
    {"name": "China", "SeriesID":"IR3TIB01CNM156N", "Interest_Rate": null},
    {"name": "Switzerland", "SeriesID":"IR3TIB01CHM156N", "Interest_Rate": null},
    {"name": "France", "SeriesID":"IR3TIB01FRM156N", "Interest_Rate": null},
    {"name": "Sweden", "SeriesID":"IR3TIB01SEM156N", "Interest_Rate": null},
    {"name": "India", "SeriesID":"INDIR3TIB01STM", "Interest_Rate": null},
    {"name": "Poland", "SeriesID":"IR3TIB01PLM156N", "Interest_Rate": null},
    {"name": "Italy", "SeriesID":"IR3TIB01ITM156N", "Interest_Rate": null},
    {"name": "Indonesia", "SeriesID":"IR3TIB01IDM156N", "Interest_Rate": null},
    {"name": "Czech Republic", "SeriesID":"IR3TIB01CZM156N", "Interest_Rate": null},
    {"name": "Hungary", "SeriesID":"IR3TIB01HUM156N", "Interest_Rate": null},
    {"name": "Denmark", "SeriesID":"IR3TIB01DKM156N", "Interest_Rate": null},
    {"name": "Russia", "SeriesID":"IR3TIB01RUM156N", "Interest_Rate": null},
    {"name": "Greece", "SeriesID":"IR3TIB01GRM156N", "Interest_Rate": null},
    {"name": "Spain", "SeriesID":"IR3TIB01ESM156N", "Interest_Rate": null},
    {"name": "Austria", "SeriesID":"IR3TIB01ATM156N", "Interest_Rate": null},
    {"name": "South Korea", "SeriesID":"IR3TIB01KRM156N", "Interest_Rate": null},
    {"name": "Portugal", "SeriesID":"IR3TIB01PTM156N", "Interest_Rate": null},
    {"name": "Belgium", "SeriesID":"IR3TIB01BEM156N", "Interest_Rate": null},
    {"name": "New Zealand", "SeriesID":"IR3TIB01NZM156N", "Interest_Rate": null},
    {"name": "Netherlands", "SeriesID":"IR3TIB01NLM156N", "Interest_Rate": null},
    {"name": "Ireland", "SeriesID":"IR3TIB01IEM156N", "Interest_Rate": null},
    {"name": "Israel", "SeriesID":"IR3TIB01ILM156N", "Interest_Rate": null},
    {"name": "Finland", "SeriesID":"IR3TIB01FIM156N", "Interest_Rate": null},
    {"name": "Turkey", "SeriesID":"IR3TIB01TRM156N", "Interest_Rate": null},
    {"name": "Estonia", "SeriesID":"IR3TIB01EEM156N", "Interest_Rate": null},
    {"name": "Costa Rica", "SeriesID":"CRIIR3TIB01STM", "Interest_Rate": null},
    {"name": "Slovakia", "SeriesID":"IR3TIB01SKM156N", "Interest_Rate": null},
    {"name": "Slovenia", "SeriesID":"IR3TIB01SIM156N", "Interest_Rate": null},
    {"name": "Lithuania", "SeriesID":"LTUIR3TIB01STM", "Interest_Rate": null},
    {"name": "Iceland", "SeriesID":"IR3TIB01ISM156N", "Interest_Rate": null},
    {"name": "Luxembourg", "SeriesID":"IR3TIB01LUM156N", "Interest_Rate": null},
    {"name": "Latvia", "SeriesID":"LVAIR3TIB01STM", "Interest_Rate": null},
    {"name": "Germany", "SeriesID":"IR3TIB01DEM156N", "Interest_Rate": null}
];

const promiseThrottle = new PromiseThrottle({
    requestsPerSecond: 1,
    promiseImplementation: Promise
});

async function FRED_API() {
    try {
        const promises = eurozone_countries.map(async name => {
            try {
                let seriesID = name.SeriesID;
                
                let API_url_for_CPI = `https://api.stlouisfed.org/fred/series/observations?series_id=${seriesID}&api_key=${process.env.API_KEY}&file_type=json`;
                
                const response = await promiseThrottle.add(() => fetch(API_url_for_CPI));
                const data = await response.json();
                const observations = data.observations;

                const latest_observation = observations[observations.length - 1]; 

                name.Interest_Rate = parseFloat(parseFloat(latest_observation.value).toFixed(2));

            } catch (error) {
                console.log(`No data found for ${name.name} with series ID ${seriesID}`);
            }
        });

        await Promise.all(promises);

    } catch (error) {
        console.error('Error fetching data', error);
    }

    const country_codes_processed = eurozone_countries.map(({ SeriesID, ...rest }) => rest); 

    export_Flask(country_codes_processed);    
}

function export_Flask(country_codes_processed){
    fetch('http://localhost:5000/upload-json-fred-interest-rates', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(country_codes_processed)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Data exported successfully', data);
    })
    .catch(error => {
        console.log('Error exporting data:', error);
    });
}

FRED_API();

