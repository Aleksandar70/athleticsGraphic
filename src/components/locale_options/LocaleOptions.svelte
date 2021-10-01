<script lang="ts">
  import { locale } from "svelte-i18n";

  import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
  } from "sveltestrap";
  import { updateConfig } from "../../api/config.api";
  import { language } from "../../stores/config.store";
  import AddLocaleModal from "./add_locale_modal/AddLocaleModal.svelte";
  import EditLocaleModal from "./edit_locale_modal/EditLocaleModal.svelte";
  import "./localeoptions.style.css";

  let addModalOpen = false;
  let editModalOpen = false;

  const valueChange = async (selectedLanguage: string) => {
    await updateConfig({ selectedLanguage: selectedLanguage });
    language.set(selectedLanguage);
    locale.set(selectedLanguage);
  };

  $: isActive = (value: string) => $language === value;
</script>

<Dropdown>
  <DropdownToggle class="locale--dropdown text-dark" caret
    >{$language ?? ""}</DropdownToggle
  >
  <DropdownMenu class="locale--dropdown">
    <DropdownItem header>Select language</DropdownItem>
    <DropdownItem
      class="locale-item"
      active={isActive("default")}
      on:click={() => valueChange("default")}>default</DropdownItem
    >
  </DropdownMenu>
</Dropdown>
<Button on:click={() => (addModalOpen = true)}>+</Button>
<Button on:click={() => (editModalOpen = true)}>Edit</Button>
<AddLocaleModal bind:isModalOpen={addModalOpen} />
<EditLocaleModal bind:isModalOpen={editModalOpen} />
