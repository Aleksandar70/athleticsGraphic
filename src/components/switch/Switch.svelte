<script>
  import "./switch.style.css";

  export let checked = false;
</script>

<label class="switch">
  <input type="checkbox" {checked} />
  <span class="slider" />
</label>
