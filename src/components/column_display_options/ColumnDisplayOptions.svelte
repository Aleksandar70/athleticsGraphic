<script lang="ts">
  import Icon from "svelte-awesome/components/Icon.svelte";
  import { eye, toggleOn, toggleOff } from "svelte-awesome/icons";
  import {
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
  } from "sveltestrap";
  import { UIText } from "../../../global/constants/ui_text";
  import type { Headers, TableData } from "../../../global/types";
  import { hideColumn } from "../data_table/table.helper";
  import Switch from "../switch/Switch.svelte";
  import "./columndisplayoptions.style.css";

  export let headerData: Headers;
  export let rowData: TableData;

  let isOpen = false;

  const toggle = () => (isOpen = !isOpen);

  const toggleColumn = (field) => {
    field.show = !field.show;
    rowData = hideColumn(field, rowData);
    return field;
  };
</script>

<Modal {isOpen} size="sm" {toggle} scrollable>
  <ModalHeader>
    <h5>Toggle columns</h5>
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
<Button on:click={() => toggle()}><Icon data={eye} /></Button>
