<script>
  import { navigate } from "svelte-routing";
  import { Paths } from "../../../global/constants/api";
  import Dropdown from "../dropdown/Dropdown.svelte";
  import "./header.style.css";
</script>

<div class="header">
  <h1>
    <img
      on:click={() => navigate(Paths.ROOT_PATH)}
      src="/img/ElegraLogo.png"
      alt="Elegra Logo"
    />
  </h1>
  <Dropdown />
</div>
