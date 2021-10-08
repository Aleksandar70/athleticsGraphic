<script lang="ts">
  import {
    Button,
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    Label,
    CardFooter,
  } from "sveltestrap";
  import { UIText } from "../../../global/constants/ui_text";
  import { Icon } from "sveltestrap";
  import "./graphicControl.style.css";
  import { EventType, Graphics } from "../../../global/constants/constants";
  import { getDataForPreviewModal } from "./graphics.helper";
  import GraphicsModal from "./graphics_modal/GraphicsModal.svelte";
  import { Alert } from "sveltestrap";
  import { get } from "svelte/store";
  import { selectedParticipant } from "../../stores/table.store";
  import { isHeight } from "../../utils/event.utils";
  import { previewChannel } from "../../stores/preview.store";
  import { clearGraphics, sendGraphicsData } from "../../api/graphics.api";

  let displayData = {};
  let action_id: Graphics;

  let isAlertVisible = false;
  let isModalOpen = false;

  const action = (id: Graphics) => {
    displayData = getDataForPreviewModal(id);
    action_id = id;
    isAlertVisible =
      (id === Graphics.PERSONAL_SCORE || id === Graphics.PERSONAL_DATA) &&
      get(selectedParticipant).length === 0;
    isModalOpen = !isAlertVisible;
    sendPreview(id);
  };

  const sendPreview = (id: String) => {
    if (!isAlertVisible) {
      let type = displayData["Scores"]
        ? isHeight(Object.keys(displayData["Scores"]?.[0])?.[0])
          ? EventType.VERTICAL
          : EventType.HORIZONTAL
        : EventType.RUNNING;
      $previewChannel.postMessage({
        id: id,
        data: displayData,
        type: type,
        modalOpened: isModalOpen,
      });
    }
  };
</script>

<div class="graphic-controls">
  <Card class="mb-3">
    <CardHeader id="graphic-control--header">
      <CardTitle class="graphic-control--title"
        >{UIText.TV_GRAPHIC_CONTROL} <Icon name="tv" /></CardTitle
      >
      <div class="graphic-clear">
        <Button color="danger" on:click={() => clearGraphics()}
          >{UIText.CLEAR_SEQUENCE}</Button
        >
        <Button
          color="danger"
          on:click={() =>
            sendGraphicsData({ id: "", data: {}, type: undefined })}
          >{UIText.CLEAR_ALL}</Button
        >
      </div>
    </CardHeader>
    <CardBody class="graphic-control--body">
      <div class="graphic-events">
        <Label>{UIText.LABEL_EVENT}</Label>
        <Button
          color="primary"
          on:click={() => action(Graphics.EVENT_ANNOUNCEMENT)}
          >{UIText.EVENT_ANNOUNCEMENT}</Button
        >
        <Button
          color="primary"
          on:click={() => action(Graphics.DISCIPLINE_ANNOUNCEMENT)}
          >{UIText.DISCIPLINE_ANNOUNCEMENT}</Button
        >
        <Button color="primary" on:click={() => action(Graphics.START_LIST)}
          >{UIText.START_LIST}</Button
        >
        <Button color="primary" on:click={() => action(Graphics.RESULT_LIST)}
          >{UIText.RESULT_LIST}</Button
        >
        <Button color="primary" on:click={() => action(Graphics.MEDALS)}
          >{UIText.MEDALS}</Button
        >
      </div>
      <div class="graphic-personal">
        <Label>{UIText.LABEL_PERSONAL}</Label>
        <Button color="primary" on:click={() => action(Graphics.PERSONAL_SCORE)}
          >{UIText.SHOW_PERSONAL_SCORE}</Button
        >
        <Button color="primary" on:click={() => action(Graphics.PERSONAL_DATA)}
          >{UIText.SHOW_PERSONAL_DATA}</Button
        >
      </div>
    </CardBody>
    <CardFooter>
      <Button color="primary" on:click={() => action(Graphics.TIME)}
        >{UIText.TIME}</Button
      ></CardFooter
    >
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
