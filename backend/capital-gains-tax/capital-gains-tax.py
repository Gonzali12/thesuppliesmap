import csv
import json

capital_gains_tax_by_country = []

def main():
    with open('C:/Users/mcarp/OneDrive/Escritorio/thesuppliesmap/backend/Capital-gains-tax-(CGT)-rates.csv', "r") as capital_gains_tax:
        db = csv.DictReader(capital_gains_tax_by_country)

        for row in db:
            country_data = {
                'class': row['Territory'],
                'name': row['Territory'],
                'added-value-tax': row['Standard VAT rate (%)']
            }
            capital_gains_tax_by_country.append(country_data)

    with open('capital_gains_tax_by_country', 'w') as json_file:
        json.dump(capital_gains_tax_by_country, json_file)

main()
