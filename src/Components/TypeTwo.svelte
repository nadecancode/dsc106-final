<script>
    import { onMount } from 'svelte';
    import { select } from 'd3-selection';
    import { confidenceLevel, sampleSize } from '../stores';
    import { drawAndShadeGC2 } from '../plot';
    import { pnorm, qnorm } from '../helper';

    const meanScore = 69;
    const std = 14.6;

    let svg;

    onMount(() => {
        svg = select('#type-two')
            .append('svg')
            .attr('width', 500)
            .attr('height', 325);

        const sampleStd = std / Math.sqrt($sampleSize);

        drawAndShadeGC2(meanScore, 68.4, sampleStd, $confidenceLevel, svg);
    });

    let c, beta;

    $: {
        if (svg) {
            const sampleStd = std / Math.sqrt($sampleSize);

            drawAndShadeGC2(meanScore, 68.4, sampleStd, $confidenceLevel, svg);
        }

        c = qnorm(1 - $confidenceLevel, meanScore, std, false);
        beta = pnorm(c, 68.4, std, false);
    }
</script>

<h1 class="body-header">
    Error: Type II
</h1>

<p class="body-text">
    Wait.. So you might be thinking: "If I just choose a sufficiently large confidence level then my Type I error will be minimized". Well it is technically true, however, you need to also consider the Type II error, which is the probability of keeping your Null Hypothesis while your Alternative Hypothesis is true.
</p>

<br/>

<p class="body-text">
    Now you have your hypothesis about the distribution of average writing scores. We ran the data analysis for you and it is determined that the average score for students' writing tests is actually about <strong>68.4</strong>. Seems pretty close! But is there any chance that we still keep our Null Hypothesis?
</p>

<br/>

<p class="body-text">
    For convenience, we have placed the exactly same slider for you to choose your confidence level again :)
</p>

<br/>

<div class="centered">
    <label for="sample">Confidence Level:</label>
    <input type="range" min="0" max="1" step="0.01" bind:value={$confidenceLevel}/>
    <p>Numerical Value: {$confidenceLevel}</p>
</div>

<div id="type-two" class="centered">
</div>

<p class="body-text">
    Area Under Blue Curve: {1 - beta}
</p>

<br />

<p class="body-text">
    As we can see, blinding increasing the confidence level can yield a drastic increasing blue curve area, which is the probability that the hypothesis test says we should keep Null Hypothesis while in reality, the Alternative Hypothesis is true! This is also more widely known as "true negative". In the context of this dataset, this means your hypothesis test suggests the students have scored around the same on writing and reading tests, but in reality they did better!
</p>

<br />

<p class="body-text">
    Takeaway: As you increase your confidence level, your Type II error rate also increases :( You are less likely going to get false positive but you are more likely to hit a true negative instead..
</p>