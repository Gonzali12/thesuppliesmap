const axios = require('axios');
const cheerio = require('cheerio');

let MEXICO_IR;

axios.get('https://www.banxico.org.mx/SieInternet/consultarDirectorioInternetAction.do?sector=18&accion=consultarCuadro&idCuadro=CF101&locale=es')
  .then(response => {
        const html = response.data;
        const $ = cheerio.load(html);

        const data = $("#tablaObservaciones_nodo_1_0_SF61745 > tbody > tr:nth-child(2)");

        const text = data.find("td:nth-child(1)").text().trim(); 

        console.log(text);

        MEXICO_IR = parseFloat(parseFloat(text).toFixed(2));
        
        export_Flask(MEXICO_IR);
    })
    .catch(error => {
        console.log('Error fetching data', error);
    })

function export_Flask(MEXICO_IR){
    if (MEXICO_IR === undefined || MEXICO_IR === null) {
        console.error('No data to export');
        return;
    }

    fetch(`http://localhost:5000/upload-json-interest-rate-sa-and-na?mexico-policy-interest-rate=${parseFloat(MEXICO_IR)}`, {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        console.log('Data exported successfully', data);
    })
    .catch(error =>{
        console.log('Error exporting data:', error)
    });

    console.log(`http://localhost:5000/upload-json-interest-rate-sa-and-na?mexico-policy-interest-rate=${parseFloat(MEXICO_IR)}`);
}
