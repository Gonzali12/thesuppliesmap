import csv
import json

social_security_tax_rate_by_country = []

def main():
    with open('C:/Users/mcarp/OneDrive/Escritorio/thesuppliesmap/backend/social-security-tax-rate/social-security-tax-rate.csv', "r") as social_security_tax_rate:
        database = csv.DictReader(social_security_tax_rate)

        for row in database:
            country_data = {
                'class': row['LOCATION'],
                'name': row['LOCATION'],
                'social-security-tax-rate': row['2020']
            }
            social_security_tax_rate_by_country.append(country_data)

    with open('social_security_tax_rate_by_country', 'w') as json_file:
        json.dump(social_security_tax_rate_by_country, json_file)

main()
