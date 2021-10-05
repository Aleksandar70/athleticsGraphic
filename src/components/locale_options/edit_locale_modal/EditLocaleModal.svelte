<script lang="ts">
  import {
    Input,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
  } from "sveltestrap";
  import { UIText } from "../../../../global/constants/ui_text";
  import { editLocale } from "../../../api/config.api";
  import { language } from "../../../stores/config.store";
  import "./editlocalemodal.style.css";

  export let isModalOpen = false;
  export let defaultData: Record<string, string> = {};
  export let localeData: Record<string, string> = {};

  $: if (defaultData) {
    delete defaultData["default"];
  }

  const toggleModal = () => (isModalOpen = !isModalOpen);

  const editLocaleAction = async () => {
    await editLocale(localeData, $language);
    toggleModal();
  };
</script>

<Modal isOpen={isModalOpen} size="lg" toggle={toggleModal} scrollable>
  <ModalHeader toggle={toggleModal}
    >{UIText.EDIT_LOCALE_MODAL_HEADER}</ModalHeader
  >
  <ModalBody class="edit-locale-body">
    {#each Object.entries(defaultData) as [key, value]}
      <div class="edit-locale-row">
        <span class="edit-locale-id">{key}</span>
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
    <Button color="danger" on:click={() => editLocaleAction()}
      >{UIText.LOCALE_MODAL_SAVE}</Button
    >
    <Button color="secondary" on:click={toggleModal}
      >{UIText.LOCALE_MODAL_CANCEL}</Button
    >
  </ModalFooter>
</Modal>
