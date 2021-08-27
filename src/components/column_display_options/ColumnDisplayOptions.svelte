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
  } from "../data_table/table.helper";
  import Switch from "../switch/Switch.svelte";
  import "./columndisplayoptions.style.css";

  export let headerData: Headers;
  export let rowData: TableData;

  let isOpen = false;
  let showAll = false;
  let defaultColumns = false;

  const toggle = () => (isOpen = !isOpen);

  const toggleColumn = (field: HeaderField) => {
    field.show = !field.show;
    rowData = hideColumn(field, rowData);
    return field;
  };

  const toggleAllColumns = (showAll: boolean) => {
    showAll = !showAll;
    defaultColumns = false;
    rowData = showAllColumns(showAll, rowData);
    return showAll;
  };

  const toggleDefaultColumns = (defaultColumns: boolean) => {
    defaultColumns = !defaultColumns;
    showAll = false;
    rowData = resetToDefaultColumns(defaultColumns, rowData);
    return defaultColumns;
  };
</script>

<Modal {isOpen} size="sm" {toggle} scrollable>
  <ModalHeader>
    <h5>{UIText.TOGGLE_COLUMNS_HEADER}</h5>
  </ModalHeader>
  <ModalBody class="modal-body">
    <div
      class="modal-field"
      on:click={() => (showAll = toggleAllColumns(showAll))}
    >
      <span class="field-value">{UIText.TOGGLE_ALL_COLUMNS}</span>
      <Switch checked={showAll} />
    </div>
    <div
      class="modal-field"
      on:click={() => (defaultColumns = toggleDefaultColumns(defaultColumns))}
    >
      <span class="field-value">{UIText.TOGGLE_DEFAULT_COLUMNS}</span>
      <Switch checked={defaultColumns} />
    </div>
    {#each headerData as field}
      {#if showAll === true}
        <Switch checked={true} />
      {:else}
        <div class="modal-field" on:click={() => (field = toggleColumn(field))}>
          <span class="field-value">{field.value.toUpperCase()}</span>
          <Switch checked={field.show} />
        </div>
      {/if}
    {/each}
  </ModalBody>
  <ModalFooter>
    <Button on:click={toggle}>{UIText.CLOSE}</Button>
  </ModalFooter>
</Modal>
<Button on:click={() => toggle()}><Fa icon={faEye} /></Button>
