<script>
    import { confidenceLevel } from "../stores";
</script>

<h1 class="body-header">Get Confidence</h1>

<p class="body-text">
    Now we have a sample size, in order to test the Hypothesis we need a "confidence level". In other words, how <strong>unlikely</strong> do you think the opposite of your Null Hypothesis is going to happen?
</p>

<br />
<p class="body-text">
    Enter a confidence level between 0 and 1 below. The lower you go means you are more confident about your Alternative Hypothesis.
</p>

<br />
<div class="centered">
    <label for="sample">Confidence Level:</label>
    <input type="range" min="0" max="1" step="0.01" bind:value={$confidenceLevel}/>
    <p>Numerical Value: {$confidenceLevel}</p>
</div>

<style>
</style>
