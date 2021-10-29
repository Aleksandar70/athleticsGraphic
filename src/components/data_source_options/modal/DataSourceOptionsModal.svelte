<script lang="ts">
  import {
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
  } from "sveltestrap";
  import { UIText } from "../../../../global/constants/ui_text";
  import { initializeData } from "../../../api/database.api";
  import Spinner from "../../spinner/Spinner.svelte";

  export let isInitModalOpen: boolean;
  export let toggleInitMoal: () => void;

  let isInitializing = false;

  const initialize = async (): Promise<void> => {
    isInitializing = true;
    await initializeData();
    location.reload();
  };
</script>

<Modal isOpen={isInitModalOpen} backdrop="static" toggle={toggleInitMoal}>
  {#if isInitializing}
    <ModalHeader toggle={toggleInitMoal}>{UIText.INIT_IN_PROGRESS}</ModalHeader>
    <ModalBody class="init-modal--spin-body">
      <Spinner />
    </ModalBody>
  {:else}
    <ModalHeader toggle={toggleInitMoal}>{UIText.INIT_WARNING}</ModalHeader>
    <ModalBody>
      {UIText.INIT_BODY}
    </ModalBody>
    <ModalFooter>
      <Button color="danger" on:click={() => initialize()}
        >{UIText.INIT_BUTTON}</Button
      >
      <Button color="secondary" on:click={toggleInitMoal}
        >{UIText.INIT_CANCEL}</Button
      >
    </ModalFooter>
  {/if}
</Modal>
