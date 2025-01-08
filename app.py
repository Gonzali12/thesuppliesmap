from flask import Flask, request, render_template, send_from_directory, url_for, jsonify
import json
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

app.config['ENV'] = 'production'
app.config['DEBUG'] = False
app.config['TESTING'] = False

country_metadata = []

# CPI YoY var values from IMF
sa_countries_YoY_cpi_var_list = [
    {'name': 'Bolivia', 'CPI_YoY': None},
    {'name': 'Ecuador', 'CPI_YoY': 	None},
    {'name': 'Peru', 'CPI_YoY': None},
    {'name': 'Uruguay', 'CPI_YoY': None},
    {'name': 'Venezuela', 'CPI_YoY': None},
    {'name': 'Paraguay', 'CPI_YoY': None}
]

fred_main_countries_exchange_rate_list = []

sa_countries_exchange_rate_list = [
    {'name': 'Bolivia', 'Exchange_Rate': None},
    {'name': 'Uruguay', 'Exchange_Rate': None},
    {'name': 'Paraguay', 'Exchange_Rate': None}
]

sa_and_na_missing_countries_interest_rate_list = [
    {'name': 'Bolivia', 'Interest_Rate': None},
    {'name': 'Paraguay', 'Interest_Rate': None},
    {'name': 'Canada', 'Interest_Rate': None},
    {'name': 'Mexico', 'Interest_Rate': None},
    {'name': 'Chile', 'Interest_Rate': None},
    {'name': 'United States of America', 'Interest_Rate': None},
]

@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

@app.route("/")
def homepage():
    return render_template("index.html")

@app.route("/request-customized-reports")
def request_customized_reports():
    return render_template("request-customized-reports.html")

@app.route("/manufacturing-and-shipping")
def manufacturing_and_shipping():
    return render_template("manufacturing-and-shipping.html")

@app.route("/manufacturing-and-shipping/japan-manufacturing")
def manufacturing_japan():
    return render_template("japan-manufacturing.html")

@app.route("/manufacturing-and-shipping/singapore-shipping")
def shipping_singapore():
    return render_template("singapore-shipping.html")

@app.route("/pricing")
def pricing():
    return render_template("pricing.html")


@app.route("/data")
def data():
    return render_template("data.html")


@app.route("/about-me")
def about_me():
    return render_template("about-me.html")

#JSON requests

#ECI
@app.route("/backend/eci/eci_and_country.json")
def get_json_data_eci():
    return send_from_directory("backend/eci", "eci_and_country.json")

#gdp per capita
@app.route("/backend/gdp-per-capita/gdpPercapita_and_country.json")
def get_json_data_gdpPerCapita():
    return send_from_directory("backend/gdp-per-capita", "gdpPercapita_and_country.json")

#average gdp growth last ten years
@app.route("/backend/gdp-growth-rate-last-ten-years/gdp_growth_rate_last_ten_years_countries_average.json")
def get_json_gdp_growth_average_last_ten_years():
    return send_from_directory("backend/gdp-growth-rate-last-ten-years","gdp_growth_rate_last_ten_years_countries_average.json")

#Total trade
@app.route("/backend/total-trade/total-trade.json")
def get_json_data_total_trade():
    return send_from_directory("backend/total-trade","total-trade.json")

#Gini coefficient
@app.route("/backend/gini/gini-coefficient.json")
def get_json_data_gini():
    return send_from_directory("backend/gini","gini-coefficient.json")

#Ease of doing business
@app.route("/backend/ease-of-doing-business/countries_ease_of_doing_business_ranking.json")
def get_json_data_ease_of_doing_business():
    return send_from_directory("backend/ease-of-doing-business","countries_ease_of_doing_business_ranking.json")

#Corporate Tax Rate
@app.route("/backend/corporate-tax-rate/corporate_tax_rate_by_country.json")
def get_json_corporate_tax_rate():
    return send_from_directory("backend/corporate-tax-rate","corporate_tax_rate_by_country.json")

#Port Throughput
@app.route("/backend/port-throughput/port-throughput-by-country.json")
def get_json_port_throughput():
    return send_from_directory("backend/port-throughput","port-throughput-by-country.json")

#Mean turnaround time
@app.route("/backend/shipping-turnaround-time/shipping-turnaround-time.json")
def get_json_turnaround_time():
    return send_from_directory("backend/shipping-turnaround-time","shipping-turnaround-time.json")

#Political Stability
@app.route("/backend/political-stability/political_stability_scores_by_country.json")
def get_json_political_stability():
    return send_from_directory("backend/political-stability","political_stability_scores_by_country.json")

