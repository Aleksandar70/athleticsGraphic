<script>
  import { navigate } from "svelte-routing";
  import { Paths } from "../../../global/constants/api";
  import "./header.style.css";
</script>

<header class="header">
  <h1>
    <img
      on:click={() => navigate(Paths.ROOT_PATH)}
      src="/img/ElegraLogo.png"
      alt="Elegra Logo"
    />
  </h1>
</header>
