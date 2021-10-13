<script lang="ts">
  import {
    Modal,
    ModalBody,
    ModalFooter,
    FormGroup,
    Label,
    Input,
    Form,
    Button,
    Dropdown,
    DropdownItem,
    DropdownToggle,
    DropdownMenu,
  } from "sveltestrap";
  import {
    Constants,
    EventType,
    Graphics,
  } from "../../../../global/constants/constants";
  import { UIText } from "../../../../global/constants/ui_text";
  import {
    addOrUpdateSignature,
    getSignatures,
  } from "../../../api/signature.api";
  import { previewChannel } from "../../../stores/preview.store";
  import { currentHeatName } from "../../../stores/table.store";
  import { isHeight } from "../../../utils/event.utils";
  import "./graphicsmodal.style.css";
  import { sendGraphicsData } from "../../../api/graphics.api";
  import Spinner from "../../spinner/Spinner.svelte";
  import type { ISignature } from "../../../../backend/src/database/interfaces";
  import { selectedSignature } from "../../../stores/signature.store";
  import { Alert } from "sveltestrap";

  export let isOpen: boolean;
  export let id: Graphics;
  export let data: Record<string, any> = {};

  let isAlertVisible = false;
  let competitors: Record<string, string>[] = [];
  let bestCompetitors: Record<string, string>[] = [];
  $: if (data["Competitors"]) {
    competitors = data["Competitors"];
  }

  $: if (data["Medals"]) {
    bestCompetitors = data["Medals"];
    bestCompetitors.map(
      (competitor) =>
        (competitor["result"] =
          competitor["result"]["Final"] ?? competitor["result"]["single"])
    );
  }

  $: _data = { ...data };

  const toggle = () => {
    isOpen = !isOpen;
    sendPreview(_data);
  };

  $: iterationNumber = Math.ceil(competitors.length / Constants.ROWS_PER_TABLE);
  $: maxIndex = Math.ceil(competitors.length / iterationNumber);

  $: type = data["Scores"]
    ? isHeight(Object.keys(data["Scores"]?.[0])?.[0])
      ? EventType.VERTICAL
      : EventType.HORIZONTAL
    : EventType.RUNNING;

  const sendGraphics = () => {
    sendGraphicsData({
      id: id,
      data: _data,
      type: type,
      heat: $currentHeatName,
    });
    toggle();
  };

  const inputChange = (
    target: EventTarget,
    name: string,
    metric?: string,
    idx?: number
  ) => {
    if (name === "Scores" || name === "Competitors" || name === "Medals") {
      _data[name][idx][metric] = (target as HTMLInputElement).value;
      sendPreview(_data);
      return;
    }
    _data[name] = (target as HTMLInputElement).value;
    sendPreview(_data);
  };

  const sendPreview = (data: Record<string, any>) => {
    $previewChannel.postMessage({
      id: id,
      data: data,
      type: type,
      modalOpened: isOpen,
      heat: $currentHeatName,
    });
  };

  const valueChange = async (signature: ISignature) => {
    selectedSignature.set(signature);
    data["Name"] = signature.name;
    data["Title"] = signature.title;
    sendPreview(data);
  };

  const addSignatureToDropdown = async (data) => {
    if (!data["Name"] || !data["Title"]) {
      return;
    }
    const response = await addOrUpdateSignature(data);
    if (response) {
      isAlertVisible = true;
      return;
    }
    isAlertVisible = false;
  };
  $: isActive = (value: ISignature) => $selectedSignature === value;
</script>

