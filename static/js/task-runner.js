const {exec} = require('child_process');

const scripts = [
        './static/js/bolivia-apis/server-side-bolivia-exchange-rate.js',
        './static/js/bolivia-apis/server-side-bolivia-interest-rate.js',
        './static/js/bolivia-apis/server-side-bolivia.js',
        './static/js/canada-apis/server-side-canada-interest-rate.js',
        './static/js/chile-apis/server-side-chile-interest-rate.js',
        './static/js/ecuador-apis/server-side-ecuador.js',
        './static/js/mexico-apis/server-side-mexico-interest-rate.js',
        './static/js/paraguay-apis/server-side-paraguay-exchange-rate.js',
        './static/js/paraguay-apis/server-side-paraguay-interest-rate.js',
        './static/js/paraguay-apis/server-side-paraguay.js',
        './static/js/peru-apis/server-side-peru.js',
        './static/js/uruguay-apis/server-side-uruguay-exchange-rate.js',
        './static/js/uruguay-apis/server-side-uruguay.js',
        './static/js/usa-apis/server-side-usa-interest-rate.js',
        './static/js/fred-countries-apis/server-side-fred-currency-exchange-rate.js',
        './static/js/fred-countries-apis/server-side-fred-interest-rate.js',
        './static/js/fred-countries-apis/server-side-cir.js',
        './static/js/fred-countries-apis/server-side-yoy-increases-cpi.js'
    ];

const FRED_Long_Script = './static/js/fred-countries-apis/server-side-fred.js';

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

