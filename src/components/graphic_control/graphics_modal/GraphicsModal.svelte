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

  export let isOpen: boolean;
  export let id: Graphics;
  export let data: Record<string, any> = {};

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
    if (name === "Scores" || name === "Competitors") {
      _data[name][idx][metric] = (target as HTMLInputElement).value;
      return;
    }
    _data[name] = (target as HTMLInputElement).value;
  };
</script>

<Modal {isOpen} {toggle} scrollable>
  <ModalBody>
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
            {#each value as competitor, i}
              <div class="score">
                <img
                  alt={competitor.nationality}
                  src="/img/flags/{competitor.nationality}.png"
                />
                <Input
                  class="score-metric"
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
  </ModalBody>
  <ModalFooter>
    <Button on:click={() => sendGraphics()}>Show</Button>
    <Button on:click={toggle}>Cancel</Button>
  </ModalFooter>
</Modal>

<style>
  .score {
    display: flex;
    margin-bottom: 10px;
  }

  .score-metric {
    margin-right: 15px;
  }
</style>
