import csv
import json

international_LPI_scores = []

def main():
    with open('C:/Users/mcarp/OneDrive/Escritorio/thesuppliesmap/backend/logistics-network-score/International_LPI.csv', "r") as LPI:
        database = csv.DictReader(LPI)
            
        for row in database:
                    country_data = {
                        'class': row['Economy'],
                        'name': row['Economy'],
                        'LPI': row['LPI Score']
                    }
                    international_LPI_scores.append(country_data)

    with open('international_LPI_scores.json', 'w') as json_file:
        json.dump(international_LPI_scores, json_file)

        
main()
