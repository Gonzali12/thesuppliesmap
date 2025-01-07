require('dotenv').config();

let USA_IR;

async function FRED_API() {
    try {

        let seriesID = 'DFF';
        let API_url_for_CPI = `https://api.stlouisfed.org/fred/series/observations?series_id=${seriesID}&api_key=${process.env.API_KEY}&file_type=json`;
        
        const response = await fetch(API_url_for_CPI);
        const data = await response.json();

        const observations = data.observations;
        const latest_observation = observations[observations.length - 1]; 

        USA_IR = parseFloat(parseFloat(latest_observation.value).toFixed(2));

        export_Flask(USA_IR);

    } catch (error) {
        console.log(`Failed fetching API`)
    }
}

function export_Flask(USA_IR){
    if (USA_IR === undefined || USA_IR === null) {
        console.error('No data to export');
        return;
    }

    fetch(`http://localhost:5000/upload-json-interest-rate-sa-and-na?usa-policy-interest-rate=${parseFloat(USA_IR)}`, {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        console.log('Data exported successfully', data);
    })
    .catch(error =>{
        console.log('Error exporting data:', error)
    });

    console.log(`http://localhost:5000/upload-json-interest-rate-sa-and-na?usa-policy-interest-rate=${parseFloat(USA_IR)}`);
}

FRED_API();