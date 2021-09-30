<script lang="ts">
  import { navigate } from "svelte-routing";
  import { Paths } from "../../../global/constants/api";
  import DataSourceOptions from "../data_source_options/DataSourceOptions.svelte";
  import LocaleDropdown from "../locale_dropdown/LocaleDropdown.svelte";
  import "./header.style.css";
</script>

<header class="header">
  <img
    on:click={() => navigate(Paths.ROOT_PATH)}
    src="/img/logo-light.svg"
    alt="Elegra Logo"
  />
  <div class="options">
    <div class="locale-options option">
      <LocaleDropdown />
    </div>
    <hr />
    <div class="data-source-options option">
      <DataSourceOptions />
    </div>
  </div>
</header>
