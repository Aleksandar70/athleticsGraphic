<script lang="ts">
  import "./spinner.style.css";
  export let size: string | number = "90";
  export let unit: string = "px";
  export let colorOuter: string = "#ED1C24";
  export let colorCenter: string = "#39AEEF";
  export let colorInner: string = "#30A651";
  export let durationMultiplier: number = 1;
  export let durationOuter: string = `${durationMultiplier * 2}s`;
  export let durationInner: string = `${durationMultiplier * 1.5}s`;
  export let durationCenter: string = `${durationMultiplier * 3}s`;
</script>

<div
  class="circle"
  style="--size: {size}{unit}; --colorInner: {colorInner}; --colorCenter: {colorCenter}; --colorOuter: {colorOuter}; --durationInner: {durationInner}; --durationCenter: {durationCenter}; --durationOuter: {durationOuter};"
/>
