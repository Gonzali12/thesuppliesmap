document.addEventListener('DOMContentLoaded', async function() {
  let countriesData = {}; 
  
  const optimalInflationRate = 2.25;

  let Metric_Scores = {
    "ECI score": null, "GDP Per Capita score": null, "Average GDP Growth (2012-2022) score": null, "Total Trade score": null, "Gini Coefficient score": null, "Inflation Rate score": null, 
    "Interest Rate score": null, "Mean Port Turnaround Time score": null, "Port Throughput (TEU) score": null, "Logistics Performance Index score": null,
    "Added Value Tax Rate score": null, "Social Security Tax Rate score": null, "Top Income Tax Rate score": null, "Political Stability score": null, "Ease Of Doing Business score": null,  
    "Corporate Tax Rate score": null
  };

  let PythonData = [];

  async function FetchFinalList() {
    try {
      const response = await fetch('/upload-json-all-apis', { method: 'POST' });
  
      PythonData = await response.json();
  
    } catch (error) {
      console.error("Error sending country's PythonData to backend:", error);
    }
  }

  await FetchFinalList();

  document.querySelectorAll('path').forEach(function(path) {

    path.addEventListener('click', function() {
      const countryName = this.getAttribute('name') || this.getAttribute('class');

      $('#countryModal').modal('show');
      document.getElementById('countryModalLabel').innerText = countryName + ' at a glance:';

      // Fetch and update the modal with the country details
      Promise.all([
        getECI(countryName).then(countryDetails => {
          if (countryDetails && countryDetails.ECI !== undefined && countryDetails.ECI !== null){
            document.getElementById('countryDetails_1').innerText = `ECI: ${countryDetails.ECI.toFixed(3)}`;                    
            countriesData["ECI"] = parseFloat(countryDetails.ECI);
          } 
          else {
            document.getElementById('countryDetails_1').innerText = 'ECI: n/a';
            
          }
        }).catch(() => null),
        
        getGDPPerCapita(countryName).then(countryDetails => {
          if (countryDetails && countryDetails.gdpPercapita !== undefined && countryDetails.gdpPercapita !== null) {
            document.getElementById('countryDetails_2').innerText = `GDP Per Capita: $${countryDetails.gdpPercapita.toFixed(2)}`;
            countriesData["GDP Per Capita"] = parseFloat(countryDetails.gdpPercapita);
          } else {
            document.getElementById('countryDetails_2').innerText = 'GDP Per Capita: n/a';
          }
        }).catch(() => null),

        AverageGDPGrowthRateLastTenYears(countryName).then(countryDetails => {
          if (countryDetails && countryDetails.average_gdp_growth_last_ten_years !== undefined && countryDetails.average_gdp_growth_last_ten_years !== null) {
            document.getElementById('countryDetails_3').innerText = `Average GDP Growth (2012-2022): ${countryDetails.average_gdp_growth_last_ten_years}%`;
            countriesData["Average GDP Growth (2012-2022)"] = parseFloat(countryDetails.average_gdp_growth_last_ten_years);
          } else {
            document.getElementById('countryDetails_3').innerText = 'Average GDP Growth (2012-2022): n/a';
          }
        }).catch(() => null),

        GINI(countryName).then(countryDetails => {
         if (countryDetails && countryDetails.gini !== undefined && countryDetails.gini !== null) {
          document.getElementById('countryDetails_5').innerText = `Gini Coefficient: ${(countryDetails.gini).toFixed(2)} %`;
          countriesData["Gini Coefficient"] = parseFloat(countryDetails.gini);
          } 
          else {
            document.getElementById('countryDetails_5').innerText = 'Gini Coefficient: n/a';
          }
        }).catch(() => null),

        EaseOfDoingBusiness(countryName).then(countryDetails => {
          if (countryDetails && countryDetails.easeOfDoingBusinessRanking !== undefined && countryDetails.easeOfDoingBusinessRanking !== null) {
            document.getElementById('countryDetails_19').innerText = `Ease Of Doing Business: ${countryDetails.easeOfDoingBusinessRanking}/100`;
            countriesData["Ease Of Doing Business"] = parseFloat(countryDetails.easeOfDoingBusinessRanking);
          } else {
            document.getElementById('countryDetails_19').innerText = 'Ease Of Doing Business: n/a';
          }
        }).catch(() => null),

        CorporateTaxRate(countryName).then(countryDetails => {
          if (countryDetails && countryDetails.corporate_tax_rate !== undefined && countryDetails.corporate_tax_rate !== null) {
            document.getElementById('countryDetails_18').innerText = `Corporate Tax Rate: ${countryDetails.corporate_tax_rate}%`;
            countriesData["Corporate Tax Rate"] = parseFloat(countryDetails.corporate_tax_rate);
          } else {
            document.getElementById('countryDetails_18').innerText = 'Corporate Tax Rate: n/a';
          }
        }).catch(() => null),

        PortThroughput(countryName).then(countryDetails => {
          if (countryDetails && countryDetails.port_throughput !== undefined && countryDetails.port_throughput !== null) {
            document.getElementById('countryDetails_10').innerText = `Port Throughput: ${countryDetails.port_throughput} TEU`;
            countriesData["Port Throughput (TEU)"] = parseFloat(countryDetails.port_throughput);
          } else {
            document.getElementById('countryDetails_10').innerText = 'Port Throughput (TEU): n/a';
          }
        }).catch(() => null),

        TurnAroundTime(countryName).then(countryDetails => {
          if (countryDetails && countryDetails.mean_turnaround_time !== undefined && countryDetails.mean_turnaround_time !== null) {
            document.getElementById('countryDetails_9').innerText = `Mean Port Turnaround Time: ${countryDetails.mean_turnaround_time} days`;
            countriesData["Mean Port Turnaround Time"] = parseFloat(countryDetails.mean_turnaround_time);
          } else {
            document.getElementById('countryDetails_9').innerText = 'Mean Port Turnaround Time: n/a';
          }
        }).catch(() => null),

        PoliticalStability(countryName).then(countryDetails => {
          if (countryDetails && countryDetails.political_stability_score !== undefined && countryDetails.political_stability_score !== null) {
            document.getElementById('countryDetails_17').innerText = `Political Stability: ${countryDetails.political_stability_score.toFixed(3)}/2.5`;
            countriesData["Political Stability"] = parseFloat(countryDetails.political_stability_score);
          } else {
            document.getElementById('countryDetails_17').innerText = 'Political Stability: n/a';
          }
        }).catch(() => null),

        LPI(countryName).then(countryDetails => {
          if (countryDetails && countryDetails.LPI !== undefined && countryDetails.LPI !== null) {
            document.getElementById('countryDetails_11').innerText = `Logistics Performance Index: ${countryDetails.LPI}/5`;
            countriesData["Logistics Performance Index"] = parseFloat(countryDetails.LPI);
          } else {
            document.getElementById('countryDetails_11').innerText = 'Logistics Performance Index: n/a';
          }
        }).catch(() => null),

        added_value_tax(countryName).then(countryDetails => {
          if (countryDetails && countryDetails.added_value_tax_rate !== undefined && countryDetails.added_value_tax_rate !== null) {
            document.getElementById('countryDetails_14').innerText = `Added Value Tax: ${countryDetails.added_value_tax_rate}%`;
            countriesData["Added Value Tax Rate"] = parseFloat(countryDetails.added_value_tax_rate);
          } 
          else {
            document.getElementById('countryDetails_14').innerText = 'Added Value Tax: n/a';
          }
        }).catch(() => null),

        ITR(countryName).then(countryDetails => {
          if (countryDetails && countryDetails.income_tax_rate !== undefined && countryDetails.income_tax_rate !== null) {
            document.getElementById('countryDetails_16').innerText = `Top Income Tax Rate: ${countryDetails.income_tax_rate}%`;
            countriesData["Top Income Tax Rate"] = countryDetails.income_tax_rate;
          } 
          else {
              document.getElementById('countryDetails_16').innerText = 'Top Income Tax: n/a';
          }
        }).catch(() => null),

        social_security_tax(countryName).then(countryDetails => {
          if (countryDetails && countryDetails.social_security_tax_rate !== undefined && countryDetails.social_security_tax_rate !== null) {
            document.getElementById('countryDetails_15').innerText = `Social Security Tax: ${countryDetails.social_security_tax_rate}%`;
            countriesData["Social Security Tax Rate"] = parseFloat(countryDetails.social_security_tax_rate);
          } 
          else {
            document.getElementById('countryDetails_15').innerText = 'Social Security Tax: n/a';
          }
        }).catch(() => null),

        TotalTrade(countryName).then(countryDetails => {
          if (countryDetails && countryDetails.total_trade !== undefined && countryDetails.total_trade !== null) {
            document.getElementById('countryDetails_4').innerText = `Total Trade (USD): $${(countryDetails.total_trade / 1e9).toFixed(2)} Billion`;
            countriesData["Total Trade (USD)"] = parseFloat(countryDetails.total_trade);
          } 
          else {
            document.getElementById('countryDetails_4').innerText = 'Total Trade (USD): n/a';
          }
        }).catch(() => null),

        InflationRate(countryName).then(countryDetails => {
          if (countryDetails && countryDetails.inflation_rate !== undefined && countryDetails.inflation_rate !== null) {
            document.getElementById('countryDetails_6').innerText = `Inflation Rate (YoY CPI % Var): ${(countryDetails.inflation_rate).toFixed(2)} %`;
            countriesData["Inflation Rate"] = parseFloat(countryDetails.inflation_rate);
          }
          else {
            document.getElementById('countryDetails_6').innerText = 'Inflation Rate (YoY % Var): n/a';
          }
        }).catch(() => null),

        InterestRate(countryName).then(countryDetails => {
          if (countryDetails && countryDetails.interest_rate !== undefined && countryDetails.interest_rate !== null) {
            document.getElementById('countryDetails_7').innerText = `Policy Interest Rate: ${(countryDetails.interest_rate).toFixed(2)} %`;
            countriesData["Policy Interest Rate"] = parseFloat(countryDetails.interest_rate);
          }
          else {
            document.getElementById('countryDetails_7').innerText = 'Policy Interest Rate: n/a';
          }
        }).catch(() => null),
        
        ExchangeRate(countryName).then(countryDetails => {
          if (countryDetails && countryDetails.exchange_rate !== undefined && countryDetails.exchange_rate !== null) {
            document.getElementById('countryDetails_8').innerText = `Exchange Rate (USD -> Country Currency): ${(countryDetails.exchange_rate).toFixed(2)}`;
            countriesData["Exchange Rate"] = parseFloat(countryDetails.exchange_rate);
          }
          else {
            document.getElementById('countryDetails_8').innerText = 'Exchange Rate (USD -> Country Currency): n/a';
          }
        }).catch(() => null)
        
      ])
      .then(() =>{
      
        barChart(Metric_Scores);

        localStorage.setItem('Metric_Scores', JSON.stringify(Metric_Scores));

        if (countryName==='Peru'){
          console.log(`Peru Metric_Scores: ${JSON.stringify(Metric_Scores)}`);
        }

        countriesData['name'] = countryName;

        localStorage.setItem('countriesData', JSON.stringify(countriesData));

        let sum = 0;
        let counter = 0;
              
        for (let key in Metric_Scores) {
          let value = Metric_Scores[key];
          if (value !== null && value !== undefined && value !== Infinity && !isNaN(value)) {
            sum += value;
            counter += 1;
          }
        }
  
        average_score = parseFloat(parseFloat(sum/counter).toFixed(3));
        average_score_p = document.querySelector(".average-score");
        average_score_p.innerText = `Average Score: ${average_score}`;

        let weights = {
          "ECI": 0.10,                              
          "GDP Per Capita": 0.10,                   
          "Average GDP Growth (2012-2022)": 0.10,   
          "Total Trade": 0.10,                      
          "Gini Coefficient": 0.05,                 
          "Inflation Rate": 0.05,                   
          "Interest Rate": 0.05,                    
          "Mean Port Turnaround Time": 0.05,        
          "Port Throughput (TEU)": 0.05,            
          "Logistics Performance Index": 0.10,      
          "Added Value Tax Rate": 0.05,             
          "Social Security Tax Rate": 0.05,         
          "Top Income Tax Rate": 0.05,              
          "Political Stability": 0.05,              
          "Ease Of Doing Business": 0.05,           
          "Corporate Tax Rate": 0.05                
        };

        let weightedScore = 0;

        for (let key in Metric_Scores) {
          let metricKey = key.replace(" score", ""); 
          if (weights[metricKey] !== undefined && Metric_Scores[key] !== null && Metric_Scores[key] !== undefined && Metric_Scores[key] !== Infinity && !isNaN(Metric_Scores[key])) {
              weightedScore += Metric_Scores[key] * weights[metricKey];
          } 
        }

        if (countryName === 'Peru') {
          console.log(`Peru: ${JSON.stringify(Metric_Scores)}`);
        }
        
        let weighted_score_label = document.querySelector('.weighted-score'); 
        weighted_score_label.innerText = `Weighted Score: ${weightedScore.toFixed(3)}`;

        const start_value = -5;
        let red = 250;
        let green = 0;
        let blue = 0;
        
        let difference = Math.abs((start_value - average_score) / 0.05);      
        green = difference * 2.3;
        
        if (green >= 250 ) {
            red = red - (green - red);
        }
        
        // Apply the new criteria for background colors based on `average_score`
        
        let backgroundColor = 
        average_score < -0.4 ? '#ff0000' :
        (average_score >= -0.4 && average_score < -0.3) ? '#ef3800' :
        (average_score >= -0.3 && average_score < -0.2) ? '#df7100' :
        (average_score >= -0.2 && average_score < -0.1) ? '#cf7200' :
        (average_score >= -0.1 && average_score < 0.0) ? '#e2e200' :
        (average_score >= 0.0 && average_score < 0.1) ? '#ccdf00' :
        (average_score >= 0.1 && average_score < 0.2) ? '#a7c900' :
        (average_score >= 0.2 && average_score < 0.3) ? '#80b400' :
        (average_score >= 0.3 && average_score < 0.4) ? '#719f00' :
        '#5a7d00'; 

        // Apply the calculated background color
        average_score_p.style.backgroundColor = backgroundColor;
        weighted_score_label.style.backgroundColor = backgroundColor;
        
      })
      .catch(error => {
          console.log("Error fetching country data:", error);
      });

      const country_network_analysis = document.querySelector('.country-link');

      countryLink = countryName.replace(/[\s-]/g, '-');

      const sample_countries = ["Argentina", "Bolivia", "Brazil", "Canada", "Chile", "China", "Colombia", "Ecuador", "France", "Germany", "India", "Indonesia", "Italy", "Mexico", "Paraguay", "Peru", "Philippines", "Portugal", "Russia", "Spain", "United-Kingdom", "Uruguay", "United-States-of-America", "Venezuela", "Vietnam"];
      
      if (sample_countries.includes(countryLink)) {
        
        country_network_analysis.href = `/sample-countries/${countryLink.toLowerCase()}`;
        
        country_network_analysis.innerText = 'Network Analysis';
        country_network_analysis.style.backgroundColor = '#FFBD59'; 
        country_network_analysis.style.cursor = 'pointer'; 
        country_network_analysis.style.width = 'fit-content';
        country_network_analysis.style.marginRight = '735px';
      }
      else 
      {
        
        country_network_analysis.href = '/404';
        country_network_analysis.innerText = 'Network Analysis Unavailable';
        country_network_analysis.style.backgroundColor = 'red';
        country_network_analysis.style.cursor = 'not-allowed';
        country_network_analysis.style.width = '250px';
        country_network_analysis.style.marginRight = '635px';
      }
    });
  });

  function standardizationScores(standardizationMetric, data, metric) {
    let X_max;
    let X_min;

    if (metric === 'total_trade' || metric === 'gdpPercapita') {
      X_max = Math.log(Math.max(...data.map(row => row[metric])));
      X_min = Math.log(Math.min(...data.map(row => row[metric])));
      standardizationMetric = Math.log(standardizationMetric);
    }
    else {
      X_max = Math.max(...data.map(row => row[metric]));
      X_min = Math.min(...data.map(row => row[metric]));
    }
    
    let X_normalized = ((standardizationMetric - X_min) / (X_max - X_min));

    if (metric === 'gini' || metric === 'added_value_tax_rate' || metric === 'social_security_tax_rate' || metric == 'corporate_tax_rate' || metric === 'mean_turnaround_time' || metric === 'income_tax_rate') {
      return - parseFloat((2 * X_normalized - 1).toFixed(3));
    }

    return parseFloat((2 * X_normalized - 1).toFixed(3));
  } 

  function InflationRateScore(standardizationMetric) {
    const threshold = 2; 
    
    const difference = Math.abs(standardizationMetric - optimalInflationRate);  
    
    if (difference <= threshold) {
      const normalizedScore = 1 - difference / threshold; 
      return normalizedScore; 
    } else {
      const cappedScore = -1; 
      return cappedScore;
    }
  }

  function barChart(Metric_Scores) {
    d3.select(".porter-five-forces").select("svg").remove();

    const filteredData = Object.entries(Metric_Scores)
      .filter(([key, value]) => value !== null && key !== 'name' && value !== Infinity)
      .map(([key, value]) => ({ key, value }));

    const margin = { top: 50, right: 50, bottom: 150, left: 0 };
    const width = 500 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select(".porter-five-forces")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append('g')
      .classed("g-box", true)
      .attr("transform", "translate(50, 60)");

    const x = d3.scaleBand()
      .domain(filteredData.map(d => d.key))
      .range([0, width])
      .padding(0.1);

    const minValue = d3.min(filteredData, d => d.value * 1.75);
    const maxValue = d3.max(filteredData, d => d.value  * 1.3);
    const y = d3.scaleLinear()
      .domain([minValue < 0 ? minValue : 0, maxValue])
      .range([height, 0]);

    svg.append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .classed("tick-text", true)
      .style("text-anchor", "end");

    svg.append('g')
      .attr("class", "y-axis")
      .call(d3.axisLeft(y));

    svg.selectAll(".bar")
      .data(filteredData)
      .enter()
      .append("rect")
      .attr("class", d => `bar ${d.value < 0 ? 'negative' : 'positive'}`)
      .attr("x", d => x(d.key))
      .attr("y", d => d.value < 0 ? y(0) : y(d.value))
      .attr("width", x.bandwidth())
      .attr("height", d => Math.abs(y(d.value) - y(0)))
      .attr("fill", d => d.value > 0 ? "green" : "red");

    svg.selectAll('.label')
      .data(filteredData)
      .enter()
      .append("text")
      .attr("class", "label")
      .attr("x", d => x(d.key) + x.bandwidth() / 2)
      .attr("y", d => {
        if (d.value < 0) {
          return y(d.value) + 5;
        }
        else {
          return y(d.value) - 15;
        }
      })
      .attr("dy", ".75em")
      .attr("text-anchor", "middle")
      .attr("font-size", "10px")
      .text(d => d.value.toFixed(3));

    svg.append("line")
      .attr("x1", 0)
      .attr("x2", width)
      .attr("y1", y(0))
      .attr("y2", y(0))
      .attr("stroke", "black")
      .attr("stroke-width", 1)
      .attr("stroke-dasharray", "4,4");

      let adjustmentApplied = false; // Flag to track if adjustment has been applied
      let originalTickTransforms = []; // Stores original tick positions
      let originalBarWidths = []; // Stores original bar positions and widths
      let originalDomainD = ""; // Stores the original domain path `d`
      let originalLineX2 = ""; // Stores the original x2 value of the horizontal line      

      function updateTickTextRotation() {
        // Store original values for restoration
        if (!adjustmentApplied) {
            // Store original tick positions, bar widths, domain, and line x2 value
            originalTickTransforms = Array.from(document.querySelectorAll('.tick')).map(tick => tick.getAttribute('transform'));
            originalBarWidths = Array.from(document.querySelectorAll('.bar')).map(bar => ({
                x: bar.getAttribute('x'),
                width: bar.getAttribute('width')
            }));
            originalDomainD = document.querySelector('.domain').getAttribute('d');
            originalLineX2 = document.querySelector('line[x2="450"]').getAttribute('x2');
        }
    
        // When viewport width is greater than 750px, reset changes
        if (window.innerWidth > 750) {
            if (adjustmentApplied) {
                // Restore original tick positions
                document.querySelectorAll('.tick').forEach((tick, index) => {
                    tick.setAttribute('transform', originalTickTransforms[index]);
                });
    
                // Restore bar widths and positions
                document.querySelectorAll('.bar').forEach((bar, index) => {
                    bar.setAttribute('x', originalBarWidths[index].x);
                    bar.setAttribute('width', originalBarWidths[index].width);
                });
    
                // Restore domain path
                const domain = document.querySelector('.domain');
                domain.setAttribute('d', originalDomainD);
    
                // Restore line x2 value
                const lineElement = document.querySelector('line[x2="300"]');
                lineElement.setAttribute('x2', originalLineX2);
    
                adjustmentApplied = false; // Reset flag
            }
            return;
        }
    
        // Apply adjustments if not already applied
        if (!adjustmentApplied) {
            adjustmentApplied = true;
    
            // Adjust tick-text rotation and position
            d3.selectAll(".tick-text")
                .attr("transform", "rotate(-90)")
                .style("text-anchor", "middle")
                .attr("y", -5)
                .attr("x", -105);
    
            const newBarWidth = 15;
    
            // Adjust ticks
            const ticks = document.querySelectorAll('.tick');
            ticks.forEach((tick) => {
                const originalTransform = tick.getAttribute('transform');
                const match = originalTransform.match(/translate\(([^,]+),\s*([^)]+)\)/);
    
                if (match) {
                    const originalX = parseFloat(match[1]);
                    const y = match[2];
    
                    const adjustedX = originalX * (2 / 3);
    
                    tick.setAttribute('transform', `translate(${adjustedX}, ${y})`);
                }
            });
    
            // Adjust domain path
            const domain = document.querySelector('.domain');
            domain.setAttribute('d', 'M0,6V0H300V6');
    
            // Adjust horizontal line x2 value
            const lineElement = document.querySelector('line[x2="450"]');
            lineElement.setAttribute('x2', '300');
    
            // Adjust bars
            const bars = document.querySelectorAll('.bar');
            bars.forEach((bar, index) => {
                const originalX = parseFloat(bar.getAttribute('x'));
                const spacingAdjustment = index * 10;
                const newX = originalX - spacingAdjustment;
    
                bar.setAttribute('width', newBarWidth);
                bar.setAttribute('x', newX);
            });
    
            // Adjust labels
            const labels = document.querySelectorAll('.label');
            labels.forEach((label, index) => {
                const originalX = parseFloat(label.getAttribute('x'));
                const spacingAdjustment = index * 10;
                const newX = originalX - spacingAdjustment;
    
                label.setAttribute('x', newX);
                label.style.fontSize = '10px';
            });
        }
    }
    
    // Initial check
    updateTickTextRotation();
    
    // Add resize listener
    window.addEventListener('resize', updateTickTextRotation);  
}



  function InflationRate(countryName) {
    return new Promise((resolve) => {
      const SelectedPythonData = PythonData.find(country => country.name === countryName);
  
      if (SelectedPythonData && SelectedPythonData.inflation_rate !== null) {
        Metric_Scores['Inflation Rate score'] = InflationRateScore(SelectedPythonData.inflation_rate);
        resolve({ name: SelectedPythonData.name, inflation_rate: SelectedPythonData.inflation_rate });
      } else {
        resolve({ name: countryName, inflation_rate: 'n/a' }); // Handle missing data
      }
    });
  }
  
  function InterestRate(countryName) {
    return new Promise((resolve) => {
      const SelectedPythonData = PythonData.find(country => country.name === countryName);
  
      if (SelectedPythonData && SelectedPythonData.interest_rate !== null) {
        Metric_Scores['Interest Rate score'] = parseFloat(standardizationScores(SelectedPythonData.interest_rate, PythonData, "interest_rate"));
        resolve({ name: SelectedPythonData.name, interest_rate: SelectedPythonData.interest_rate });
      } else {
        resolve({ name: countryName, interest_rate: 'n/a' }); // Handle missing data
      }
    });
  }
  
  function ExchangeRate(countryName) {
    return new Promise((resolve) => {
      const SelectedPythonData = PythonData.find(country => country.name === countryName);
  
      if (SelectedPythonData && SelectedPythonData.exchange_rate !== null) {
        resolve({ name: SelectedPythonData.name, exchange_rate: SelectedPythonData.exchange_rate });
      } else {
        resolve({ name: countryName, exchange_rate: 'n/a' }); // Handle missing data
      }
    });
  }

  /*ECI*/
  function getECI(countryName) {
    return fetch(jsonDataUrlOne)
      .then(response => response.json())
      .then(data => {
        const country = data.find(row => row.name === countryName);
        
        if (country) {
          let metric = 'ECI';

          country.ECI = parseFloat(country.ECI);
          
          Metric_Scores['ECI score'] = standardizationScores(country.ECI, data, metric);
        }

        return country ? { name: country.name, ECI: country.ECI } : 'ECI: n/a';
      });
  }

  /*GDP Per Capita*/
  function getGDPPerCapita(countryName) {
    return fetch(jsonDataUrlTwo)
    .then(response => response.json())
    .then(data => {
      const countryDataTwo = data.find(row => row.name === countryName);

      const value = parseFloat(countryDataTwo.gdpPercapita); 

      if (countryDataTwo) {
          
        let metric = 'gdpPercapita';

        Metric_Scores['GDP Per Capita score'] = standardizationScores(value, data, metric);
      }

      return countryDataTwo ? { name: countryDataTwo.name, gdpPercapita: value } : 'GDP Per Capita: n/a';
    });
  }

  /*Average GDP growth last ten years*/
  function AverageGDPGrowthRateLastTenYears(countryName) {
    return fetch(jsonDataUrlThree)
      .then(response => response.json())
      .then(data => {
        const countryDataThree = data.find(row => row.name === countryName);

        if (countryDataThree) {
          
          let metric = 'average_gdp_growth_last_ten_years';

          Metric_Scores['Average GDP Growth (2012-2022) score'] = standardizationScores(countryDataThree.average_gdp_growth_last_ten_years, data, metric);
        }

        return countryDataThree ? { name: countryDataThree.name, average_gdp_growth_last_ten_years: countryDataThree.average_gdp_growth_last_ten_years } : 'Average GDP Growth (2012-2022): n/a';
      });
  }

  /* Coefficient*/
  function GINI(countryName) {
    return fetch(jsonDataUrlFive)
      .then(response => response.json())
      .then(data => {
        const countryDataFive = data.find(row => row.name === countryName);
        
        if (countryDataFive) {
          
          let metric = 'gini';

          Metric_Scores['Gini Coefficient score'] = standardizationScores(countryDataFive.gini, data, metric);
        }

        return countryDataFive ? { name: countryDataFive.name, gini: countryDataFive.gini } : 'Gini Coefficient: n/a';
      });
  }

  /*Ease of doing business*/
  function EaseOfDoingBusiness(countryName) {
    return fetch(jsonDataUrlNineteen)
    .then(response => response.json())
    .then(data => {
      const jsonDataUrlNineteen = data.find(row => row.name === countryName);
      const value = parseFloat(jsonDataUrlNineteen.easeOfDoingBusinessRanking);

      if (jsonDataUrlNineteen) {
          
        let metric = 'easeOfDoingBusinessRanking';

        Metric_Scores['Ease Of Doing Business score'] = standardizationScores(value, data, metric);
      }

      return jsonDataUrlNineteen ? { name: jsonDataUrlNineteen.name, easeOfDoingBusinessRanking: value } : 'Ease of doing business ranking: n/a';
    });
  }

  /*Corporate Tax Rate*/
  function CorporateTaxRate(countryName) {
    return fetch(jsonDataUrlFifteen)
    .then(response => response.json())
    .then(data => {
      const countryDataFifteen = data.find(row => row.name === countryName);
      const value = parseFloat(countryDataFifteen.corporate_tax_rate);

      if (countryDataFifteen) {
          
        let metric = 'corporate_tax_rate';

        Metric_Scores['Corporate Tax Rate score'] = standardizationScores(value, data, metric);
      }

      return countryDataFifteen ? { name: countryDataFifteen.name, corporate_tax_rate: value} : 'Corporate Tax Rate: n/a';
    });
  }

  /*Port Throughput*/
  function PortThroughput(countryName) {
    return fetch(jsonDataUrlNine)
    .then(response => response.json())
    .then(data => {
      const countryDataNine = data.find(row => row.name === countryName);
      const value = parseFloat(countryDataNine.port_throughput);

      if (countryDataNine) {

        let metric = 'port_throughput';

        Metric_Scores['Port Throughput (TEU) score'] = standardizationScores(value, data, metric);
      }

      return countryDataNine ? { name: countryDataNine.name, port_throughput: value } : 'Port Throughput (TEU): n/a';
    });
  }

  /*Turnaround time*/
  function TurnAroundTime(countryName) {
    return fetch(jsonDataUrlTen)
    .then(response => response.json())
    .then(data => {
      const countryDataTen = data.find(row => row.name === countryName);
      const value = parseFloat(countryDataTen.mean_turnaround_time);

      if (countryDataTen) {
          
        let metric = 'mean_turnaround_time';

        Metric_Scores['Mean Port Turnaround Time score'] = standardizationScores(value, data, metric);
      }

      return countryDataTen ? { name: countryDataTen.name, mean_turnaround_time: value } : 'Port Turnaround Time: n/a';
    });
  }
  
  /*Political Stability*/
  function PoliticalStability(countryName) {
    return fetch(jsonDataUrlSeventeen)
    .then(response => response.json())
    .then(data => {
      const jsonDataUrlSeventeen = data.find(row => row.name === countryName);
      const value = parseFloat(jsonDataUrlSeventeen.political_stability_score);

      if (jsonDataUrlSeventeen) {
          
        let metric = 'political_stability_score';

        Metric_Scores['Political Stability score'] = standardizationScores(value, data, metric);
      }

      return jsonDataUrlSeventeen ? { name: jsonDataUrlSeventeen.name, political_stability_score: value } : 'Political Stability: n/a';
    });
  }

  /*LPI Scores*/
  function LPI(countryName) {
    return fetch(jsonDataUrlEleven)
      .then(response => response.json())
      .then(data => {
        const jsonDataUrlEleven = data.find(row => row.name === countryName);
        const value = jsonDataUrlEleven.LPI;

        if (jsonDataUrlEleven) {
          
          let metric = 'LPI';
  
          Metric_Scores['Logistics Performance Index score'] = standardizationScores(value, data, metric);
        }

        return jsonDataUrlEleven ? { name: jsonDataUrlEleven.name, LPI: value } : 'Logistics Performance Index: n/a';
    });
  }

  /*Added value tax rate*/
  function added_value_tax(countryName) {
    return fetch(jsonDataUrlFourteen)
      .then(response => response.json())
      .then(data => {
        const jsonDataUrlFourteen = data.find(row => row.name === countryName);
        const value = jsonDataUrlFourteen.added_value_tax_rate;

        if (jsonDataUrlFourteen) {
          
          let metric = 'added_value_tax_rate';
  
          Metric_Scores['Added Value Tax Rate score'] = standardizationScores(value, data, metric);
        }

        return jsonDataUrlFourteen ? { name: jsonDataUrlFourteen.name, added_value_tax_rate: value } : 'Added Value Tax Rate: n/a';
    });
  }

    /*Income tax rate*/
    function ITR(countryName) {
      return fetch(jsonDataUrlSixteen)
        .then(response => response.json())
        .then(data => {
          const jsonDataUrlSixteen = data.find(row => row.name === countryName);
  
          const value = parseFloat(jsonDataUrlSixteen.income_tax_rate);
  
          if (jsonDataUrlSixteen) {          
            
            let metric = 'income_tax_rate';
    
            Metric_Scores['Top Income Tax Rate score'] = standardizationScores(value, data, metric);
          }        
          
          return jsonDataUrlSixteen ? { name: jsonDataUrlSixteen.name, income_tax_rate: value } : 'Highest Income Tax: n/a';
      });
    }

  /*Social security tax rate*/
  function social_security_tax(countryName) {
    return fetch(jsonDataUrlEighteen)
      .then(response => response.json())
      .then(data => {
        const jsonDataUrlEighteen = data.find(row => row.name === countryName);
        const value = parseFloat(jsonDataUrlEighteen.social_security_tax_rate);

        if (jsonDataUrlEighteen) {
          
          let metric = 'social_security_tax_rate';
  
          Metric_Scores['Social Security Tax Rate score'] = standardizationScores(value, data, metric);
        }

        return jsonDataUrlEighteen ? { name: jsonDataUrlEighteen.name, social_security_tax_rate: value } : 'Social security Tax Rate: n/a';
    });
  }

  // Total Trade
  function TotalTrade(countryName) {
    return fetch(jsonDataUrlFour)
    .then(response => response.json())
    .then(data => {
      const countryDataFour = data.find(row => row.name === countryName);

      if (countryDataFour) {
        
        let metric = 'total_trade';

        Metric_Scores['Total Trade score'] = standardizationScores(countryDataFour.total_trade, data, metric);
      }

      return countryDataFour ? { name: countryDataFour.name, total_trade: countryDataFour.total_trade } : 'Total Trade: n/a';
    });
  }

});