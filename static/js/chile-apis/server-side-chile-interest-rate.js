const axios = require('axios');
const cheerio = require('cheerio');

let CHILE_IR;

axios.get('https://www.bcentral.cl/inicio')
  .then(response => {
        const html = response.data;
        const $ = cheerio.load(html);

        const data = $("#_BcentralIndicadoresViewer_INSTANCE_pLcePZ0Eybi8_myTooltipDelegate > div > div > div.fin-indicators-col3 > div.d-flex.justify-content-around.max-w-lg-40 > div.fin-inner-col3 > div");

        const text = String(data.find("p.basic-text.fs-2.f-opensans-bold.text-center.c-blue-nb-2.mb-0"));

        let Unformatted_number = $(text).text().trim();

        Unformatted_number = Unformatted_number.replace('%', '');

        CHILE_IR = parseFloat(parseFloat(Unformatted_number.replace(',', '.')).toFixed(2));

        export_Flask(CHILE_IR);
    })
    .catch(error => {
        console.log('Error fetching data', error);
    })

function export_Flask(CHILE_IR){
    if (CHILE_IR === undefined || CHILE_IR === null) {
        console.error('No data to export');
        return;
    }

    fetch(`http://localhost:5000/upload-json-interest-rate-sa-and-na?chile-policy-interest-rate=${parseFloat(CHILE_IR)}`, {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        console.log('Data exported successfully', data);
    })
    .catch(error =>{
        console.log('Error exporting data:', error)
    });

    console.log(`http://localhost:5000/upload-json-interest-rate-sa-and-na?chile-policy-interest-rate=${parseFloat(CHILE_IR)}`);
}

// "