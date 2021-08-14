<script>
  import { navigate } from "svelte-routing";
  import { Paths } from "../../../global/constants/api";
  import SourceDropdown from "../source_dropdown/SourceDropdown.svelte";
  import "./header.style.css";
</script>

<header class="header">
  <img
    on:click={() => navigate(Paths.ROOT_PATH)}
    src="/img/logo.png"
    alt="Elegra Logo"
  />
  <div class="options">
    <SourceDropdown />
  </div>
</header>
