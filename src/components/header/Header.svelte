<script lang="ts">
  import { navigate } from "svelte-routing";
  import { Paths } from "../../../global/constants/api";
  import DataSourceOptions from "../data_source_options/DataSourceOptions.svelte";
  import LocaleOptions from "../locale_options/LocaleOptions.svelte";
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
      <LocaleOptions />
    </div>
    <hr />
    <div class="data-source-options option">
      <DataSourceOptions />
    </div>
  </div>
</header>
