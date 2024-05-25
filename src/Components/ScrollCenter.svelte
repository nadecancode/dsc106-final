<script>
  import Scrolly from "./Scrolly.svelte";
  import katexify from "../katexify";
  import { scaleOrdinal } from "d3-scale";
  import { select, selectAll } from "d3-selection";

  // import { scatterData } from './datasets.js';

  const xKey = "weight";
  const yKey = "weight";
  const zKey = "outcome";
  const titleKey = "gender";

  const r = 10;

  const seriesNames = new Set();
  const seriesColors = ["#7e93ee", "#ff99ff"];

  // scroll iterator
  let value;

  // Paragraph text for scrolly
  $: steps = [
    `<h1 class='step-title'>Step 1</h1>
    <br><br>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, exercitationem. Quam impedit fuga quia earum architecto qui temporibus deleniti obcaecati assumenda, minima consequatur a fugit?
    </p>`,
    `<h1 class='step-title'>Step 2</h1>
    <p>
       Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, exercitationem. Quam impedit fuga quia earum architecto qui temporibus deleniti obcaecati assumenda, minima consequatur a fugit?
    </p>`,
  ];

  const target2event = {
    0: () => {
      select("#chart3").style("background-color", "darkorange");
      select("#chart4").style("background-color", "black");
    },
    1: () => {
      select("#chart3").style("background-color", "salmon");
      select("#chart4").style("background-color", "pink");
    },
  };

  // trigger events on scroll typeof lastname !== "undefined"
  // $: if (value) target2event[value]()
  $: if (typeof value !== "undefined") target2event[value]();
</script>

<h2 class="body-header">Center Scrolly Example</h2>
<p class="body-text">
  Here's an example of a typical side-scroller. It's responsive, and will fold
  to an overlap scroll if the screen gets small enough:
</p>
<section>
  <!-- scroll container -->
  <div class="section-container">
    <div class="steps-container">
      <Scrolly bind:value>
        {#each steps as text, i}
          <div class="step" class:active={value === i}>
            <div class="step-content">{@html text}</div>
          </div>
        {/each}
        <div class="spacer" />
      </Scrolly>
    </div>
    <div class="charts-container">
      <div class="chart-one">
        <svg id="chart3" />
      </div>
      <div class="chart-two">
        <svg id="chart4" />
      </div>
    </div>
  </div>
  <!-- end scroll -->
  <br /><br />
  <p class="body-text">And that's the end of our scrolly.</p>
</section>

<style>
  #chart3,
  #chart4 {
    width: 100%;
    height: 100%;
  }
  .chart-one {
    width: 100%;
    height: 100%;
    border: 3px solid skyblue;
  }
  .chart-two {
    width: 100%;
    height: 100%;
    border: 3px solid coral;
  }
  /* space after scroll is finished */
  .spacer {
    height: 40vh;
  }

  .charts-container {
    position: sticky;
    top: 10%;
    display: grid;
    width: 50%;
    grid-template-columns: 100%;
    grid-row-gap: 2rem;
    grid-column-gap: 0rem;
    grid-template-rows: repeat(2, 1fr);
    height: 85vh;
    border: 3px solid black;
  }

  .section-container {
    margin-top: 1em;
    text-align: center;
    transition: background 100ms;
    display: flex;
  }

  .step {
    height: 110vh;
    display: flex;
    place-items: center;
    justify-content: center;
  }

  .step-content {
    font-size: 18px;
    background: var(--bg);
    color: #ccc;
    border-radius: 1px;
    padding: 0.5rem 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    transition: background 500ms ease;
    text-align: left;
    width: 75%;
    margin: auto;
    max-width: 500px;
    font-family: var(--font-main);
    line-height: 1.3;
    border: 5px solid var(--default);
  }

  .step.active .step-content {
    background: #f1f3f3ee;
    color: var(--squid-ink);
  }

  .steps-container {
    height: 100%;
  }

  .steps-container {
    flex: 1 1 40%;
    z-index: 10;
  }

  /* make side centered */
  .section-container {
    flex-direction: column-reverse;
  }

  .steps-container {
    pointer-events: none;
  }

  .charts-container {
    top: 7.5%;
    width: 75%;
    margin: auto;
  }

  .step {
    height: 130vh;
  }

  .step-content {
    width: 65%;
    max-width: 768px;
    font-size: 17px;
    line-height: 1.6;
  }

  .spacer {
    height: 100vh;
  }
</style>
