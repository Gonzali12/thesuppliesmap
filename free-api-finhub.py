countries = [] 

import finnhub
import requests

finnhub_client = finnhub.Client(api_key="ctth9opr01qqhvb0k18gctth9opr01qqhvb0k190")

country_metadata = finnhub_client.country()

for country in country_metadata:
    standardization = {
        "class": country["country"],
        "name": country["country"],
        "Credit_Rating": country["rating"],
        "Equity_Risk_Premium": country["equityRiskPremium"]
    }
    countries.append(standardization)

url = "http://localhost:5000/finhub-api/country-metadata"

response = requests.post(url, json=countries)