const axios = require('axios');
const cheerio = require('cheerio');

let BOLIVIA_ER;

axios.get('https://www.bcb.gob.bo')
  .then(response => {
        const html = response.data;
        const $ = cheerio.load(html);

        const data = $('#content > div:nth-child(2) > div > div:nth-child(1) > div:nth-child(1) > div > div.f3-con > div > div > div:nth-child(3) > div > div > div:nth-child(2) > div:nth-child(2)');

        const text = String(data.find('strong'));

        let Unformatted_number = $(text).text().trim();

        BOLIVIA_ER = parseFloat(parseFloat(Unformatted_number.replace(',', '.')).toFixed(2));

        export_Flask(BOLIVIA_ER);
    })
    .catch(error => {
        console.log('Error fetching data', error);
    })

function export_Flask(BOLIVIA_ER){
    if (BOLIVIA_ER === undefined || BOLIVIA_ER === null) {
        console.error('No data to export');
        return;
    }

    fetch(`http://localhost:5000/upload-json-exchange-rate-sa?bolivia-exchange-rate=${parseFloat(BOLIVIA_ER)}`, {
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

