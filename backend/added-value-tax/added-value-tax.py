import csv
import json

added_value_tax_rate_by_country = []

def main():
    with open('C:/Users/mcarp/OneDrive/Escritorio/thesuppliesmap/backend/added-value-tax/Value-added-tax-(VAT)-rates.csv', "r") as added_value_tax:
        db = csv.DictReader(added_value_tax)

        for row in db:
            country_data = {
                'class': row['Territory'],
                'name': row['Territory'],
                'added-value-tax': row['Standard VAT rate (%)']
            }
            added_value_tax_rate_by_country.append(country_data)

    with open('added_value_tax_rate_by_country.json', 'w') as json_file:
        json.dump(added_value_tax_rate_by_country, json_file)

main()
