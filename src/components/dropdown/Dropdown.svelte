<script>
  import {
    ButtonDropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
  } from "sveltestrap";
  import { GTYPE } from "../../../global/constants/constants";
  import { UIText } from "../../../global/constants/ui_text";
  import { updateConfig, getConfig } from "../../api/config.api";
  import { onMount } from "svelte";

  let dataSource;
  const valueChange = async (selectedSource) => {
    await updateConfig({ dataSource: selectedSource });
    dataSource = selectedSource;
  };

  onMount(async () => {
    const config = await getConfig();
    dataSource = config.dataSource;
  });
</script>

{#if dataSource}
  <div class="dropdownButton">
    <ButtonDropdown>
      <DropdownToggle caret>{dataSource}</DropdownToggle>
      <DropdownMenu>
        <DropdownItem header>{UIText.SOURCES_HEADER}</DropdownItem>
        <DropdownItem on:click={() => valueChange(GTYPE.LOCAL)}
          >{GTYPE.LOCAL}</DropdownItem
        >
        <DropdownItem on:click={() => valueChange(GTYPE.REMOTE)}
          >{GTYPE.REMOTE}</DropdownItem
        >
        <DropdownItem on:click={() => valueChange(GTYPE.SEMI)}
          >{GTYPE.SEMI}</DropdownItem
        >
      </DropdownMenu>
    </ButtonDropdown>
  </div>
{/if}
