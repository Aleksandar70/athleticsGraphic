<script>
  import {
    ButtonDropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
  } from "sveltestrap";
  import { SOURCE } from "../../../global/constants/constants";
  import { UIText } from "../../../global/constants/ui_text";
  import { updateConfig } from "../../api/config.api";
  import { dataSource } from "../../config.store";

  const valueChange = async (selectedSource) => {
    await updateConfig({ dataSource: selectedSource });
    dataSource.set(selectedSource);
  };
</script>

<div class="dropdownButton">
  <ButtonDropdown>
    <DropdownToggle caret>{$dataSource}</DropdownToggle>
    <DropdownMenu>
      <DropdownItem header>{UIText.SOURCES_HEADER}</DropdownItem>
      <DropdownItem on:click={() => valueChange(SOURCE.LOCAL)}
        >{SOURCE.LOCAL}</DropdownItem
      >
      <DropdownItem on:click={() => valueChange(SOURCE.REMOTE)}
        >{SOURCE.REMOTE}</DropdownItem
      >
      <DropdownItem on:click={() => valueChange(SOURCE.SEMI)}
        >{SOURCE.SEMI}</DropdownItem
      >
    </DropdownMenu>
  </ButtonDropdown>
</div>

<style>
  .dropdownButton {
    position: relative;
  }
</style>
