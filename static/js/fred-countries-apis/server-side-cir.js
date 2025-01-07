const PromiseThrottle = require('promise-throttle');

require('dotenv').config();

const country_codes = [    
    {"name": "Pakistan", "ID": "PAKPCPIPCHPT", "CPI_YoY": null}, 
    {"name": "Egypt", "ID": "EGYPCPIPCHPT", "CPI_YoY": null}
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
        const { ID, ...rest} = name;
        return rest;
    });

    exportFlask(country_codes_processed);
}

function exportFlask(country_codes_processed){
    fetch('http://localhost:5000/upload-json-fred-cir', {
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



















/*

export_Flask();

axios.get('https://www.bcb.gob.bo/?q=indicadores_inflacion')
    .then(response => {
        const html = response.data;
        const $ = cheerio.load(html);

        const data = $('#quicktabs-tabpage-indicadores_de_inflaci_n-0 > div > div.view-content > table > tbody > tr.odd.views-row-first');

        const text = data.find('td.views-field.views-field-field-inflacion-mensual');

        Unformatted_number = ($(text).text().trim());

        BOLIVIA_BCB.CPI = parseFloat(Unformatted_number.replace(',', '.').replace('%', ''));

        const dataString = encodeURIComponent(JSON.stringify(BOLIVIA_BCB.CPI));

        export_Flask(dataString);
    })
    .catch(error => {
        console.log('Error fetching data', error);
    })






            const latest_observation = observations[observations.length - 1];
            name.CPI = latest_observation.value;

        } catch (error) {
            console.error(`Error fetching data for ${name.name}:`, error);
        }
    }


*/