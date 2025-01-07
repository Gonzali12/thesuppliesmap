import csv
import json

mean_turnaround_time = []

def main():
    with open('C:/Users/mcarp/OneDrive/Escritorio/thesuppliesmap/backend/shipping-turnaround-time/shipping-data.csv', "r") as turnaround_time:
        database = csv.DictReader(turnaround_time)

        for row in database:
            country_data = {
                'class': row['ï»¿Economy'],
                'name': row['ï»¿Economy'],
                'mean_turnaround_time': row['Turnaround time at port (days) Mean']
            }
            mean_turnaround_time.append(country_data)

    with open('shipping-turnaround-time.json', 'w') as json_file:
        json.dump(mean_turnaround_time, json_file)

main()
