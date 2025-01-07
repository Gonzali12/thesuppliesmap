const axios = require('axios');
const cheerio = require('cheerio');

axios.get('https://www.bcp.gov.py/webapps/web/cotizacion/monedas')
  .then(response => {
        const html = response.data;
        const $ = cheerio.load(html);

        const data = $("#cotizacion-interbancaria > tbody > tr:nth-child(2)");

        const text = data.find('td:nth-child(4)').text().trim(); 
        
        let Unformatted_number = text.replace('.', '').replace(',', '.');

        PARAGUAY_ER = parseFloat(parseFloat(Unformatted_number).toFixed(2));

        export_Flask(PARAGUAY_ER);
    })
    .catch(error => {
        console.log('Error fetching data', error);
    })

function export_Flask(PARAGUAY_ER){
    if (PARAGUAY_ER === undefined || PARAGUAY_ER === null) {
        console.error('No data to export');
        return;
    }

    fetch(`http://localhost:5000/upload-json-exchange-rate-sa?paraguay-exchange-rate=${parseFloat(PARAGUAY_ER)}`, {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        console.log('Data exported successfully', data);
    })
    .catch(error =>{
        console.log('Error exporting data:', error)
    });

    console.log(`http://localhost:5000/upload-json-exchange-rate-sa?paraguay-exchange-rate=${parseFloat(PARAGUAY_ER)}`);
}
