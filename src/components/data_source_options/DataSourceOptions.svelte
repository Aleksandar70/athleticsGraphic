<script lang="ts">
  import Fa from "svelte-fa";
  import { faDatabase } from "@fortawesome/free-solid-svg-icons";
  import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
  } from "sveltestrap";
  import { SOURCE } from "../../../global/constants/constants";
  import { UIText } from "../../../global/constants/ui_text";
  import { updateConfig } from "../../api/config.api";
  import { dataSource } from "../../stores/config.store";
  import DataSourceOptionsModal from "./modal/DataSourceOptionsModal.svelte";
  import "./datasourceoptions.style.css";

  const valueChange = async (selectedSource: string) => {
    await updateConfig({ dataSource: selectedSource });
    dataSource.set(selectedSource);
    location.reload();
  };

  let isInitModalOpen = false;
  let toggleInitMoal = () => (isInitModalOpen = !isInitModalOpen);

  $: isActive = (value: string) => $dataSource === value;
</script>

<div class="data-source--wrapper">
  <Dropdown>
    <DropdownToggle class="data-source--dropdown text-dark" caret
      >{$dataSource ?? ""}</DropdownToggle
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
        on:click={() => valueChange(SOURCE.REMOTE)}
        >{SOURCE.REMOTE}</DropdownItem
      >
    </DropdownMenu>
  </Dropdown>
  <div>
    <Button
      size="sm"
      class="initialize-button"
      on:click={() => toggleInitMoal()}
    >
      <Fa icon={faDatabase} color="white" />
    </Button>
  </div>
</div>
<DataSourceOptionsModal {isInitModalOpen} {toggleInitMoal} />
