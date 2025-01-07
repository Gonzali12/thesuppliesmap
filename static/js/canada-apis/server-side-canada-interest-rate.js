const axios = require('axios');
const cheerio = require('cheerio');

let CANADA_IR;

axios.get('https://www.bankofcanada.ca/core-functions/monetary-policy/key-interest-rate/')
  .then(response => {
        const html = response.data;
        const $ = cheerio.load(html);

        const data = $("#target-table > tbody > tr:nth-child(1)");

        const text = String(data.find("td:nth-child(2)"));

        let Unformatted_number = $(text).text().trim();

        CANADA_IR = parseFloat(parseFloat(Unformatted_number.replace(',', '.')).toFixed(2));

        export_Flask(CANADA_IR);
    })
    .catch(error => {
        console.log('Error fetching data', error);
    })

function export_Flask(CANADA_IR){
    if (CANADA_IR === undefined || CANADA_IR === null) {
        console.error('No data to export');
        return;
    }

    fetch(`http://localhost:5000/upload-json-interest-rate-sa-and-na?canada-policy-interest-rate=${parseFloat(CANADA_IR)}`, {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        console.log('Data exported successfully', data);
    })
    .catch(error =>{
        console.log('Error exporting data:', error)
    });

    console.log(`http://localhost:5000/upload-json-interest-rate-sa-and-na?canada-policy-interest-rate=${parseFloat(CANADA_IR)}`);
}

// "