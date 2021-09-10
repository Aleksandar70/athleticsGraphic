<script lang="ts">
  import {
    Button,
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    Label,
  } from "sveltestrap";
  import { UIText } from "../../../global/constants/ui_text";
  import { Icon } from "sveltestrap";
  import "./graphicControl.style.css";
  import { Graphics } from "../../../global/constants/constants";
  import { getDataForPreviewModal } from "./graphics.helper";
  import GraphicsModal from "./graphics_modal/GraphicsModal.svelte";

  let displayData = {};
  let action_id: Graphics;

  const action = (id: Graphics) => {
    displayData = getDataForPreviewModal(id);
    action_id = id;
    isModalOpen = true;
  };

  let isModalOpen = false;
</script>

<div class="graphic-controls">
  <Card class="mb-3">
    <CardHeader id="graphic-control--header">
      <CardTitle class="graphic-control--title"
        >{UIText.TV_GRAPHIC_CONTROL} <Icon name="tv" /></CardTitle
      >
      <div class="graphic-clear">
        <Button color="danger">{UIText.CLEAR_SEQUENCE}</Button>
        <Button color="danger">{UIText.CLEAR_ALL}</Button>
      </div>
    </CardHeader>
    <CardBody class="graphic-control--body">
      <div class="graphic-events">
        <Label>Event</Label>
        <Button color="primary">{UIText.EVENTS}</Button>
        <Button color="primary" on:click={() => action(Graphics.ANNOUNCEMENT)}
          >{UIText.EVENT_ANNOUNCEMENT}</Button
        >
        <Button color="primary">{UIText.TIME}</Button>
        <Button color="primary">{UIText.START_TIME}</Button>
        <Button color="primary">{UIText.STOP_TIME}</Button>
        <Button color="primary">{UIText.MEDALS}</Button>
        <Button color="primary">{UIText.RESULTS}</Button>
      </div>
      <div class="graphic-personal">
        <Label>Personal</Label>
        <Button color="primary" on:click={() => action(Graphics.PERSONAL_SCORE)}
          >{UIText.SHOW_PERSONAL_BEST}</Button
        >
        <Button color="primary">{UIText.SHOW_PERSONAL_DATA}</Button>
      </div>
    </CardBody>
  </Card>
</div>
<GraphicsModal id={action_id} bind:isOpen={isModalOpen} data={displayData} />
