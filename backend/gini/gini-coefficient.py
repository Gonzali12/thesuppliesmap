import json

processed_data = []

def main():
    with open('C:/Users/gonza/OneDrive/Escritorio/thesuppliesmap/backend/gini/gini-coefficient-bad.json', 'r') as gini:
        gini_db = json.load(gini)

    for country in gini_db:
        standardization = {'class': country['name'], 'name': country['name'], 'gini': country['gini']} 
        processed_data.append(standardization)

    with open('gini-coefficient.json', 'w') as json_file:
        json.dump(processed_data, json_file)

main()