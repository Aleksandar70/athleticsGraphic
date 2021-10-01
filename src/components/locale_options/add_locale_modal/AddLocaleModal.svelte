<script lang="ts">
  import { register } from "svelte-i18n";

  import {
    Input,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
  } from "sveltestrap";
  import { addNewLocale } from "../../../api/config.api";
  import { language } from "../../../stores/config.store";
  import EditLocaleModal from "../edit_locale_modal/EditLocaleModal.svelte";
  import "./addlocalemodal.style.css";

  export let isModalOpen = false;

  let localeName = "";
  let editModalOpen = false;
  let defaultLocaleData = {};

  const toggleModal = () => (isModalOpen = !isModalOpen);

  const addLocaleAction = async () => {
    language.set(localeName);
    defaultLocaleData = await addNewLocale(localeName);
    register(localeName, () => import(`../../../../i18n/${localeName}.json`));
    toggleModal();
    editModalOpen = true;
  };
</script>

<Modal isOpen={isModalOpen} backdrop="static" toggle={toggleModal}>
  <ModalHeader toggle={toggleModal}>Enter locale name</ModalHeader>
  <ModalBody class="add-locale-body">
    <Input
      class="add-locale-input"
      bsSize="sm"
      type="text"
      bind:value={localeName}
    />.json
  </ModalBody>
  <ModalFooter>
    <Button color="danger" on:click={() => addLocaleAction()}>Save</Button>
    <Button color="secondary" on:click={toggleModal}>Cancel</Button>
  </ModalFooter>
</Modal>
<EditLocaleModal
  defaultData={defaultLocaleData}
  bind:isModalOpen={editModalOpen}
/>
