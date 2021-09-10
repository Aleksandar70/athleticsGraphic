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

  export let isOpen: boolean;
  export let id: Graphics;
  export let data = {};

  const toggle = () => (isOpen = !isOpen);

  const sendGraphics = () => {
    const channel = new BroadcastChannel("graphics");
    channel.postMessage({ id: id, data: data });
  };
</script>

<Modal {isOpen} {toggle}>
  <ModalBody>
    <Form>
      {#each Object.entries(data) as [name, value]}
        <FormGroup>
          <Label for={name}>{name}</Label>
          <Input type="text" value={value?.toString()} />
        </FormGroup>
      {/each}
    </Form>
  </ModalBody>
  <ModalFooter>
    <Button on:click={() => sendGraphics()}>Show</Button>
    <Button on:click={toggle}>Cancel</Button>
  </ModalFooter>
</Modal>
