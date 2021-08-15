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
  import "./sourcedropdown.style.css";

  const valueChange = async (selectedSource) => {
    await updateConfig({ dataSource: selectedSource });
    dataSource.set(selectedSource);
    location.reload();
  };

  $: isActive = (value) => $dataSource === value;
</script>

<ButtonDropdown>
  <DropdownToggle class="data-source--dropdown text-dark" caret
    >{$dataSource}</DropdownToggle
  >
  <DropdownMenu class="data-source--dropdown">
    <DropdownItem header>{UIText.SOURCES_HEADER}</DropdownItem>
    <DropdownItem
      class="source-item"
      active={isActive(SOURCE.LOCAL)}
      on:click={() => valueChange(SOURCE.LOCAL)}>{SOURCE.LOCAL}</DropdownItem
    >
    <DropdownItem
      class="source-item"
      active={isActive(SOURCE.REMOTE)}
      on:click={() => valueChange(SOURCE.REMOTE)}>{SOURCE.REMOTE}</DropdownItem
    >
    <DropdownItem
      class="source-item"
      active={isActive(SOURCE.SEMI)}
      on:click={() => valueChange(SOURCE.SEMI)}>{SOURCE.SEMI}</DropdownItem
    >
  </DropdownMenu>
</ButtonDropdown>
