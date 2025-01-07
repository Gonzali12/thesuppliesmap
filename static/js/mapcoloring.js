let CountriesAndAverageScores = [];
const optimalInflationRate = 2;

document.addEventListener('DOMContentLoaded', function () {
    const rawJSONArray = localStorage.getItem('JSONArray');
    const processedJSONArray = JSON.parse(rawJSONArray);

    processedJSONArray.forEach((country) => {
        if (country['name'] === 'France') {
            console.log(`country: ${JSON.stringify(country)}`);
        }
        
        let sum = 0;
        let counter = 0;

        for (let key in country) {
            let NonScoreValue = country[key];
            
            let score = 0;

            if (key === "inflation_rate") {
                
                score = InflationRateScore(NonScoreValue);
                
                console.log(`inflation score: ${score}`);

                if (country['name']==='France') {
                    console.log(`key: ${key} and score: ${score}`);
                }
                    
                sum += score;
                counter += 1;

            } else if (key != 'Inflation Rate' && key != 'class' && key != 'name') {

                if (NonScoreValue !== null && NonScoreValue !== undefined && NonScoreValue !== Infinity && !isNaN(NonScoreValue)) {
                    score = standardizationScores(NonScoreValue, processedJSONArray, key);
                }

                if (country['name']==='France') {
                    console.log(`key: ${key} and score: ${score}`);
                }

                sum += score;
                counter += 1;
            }

        }  

        let average_score = counter > 0 ? parseFloat((sum / counter).toFixed(3)) : null;
        CountriesAndAverageScores.push({ name: country.name, average_score });
    });

    const svgMap = document.querySelector('.world-map');
    const pathElements = svgMap.querySelectorAll('path');

    pathElements.forEach((path) => {
        const countryName = (path.getAttribute('class') || path.getAttribute('name')).trim();
        const jsonMatch = CountriesAndAverageScores.find((entry) => entry.name === countryName);

        if (countryName==='France'){
            console.log(`jsonMatch: ${JSON.stringify(jsonMatch)}`);
        }

        if (!jsonMatch || jsonMatch.average_score === null || isNaN(jsonMatch.average_score)) {
            path.style.fill = 'grey';
        } else {
            const average_score = jsonMatch.average_score;
            path.style.fill =
            average_score < -0.4 ? '#ff0000' :
            (average_score >= -0.4 && average_score < -0.3) ? '#ef3800' :
            (average_score >= -0.3 && average_score < -0.2) ? '#df7100' :
            (average_score >= -0.2 && average_score < -0.1) ? '#cf7200' :
            (average_score >= -0.1 && average_score < 0.0) ? '#e2e200' :
            (average_score >= 0.0 && average_score < 0.1) ? '#ccdf00' :
            (average_score >= 0.1 && average_score < 0.2) ? '#a7c900' :
            (average_score >= 0.2 && average_score < 0.3) ? '#80b400' :
            (average_score >= 0.3 && average_score < 0.4) ? '#719f00' :
            '#5a7d00';  
        }
    });

    function standardizationScores(standardizationMetric, processedJSONArray, metric) {
        const data = processedJSONArray.map(country => {
            return {
                name: country.name,
                class: country.class,
                value: country[metric] !== undefined && country[metric] !== null ? country[metric] : NaN
            };
        }).filter(entry => !isNaN(entry.value)); 
    
        let X_max;
        let X_min;
    
        if (metric === 'total_trade' || metric === 'gdpPercapita') {
            X_max = Math.log(Math.max(...data.map(row => row.value)));
            X_min = Math.log(Math.min(...data.map(row => row.value)));
            standardizationMetric = Math.log(standardizationMetric);
        } else {
            X_max = Math.max(...data.map(row => row.value));
            X_min = Math.min(...data.map(row => row.value));
        }
    
        if (X_max === X_min) {
            return 0; 
        }
    
        let X_normalized = (standardizationMetric - X_min) / (X_max - X_min);
    
        if (['gini', 'added_value_tax_rate', 'social_security_tax_rate', 'corporate_tax_rate', 'mean_turnaround_time', 'income_tax_rate'].includes(metric)) {
            return -parseFloat((2 * X_normalized - 1).toFixed(3));
        }
    
        return parseFloat((2 * X_normalized - 1).toFixed(3));
    }
    

    function InflationRateScore(standardizationMetric) {
        const threshold = 2;
        if (standardizationMetric === null || isNaN(standardizationMetric)) return -1;

        const difference = Math.abs(standardizationMetric - optimalInflationRate);
        return difference <= threshold ? 1 - difference / threshold : -1;
    }

    console.log();
});
