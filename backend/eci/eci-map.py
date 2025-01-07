import csv
import json

countries_eci = []
countries_gdpPercapita = []

def main():
    with open('economiccomplexity.csv', "r") as EconomicComplexity:
        database = csv.DictReader(EconomicComplexity)

        for row in database:
            country_data = {
                'class': row['Country'],
                'name': row['Country'],
                'ECI': row['ECI']
            }
            countries_eci.append(country_data)

    with open('eci_and_country.json', 'w') as json_file:
        json.dump(countries_eci, json_file)
main()
