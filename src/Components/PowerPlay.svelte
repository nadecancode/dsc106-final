<script>
    import katexify from '../katexify';
    import {onMount} from "svelte";
    import {select} from "d3-selection";
    import {confidenceLevel, sampleSize} from "../stores";
    import {drawAndShadeGC2} from "../plot";
    import {pnorm, qnorm} from "../helper";

    const meanScore = 69;
    const std = 14.6;
    let n = 100;

    let svg;

    onMount(() => {
        svg = select('#power-play')
            .append('svg')
            .attr('width', 500)
            .attr('height', 325);

        const sampleStd = std / Math.sqrt(n);

        drawAndShadeGC2(meanScore, 68.4, sampleStd, $confidenceLevel, svg);
    });

    let c, beta;

    $: {
        const sampleStd = std / Math.sqrt(n);

        if (svg) {
            drawAndShadeGC2(meanScore, 68.4, sampleStd, $confidenceLevel, svg);
        }

        c = qnorm(1 - $confidenceLevel, meanScore, sampleStd, false);
        beta = pnorm(c, 68.4, sampleStd, false);
    }
</script>

<h1 class="body-header">
    Power Play
</h1>

<p class="body-text">
    You might be wondering: How can we lower both Type I and Type II error rates? If I increase my confidence level, then Type II error rate increases but if I decrease my confidence level, my Type I error increases.. There seems to be no way to improve both metrics.. right?
</p>

<br />

<p class="body-text">
    No! Turns out the amount of samples we take can also directly influence how powerful our hypothesis test is!
</p>

<p class="body-text">
    Earlier in the article, we have collected 100 samples, but we can take more to be more certain of our hypothesis test :) You can pick a number between 100 and 1000 below and observe how the Power changes
</p>

<div class="centered">
    <label for="sample">Sample Size:</label>
    <input type="range" min="100" max="1000" step="1" bind:value={n}/>
    <p>Numerical Value: {n}</p>
</div>

<br />

<div id="power-play" class="centered">
</div>

<p class="body-text">
    Power: {1 - beta}
</p>

<p class="body-text">
    Takeaway: Take more samples can help us perform our Hypothesis Tests better, but we need to find a balance between "took not enough samples" and "took too many samples" since the purpose of sampling is to spend a relatively less effort to gain a better insight on a big population distribution.
</p>