#LPI Scores
@app.route("/backend/logistics-network-score/international_LPI_scores.json")
def get_json_LPI():
    return send_from_directory("backend/logistics-network-score","international_LPI_scores.json")

#Added value tax rate
@app.route("/backend/added-value-tax/added-value-tax-rate-by-country.json")
def get_json_added_value_tax_rate():
    return send_from_directory("backend/added-value-tax","added-value-tax-rate-by-country.json")

#Income tax rate
@app.route("/backend/income-tax-rate/top-income_tax_rate.json")
def get_json_income_tax_rate():
    return send_from_directory("backend/income-tax-rate","top-income_tax_rate.json")

#Social security tax rate
@app.route("/backend/social-security-tax-rate/social-security-tax-rate-by-country.json")
def get_json_added_social_security_tax_rate():
    return send_from_directory("backend/social-security-tax-rate","social-security-tax-rate-by-country.json")

#JSON requests

# Sample countries
@app.route("/sample-countries")
def SampleCountries():
    return render_template("sample-countries.html")

# Argentina
@app.route("/sample-countries/argentina")
def Argentina():
    return render_template("sample-countries/argentina.html")

# Bolivia
@app.route("/sample-countries/bolivia")
def Bolivia():
    return render_template("sample-countries/bolivia.html")

# Brazil
@app.route("/sample-countries/brazil")
def Brazil():
    return render_template("sample-countries/brazil.html")

# Canada
@app.route("/sample-countries/canada")
def Canada():
    return render_template("sample-countries/canada.html")

# Chile
@app.route("/sample-countries/chile")
def Chile():
    return render_template("sample-countries/chile.html")

# China
@app.route("/sample-countries/china")
def China():
    return render_template("sample-countries/china.html")

# Colombia
@app.route("/sample-countries/colombia")
def Colombia():
    return render_template("sample-countries/colombia.html")

# Ecuador
@app.route("/sample-countries/ecuador")
def Ecuador():
    return render_template("sample-countries/ecuador.html")

# France
@app.route("/sample-countries/france")
def France():
    return render_template("sample-countries/france.html")

# Germany
@app.route("/sample-countries/germany")
def Germany():
    return render_template("sample-countries/germany.html")

# India
@app.route("/sample-countries/india")
def India():
    return render_template("sample-countries/india.html")

# Indonesia
@app.route("/sample-countries/indonesia")
def Indonesia():
    return render_template("sample-countries/indonesia.html")

# Italy
@app.route("/sample-countries/italy")
def Italy():
    return render_template("sample-countries/italy.html")

# Mexico
@app.route("/sample-countries/mexico")
def Mexico():
    return render_template("sample-countries/mexico.html")

# Paraguay
@app.route("/sample-countries/paraguay")
def Paraguay():
    return render_template("sample-countries/paraguay.html")

# Peru
@app.route("/sample-countries/peru")
def Peru():
    return render_template("sample-countries/peru.html")

# Philippines
@app.route("/sample-countries/philippines")
def Philippines():
    return render_template("sample-countries/philippines.html")

# Portugal
@app.route("/sample-countries/portugal")
def Portugal():
    return render_template("sample-countries/portugal.html")

# Russia
@app.route("/sample-countries/russia")
def Russia():
    return render_template("sample-countries/russia.html")

# Spain
@app.route("/sample-countries/spain")
def Spain():
    return render_template("sample-countries/spain.html")

# United Kingdom
@app.route("/sample-countries/united-kingdom")
def United_Kingdom():
    return render_template("sample-countries/united-kingdom.html")

# Uruguay
@app.route("/sample-countries/uruguay")
def Uruguay():
    return render_template("sample-countries/uruguay.html")

# USA
@app.route("/sample-countries/united-states-of-america")
def United_States_of_America():
    return render_template("sample-countries/united-states-of-america.html")

# Venezuela
@app.route("/sample-countries/venezuela")
def Venezuela():
    return render_template("sample-countries/venezuela.html")

# Vietnam
@app.route("/sample-countries/vietnam")
def Vietnam():
    return render_template("sample-countries/vietnam.html")

# Credit risk and Equity Risk Premium
# Handle POST requests to store metadata
@app.route('/finhub-api/country-metadata', methods=['POST'])
def handle_country_metadata():
    global country_metadata
    country_metadata = request.json  # Save the incoming JSON data

    print(country_metadata)

    return jsonify({"message": "Data received successfully!", "received": True}), 200

# Handle GET requests to retrieve metadata
@app.route('/finhub-api/country-metadata', methods=['GET'])
def get_country_metadata():
    return jsonify(country_metadata), 200  

