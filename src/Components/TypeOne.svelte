<script>
    import { sampleSize, confidenceLevel } from '../stores';
    import {onMount} from "svelte";
    import {select} from "d3-selection";
    import { drawAndShadeGC } from "../plot";
    import katexify from "../katexify";

    const meanScore = 69;
    const std = 14.6;

    let svg;

    onMount(() => {
        svg = select('#type-one')
            .append('svg')
            .attr('width', 500)
            .attr('height', 325);

        const sampleStd = std / Math.sqrt($sampleSize);

        drawAndShadeGC(meanScore, sampleStd, $confidenceLevel, svg);
    });

    $: {
        if (svg) {
            const sampleStd = std / Math.sqrt($sampleSize);

            drawAndShadeGC(meanScore, sampleStd, $confidenceLevel, svg);
        }
    }
</script>

<h1 class="body-header">
    Error: Type I
</h1>

<p class="body-text">
    By the definition of Type I Error, it is the probability of we reject the Null Hypothesis under the assumption that the sample distribution agrees with our Null Hypothesis. In the context of this dataset, it is the probability when we think the students have scored better on writing tests than reading tests, but in reality they have scored about the same (false positive).

    Below is a curve modeled after the sample distribution with the assumption that our Null Hypothesis is true:
</p>

<div id="type-one" class="centered">

</div>
<p class="body-text">
    The red-shaded region are quantities where we reject the Null Hypothesis, and the unshaded region is where we keep the Null Hypothesis.
</p>

<br />

<p class="body-text">
    Type I Error: {$confidenceLevel}
</p>

<br />

<p class="body-text">
    Hopefully you have noticed after playing around with the confidence level values: How likely we are going to reject the Null Hypothesis is directly correlated to the confidence level we currently have!
</p>

<br />

<p class="body-text">
    Specifically, {@html katexify(
    "\P(Type \\; I) = P(Reject \\; \H_0 \\; \|\ \\; \H_0 \\; True) = \\alpha"
)}
</p>

<br />

<p class="body-text">
    Takeaway: We can control the Type I error by directly manipulating our confidence level!
</p>