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
  import type { Graphics } from "../../../../global/constants/constants";
  import { streamChannel } from "../../../stores/stream.store";

  export let isOpen: boolean;
  export let id: Graphics;
  export let data: Record<string, string | number> = {};

  const toggle = () => (isOpen = !isOpen);

  const sendGraphics = () => {
    $streamChannel.postMessage({ id: id, data: data });
    toggle();
  };

  const inputChange = (target: EventTarget, name: string) => {
    data[name] = (target as HTMLInputElement).value;
  };
</script>

<Modal {isOpen} {toggle}>
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
          <Input
            type="text"
            bind:value
            on:change={(event) => inputChange(event.target, name)}
          />
        </FormGroup>
      {/each}
    </Form>
  </ModalBody>
  <ModalFooter>
    <Button on:click={() => sendGraphics()}>Show</Button>
    <Button on:click={toggle}>Cancel</Button>
  </ModalFooter>
</Modal>
