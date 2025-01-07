const axios = require('axios');
const cheerio = require('cheerio');

let PARAGUAY_IR;

axios.get('https://www.bcp.gov.py/')
  .then(response => {
        const html = response.data;
        const $ = cheerio.load(html);

        const data = $("#content > div.lateral_centro > div:nth-child(1) > div.caja_int_home > ul > li:nth-child(3) > a");

        let text = data.text().trim(); 

        const match = text.match(/(\d{1,3},\d{2})/); 

        PARAGUAY_IR = parseFloat(match[0].replace(',', '.'));

        export_Flask(PARAGUAY_IR);
    })
    .catch(error => {
        console.log('Error fetching data', error);
    })

function export_Flask(PARAGUAY_IR){
    if (PARAGUAY_IR === undefined || PARAGUAY_IR === null) {
        console.error('No data to export');
        return;
    }

    fetch(`http://localhost:5000/upload-json-interest-rate-sa-and-na?paraguay-policy-interest-rate=${parseFloat(PARAGUAY_IR)}`, {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        console.log('Data exported successfully', data);
    })
    .catch(error =>{
        console.log('Error exporting data:', error)
    });

    console.log(`http://localhost:5000/upload-json-interest-rate-sa?paraguay-interest-rate=${parseFloat(PARAGUAY_IR)}`);
}

