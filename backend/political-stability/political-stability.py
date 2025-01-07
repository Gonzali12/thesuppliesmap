import csv
import json

political_stability_scores_by_country = []

def main():
    with open('C:/Users/mcarp/OneDrive/Escritorio/thesuppliesmap/backend/political-stability/political-stability-scores.csv', "r") as political_stability:
        database = csv.DictReader(political_stability)

        for row in database:
            country_data = {
                'class': row['Country Name'],
                'name': row['Country Name'],
                'political-stability-score': row['2022 [YR2022]']
            }
            political_stability_scores_by_country.append(country_data)

    with open('political_stability_scores_by_country.json', 'w') as json_file:
        json.dump(political_stability_scores_by_country, json_file)

main()
