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
        <Button
          color="primary"
          on:click={() => window.open("/stream", "_blank")}
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
        <Button color="primary">{UIText.SHOW_PERSONAL_BEST}</Button>
        <Button color="primary">{UIText.SHOW_PERSONAL_DATA}</Button>
      </div>
    </CardBody>
  </Card>
</div>
