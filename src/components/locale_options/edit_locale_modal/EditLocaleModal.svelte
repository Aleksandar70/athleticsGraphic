<script lang="ts">
  import {
    Input,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
  } from "sveltestrap";
  import { editLocale } from "../../../api/config.api";
  import { language } from "../../../stores/config.store";
  import "./editlocalemodal.style.css";

  export let isModalOpen = false;
  export let defaultData: Record<string, string> = {};
  export let localeData: Record<string, string> = {};

  const toggleModal = () => (isModalOpen = !isModalOpen);

  const editLocaleAction = async () => {
    await editLocale(localeData, $language);
    toggleModal();
  };
</script>

<Modal isOpen={isModalOpen} size="lg" toggle={toggleModal}>
  <ModalHeader toggle={toggleModal}>Enter translations</ModalHeader>
  <ModalBody class="edit-locale-body">
    {#each Object.entries(defaultData) as [key, value]}
      <div class="edit-locale-row">
        {key}
        <Input class="edit-locale-input" bsSize="sm" type="text" bind:value />
        <Input
          class="edit-locale-input"
          bsSize="sm"
          type="text"
          bind:value={localeData[key]}
        />
      </div>
    {/each}
  </ModalBody>
  <ModalFooter>
    <Button color="danger" on:click={() => editLocaleAction()}>Save</Button>
    <Button color="secondary" on:click={toggleModal}>Cancel</Button>
  </ModalFooter>
</Modal>
