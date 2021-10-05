<script lang="ts">
  import { locale } from "svelte-i18n";
  import Fa from "svelte-fa";
  import { faPlus, faEdit } from "@fortawesome/free-solid-svg-icons";
  import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
  } from "sveltestrap";
  import { getLanguageData, updateConfig } from "../../api/config.api";
  import { allLanguages, language } from "../../stores/config.store";
  import AddLocaleModal from "./add_locale_modal/AddLocaleModal.svelte";
  import EditLocaleModal from "./edit_locale_modal/EditLocaleModal.svelte";
  import "./localeoptions.style.css";
  import { UIText } from "../../../global/constants/ui_text";

  let addModalOpen = false;

  let editModalOpen = false;
  let languagesData = {};

  const valueChange = async (selectedLanguage: string) => {
    await updateConfig({ selectedLanguage: selectedLanguage });
    language.set(selectedLanguage);
    locale.set(selectedLanguage);
  };

  const openEditModal = async () => {
    languagesData = await getLanguageData($language);
    editModalOpen = true;
  };

  $: isActive = (value: string) => $language === value;
</script>

<div class="locale-wrapper">
  <Dropdown>
    <DropdownToggle class="locale--dropdown text-dark" caret
      >{$language ?? ""}</DropdownToggle
    >
    <DropdownMenu class="locale--dropdown">
      <DropdownItem header>{UIText.LOCALE_DROPDOWN_HEADER}</DropdownItem>
      {#each $allLanguages as lang}
        <DropdownItem
          class="locale-item"
          active={isActive(lang)}
          on:click={() => valueChange(lang)}>{lang}</DropdownItem
        >
      {/each}
    </DropdownMenu>
  </Dropdown>
  <div class="local-buttons">
    <Button
      class="local-button"
      size="sm"
      on:click={() => (addModalOpen = true)}><Fa icon={faPlus} /></Button
    >
    <Button
      class="local-button"
      size="sm"
      on:click={() => openEditModal()}
      disabled={$language === "default"}><Fa icon={faEdit} /></Button
    >
  </div>
</div>
<AddLocaleModal bind:isModalOpen={addModalOpen} />
<EditLocaleModal
  bind:isModalOpen={editModalOpen}
  defaultData={languagesData["default"]}
  localeData={languagesData["locale"]}
/>
