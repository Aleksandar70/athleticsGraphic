<script lang="ts">
  import { locale } from "svelte-i18n";

  import {
    Input,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
  } from "sveltestrap";
  import { UIText } from "../../../../global/constants/ui_text";
  import { addNewLocale } from "../../../api/config.api";
  import { allLanguages, language } from "../../../stores/config.store";
  import EditLocaleModal from "../edit_locale_modal/EditLocaleModal.svelte";
  import "./addlocalemodal.style.css";

  export let isModalOpen = false;

  let localeName = "";
  let editModalOpen = false;
  let localePairData = {};

  const toggleModal = () => (isModalOpen = !isModalOpen);

  const addLocaleAction = async () => {
    localePairData = await addNewLocale(localeName);
    language.set(localeName);
    locale.set(localeName);
    allLanguages.set([...$allLanguages, localeName]);
    toggleModal();
    localeName = "";
    editModalOpen = true;
  };
</script>

<Modal isOpen={isModalOpen} toggle={toggleModal}>
  <ModalHeader toggle={toggleModal}
    >{UIText.ADD_LOCALE_MODAL_HEADER}</ModalHeader
  >
  <ModalBody class="add-locale-body">
    <Input
      class="add-locale-input"
      bsSize="sm"
      type="text"
      bind:value={localeName}
    />
  </ModalBody>
  <ModalFooter>
    <Button color="danger" on:click={() => addLocaleAction()}
      >{UIText.LOCALE_MODAL_SAVE}</Button
    >
    <Button color="secondary" on:click={toggleModal}
      >{UIText.LOCALE_MODAL_CANCEL}</Button
    >
  </ModalFooter>
</Modal>
<EditLocaleModal
  defaultData={localePairData["default"]}
  localeData={localePairData["locale"]}
  bind:isModalOpen={editModalOpen}
/>
