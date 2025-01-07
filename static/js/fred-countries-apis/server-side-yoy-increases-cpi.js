const PromiseThrottle = require('promise-throttle');

require('dotenv').config();

const country_codes = [
    {"name": "Malaysia", "code": "MYS", 'ID': 'MYSPCPIPCPPPT', "CPI_YoY": null},  
    {"name": "Thailand", "code": "THA", 'ID': 'THAPCPIPCPPPT', "CPI_YoY": null}, 
    {"name": "Vietnam", "code": "VNM", 'ID': 'VNMPCPIPCPPPT', "CPI_YoY": null}, 
    {"name": "Philippines", "code": "PHL", 'ID': 'PHLPCPIPCPPPT', "CPI_YoY": null}, 
    {"name": "Bangladesh", "code": "BGD", 'ID': 'BGDPCPIPCPPPT', "CPI_YoY": null} 
];

const promiseThrottle = new PromiseThrottle({
    requestsPerSecond: 1,
    promiseImplementation: Promise
});

async function FRED_API() {
    for (const name of country_codes) {
        try {
            const response = await promiseThrottle.add(() => fetch(`https://api.stlouisfed.org/fred/series/observations?series_id=${name.ID}&api_key=${process.env.API_KEY}&file_type=json`));
            const data = await response.json();
            const observations = data.observations;

            const latest_observation = observations[observations.length - 1];

            name.CPI_YoY = parseFloat(parseFloat(latest_observation.value).toFixed(2));

        } catch (error) {
            console.error(`Error fetching data for ${name.name}:`, error);
        }
    }

    const country_codes_processed = country_codes.map(name => {
        const { ID, code, ...rest } = name;
        return rest;
    });    

    export_Flask(country_codes_processed);
}

function export_Flask(country_codes_processed){
    fetch('http://localhost:5000/upload-json-fred-annual-cpi', {
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



