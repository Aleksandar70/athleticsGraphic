<script lang="ts">
  import Fa from "svelte-fa";
  import { faEye } from "@fortawesome/free-solid-svg-icons";
  import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
  } from "sveltestrap";
  import { UIText } from "../../../global/constants/ui_text";
  import type { Headers } from "../../../global/types";
  import { getDefaultColumns } from "../data_table/table.helper";
  import Switch from "../switch/Switch.svelte";
  import "./columndisplayoptions.style.css";
  import { currentEventId, visibleColumns } from "../../config.store";
  import { isNumeric } from "../../utils/string.utils";

  export let headerData: Headers;

  let isOpen = false;
  $: shouldShowAllColumns = $visibleColumns[$currentEventId].showAll as boolean;
  $: _visibleColumns = $visibleColumns[$currentEventId].columns as string[];

  const toggle = () => (isOpen = !isOpen);

  const toggleColumn = (value: string) => {
    const columnData = $visibleColumns[$currentEventId];
    let columns = columnData.columns;

    if (columnData.showAll) {
      const allColumns = headerData.map((data) => data.value);
      columns = allColumns;
      columnData.showAll = false;
    }

    columns = columns.includes(value)
      ? columns.filter((column: string) => column !== value)
      : [...columns, value];
    $visibleColumns[$currentEventId].columns = columns;
    visibleColumns.set($visibleColumns);
  };

  const toggleDefaultColumns = () => {
    const trialNumbers = headerData
      .filter((data) => isNumeric(data.value))
      .map((data) => data.value);
    const _defaultColumns = getDefaultColumns();
    $visibleColumns[$currentEventId].columns = [
      ..._defaultColumns,
      ...trialNumbers,
    ];

    $visibleColumns[$currentEventId].showAll = false;
  };
</script>

<Modal {isOpen} size="sm" {toggle} scrollable>
  <ModalHeader>
    <h3>{UIText.TOGGLE_COLUMNS_HEADER}</h3>
    <div class="toggle-all--wrapper">
      <Input
        type="checkbox"
        class="toggle-all--checkbox"
        name="toggle-all--checkbox"
        checked={shouldShowAllColumns}
        on:change={() =>
          ($visibleColumns[$currentEventId].showAll = !shouldShowAllColumns)}
      />
      <label for="toggle-all--checkbox">{UIText.TOGGLE_ALL_COLUMNS}</label>
    </div>
    <Button on:click={() => toggleDefaultColumns()}
      >{UIText.TOGGLE_DEFAULT_COLUMNS}</Button
    >
  </ModalHeader>
  <ModalBody class="modal-body">
    {#each headerData as field}
      <div class="modal-field" on:click={() => toggleColumn(field.value)}>
        <span class="field-value">{field.value.toUpperCase()}</span>
        <Switch
          checked={_visibleColumns.includes(field.value) ||
            shouldShowAllColumns}
        />
      </div>
    {/each}
  </ModalBody>
  <ModalFooter>
    <Button on:click={toggle}>{UIText.CLOSE}</Button>
  </ModalFooter>
</Modal>
<Button on:click={() => toggle()}><Fa icon={faEye} /></Button>
