<script lang="ts">
  import Fa from "svelte-fa";
  import { faLock } from "@fortawesome/free-solid-svg-icons";
  import {
    Button,
    Icon,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Popover,
  } from "sveltestrap";
  import { UIText } from "../../../global/constants/ui_text";
  import type { Headers } from "../../../global/types";
  import Switch from "../switch/Switch.svelte";
  import { currentEventId, lockedColumns } from "../../stores/table.store";
  import "./columnlockoptions.style.css";
  import { uneditableFields } from "../../../global/defaults";

  export let headerData: Headers;

  let isOpen = false;
  $: _lockedColumns = $lockedColumns[$currentEventId] as string[];

  const toggle = () => (isOpen = !isOpen);

  const toggleColumn = (value: string) => {
    if (!_lockedColumns) {
      lockedColumns.set({
        ...$lockedColumns,
        [$currentEventId]: [] as string[],
      });
    }

    let columnData = $lockedColumns[$currentEventId];

    columnData = columnData?.includes(value)
      ? columnData.filter((column: string) => column !== value)
      : [...columnData, value];
    $lockedColumns[$currentEventId] = columnData;
    lockedColumns.set($lockedColumns);
  };
</script>

<Modal {isOpen} size="sm" {toggle} scrollable>
  <ModalHeader>
    <div class="modal-lock--header">
      <h3>{UIText.TOGGLE_LOCK_COLUMNS}</h3>
      <Icon name="info-circle-fill" id="info-icon" />
      <Popover target="info-icon" trigger="hover" placement="bottom"
        >{UIText.TOGGLE_LOCK_INFO}</Popover
      >
    </div>
  </ModalHeader>
  <ModalBody class="modal-body">
    {#each headerData as field}
      {#if !uneditableFields.includes(field.value)}
        <div class="modal-field" on:click={() => toggleColumn(field.value)}>
          <span class="field-value">{field.value.toUpperCase()}</span>
          <Switch checked={_lockedColumns?.includes(field.value)} />
        </div>
      {/if}
    {/each}
  </ModalBody>
  <ModalFooter>
    <Button on:click={toggle}>{UIText.CLOSE}</Button>
  </ModalFooter>
</Modal>
<Button on:click={() => toggle()}><Fa icon={faLock} /></Button>
