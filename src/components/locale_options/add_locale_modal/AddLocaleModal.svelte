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
  import "./addlocalemodal.style.css";

  export let isModalOpen = false;

  let localeName = "";

  const toggleModal = () => (isModalOpen = !isModalOpen);

  const addLocaleAction = async () => {
    const localeData = await addNewLocale(localeName);
    register(localeName, () => import(`../../../../i18n/${localeName}.json`));
    console.log("localeData -> ", localeData);
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
