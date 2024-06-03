<script>
    import katexify from "../katexify";
</script>

<h1 class="body-header">Create a Research Question & Hypothesis</h1>

<p class="body-text">
    With this dataset, we can form an analysis based on students' scores! But first, we need to create a question that can help us understand what Type I and Type II errors are!
</p>
<br/>
<p class="body-text">
    We went ahead and did a bit of analysis on the dataset for you. Let's say the average reading score for every student in this dataset is approximately {@html katexify(
    "\\mu \\approx 69"
)} and the population's standard deviation is approximately {@html katexify(
    "\\sigma \\approx 14.6"
)}
</p>
<br/>
<p class="body-text">
    Now we have some information about the dataset, let's ask ourselves a question: Will the students have roughly same average writing scores, or will they do better? Let's say here, you expect the writing scores to be roughly equal and anything that is your "Null Hypothesis", which the opposite is your "Alternative Hypothesis". In other words, we have our {@html katexify(
    "\H_0: \\mu = 69"
)} and {@html katexify(
    "\H_1: \\mu > 69"
)}
</p>