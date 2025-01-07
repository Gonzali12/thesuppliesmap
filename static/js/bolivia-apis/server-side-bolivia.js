const axios = require('axios');
const cheerio = require('cheerio');

let BOLIVIA_BCB;

axios.get('https://www.bcb.gob.bo/?q=indicadores_inflacion')
  .then(response => {
    const html = response.data;
    const $ = cheerio.load(html);

    const data = $('#quicktabs-tabpage-indicadores_de_inflaci_n-0 > div > div.view-content > table > tbody > tr.odd.views-row-first');

    const text = data.find('td.views-field.views-field-field-variacion-acumulada');
    
    Unformatted_number = ($(text).text().trim());
    
    BOLIVIA_BCB = parseFloat(Unformatted_number.replace(',', '.').replace('%', ''));

    function export_Flask(){
        const dataString = encodeURIComponent(JSON.stringify(BOLIVIA_BCB));
        fetch(`http://localhost:5000/upload-json?bolivia-cpi=${dataString}`, {
            method: 'GET'
        })
        .then(response => {
            return response.json();
        })
    }

    export_Flask();
});