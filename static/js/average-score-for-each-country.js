let PythonArray = [];
let JSArray = [];
let JSONArray = [];

const valid_countries = [
    // List of valid countries
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia",
    "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin",
    "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi",
    "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia",
    "Comoros", "Congo (Congo-Brazzaville)", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark",
    "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea",
    "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana",
    "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland",
    "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan",
    "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein",
    "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands",
    "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco",
    "Mozambique", "Myanmar (Burma)", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger",
    "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine State", "Panama",
    "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda",
    "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe",
    "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands",
    "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden",
    "Switzerland", "Syria", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago",
    "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom",
    "United States of America", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen",
    "Zambia", "Zimbabwe"
];

document.addEventListener('DOMContentLoaded', async function () {
    async function FetchFinalList() {
        try {
            const response = await fetch('/upload-json-all-apis', { method: 'POST' });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const PythonData = await response.json();
            PythonArray.push(...PythonData);
        } catch (error) {
            console.error("Error fetching Python data:", error);
        }

        removeExchangeRateKey();
    }

    await FetchFinalList(); 

    await Promise.all([
        getECI(),
        getGDPPerCapita(),
        AverageGDPGrowthRateLastTenYears(),
        GINI(),
        EaseOfDoingBusiness(),
        CorporateTaxRate(),
        PortThroughput(),
        TurnAroundTime(),
        PoliticalStability(),
        LPI(),
        added_value_tax(),
        ITR(),
        social_security_tax(),
        TotalTrade()
    ])
        .then(() => {
            consolidateJSArray();
            joinJSONs();

            // need to remove every key-value pair in every dictionary in JSONArray's lists of dictionaries that incudes a key "exchange_rate" and its pair. We then update JSONArray and store it locally
            
            localStorage.setItem('JSONArray', JSON.stringify(JSONArray));
        })
        .catch(error => {
            console.error("Error processing data:", error);
        });

    function getECI() {
        return fetch(jsonDataUrlOne)
            .then(response => response.json())
            .then(data => JSArray.push(data));
    }

    function getGDPPerCapita() {
        return fetch(jsonDataUrlTwo)
            .then(response => response.json())
            .then(data => JSArray.push(data));
    }

    function AverageGDPGrowthRateLastTenYears() {
        return fetch(jsonDataUrlThree)
            .then(response => response.json())
            .then(data => JSArray.push(data));
    }

    function GINI() {
        return fetch(jsonDataUrlFive)
            .then(response => response.json())
            .then(data => JSArray.push(data));
    }

    function EaseOfDoingBusiness() {
        return fetch(jsonDataUrlNineteen)
            .then(response => response.json())
            .then(data => JSArray.push(data));
    }

    function CorporateTaxRate() {
        return fetch(jsonDataUrlEighteen)
            .then(response => response.json())
            .then(data => JSArray.push(data));
    }

    function PortThroughput() {
        return fetch(jsonDataUrlTen)
            .then(response => response.json())
            .then(data => JSArray.push(data));
    }

    function TurnAroundTime() {
        return fetch(jsonDataUrlNine)
            .then(response => response.json())
            .then(data => JSArray.push(data));
    }

    function PoliticalStability() {
        return fetch(jsonDataUrlSeventeen)
            .then(response => response.json())
            .then(data => JSArray.push(data));
    }

    function LPI() {
        return fetch(jsonDataUrlEleven)
            .then(response => response.json())
            .then(data => JSArray.push(data));
    }

    function added_value_tax() {
        return fetch(jsonDataUrlFourteen)
            .then(response => response.json())
            .then(data => JSArray.push(data));
    }

    function ITR() {
        return fetch(jsonDataUrlSixteen)
            .then(response => response.json())
            .then(data => JSArray.push(data));
    }

    function social_security_tax() {
        return fetch(jsonDataUrlFifteen)
            .then(response => response.json())
            .then(data => JSArray.push(data));
    }

    function TotalTrade() {
        return fetch(jsonDataUrlFour)
            .then(response => response.json())
            .then(data => JSArray.push(data));
    }

    function consolidateJSArray() {
        // Consolidate all metrics into a single object per country
        const consolidated = {};
        JSArray.flat().forEach(entry => {
            if (!consolidated[entry.name]) {
                consolidated[entry.name] = { name: entry.name, class: entry.name };
            }
            Object.assign(consolidated[entry.name], entry);
        });
        JSArray = Object.values(consolidated); // Replace JSArray with consolidated data
    }

    function joinJSONs() {
        valid_countries.forEach(countryName => {
            const JSdata = JSArray.find(country => country.name === countryName);
            const PYdata = PythonArray.find(country => country.name === countryName);
    
            // Merge data and convert numeric strings to numbers
            const Result = { name: countryName, class: countryName };
    
            const mergeData = (source) => {
                if (source) {
                    Object.entries(source).forEach(([key, value]) => {
                        // Convert strings to numbers if numeric
                        if (!isNaN(value) && value !== null && value !== '') {
                            Result[key] = Number(value);
                        } else {
                            Result[key] = value;
                        }
                    });
                }
            };
    
            mergeData(PYdata);
            mergeData(JSdata);
    
            JSONArray.push(Result);
        });    
    }

    function removeExchangeRateKey() {
        PythonArray.forEach((item) => {
            if ('exchange_rate' in item) {
                delete item.exchange_rate;
            }
        });
        console.log("Updated PythonArray:", PythonArray);
    }
});
