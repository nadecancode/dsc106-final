<script>
  import katexify from "../katexify";

  const math1 = "ax^2+bx+c=0";
  const math2 = "x=-\\frac{-b\\pm\\sqrt{b^2-4ac}}{2a}";
  const math3 = "V=\\frac{1}{3}\\pi r^2 h";

  const mathArray = [math1, math2, math3];
  let index = 0;
  $: math = mathArray[index];

  function changeMath() {
    index = (index + 1) % 3;
  }
</script>

<h1 class="body-header">Using Math Equations</h1>
<p class="body-text">
  There are a few different ways we can include math equations in our markup. We
  can include them as inline equations: {@html katexify(math)}. We can also have
  equations that render as their own centered display: {@html katexify(
    math,
    true
  )}
  We can feed the math into a static equation directly: {@html katexify(
    "V=\\pi\\textrm{ m}^3"
  )}. And we can update them with reactivity (try clicking the button below).
  That should cover our bases.
</p>

<div class="button-div">
  <button on:click={changeMath}>
    Displaying equation {index}
  </button>
</div>

<style>
  .button-div {
    display: flex;
    justify-content: center;
  }
  button {
    font-family: var(--font-primary);
    border: 3px solid black;
    padding: 5px 10px;
  }
</style>
