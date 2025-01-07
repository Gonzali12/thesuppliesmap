const {exec} = require('child_process');

const scripts = [
        'C:/Users/gonza/OneDrive/Escritorio/thesuppliesmap/static/js/bolivia-apis/server-side-bolivia-exchange-rate.js',
        'C:/Users/gonza/OneDrive/Escritorio/thesuppliesmap/static/js/bolivia-apis/server-side-bolivia-interest-rate.js',
        'C:/Users/gonza/OneDrive/Escritorio/thesuppliesmap/static/js/bolivia-apis/server-side-bolivia.js',
        'C:/Users/gonza/OneDrive/Escritorio/thesuppliesmap/static/js/canada-apis/server-side-canada-interest-rate.js',
        'C:/Users/gonza/OneDrive/Escritorio/thesuppliesmap/static/js/chile-apis/server-side-chile-interest-rate.js',
        'C:/Users/gonza/OneDrive/Escritorio/thesuppliesmap/static/js/ecuador-apis/server-side-ecuador.js',
        'C:/Users/gonza/OneDrive/Escritorio/thesuppliesmap/static/js/mexico-apis/server-side-mexico-interest-rate.js',
        'C:/Users/gonza/OneDrive/Escritorio/thesuppliesmap/static/js/paraguay-apis/server-side-paraguay-exchange-rate.js',
        'C:/Users/gonza/OneDrive/Escritorio/thesuppliesmap/static/js/paraguay-apis/server-side-paraguay-interest-rate.js',
        'C:/Users/gonza/OneDrive/Escritorio/thesuppliesmap/static/js/paraguay-apis/server-side-paraguay.js',
        'C:/Users/gonza/OneDrive/Escritorio/thesuppliesmap/static/js/peru-apis/server-side-peru.js',
        'C:/Users/gonza/OneDrive/Escritorio/thesuppliesmap/static/js/uruguay-apis/server-side-uruguay-exchange-rate.js',
        'C:/Users/gonza/OneDrive/Escritorio/thesuppliesmap/static/js/uruguay-apis/server-side-uruguay.js',
        'C:/Users/gonza/OneDrive/Escritorio/thesuppliesmap/static/js/usa-apis/server-side-usa-interest-rate.js',
        'C:/Users/gonza/OneDrive/Escritorio/thesuppliesmap/static/js/fred-countries-apis/server-side-fred-currency-exchange-rate.js',
        'C:/Users/gonza/OneDrive/Escritorio/thesuppliesmap/static/js/fred-countries-apis/server-side-fred-interest-rate.js',
        'C:/Users/gonza/OneDrive/Escritorio/thesuppliesmap/static/js/fred-countries-apis/server-side-cir.js',
        'C:/Users/gonza/OneDrive/Escritorio/thesuppliesmap/static/js/fred-countries-apis/server-side-yoy-increases-cpi.js'
    ];

const FRED_Long_Script = 'C:/Users/gonza/OneDrive/Escritorio/thesuppliesmap/static/js/fred-countries-apis/server-side-fred.js';

function sleep(time){
    return new Promise(resolve => setTimeout(resolve, time))
}

async function ExecuteScripts(scripts) {
    for (let script of scripts) {
        exec(`node ${script}`, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error}`);
            }

            if (stderr) {
                console.log(`stderr: ${stderr}`);
            }

            console.log(`output: ${stdout}`);
        });

        await sleep(1500);       
    }

    await sleep(90000);

    exec(`node ${FRED_Long_Script}`, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error}`);
        }

        if (stderr) {
            console.log(`stderr: ${stderr}`);
        }

        console.log(`output: ${stdout}`);
    });
}

ExecuteScripts(scripts);

