<script>
  import { line, curveStep } from "d3-shape";
  import { scaleLinear } from "d3-scale";
  import { errorData } from "../datasets.js";
  import { format } from "d3-format";
  //for the csvs
  import { csv } from 'd3-fetch';
  import { mean, deviation } from 'd3-array';
  import { onMount } from 'svelte'; 
  import { select } from 'd3-selection';
  import { range } from 'd3-array';
  import { axisBottom, axisLeft } from 'd3-axis'; 
  let data;
  //generalizing function for drawing curves
  function drawGC(meanScore, std, svg){
      //TAKING ALL MATH SCORES FROM NONE TEST PREP
      //NOW WE GOTTA SVG THIS BABY UP WOOOHOOOOO
      const xValuesN = range(0, 100, 0.1);
      // makin scales 
      const xScaleN = scaleLinear()
        .domain([0, 100])
        .range([50, 450]);
      const yScaleN = scaleLinear()
        .domain([0, 1 / (std * Math.sqrt(2 * Math.PI))])
        .range([250,50]);
      //values for the Gaussian curve
      const yValuesN = xValuesN.map(x => {
        const exponent = -Math.pow(x - meanScore, 2) / (2 * Math.pow(std, 2));
        return 1 / (std * Math.sqrt(2 * Math.PI)) * Math.exp(exponent);
      });
      const lineGenerator = line()
        .x((d, i) => xScaleN(xValuesN[i]))
        .y(d => yScaleN(d));
      // Draw Gaussian curve

    let path = svg.select('path.gaussian-curve');

    if (path.empty()) {
      // Append a new path if it doesn't exist
      path = svg.append('path')
              .attr('class', 'gaussian-curve')
              .attr('fill', 'none')
              .attr('stroke', 'red');
    }

    path.datum(yValuesN)
            .attr('d', lineGenerator);
  }


  //calculating true mean, std
  let meanScore = 0.0;
  let std = 0.0;
  let svg;
  //this is for gaussian curve
  const marginGC = { top: 20, right: 20, bottom: 50, left: 50 };
  onMount(async() =>{
    console.log("mounted");
    try{
      data = await csv('/StudentsPerformance.csv');

      console.log(data[0])
      //TAKING ALL MATH SCORES FROM NONE TEST PREP
      const noprepData = data.filter(d => d['test preparation course'] == 'none');
      const scores = data.map(d => +d['writing score']);
      console.log(noprepData)
      meanScore = mean(scores);
      std = deviation(scores);
      console.log(meanScore);
      console.log(std);
      //NOW WE GOTTA SVG THIS BABY UP WOOOHOOOOO
      svg = select('#gaussian-curve')
        .append('svg')
        .attr('width', 500)
        .attr('height', 300);
      const xValues = range(0, 100, 0.1);
      // makin scales 
      const xScale = scaleLinear()
        .domain([0, 100])
        .range([50, 450]);
      const yScale = scaleLinear()
        .domain([0, 1 / (std * Math.sqrt(2 * Math.PI))])
        .range([250,50]);
      //values for the Gaussian curve
      const yValues = xValues.map(x => {
        const exponent = -Math.pow(x - meanScore, 2) / (2 * Math.pow(std, 2));
        return 1 / (std * Math.sqrt(2 * Math.PI)) * Math.exp(exponent);
      });
      const lineGenerator = line()
        .x((d, i) => xScale(xValues[i]))
        .y(d => yScale(d));
      // Draw Gaussian curve
      svg.append('path')
        .datum(yValues)
        .attr('d', lineGenerator)
        .attr('fill', 'none')
        .attr('stroke', 'blue');
      // Axis Powers would be a pretty good name for this section if those blockheads didn't already take it in WWII
      svg.append('g')
        .attr('transform', 'translate(0, 250)')
        .call(axisBottom(xScale));
      svg.append('g')
        .attr('transform', 'translate(50, 0)')
        .call(axisLeft(yScale));
      //drawGC(50, std, svg);
    }catch(e){
      //shit something went wrong
      console.log("HEY SOMETHIN WENT WRONG IN LINECHART.SVELTE ITS BURNING AAAAAAA " + e);
    }
  });

  let placeholderScore = 50;

  $: {
    if (svg)
      drawGC(placeholderScore, std, svg);
  }

  const formatter = format(".0%");

  let height = 500;
  let width = 500;
  const mobile = window.innerWidth <= 700;
  const margin = {
    top: mobile ? 40 : 50,
    bottom: mobile ? 10 : 25,
    left: mobile ? 0 : 80,
    right: mobile ? 0 : 10,
  };

  $: xScale = scaleLinear()
    .domain([0, 14.4])
    .range([margin.left, width - margin.right]);
  $: accuracyScale = scaleLinear()
    .domain([0.0, 1])
    .range([height - margin.bottom, margin.top]);
  $: precisionScale = scaleLinear()
    .domain([0.0, 1])
    .range([height - margin.bottom, margin.top]);

  $: accuracyPath = line()
    .x((d) => xScale(d.thresh))
    .y((d) => accuracyScale(d.accuracy))
    .curve(curveStep);

  $: precisionPath = line()
    .x((d) => xScale(d.thresh))
    .y((d) => precisionScale(d.precision))
    .curve(curveStep);
