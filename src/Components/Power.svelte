<script>
    import katexify from '../katexify';
</script>

<h1 class="body-header">
    Power
</h1>

<p class="body-text">
    Now we know the probability of making "false positives" and "true negatives", it seems to imply how powerful our Hypothesis Test is but.. is there a more explicit metric to do so?
</p>

<br />

<p class="body-text">
    Introduce Power! By definition, it is the probability that we reject the null hypothesis while the alternative hypothesis is true, as known as "false negative"! In the context of this dataset, it is the probability that the hypothesis test suggests students do better on writing tests than reading tests, when in reality that it is <strong>true</strong>. Sounds like a very good metric for hypothesis test accuracy isn't it?
</p>

<br />

<p class="body-text">
    Formally, we define this metric as {@html katexify(
    "Power = P(Reject \\; \H_0 \\; \|\ \\; \H_1 \\; True) = 1 - \\beta"
)}
</p>

<br />

<p class="body-text">
    Wait.. what is {@html katexify(
    "\\beta"
)}? It is the <strong>Type II Error Rate</strong>. Yes, if you get the inverse of the area for "true negatives", you will end up with "false negatives" which is precisely what we are looking for to evaluate how <strong>powerful</strong> our hypothesis test is!
</p>

<br />

<p class="body-text">
    Takeaway: The Type II Error rate directly correlates to how powerful our hypothesis test is
</p>