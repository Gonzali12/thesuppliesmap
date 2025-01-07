const PromiseThrottle = require('promise-throttle');
require('dotenv').config();

const country_codes = [
    {"name": "United States of America", "code": "US", "CPI_YoY": null},
    {"name": "Canada", "code": "CA", "CPI_YoY": null},   
    {"name": "Mexico", "code": "MEX", "CPI_YoY": null},
    {"name": "United Kingdom", "code": "GB", "CPI_YoY": null},
    {"name": "Germany", "code": "DE", "CPI_YoY": null},
    {"name": "France", "code": "FRA", "CPI_YoY": null},
    {"name": "Italy", "code": "ITA", "CPI_YoY": null},
    {"name": "Spain", "code": "ESP", "CPI_YoY": null},
    {"name": "Netherlands", "code": "NLD", "CPI_YoY": null},
    {"name": "Japan", "code": "JPN", "CPI_YoY": null},
    {"name": "Australia", "code": "AU", "CPI_YoY": null},
    {"name": "China", "code": "CN", "CPI_YoY": null},
    {"name": "India", "code": "IN", "CPI_YoY": null},
    {"name": "Brazil", "code": "BR", "CPI_YoY": null},
    {"name": "Argentina", "code": "ARG", "CPI_YoY": null},
    {"name": "South Africa", "code": "ZA", "CPI_YoY": null},
    {"name": "South Korea", "code": "KOR", "CPI_YoY": null},
    {"name": "Russia", "code": "RU", "CPI_YoY": null},
    {"name": "Saudi Arabia", "code": "SAU", "CPI_YoY": null},
    {"name": "Sweden", "code": "SWE", "CPI_YoY": null},
    {"name": "Norway", "code": "NOR", "CPI_YoY": null},
    {"name": "Switzerland", "code": "CHE", "CPI_YoY": null},
    {"name": "Turkey", "code": "TUR", "CPI_YoY": null},
    {"name": "Indonesia", "code": "ID", "CPI_YoY": null},
    {"name": "New Zealand", "code": "NZL", "CPI_YoY": null},
    {"name": "Israel", "code": "IL", "CPI_YoY": null},
    {"name": "Ireland", "code": "IRL", "CPI_YoY": null},
    {"name": "Belgium", "code": "BEL", "CPI_YoY": null},
    {"name": "Austria", "code": "AUT", "CPI_YoY": null},
    {"name": "Greece", "code": "GRC", "CPI_YoY": null},
    {"name": "Portugal", "code": "PT", "CPI_YoY": null},
    {"name": "Finland", "code": "FIN", "CPI_YoY": null},
    {"name": "Denmark", "code": "DNK", "CPI_YoY": null},
    {"name": "Poland", "code": "PL", "CPI_YoY": null},
    {"name": "Czech Republic", "code": "CZE", "CPI_YoY": null},
    {"name": "Hungary", "code": "HUN", "CPI_YoY": null},
    {"name": "Chile", "code": "CHL", "CPI_YoY": null},
    {"name": "Colombia", "code": "COL", "CPI_YoY": null},
    {"name": "Slovakia", "code": "SK", "CPI_YoY": null},
    {"name": "Slovenia", "code": "SVN", "CPI_YoY": null},
    {"name": "Estonia", "code": "EST", "CPI_YoY": null},
    {"name": "Latvia", "code": "LVA", "CPI_YoY": null},
    {"name": "Lithuania", "code": "LTU", "CPI_YoY": null},
    {"name": "Luxembourg", "code": "LU", "CPI_YoY": null},
    {"name": "Iceland", "code": "IS", "CPI_YoY": null}
];

const promiseThrottle = new PromiseThrottle({
    requestsPerSecond: 1,
    promiseImplementation: Promise
});

async function FRED_API() {
    try {
        const promises = country_codes.map(async name => {
            try {

                let seriesID = await GetDataSeries(name.code);
                let API_url_for_CPI = `https://api.stlouisfed.org/fred/series/observations?series_id=${seriesID}&api_key=${process.env.API_KEY}&file_type=json`;
                
                const response = await promiseThrottle.add(() => fetch(API_url_for_CPI));
                const data = await response.json();
                const observations = data.observations;

                const latest_observation = observations[observations.length - 1]; 

                name.CPI_YoY = parseFloat(parseFloat(latest_observation.value).toFixed(2));

            } catch (error) {
                console.log(error)
            }
        });

        await Promise.all(promises);

    } catch (error) {
        console.error('Error fetching data', error);
    }

    const ReadyToSentDictionary = country_codes.map(({ code, ...rest }) => rest); 

    export_Flask(ReadyToSentDictionary);
}

function export_Flask(ReadyToSentDictionary){
    fetch('http://localhost:5000/upload-json-fred-main-countries', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(ReadyToSentDictionary)
    })    
    .then(response => response.json())
    .then(data => {
        console.log('Data exported successfully', data);
    })
    .catch(error => {
        console.log('Error exporting data:', error);
    });
}

async function GetDataSeries(code) {
    const seriesIDs = [
        `CPALTT01${code}M659N`,
        `${code}CPALTT01CTGYM`,
        `${code}CPALTT01GYM`,
        `${code}CPALTT01CTGYQ`,
        `CPALTT01${code}Q659N`
    ];

    for (let serieID of seriesIDs) {
        try {
            let response = await fetch(`https://api.stlouisfed.org/fred/series/observations?series_id=${serieID}&api_key=${process.env.API_KEY}&file_type=json`);
            let data = await response.json();
            if (data && data.observations && data.observations.length > 0) {
                return serieID; 
            } else {
                console.error(`No data found for series ID ${serieID}`);
            }
        } catch (error) {
            console.log(error);
        }
    }
    throw new Error(`No valid series ID found for country code: ${code}`);
}

FRED_API();



/**

// Multiple versions of the same array being printed
function export_Flask(ReadyToSentDictionary){
    fetch('http://localhost:5000/upload-json-fred-main-countries', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(ReadyToSentDictionary)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Data exported successfully', data);
    })
    .catch(error => {
        console.log('Error exporting data:', error);
    });
}

**/


/*

function export_Flask(dataString){
    fetch(`http://localhost:5000/upload-json-fred?fred-cpi=${dataString}`, {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        console.log('Data exported successfully', data);
    })
    .catch(error =>{
        console.log('Error exporting data:', error)
    });
}

*/







/*

const axios = require('axios');
const cheerio = require('cheerio');

const PERU_BCRP = {"CPI_YoY": null};

axios.get('https://estadisticas.bcrp.gob.pe/estadisticas/series/mensuales/resultados/PN01271PM')
  .then(response => {
    const html = response.data;
    const $ = cheerio.load(html);

    const data = $('#frmMensual > div.barra-resultados > table > tbody > tr:last-child');

    const text = data.find('td.dato');

    PERU_BCRP.CPI = parseFloat($(text).text());

    const dataString = encodeURIComponent(JSON.stringify(PERU_BCRP.CPI));

    export_Flask(dataString);
});

function export_Flask(){
    fetch(`http://localhost:5000/upload-json?peru-cpi=${dataString}`, {
        method: 'GET'
    })
    .then(response => {
        return response.json();
    })
}
//GET request, need to update Flask to make mega JSON
export_Flask();

*/