</script>

<h1 class="body-header">Responsive, Static Chart Example</h1>
<p class="body-text">
  Belo

</p>

<div id="drawForm">
  <label for="mean">Mean:</label>
  <input type="range" min="0" max="100" id="mean" bind:value={placeholderScore} step="any" required>
</div>

<div id="gaussian-curve">

</div>
<p class="body-text">
  This component is an example of a responsive chart built with Svelte and
  D3.js.
</p>

<div id="error-chart" bind:offsetWidth={width} bind:offsetHeight={height}>
  <svg
    width={width + margin.left + margin.right}
    height={height + margin.top + margin.bottom}
  >
    <!-- y-ticks -->
    {#each [0.2, 0.4, 0.6, 0.8, 1.0] as tick}
      <g transform={`translate(${margin.left - 5} ${accuracyScale(tick) + 0})`}>
        <!-- svelte-ignore component-name-lowercase -->
        <line
          class="y-axis-line"
          x1="0"
          x2={width - margin.right - margin.left}
          y1="0"
          y2="0"
          stroke="black"
        ></line>
        <text
          class="error-axis-text"
          y="0"
          text-anchor="end"
          dominant-baseline="middle">{formatter(tick)}</text
        >
      </g>
    {/each}
    <!-- axis lines -->
    <!-- x -->
    <!-- svelte-ignore component-name-lowercase -->
    <line
      class="error-axis-line"
      y1={height - margin.bottom}
      y2={height - margin.bottom}
      x1={margin.left}
      x2={width}
      stroke="black"
      stroke-width="2"
    ></line>
    <!-- y -->
    <!-- svelte-ignore component-name-lowercase -->
    <line
      class="error-axis-line"
      y1={margin.top}
      y2={height - margin.bottom}
      x1={margin.left}
      x2={margin.left}
      stroke="black"
      stroke-width="2"
    ></line>

    <path class="outline-line" d={accuracyPath(errorData)}></path>
    <path class="path-line" d={accuracyPath(errorData)} stroke="#c9208a"></path>
    <path class="outline-line" d={precisionPath(errorData)}></path>
    <path class="path-line" d={precisionPath(errorData)} stroke="#ab00d6"
    ></path>

    <!-- axis labels -->
    <text
      class="error-axis-label"
      y={height + margin.bottom}
      x={(width + margin.left) / 2}
      text-anchor="middle">Decision Boundary Threshold</text
    >
    <text
      class="error-axis-label"
      y={margin.left / 3}
      x={-(height / 2)}
      text-anchor="middle"
      transform="rotate(-90)">Score</text
    >

    <!-- x-ticks -->
    {#each xScale.ticks() as tick}
      <g transform={`translate(${xScale(tick) + 0} ${height - margin.bottom})`}>
        <text class="error-axis-text" y="15" text-anchor="end">{tick}</text>
      </g>
    {/each}
  </svg>
</div>

<style>
  #error{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  #drawForm > button{
    margin-left: 3vw;
    padding: 0.25vw;
    border-radius: 0.2vw;
  }
  #drawForm{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  #gaussian-curve{
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1vw;
  }
  #error-chart {
    margin: auto;
    max-height: 55vh;
    width: 58%;
    margin: 1rem auto;
  }

  .error-axis-text {
    font-size: 0.9rem;
  }

  .y-axis-line {
    opacity: 0.2;
  }

  .error-axis-label {
    text-transform: uppercase;
    font-size: 1rem;
  }

  .path-line {
    fill: none;
    stroke-linejoin: round;
    stroke-linecap: round;
    stroke-width: 6;
  }

  .outline-line {
    fill: none;
    stroke: #f1f3f3;
    stroke-width: 10;
  }

  /* ipad */
  @media screen and (max-width: 950px) {
    #error-chart {
      max-height: 55vh;
      width: 85%;
      margin: 1rem auto;
    }
    .error-axis-label {
      font-size: 0.8rem;
    }
    .error-axis-text {
      font-size: 0.8rem;
    }
    .path-line {
      stroke-width: 5;
    }
    .outline-line {
      stroke-width: 9;
    }
  }
  /* mobile */
  @media screen and (max-width: 750px) {
    #error-chart {
      max-height: 55vh;
      width: 95%;
      margin: 1rem auto;
    }

    .error-axis-label {
      font-size: 0.75rem;
    }
    .error-axis-text {
      font-size: 0.7rem;
    }
    .path-line {
      stroke-width: 4;
    }
    .outline-line {
      stroke-width: 7;
    }
  }
</style>