@app.route('/upload-json', methods=['GET'])
def upload_json_sa_countries():
    global sa_countries_YoY_cpi_var_list

    bolivia_yoy_cpi = request.args.get('bolivia-cpi')    
    ecuador_yoy_cpi = request.args.get('peru-cpi')
    peru_yoy_cpi = request.args.get('peru-cpi')
    uruguay_yoy_cpi = request.args.get('uruguay-cpi')
    venezuela_yoy_cpi = request.args.get('venezuela-cpi')
    paraguay_yoy_cpi = request.args.get('paraguay-cpi')

    for item in sa_countries_YoY_cpi_var_list:
        if item['name'] == 'Bolivia':
            item['CPI_YoY'] == bolivia_yoy_cpi
        if item['name'] == 'Ecuador':
            item['CPI_YoY'] == ecuador_yoy_cpi
        if item['name'] == 'Peru':
            item['CPI_YoY'] == peru_yoy_cpi
        if item['name'] == 'Uruguay':
            item['CPI_YoY'] == uruguay_yoy_cpi
        if item['name'] == 'Venezuela':
            item['CPI_YoY'] == venezuela_yoy_cpi
        if item['name'] == 'Paraguay': 
            item['CPI_YoY'] == paraguay_yoy_cpi

    return jsonify(sa_countries_YoY_cpi_var_list)          

#For Node JS
@app.route('/upload-json-fred-annual-cpi', methods=['POST'])
def upload_json_fred_yearly():
    global fred_cpi_yearly
    fred_cpi_yearly = []

    try:
        fred_cpi_yearly = request.get_json()
        
    except json.JSONDecodeError as e:
        print(f"Error decoding JSON: {e}")
        return jsonify({"error": "Invalid JSON data"}), 400

    return jsonify(fred_cpi_yearly)

@app.route('/upload-json-fred-cir', methods=['POST'])
def upload_json_fred_cir():
    global fred_cir    
    fred_cir = []

    try:
        fred_cir = request.get_json()

    except json.JSONDecodeError as e:
        print(f"Error decoding JSON: {e}")
        return jsonify({"error": "Invalid JSON data"}), 400

    return jsonify(fred_cir)

@app.route('/upload-json-fred-main-countries', methods=['POST'])
def upload_json_fred_main_countries():
    global fred_main_countries
    fred_main_countries = []

    try:
        fred_main_countries = request.get_json()
    except json.JSONDecodeError as e:
        print(f"Error decoding JSON: {e}")
        return jsonify({"error": "Invalid JSON data"}), 400

    return jsonify(fred_main_countries)

@app.route('/upload-json-fred-exchange-rates-main-countries', methods=['POST'])
def upload_json_fred_main_countries_exchange_rate():
    global fred_main_countries_exchange_rate_list
    
    try:
        fred_main_countries_exchange_rate = request.get_json()
        
        if not isinstance(fred_main_countries_exchange_rate, list):
            return jsonify({"error": "Invalid data format. Expected a list of countries."}), 400

        for country in fred_main_countries_exchange_rate:
            if not all(key in country for key in ("name", "Exchange_Rate")):
                return jsonify({"error": f"Invalid country format: {country}"}), 400
        
        fred_main_countries_exchange_rate_list.extend(fred_main_countries_exchange_rate)

    except json.JSONDecodeError as e:
        print(f"Error decoding JSON: {e}")
        return jsonify({"error": "Invalid JSON data"}), 400

    return jsonify(fred_main_countries_exchange_rate_list)

@app.route('/upload-json-exchange-rate-sa', methods=['GET'])
def upload_json_fred_exchange_rates_sa():
    global sa_countries_exchange_rate_list
    sa_countries_exchange_rate_list = []
    
    bolivia_exchange_rate = request.args.get('bolivia-exchange-rate')
    uruguay_exchange_rate = request.args.get('uruguay-exchange-rate')
    paraguay_exchange_rate = request.args.get("paraguay-exchange-rate")

    try:
        for country in sa_countries_exchange_rate_list:
            if country['name'] == 'Bolivia' and bolivia_exchange_rate is not None:
                country['Exchange_Rate'] = float(bolivia_exchange_rate)
            elif country['name'] == 'Uruguay' and uruguay_exchange_rate is not None:
                country['Exchange_Rate'] = float(uruguay_exchange_rate)
            elif country['name'] == 'Paraguay' and paraguay_exchange_rate is not None:
                country['Exchange_Rate'] = float(paraguay_exchange_rate)

    except ValueError as e:
        print(f"Error converting exchange rate values to float: {e}")  
        return jsonify({"error": "Exchange rate values must be valid numbers"}), 400

    return jsonify(sa_countries_exchange_rate_list)

