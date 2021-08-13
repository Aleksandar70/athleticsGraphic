<script>
  import { navigate } from "svelte-routing";
  import { Paths } from "../../../global/constants/api";
  import SourceDropdown from "../source_dropdown/SourceDropdown.svelte";
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
  <SourceDropdown />
</div>
