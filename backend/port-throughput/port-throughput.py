import csv
import json

port_throughput_by_country = []

def main():
    with open('C:/Users/mcarp/OneDrive/Escritorio/thesuppliesmap/backend/port-throughput/port-throughput-by-country.csv', "r") as port_throughput:
        database = csv.DictReader(port_throughput)

        for row in database:
            country_data = {
                'class': row['ï»¿Country Name'],
                'name': row['ï»¿Country Name'],
                'port_throughput': row['2021']
            }
            port_throughput_by_country.append(country_data)

    with open('port-through-by-country.json', 'w') as json_file:
        json.dump(port_throughput_by_country, json_file)

main()
