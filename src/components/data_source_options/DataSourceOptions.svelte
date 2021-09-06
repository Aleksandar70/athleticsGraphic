<script lang="ts">
  import Fa from "svelte-fa";
  import { faDatabase } from "@fortawesome/free-solid-svg-icons";
  import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
  } from "sveltestrap";
  import { SOURCE } from "../../../global/constants/constants";
  import { UIText } from "../../../global/constants/ui_text";
  import { updateConfig } from "../../api/config.api";
  import { dataSource } from "../../stores/config.store";
  import { initializeData } from "../../api/database.api";
  import Spinner from "../spinner/Spinner.svelte";
  import "./datasourceoptions.style.css";

  const valueChange = async (selectedSource: string) => {
    await updateConfig({ dataSource: selectedSource });
    dataSource.set(selectedSource);
    location.reload();
  };

  let isInitializing = false;
  let isInitModalOpen = false;
  let toggleInitMoal = () => (isInitModalOpen = !isInitModalOpen);

  const initialize = async (): Promise<void> => {
    isInitializing = true;
    await initializeData();
    location.reload();
  };

  $: isActive = (value: string) => $dataSource === value;
</script>

<Dropdown>
  <DropdownToggle class="data-source--dropdown text-dark" caret
    >{$dataSource ?? ""}</DropdownToggle
  >
  <DropdownMenu class="data-source--dropdown">
    <DropdownItem header>{UIText.SOURCES_HEADER}</DropdownItem>
    <DropdownItem
      class="source-item"
      active={isActive(SOURCE.LOCAL)}
      on:click={() => valueChange(SOURCE.LOCAL)}>{SOURCE.LOCAL}</DropdownItem
    >
    <DropdownItem
      class="source-item"
      active={isActive(SOURCE.REMOTE)}
      on:click={() => valueChange(SOURCE.REMOTE)}>{SOURCE.REMOTE}</DropdownItem
    >
  </DropdownMenu>
</Dropdown>
<div class="initialize-button" on:click={() => toggleInitMoal()}>
  <Fa icon={faDatabase} color="white" />
</div>
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
