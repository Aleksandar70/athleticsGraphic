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
  import { clearChannel, streamChannel } from "../../stores/stream.store";
  import { Alert } from "sveltestrap";
  import { get } from "svelte/store";
  import { selectedParticipant } from "../../stores/table.store";

  let displayData = {};
  let action_id: Graphics;

  let isAlertVisible = false;
  let isModalOpen = false;

  const action = (id: Graphics) => {
    displayData = getDataForPreviewModal(id);
    action_id = id;
    isAlertVisible =
      id === Graphics.PERSONAL_SCORE && !get(selectedParticipant);
    isModalOpen = !isAlertVisible;
  };
</script>

<div class="graphic-controls">
  <Card class="mb-3">
    <CardHeader id="graphic-control--header">
      <CardTitle class="graphic-control--title"
        >{UIText.TV_GRAPHIC_CONTROL} <Icon name="tv" /></CardTitle
      >
      <div class="graphic-clear">
        <Button color="danger" on:click={() => $clearChannel.postMessage(true)}
          >{UIText.CLEAR_SEQUENCE}</Button
        >
        <Button
          color="danger"
          on:click={() =>
            $streamChannel.postMessage({ id: "", data: {}, type: undefined })}
          >{UIText.CLEAR_ALL}</Button
        >
      </div>
    </CardHeader>
    <CardBody class="graphic-control--body">
      <div class="graphic-events">
        <Label>Event</Label>
        <Button color="primary">{UIText.EVENTS}</Button>
        <Button
          color="primary"
          on:click={() => action(Graphics.EVENT_ANNOUNCEMENT)}
          >{UIText.EVENT_ANNOUNCEMENT}</Button
        >
        <Button color="primary" on:click={() => action(Graphics.START_LIST)}
          >{UIText.START_LIST}</Button
        >
        <Button color="primary" on:click={() => action(Graphics.RESULT_LIST)}
          >{UIText.RESULT_LIST}</Button
        >
        <Button
          color="primary"
          on:click={() => action(Graphics.DISCIPLINE_ANNOUNCEMENT)}
          >{UIText.DISCIPLINE_ANNOUNCEMENT}</Button
        >
        <Button color="primary" on:click={() => action(Graphics.TIME)}
          >{UIText.TIME}</Button
        >
        <Button color="primary">{UIText.START_TIME}</Button>
        <Button color="primary">{UIText.STOP_TIME}</Button>
        <Button color="primary">{UIText.MEDALS}</Button>
      </div>
      <div class="graphic-personal">
        <Label>Personal</Label>
        <Button color="primary" on:click={() => action(Graphics.PERSONAL_SCORE)}
          >{UIText.SHOW_PERSONAL_SCORE}</Button
        >
        <Button color="primary">{UIText.SHOW_PERSONAL_DATA}</Button>
      </div>
    </CardBody>
  </Card>
  <Alert
    class="graphic-control-alert"
    bind:isOpen={isAlertVisible}
    color="info"
    fade={isAlertVisible}
    dismissible
  >
    {UIText.PERSONAL_SCORE_ALERT_TEXT}
  </Alert>
</div>
<GraphicsModal id={action_id} bind:isOpen={isModalOpen} data={displayData} />
