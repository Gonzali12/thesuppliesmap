const PromiseThrottle = require('promise-throttle');

require('dotenv').config();


// 50 requests

const country_codes = [
    {"name": "Canada", "seriesID": "CCUSSP01CAM650N", "Exchange_Rate": null},   
    {"name": "Mexico", "seriesID": "CCUSMA02MXM618N", "Exchange_Rate": null},
    {"name": "United Kingdom", "seriesID": "CCUSMA02GBM618N", "Exchange_Rate": null},
    {"name": "Germany", "seriesID": "CCUSMA02EZM618N", "Exchange_Rate": null},
    {"name": "France", "seriesID": "CCUSMA02EZM618N", "Exchange_Rate": null},
    {"name": "Italy", "seriesID": "CCUSMA02EZM618N", "Exchange_Rate": null},
    {"name": "Spain", "seriesID": "CCUSMA02EZM618N", "Exchange_Rate": null},
    {"name": "Netherlands", "seriesID": "CCUSMA02EZM618N", "Exchange_Rate": null},
    {"name": "Japan", "seriesID": "CCUSMA02JPM618N", "Exchange_Rate": null},
    {"name": "Australia", "seriesID": "CCUSSP01AUM650N", "Exchange_Rate": null},
    {"name": "China", "seriesID": "CCUSMA02CNM618N", "Exchange_Rate": null},
    {"name": "India", "seriesID": "CCUSMA02INM618N", "Exchange_Rate": null},
    {"name": "Brazil", "seriesID": "CCUSMA02BRM618N", "Exchange_Rate": null},
    {"name": "Argentina", "seriesID": "ARGCCUSMA02STM", "Exchange_Rate": null},
    {"name": "South Africa", "seriesID": "CCUSMA02ZAM618N", "Exchange_Rate": null},
    {"name": "South Korea", "seriesID": "CCUSMA02KRM618N", "Exchange_Rate": null},
    {"name": "Russia", "seriesID": "CCUSMA02RUM618N", "Exchange_Rate": null},
    {"name": "Saudi Arabia", "seriesID": "SAUCCUSMA02STM", "Exchange_Rate": null},
    {"name": "Sweden", "seriesID": "CCUSMA02SEM618N", "Exchange_Rate": null},
    {"name": "Norway", "seriesID": "CCUSMA02NOM618N", "Exchange_Rate": null},
    {"name": "Switzerland", "seriesID": "CCUSMA02CHM618N", "Exchange_Rate": null},
    {"name": "Turkey", "seriesID": "CCUSMA02TRM618N", "Exchange_Rate": null},
    {"name": "Indonesia", "seriesID": "CCUSMA02IDM618N", "Exchange_Rate": null},
    {"name": "New Zealand", "seriesID": "CCUSMA02NZM618N", "Exchange_Rate": null},
    {"name": "Israel", "seriesID": "CCUSMA02ILM618N", "Exchange_Rate": null},
    {"name": "Ireland", "seriesID": "CCUSMA02EZM618N", "Exchange_Rate": null},
    {"name": "Belgium", "seriesID": "CCUSMA02EZM618N", "Exchange_Rate": null},
    {"name": "Austria", "seriesID": "CCUSMA02EZM618N", "Exchange_Rate": null},
    {"name": "Greece", "seriesID": "CCUSMA02EZM618N", "Exchange_Rate": null},
    {"name": "Portugal", "seriesID": "CCUSMA02EZM618N", "Exchange_Rate": null},
    {"name": "Finland", "seriesID": "CCUSMA02EZM618N", "Exchange_Rate": null},
    {"name": "Denmark", "seriesID": "CCUSMA02DKM618N", "Exchange_Rate": null},
    {"name": "Poland", "seriesID": "CCUSMA02PLM618N", "Exchange_Rate": null},
    {"name": "Czech Republic", "seriesID": "CCUSMA02CZM618N", "Exchange_Rate": null},
    {"name": "Hungary", "seriesID": "CCUSMA02HUM618N", "Exchange_Rate": null},
    {"name": "Chile", "seriesID": "CCUSMA02CLM618N", "Exchange_Rate": null},
    {"name": "Colombia", "seriesID": "COLCCUSMA02STM", "Exchange_Rate": null},
    {"name": "Slovakia", "seriesID": "CCUSMA02EZM618N", "Exchange_Rate": null},
    {"name": "Slovenia", "seriesID": "CCUSMA02EZM618N", "Exchange_Rate": null},
    {"name": "Estonia", "seriesID": "CCUSMA02EZM618N", "Exchange_Rate": null},
    {"name": "Latvia", "seriesID": "CCUSMA02EZM618N", "Exchange_Rate": null},
    {"name": "Lithuania", "seriesID": "CCUSMA02EZM618N", "Exchange_Rate": null},
    {"name": "Luxembourg", "seriesID": "CCUSMA02EZM618N", "Exchange_Rate": null},
    {"name": "Iceland", "seriesID": "CCUSMA02ISM618N", "Exchange_Rate": null},
    {"name": "Andorra", "seriesID": "CCUSMA02EZM618N", "Exchange_Rate": null},
    {"name": "Cyprus", "seriesID": "CCUSMA02EZM618N", "Exchange_Rate": null},
    {"name": "Malta", "seriesID": "CCUSMA02EZM618N", "Exchange_Rate": null},
    {"name": "Romania", "seriesID": "ROUCCUSMA02STM", "Exchange_Rate": null},
    {"name": "Croatia", "seriesID": "CCUSMA02EZM618N", "Exchange_Rate": null}
];

const promiseThrottle = new PromiseThrottle({
    requestsPerSecond: 1,
    promiseImplementation: Promise
});

async function FRED_API() {
    try {
        const promises = country_codes.map(async name => {
            try {
                let seriesID = name.seriesID;
                
                let API_url_for_CPI = `https://api.stlouisfed.org/fred/series/observations?series_id=${seriesID}&api_key=${process.env.API_KEY}&file_type=json`;
                
                const response = await promiseThrottle.add(() => fetch(API_url_for_CPI));
                const data = await response.json();
                const observations = data.observations;

                const latest_observation = observations[observations.length - 1]; 

                name.Exchange_Rate = parseFloat(parseFloat(latest_observation.value).toFixed(2));

            } catch (error) {
                console.log(`No data found for ${name.name} with series ID ${seriesID}`)
            }
        });

        await Promise.all(promises);

    } catch (error) {
        console.error('Error fetching data', error);
    }

    const formatted_countries_list = country_codes.map(name => {
        const { seriesID, ...rest } = name;
        return rest;
    });
    
    export_Flask(formatted_countries_list);

    console.log(formatted_countries_list);
}

function export_Flask(formatted_countries_list){
    fetch('http://localhost:5000/upload-json-fred-exchange-rates-main-countries', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formatted_countries_list)
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
