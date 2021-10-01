<script lang="ts">
  import { locale } from "svelte-i18n";

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

<Dropdown>
  <DropdownToggle class="locale--dropdown text-dark" caret
    >{$language ?? ""}</DropdownToggle
  >
  <DropdownMenu class="locale--dropdown">
    <DropdownItem header>Select language</DropdownItem>
    {#each $allLanguages as lang}
      <DropdownItem
        class="locale-item"
        active={isActive(lang)}
        on:click={() => valueChange(lang)}>{lang}</DropdownItem
      >
    {/each}
  </DropdownMenu>
</Dropdown>
<Button on:click={() => (addModalOpen = true)}>+</Button>
<Button on:click={() => openEditModal()}>Edit</Button>
<AddLocaleModal bind:isModalOpen={addModalOpen} />
<EditLocaleModal
  bind:isModalOpen={editModalOpen}
  defaultData={languagesData["default"]}
  localeData={languagesData["locale"]}
/>
