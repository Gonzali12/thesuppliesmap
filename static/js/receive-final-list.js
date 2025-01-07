document.addEventListener('DOMContentLoaded', () => {
    // Display scores from localStorage and render the bar chart
    function displayScores() {
        const Metric_Scores = localStorage.getItem('Metric_Scores');

        if (Metric_Scores) {
            const data = JSON.parse(Metric_Scores);

            console.log(data);

            // Clear existing chart (if any) before rendering
            const svgContainer = d3.select(".porter-five-forces");
            svgContainer.selectAll("*").remove();

            barChart(data); // Render the bar chart

            averageScore(data); // Calculate and display the average score

            dataVisualization(data, ''); // Visualize data in the DOM
        } else {
            console.log('No array found in localStorage for scores');
        }
    }

    // Display country data from localStorage
    function displayValues() {
        const countriesData = localStorage.getItem('countriesData');

        if (countriesData) {
            let data = JSON.parse(countriesData);
            console.log(data);

            const firstKey = Object.keys(data)[0];
            delete data[firstKey];

            data = swapping(data); // Transform the data

            dataVisualization(data, '_v'); // Visualize the transformed data
        } else {
            console.log('No array found in localStorage for values');
        }
    }

    // Visualize data in the DOM
    function dataVisualization(data, suffix) {
        let index = 0;
        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                let specificData = `${key}: ${data[key]}`;
                console.log(specificData); // Prints the key-value pairs
                const element = document.querySelector(`#countryDetails_${index + 1}${suffix}`);
                if (element) {
                    element.innerText = specificData;
                } else {
                    console.log(`Element with ID countryDetails_${index + 1}${suffix} not found`);
                }
                index++;
            }
        }
    }

    // Transform data for visualization
    function swapping(data) {
        const values_array = {
            'ECI': data['ECI'],
            'GDP Per Capita': `$${data['GDP Per Capita']}`,
            'Average GDP Growth (2012-2022)': `${data['Average GDP Growth (2012-2022)']}%`,
            'Total Trade (USD)': `$${data['Total Trade']}`,
            'Gini Coefficient': `${data['Gini Coefficient']}`,
            'Inflation Rate': `${data['Inflation Rate']}%`,
            'Exchange Rate, local currency': data['Exchange Rate'],
            'Policy Interest Rate': `${data['Interest Rate']}%`,
            'Mean Port Turnaround Time': `${data['Mean Port Turnaround Time']} days`,
            'Port Throughput': `${data['Port Throughput (TEU)']} (TEU)`,
            'Logistics Performance Index': `${data['Logistics Performance Index']}/5`,
            'Added Value Tax': `${data['Added Value Tax Rate']}%`,
            'Social Security Tax': `${data['Social Security Tax Rate']}%`,
            'Top Income Tax Rate': `${data['Top Income Tax Rate']}%`,
            'Political Stability': `${data['Political Stability']}/2.5`,
            'Ease Of Doing Business': `${data['Ease Of Doing Business']}/100`,
            'Corporate Tax': `${data['Corporate Tax Rate']}%`
        };

        return values_array;
    }

    // Render a bar chart using D3.js
    function barChart(data) {
        const filteredData = Object.entries(data)
            .filter(([key, value]) => value !== null && key !== 'name')
            .map(([key, value]) => ({ key, value }));

        const margin = { top: 50, right: 50, bottom: 150, left: 0 };
        const width = 600 - margin.left - margin.right;
        const height = 400 - margin.top - margin.bottom;

        const svg = d3.select(".porter-five-forces")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append('g')
            .attr("transform", "translate(40, 60)");

        const x = d3.scaleBand()
            .domain(filteredData.map(d => d.key))
            .range([0, width])
            .padding(0.1);

        const minValue = d3.min(filteredData, d => d.value * 1.75);
        const maxValue = d3.max(filteredData, d => d.value * 1.3);
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
            .attr("y", d => d.value < 0 ? y(d.value) + 5 : y(d.value) - 15)
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
    }

    // Calculate and display the average score
    function averageScore(data) {
        let sum = 0;
        let counter = 0;

        for (let key in data) {
            let value = data[key];
            if (value !== null && value !== undefined && value !== Infinity && !isNaN(value)) {
                sum += value;
                counter += 1;
            }
        }

        const average_score = parseFloat((sum / counter).toFixed(3));
        const average_score_p = document.querySelector(".average-score");

        if (average_score_p) {
            average_score_p.innerText = `Average Score: ${average_score}`;

            const start_value = -5;
            let red = 250;
            let green = 0;
            let blue = 0;

            let difference = Math.abs((start_value - average_score) / 0.05);
            green = difference * 2.3;

            if (green >= 250) {
                red = red - (green - red);
            }

            average_score_p.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
        }
    }

    // Handle viewport changes (mobile vs desktop)
    function handleViewportChanges() {
        let viewportWidth = window.innerWidth;

        if (viewportWidth <= 642) {
            const svgElement = document.querySelector('.porter-five-forces svg');
            const announcementElement = document.querySelector('.mobile-announcement');

            if (svgElement) {
                svgElement.style.display = 'none'; // Hide SVG
            }

            if (announcementElement) {
                announcementElement.innerText = 'This Feature Is Not Compatible With Your Screen Size. Please Use A Desktop.';
                announcementElement.style.display = 'block'; // Make the announcement visible
            }
        } else {
            const svgElement = document.querySelector('.porter-five-forces svg');
            const announcementElement = document.querySelector('.mobile-announcement');

            if (svgElement) {
                svgElement.style.display = 'block'; // Show SVG
            }

            if (announcementElement) {
                announcementElement.innerText = ''; // Clear the message
                announcementElement.style.display = 'none'; // Hide the announcement
            }
        }
    }

    // Add an event listener for dynamic viewport changes
    window.addEventListener('resize', handleViewportChanges);

    // Run once on page load
    handleViewportChanges();

    // Display scores and values
    displayScores();
    displayValues();
});
