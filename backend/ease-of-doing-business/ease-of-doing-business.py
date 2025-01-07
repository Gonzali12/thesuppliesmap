import csv
import json

countries_ease_of_doing_business_ranking = []

def main():
    with open('C:/Users/mcarp/OneDrive/Escritorio/thesuppliesmap/backend/ease-of-doing-business/ease-of-doing-business.csv', "r") as ease_of_doing_business:
        database = csv.DictReader(ease_of_doing_business)

        for row in database:
            country_data = {
                'class': row['ï»¿Country Name'],
                'name': row['ï»¿Country Name'],
                'ease-of-doing-business-ranking': row['2019']
            }
            countries_ease_of_doing_business_ranking.append(country_data)

    with open('countries_ease_of_doing_business_ranking.json', 'w') as json_file:
        json.dump(countries_ease_of_doing_business_ranking, json_file)

main()
