const axios = require('axios');
const cheerio = require('cheerio');

//

axios.get('https://www.exchange-rates.org/es/conversor/usd-uyu')
  .then(response => {
        const html = response.data;
        const $ = cheerio.load(html);

        const data = $("body > div.layout.locale_es-ES > div.content.container > div > div > section.box.converter-box > div > div > div.row.converter-row-2 > div > div.main-results > span.to-cnt");

        const text = data.find("span.to-rate");

        let URUGUAY_BCE = parseFloat(parseFloat($(text).text().trim().replace(',', '.')).toFixed(2));

        export_Flask(URUGUAY_BCE);
    })
    .catch(error => {
        console.log('Error fetching data', error);
    })

function export_Flask(URUGUAY_BCE){
    if (URUGUAY_BCE === undefined || URUGUAY_BCE === null) {
        console.error('No data to export');
        return;
    }

    fetch(`http://localhost:5000/upload-json-exchange-rate-sa?uruguay-exchange-rate=${parseFloat(URUGUAY_BCE)}`, {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        console.log('Data exported successfully', data);
    })
    .catch(error =>{
        console.log('Error exporting data:', error)
    });

    console.log(`http://localhost:5000/upload-json-exchange-rate-sa?uruguay-exchange-rate=${parseFloat(URUGUAY_BCE)}`);
}


// " > "
