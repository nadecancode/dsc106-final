<script>
  import Scrolly from "./Scrolly.svelte";
  import katexify from "../katexify";
  import { select, selectAll } from "d3-selection";

  // scroll iterator
  let value;

  // Paragraph text for scrolly
  $: steps = [
    `<h1 class='step-title'>Step 1</h1>
       <br><br>
      <p>
       Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit sint aut corrupti ullam neque quia labore laborum perspiciatis, molestias amet at, voluptatem ratione quaerat in sit minima reprehenderit molestiae, nobis sed. Earum facere exercitationem sit rerum, expedita magni nihil alias?
      </p>`,
    `<h1 class='step-title'>Step 2</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit sint aut corrupti ullam neque quia labore laborum perspiciatis, molestias amet at, voluptatem ratione quaerat in sit minima reprehenderit molestiae, nobis sed. Earum facere exercitationem sit rerum, expedita magni nihil alias?
        </p>
    <br><br>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit sint aut corrupti ullam neque quia labore laborum perspiciatis, molestias amet at, voluptatem ratione quaerat in sit minima reprehenderit molestiae, nobis sed. Earum facere exercitationem sit rerum, expedita magni nihil alias?
  `,
  ];

  const target2event = {
    0: () => {
      // console.log('0' )
    },
    1: () => {
      select("#chart1").style("background-color", "red");
      select("#chart2").style("background-color", "green");
    },

    2: () => {
      select("#chart1").style("background-color", "purple");
      select("#chart2").style("background-color", "coral");
    },
  };

  $: if (typeof value !== "undefined") target2event[value]();
</script>

<h2 class="body-header">Side Scrolly Example</h2>
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
        <svg id="chart1" />
      </div>
      <div class="chart-two">
        <svg id="chart2" />
      </div>
    </div>
  </div>
  <br /><br />
  <p class="body-text">And that's the end of our scrolly.</p>
</section>

<style>
  #chart1,
  #chart2 {
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

  /* Comment out the following line to always make it 'text-on-top' */
  @media screen and (max-width: 950px) {
    .section-container {
      flex-direction: column-reverse;
    }

    .steps-container {
      pointer-events: none;
    }

    .charts-container {
      top: 7.5%;
      width: 95%;
      margin: auto;
    }

    .step {
      height: 130vh;
    }

    .step-content {
      width: 95%;
      max-width: 768px;
      font-size: 17px;
      line-height: 1.6;
    }

    .spacer {
      height: 100vh;
    }
  }
</style>
