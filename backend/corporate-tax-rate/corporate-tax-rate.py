import csv
import json

corporate_tax_rate_by_country = []

def main():
    with open('C:/Users/mcarp/OneDrive/Escritorio/thesuppliesmap/backend/corporate-tax-rate/corporate-tax-rate-by-country.csv', "r") as corporate_tax_rate:
        database = csv.DictReader(corporate_tax_rate)

        for row in database:
            country_data = {
                'class': row['country'],
                'name': row['country'],
                'corporate_tax_rate': row['rate']
            }
            corporate_tax_rate_by_country.append(country_data)

    with open('corporate_tax_rate_by_country.json', 'w') as json_file:
        json.dump(corporate_tax_rate_by_country, json_file)

main()
