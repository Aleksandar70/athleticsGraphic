<script lang="ts">
  import Fa from "svelte-fa";
  import { faEye } from "@fortawesome/free-solid-svg-icons";
  import {
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
  } from "sveltestrap";
  import { UIText } from "../../../global/constants/ui_text";
  import type { HeaderField, Headers, TableData } from "../../../global/types";
  import {
    hideColumn,
    showAllColumns,
    resetToDefaultColumns,
    toggleHeader,
    toggleDefaultHeader,
  } from "../data_table/table.helper";
  import Switch from "../switch/Switch.svelte";
  import "./columndisplayoptions.style.css";

  export let headerData: Headers;
  export let rowData: TableData;

  let isOpen = false;
  let showAll = false;
  let isDefaultChecked = false;

  const toggle = () => (isOpen = !isOpen);

  const toggleColumn = (field: HeaderField) => {
    field.show = !field.show;
    rowData = hideColumn(field, rowData);
    return field;
  };

  const toggleAllColumns = () => {
    rowData = showAllColumns(!showAll, rowData);
    headerData = toggleHeader(!showAll, headerData);
    showAll = !showAll;
    isDefaultChecked = false;
  };

  const toggleDefaultColumns = () => {
    rowData = resetToDefaultColumns(!isDefaultChecked, rowData);
    headerData = toggleDefaultHeader(!isDefaultChecked, headerData);
    isDefaultChecked = !isDefaultChecked;
    showAll = false;
  };
</script>

<Modal {isOpen} size="sm" {toggle} scrollable>
  <ModalHeader>
    <h5>{UIText.TOGGLE_COLUMNS_HEADER}</h5>
    <div class="modal-field" on:click={() => toggleAllColumns()}>
      <span class="field-value"><h6>{UIText.TOGGLE_ALL_COLUMNS}</h6></span>
      <Switch checked={showAll} />
    </div>
    <div class="modal-field" on:click={() => toggleDefaultColumns()}>
      <span class="field-value"><h6>{UIText.TOGGLE_DEFAULT_COLUMNS}</h6></span>
      <Switch checked={isDefaultChecked} />
    </div>
  </ModalHeader>
  <ModalBody class="modal-body">
    {#each headerData as field}
      <div class="modal-field" on:click={() => (field = toggleColumn(field))}>
        <span class="field-value">{field.value.toUpperCase()}</span>
        <Switch checked={field.show} />
      </div>
    {/each}
  </ModalBody>
  <ModalFooter>
    <Button on:click={toggle}>{UIText.CLOSE}</Button>
  </ModalFooter>
</Modal>
<Button on:click={() => toggle()}><Fa icon={faEye} /></Button>
