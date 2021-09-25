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
  } from "sveltestrap";
  import { EventType, Graphics } from "../../../../global/constants/constants";
  import { streamChannel } from "../../../stores/stream.store";
  import { isHeight } from "../../../utils/event.utils";
  import "./graphicsmodal.style.css";

  export let isOpen: boolean;
  export let id: Graphics;
  export let data: Record<string, any> = {};

  let competitors: Record<string, string>[] = [];
  let bestCompetitors: Record<string, string>[] = [];

  $: if (data["Competitors"]) {
    competitors = data["Competitors"];
  }

  $: if (data["Medals"]) {
    bestCompetitors = data["Medals"];
  }

  $: _data = { ...data };

  const toggle = () => (isOpen = !isOpen);

  $: type = data["Scores"]
    ? isHeight(Object.keys(data["Scores"]?.[0])?.[0])
      ? EventType.VERTICAL
      : EventType.HORIZONTAL
    : EventType.RUNNING;

  const sendGraphics = () => {
    $streamChannel.postMessage({ id: id, data: _data, type: type });
    toggle();
  };

  const inputChange = (
    target: EventTarget,
    name: string,
    metric?: string,
    idx?: number
  ) => {
    if (name === "Scores" || name === "Competitors"|| name === "Medals") {
      _data[name][idx][metric] = (target as HTMLInputElement).value;
      return;
    }
    _data[name] = (target as HTMLInputElement).value;
  };
</script>

<Modal {isOpen} {toggle} scrollable>
  <ModalBody>
    {#if Object.keys(data).length}
      <Form>
        {#each Object.entries(data) as [name, value]}
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
                <div class="score">
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
                    class="score-input"
                    type="text"
                    value={competitor.name}
                    on:input={(event) =>
                      inputChange(event.target, name, "name", i)}
                  />
                  {#if id === Graphics.RESULT_LIST}
                    <Input
                      class="result-input"
                      value={competitor.result}
                      on:input={(event) =>
                        inputChange(event.target, name, "result", i)}
                    />
                  {/if}
                </div>
              {/each}
            {:else if name === "Medals"}
              {#each bestCompetitors as bestCompetitor, i}
                <div class="score">
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
                    class="score-input"
                    type="text"
                    value={bestCompetitor.name}
                    on:input={(event) =>
                      inputChange(event.target, name, "name", i)}
                  />
                  {#if id === Graphics.RESULT_LIST}
                    <Input
                      class="result-input"
                      value={bestCompetitor.result}
                      on:input={(event) =>
                        inputChange(event.target, name, "result", i)}
                    />
                  {/if}
                </div>
              {/each}
            {:else}
              <Input
                type="text"
                bind:value
                on:change={(event) => inputChange(event.target, name)}
              />
            {/if}
          </FormGroup>
        {/each}
      </Form>
    {:else}
      <p class="body-info">
        You are about to show graphics for <span class="id-span">{id}</span>
      </p>
    {/if}
  </ModalBody>
  <ModalFooter>
    <Button on:click={() => sendGraphics()}>Show</Button>
    <Button on:click={toggle}>Cancel</Button>
  </ModalFooter>
</Modal>
