<script>
  import Icon from "svelte-awesome/components/Icon.svelte";
  import { eye } from "svelte-awesome/icons";
  import { Button, Input, Modal, ModalBody, ModalFooter } from "sveltestrap";
  import { UIText } from "../../../global/constants/ui_text";
  import { hideColumn } from "../data_table/table.helper";

  export let headerData;
  export let rowData;

  let isOpen = false;

  const toggle = () => (isOpen = !isOpen);
</script>

<Modal {isOpen} size="sm" keyboard={true}>
  <ModalBody>
    {#each headerData as field}
      <Input
        type="checkbox"
        on:change={() => {
          field.show = !field.show;
          rowData = hideColumn(field, rowData);
        }}
        value={field.value}
        checked={field.show}
        label={field.value}
      />
    {/each}
  </ModalBody>
  <ModalFooter>
    <Button on:click={toggle}>{UIText.CLOSE}</Button>
  </ModalFooter>
</Modal>
<Button on:click={() => toggle()}><Icon data={eye} /></Button>
