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
  import Switch from "../switch/Switch.svelte";
  import "./columndisplayoptions.style.css";
  import { currentEventId, visibleColumns } from "../../stores/table.store";
  import {
    toggleColumn,
    toggleDefaultColumns,
  } from "./columnDisplayOptions.helper";

  export let headerData: Headers;

  let isOpen = false;
  $: shouldShowAllColumns = $visibleColumns[$currentEventId].showAll as boolean;
  $: _visibleColumns = $visibleColumns[$currentEventId].columns as string[];

  const toggle = () => (isOpen = !isOpen);
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
    <Button on:click={() => toggleDefaultColumns(headerData)}
      >{UIText.TOGGLE_DEFAULT_COLUMNS}</Button
    >
  </ModalHeader>
  <ModalBody class="modal-body">
    {#each headerData as field}
      <div
        class="modal-field"
        on:click={() => toggleColumn(field.value, headerData)}
      >
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
