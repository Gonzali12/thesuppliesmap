const axios = require('axios');
const cheerio = require('cheerio');

let BOLIVIA_IR;

axios.get('https://www.bcb.gob.bo/')
  .then(response => {
        const html = response.data;
        const $ = cheerio.load(html);

        const data = $("#content > div:nth-child(2) > div > div:nth-child(1) > div:nth-child(3) > div > div.f3-con > div > div.col-sm-24 > div:nth-child(1) > div:nth-child(1)");

        const text = String(data.find("strong"));

        let Unformatted_number = $(text).text().trim();

        BOLIVIA_IR = parseFloat(parseFloat(Unformatted_number.replace(',', '.')).toFixed(2));

        export_Flask(BOLIVIA_IR);
    })
    .catch(error => {
        console.log('Error fetching data', error);
    })

function export_Flask(BOLIVIA_IR){
    if (BOLIVIA_IR === undefined || BOLIVIA_IR === null) {
        console.error('No data to export');
        return;
    }

    fetch(`http://localhost:5000/upload-json-interest-rate-sa-and-na?bolivia-policy-interest-rate=${parseFloat(BOLIVIA_IR)}`, {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        console.log('Data exported successfully', data);
    })
    .catch(error =>{
        console.log('Error exporting data:', error)
    });

    console.log(`http://localhost:5000/upload-json-interest-rate-sa-and-na?bolivia-policy-interest-rate=${parseFloat(BOLIVIA_IR)}`);
}