@app.route('/upload-json-fred-interest-rates', methods=['POST'])
def upload_json_fred_interest_rate():
    global fred_countries_interest_rate
    fred_countries_interest_rate = []
    
    try:
        fred_countries_interest_rate = request.get_json()
        
    except json.JSONDecodeError as e:
        print(f"Error decoding JSON: {e}")
        return jsonify({"error": "Invalid JSON data"}), 400

    return jsonify(fred_countries_interest_rate)

@app.route('/upload-json-interest-rate-sa-and-na', methods = ['GET'])
def upload_interest_rate_sa_and_na():
    global sa_and_na_missing_countries_interest_rate_list

    bolivia_policy_interest_rate = request.args.get('bolivia-policy-interest-rate')
    paraguay_policy_interest_rate = request.args.get("paraguay-policy-interest-rate")
    canada_policy_interest_rate = request.args.get("canada-policy-interest-rate")
    mexico_policy_interest_rate = request.args.get("mexico-policy-interest-rate")
    chile_policy_interest_rate = request.args.get("chile-policy-interest-rate")
    usa_policy_interest_rate = request.args.get("usa-policy-interest-rate")

    try:
        for country in sa_and_na_missing_countries_interest_rate_list:
            if country['name'] == 'Bolivia' and bolivia_policy_interest_rate is not None:
                country['Interest_Rate'] = float(bolivia_policy_interest_rate)
            if country['name'] == 'Paraguay' and paraguay_policy_interest_rate is not None:
                country['Interest_Rate'] = float(paraguay_policy_interest_rate)
            if country['name'] == 'Canada' and canada_policy_interest_rate is not None:
                country['Interest_Rate'] = float(canada_policy_interest_rate)
            if country['name'] == 'Mexico' and mexico_policy_interest_rate is not None:
                country['Interest_Rate'] = float(mexico_policy_interest_rate)
            if country['name'] == 'Chile' and chile_policy_interest_rate is not None:
                country['Interest_Rate'] = float(chile_policy_interest_rate)
            if country['name'] == 'United States of America' and usa_policy_interest_rate is not None:
                country['Interest_Rate'] = float(usa_policy_interest_rate)
    except ValueError as e:
            print(f"Error converting interest rate values to float: {e}")  
            return jsonify({"error": "Interest rate values must be valid numbers"}), 400

    return jsonify(sa_and_na_missing_countries_interest_rate_list) 

@app.route('/upload-json-all-apis', methods=['POST'])
def get_json_Merger_List():

    global Final_List
    Final_List = []

    CPI_list = (sa_countries_YoY_cpi_var_list or []) + (fred_cpi_yearly or []) + (fred_cir or [])  + (fred_main_countries or []) 
    
    Exchange_Rate_list = (fred_main_countries_exchange_rate_list or [])  + (sa_countries_exchange_rate_list or []) 
    
    Interest_Rate_list = (fred_countries_interest_rate or []) + (sa_and_na_missing_countries_interest_rate_list or [])

    lists = [CPI_list, Exchange_Rate_list, Interest_Rate_list]

    countries = [
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
    ]

    for name in countries:
        standardization = {'name': name, 'inflation_rate': None, 'exchange_rate': None, 'interest_rate': None}
        for specificList in lists:
            for country_data in specificList:
                if country_data['name'] == name:
                    if specificList == CPI_list: 
                        standardization['inflation_rate'] = country_data['CPI_YoY']
                    elif specificList == Exchange_Rate_list:
                        standardization['exchange_rate'] = country_data['Exchange_Rate']
                    elif specificList == Interest_Rate_list:
                        standardization['interest_rate'] = country_data['Interest_Rate']
                    break
        Final_List.append(standardization)

    Final_List = [
        item for item in Final_List 
        if not (item['inflation_rate'] is None and 
                item['exchange_rate'] is None and 
                item['interest_rate'] is None)
    ]        
        
    print (f'Final_List: {Final_List}')

    return jsonify(Final_List)

@app.route("/login")
def login():
    return render_template('login.html')

@app.route("/account")
def account():
    return render_template("account.html")

@app.route("/register")
def register():
    return render_template('register.html')

@app.route("/recover-password")
def recover_password():
    return render_template('recover-password.html')

@app.route("/terms-and-conditions")
def terms_and_conditions():
    return render_template('terms-and-conditions.html')

@app.route("/search-in-mobile")
def search_in_mobile():
    return render_template('search-in-mobile.html')

@app.route("/library")
def library():
    return render_template('library.html')

if __name__ == "__main__":
    app.run(debug=True)