<Modal {isOpen} {toggle} scrollable>
  <ModalBody>
    {#if Object.keys(_data).length}
      <Form>
        {#each Object.entries(_data) as [name, value]}
          <FormGroup>
            <Label for={name}>{name}</Label>
            {#if name === "Flag"}
              <img
                alt={value?.toString()}
                src="/img/flags/{value?.toString()}.png"
              />
            {/if}
            {#if name === "Scores"}
              {#each value as score, i}
                <div class="score">
                  <span class="score-metric">{Object.keys(score)[0]}</span>
                  <Input
                    class="score-input"
                    type="text"
                    value={Object.values(score)[0]}
                    on:input={(event) =>
                      inputChange(event.target, name, Object.keys(score)[0], i)}
                  />
                </div>
              {/each}
            {:else if name === "Competitors"}
              {#each competitors as competitor, i}
                <div class="competitor">
                  <img
                    alt={competitor.nationality}
                    src="/img/flags/{competitor.nationality}.png"
                  />
                  <Input
                    class="nationality-input"
                    value={competitor.nationality}
                    on:input={(event) =>
                      inputChange(event.target, name, "nationality", i)}
                  />
                  <Input
                    class="competitor-input"
                    type="text"
                    value={competitor.name}
                    on:input={(event) =>
                      inputChange(event.target, name, "name", i)}
                  />
                  {#if id === Graphics.RESULT_LIST}
                    <Input
                      class="result-input"
                      value={competitor.result[$currentHeatName]}
                      on:input={(event) =>
                        inputChange(event.target, name, "result", i)}
                    />
                  {/if}
                </div>
                {#if (i + 1) % maxIndex === 0}
                  <div class="separation-line">
                    <hr />
                  </div>
                {/if}
              {/each}
            {:else if name === "Medals"}
              {#each bestCompetitors as bestCompetitor, i}
                <div class="medals">
                  <Input class="place-input" value={i + 1} readonly />
                  <img
                    alt={bestCompetitor.nationality}
                    src="/img/flags/{bestCompetitor.nationality}.png"
                  />
                  <Input
                    class="nationality-input"
                    value={bestCompetitor.nationality}
                    on:input={(event) =>
                      inputChange(event.target, name, "nationality", i)}
                  />
                  <Input
                    class="competitor-input"
                    type="text"
                    value={bestCompetitor.name}
                    on:input={(event) =>
                      inputChange(event.target, name, "name", i)}
                  />
                  <Input
                    class="result-input"
                    type="text"
                    value={bestCompetitor.result}
                    on:input={(event) =>
                      inputChange(event.target, name, "result", i)}
                  />
                </div>
              {/each}
            {:else}
              <Input
                type="text"
                bind:value
                on:input={(event) => inputChange(event.target, name)}
              />
            {/if}
          </FormGroup>
        {/each}
      </Form>
    {:else}
      <p class="body-info">
        {UIText.TIME_MESSAGE} <span class="id-span">{id}</span>
      </p>
    {/if}
    {#if id === Graphics.SIGNATURE}
      {#await getSignatures()}
        <Spinner />
      {:then signatures}
        <Button on:click={() => addSignatureToDropdown(_data)}
          >{UIText.BUTTON_SAVE}</Button
        >
        <Alert
          class="signature-control-alert"
          bind:isOpen={isAlertVisible}
          color="success"
          fade={true}
          dismissible
        >
          {UIText.SIGNATURE_ALERT_TEXT}
        </Alert>
        <hr />
        <Dropdown>
          <DropdownToggle class="signature--dropdown text-dark" caret
            >{$selectedSignature["name"] ?? "Choose"}
            {$selectedSignature["title"] ?? "signature"}</DropdownToggle
          >
          <DropdownMenu class="signature--dropdown">
            <DropdownItem header>{UIText.SIGNATURE_HEADER}</DropdownItem>
            {#each signatures as signature}
              <DropdownItem
                class="signature-item"
                active={isActive(signature)}
                on:click={() => valueChange(signature)}
                >{signature.name} {signature.title}</DropdownItem
              >
            {/each}
          </DropdownMenu>
        </Dropdown>
      {/await}
    {/if}
  </ModalBody>
  <ModalFooter>
    <Button on:click={() => sendGraphics()}>{UIText.BUTTON_SHOW}</Button>
    <Button on:click={toggle}>{UIText.BUTTON_CANCEL}</Button>
  </ModalFooter>
</Modal>
