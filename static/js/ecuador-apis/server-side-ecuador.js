const axios = require('axios');

axios.get('https://www.imf.org/external/datamapper/api/v1/PCPIPCH/ECU?periods=2024')
  .then(response => {
    
    const cpiValue = response.data.values.PCPIPCH.ECU["2024"];

    console.log(cpiValue);

    function export_Flask(){
        const dataString = encodeURIComponent(JSON.stringify(cpiValue));
        fetch(`http://localhost:5000/upload-json?ecuador-cpi=${dataString}`, {
            method: 'GET'
        })
        .then(response => {
            return response.json();
        })       
    }

    export_Flask();
  })
.catch(error => {
    console.log(error);
});
 