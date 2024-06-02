<script>
    import { onMount } from 'svelte';
    import { select } from 'd3-selection';
    import { confidenceLevel, sampleSize } from '../stores';
    import { drawAndShadeGC2 } from '../plot';

    const meanScore = 69;
    const std = 14.6;

    let svg;

    onMount(() => {
        svg = select('#type-two')
            .append('svg')
            .attr('width', 500)
            .attr('height', 325);

        const sampleStd = Math.pow(std, 2) / $sampleSize;

        drawAndShadeGC2(meanScore, 68.4, sampleStd, $confidenceLevel, svg);
    });

    $: {
        if (svg) {
            const sampleStd = Math.pow(std, 2) / $sampleSize;

            drawAndShadeGC(meanScore, sampleStd, $confidenceLevel, svg);
        }
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

<div id="type-two" class="centered">
</div>