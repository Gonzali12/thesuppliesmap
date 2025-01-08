countries = [] 

from dotenv import load_dotenv
import os

# Load the .env file
load_dotenv()

api_key = os.getenv("OTHER_API_KEY")

import finnhub
import requests

finnhub_client = finnhub.Client(api_key)

country_metadata = finnhub_client.country()

for country in country_metadata:    
    standardization = {
        "class": country["country"],
        "name": country["country"],
        "Credit_Rating": country["rating"],
        "Equity_Risk_Premium": country["equityRiskPremium"]
    }

    if (country["country"] == 'United Sates'):
        standardization['class'] = 'United States of America'
        standardization['country'] = 'United States of America'

    countries.append(standardization)

url = "http://localhost:5000/finhub-api/country-metadata"

response = requests.post(url, json=countries)