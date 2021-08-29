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
    getDefaultColumns,
    hideOrShowColumn,
    resetToDefaultColumns,
    toggleDefaultHeader,
  } from "../data_table/table.helper";
  import Switch from "../switch/Switch.svelte";
  import "./columndisplayoptions.style.css";
  import { currentEventId, visibleColumns } from "../../config.store";
  import Checkbox from "svelte-checkbox";

  export let headerData: Headers;
  export let rowData: TableData;

  let isOpen = false;
  $: shouldShowAllColumns = $visibleColumns[$currentEventId].showAll;

  const toggle = () => (isOpen = !isOpen);

  const toggleColumn = (field: HeaderField) => {
    field.show = !field.show;
    rowData = hideOrShowColumn(field, rowData);
    setColumnsToLocalStorage(field);
    return field;
  };

  const setColumnsToLocalStorage = (field) => {
    let columns = $visibleColumns[$currentEventId].columns;
    columns = columns.includes(field.value)
      ? columns.filter((column) => column !== field.value)
      : [...columns, field.value];
    $visibleColumns[$currentEventId].columns = columns;
    visibleColumns.set($visibleColumns);
  };

  const toggleDefaultColumns = () => {
    rowData = resetToDefaultColumns(rowData);
    headerData = toggleDefaultHeader(headerData);
    $visibleColumns[$currentEventId].columns = getDefaultColumns();
    $visibleColumns[$currentEventId].showAll = false;
  };
</script>

<Modal {isOpen} size="sm" {toggle} scrollable>
  <ModalHeader>
    <h5>{UIText.TOGGLE_COLUMNS_HEADER}</h5>
    <div class="toggle-all--wrapper">
      <Checkbox
        size="2.5rem"
        class="toggle-all--checkbox"
        checked={shouldShowAllColumns}
        on:change={() =>
          ($visibleColumns[$currentEventId].showAll = !shouldShowAllColumns)}
      />
      <label class="toggle-all--text" for="toggle-all--checkbox"
        >{UIText.TOGGLE_ALL_COLUMNS}</label
      >
    </div>
    <div>
      <Button on:click={() => toggleDefaultColumns()}
        >{UIText.TOGGLE_DEFAULT_COLUMNS}</Button
      >
    </div>
  </ModalHeader>
  <ModalBody class="modal-body">
    {#each headerData as field}
      <div class="modal-field" on:click={() => (field = toggleColumn(field))}>
        <span class="field-value">{field.value.toUpperCase()}</span>
        <Switch checked={field.show || shouldShowAllColumns} />
      </div>
    {/each}
  </ModalBody>
  <ModalFooter>
    <Button on:click={toggle}>{UIText.CLOSE}</Button>
  </ModalFooter>
</Modal>
<Button on:click={() => toggle()}><Fa icon={faEye} /></Button>
