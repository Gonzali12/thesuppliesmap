import csv
import json

gdp_growth_rate_last_ten_years_countries_average = []


def average_gdp_growth_last_ten_years(country_data_raw_values):
    total_sum = 0
    count = 0
    for value in country_data_raw_values.values():
        try:
            total_sum += float(value)
            count += 1
        except ValueError:
            continue

    if count > 0:
        return round(total_sum / count, 3)
    else:
        return 'N/A' 


def main():
    with open('C:/Users/mcarp/OneDrive/Escritorio/thesuppliesmap/backend/gdp-growth-rate-last-ten-years/API_NY.GDP.MKTP.KD.ZG_DS2_en_csv_v2_558140.csv', "r") as gdp_growth_rate_last_ten_years:
        database = csv.DictReader(gdp_growth_rate_last_ten_years)


        for row in database:
            country_data_raw_values = {
                'gdp_growth_2022': row['2022'],
                'gdp_growth_2021': row['2021'],
                'gdp_growth_2020': row['2020'],
                'gdp_growth_2019': row['2019'],
                'gdp_growth_2018': row['2018'],
                'gdp_growth_2017': row['2017'],
                'gdp_growth_2016': row['2016'],
                'gdp_growth_2015': row['2015'],
                'gdp_growth_2014': row['2014'],
                'gdp_growth_2013': row['2013'],
                'gdp_growth_2012': row['2012']
            }


            average_gdp_growth_rate_last_ten_years_for_country = average_gdp_growth_last_ten_years(country_data_raw_values)            


            country_data_names_and_figures = {
                'class': row['ï»¿Country Name'],
                'name': row['ï»¿Country Name'],
                'average_gdp_growth_last_ten_years': average_gdp_growth_rate_last_ten_years_for_country
            }

            gdp_growth_rate_last_ten_years_countries_average.append(country_data_names_and_figures)

    with open('gdp_growth_rate_last_ten_years_countries_average.json', 'w') as json_file:
        json.dump(gdp_growth_rate_last_ten_years_countries_average, json_file)


    print(gdp_growth_rate_last_ten_years_countries_average)


main()
