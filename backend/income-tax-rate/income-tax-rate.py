import csv
import json

income_tax_rate_by_country = []

def main():
    with open('C:/Users/gonza/OneDrive/Escritorio/thesuppliesmap/backend/income-tax-rate/income-tax-rate.csv', "r") as income_tax_rate:
        db = csv.DictReader(income_tax_rate)

        for row in db:
            country_data = {
                'class': row['Country'],
                'name': row['Country'],
                'income_tax_rate': float(row['Last'])
            }
            income_tax_rate_by_country.append(country_data)

    with open('income_tax_rate', 'w') as json_file:
        json.dump(income_tax_rate_by_country, json_file)

main()


