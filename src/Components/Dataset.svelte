<script>
    import VirtualTable from 'svelte-virtual-table';
    import { csv } from 'd3-fetch';

    const dataPromise = csv('/StudentsPerformance.csv');

    let start // the index of the first visible item
    let end // the index of the last visible item
</script>

<h1 class="body-header">Looking at Dataset</h1>
<p class="body-text">
    Below is data generated from a fictional compilation of students' exam scores across three core subjects: math, reading, and writing.
    As a Data Scientist / Statistician, you want to give a rough estimate of the dataset's statistics like mean, standard deviations, etc.
</p>

<br/>

<p class="body-text">
    For demonstration purpose, we are showing the first 10 rows of the dataset:
</p>

{#await dataPromise}
    Loading...
{:then data}
    <table class="body-text" style="width: 100%">
        <thead>
            <tr>
                <th data-sort="math">Math</th>
                <th data-sort="reading">Reading</th>
                <th data-sort="writing">Writing</th>
            </tr>
        </thead>
        <tbody>
            {#each Object.values(data).splice(0, 10) as item}
                <tr>
                    <td>{item["math score"]}</td>
                    <td>{item["reading score"]}</td>
                    <td>{item["writing score"]}</td>
                </tr>
            {/each}
        </tbody>

    </table>
{:catch error}
    <p style="color: red">{error.message}</p>
{/await}

<p class="body-text">
    However, sometimes the dataset is usually too big for you to give an analysis, since more datapoints usually implies low calculation speed. In this case, you would like to sample the dataset and run an analysis on that instead to save your time.
</p>