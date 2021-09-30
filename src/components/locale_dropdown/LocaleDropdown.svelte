<script lang="ts">
  import { locale } from "svelte-i18n";

  import {
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
  } from "sveltestrap";
  import { updateConfig } from "../../api/config.api";
  import { language } from "../../stores/config.store";
  import "./localedropdown.style.css";

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
    ><DropdownItem
      class="locale-item"
      active={isActive("en")}
      on:click={() => valueChange("en")}>en</DropdownItem
    >
  </DropdownMenu>
</Dropdown>
