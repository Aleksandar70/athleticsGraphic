<script lang="ts">
  import {
    Button,
    Card,
    CardBody,
    CardFooter,
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
    <CardHeader>
      <CardTitle>{UIText.TV_GRAPHIC_CONTROL} <Icon name="tv" /></CardTitle>
    </CardHeader>
    <CardBody>
        <Label>Event</Label>
      <div class="graphic-events">
        <Button color="primary">{UIText.EVENTS}</Button>
        <Button color="primary">{UIText.EVENT_ANNOUNCEMENT}</Button>
      </div>
      <div class="graphic-personal">
        <Button color="primary">{UIText.SHOW_PERSONAL_BEST}</Button>
        <Button color="primary">{UIText.SHOW_PERSONAL_DATA}</Button>
        <Button color="primary">{UIText.MEDALS}</Button>
        <Button color="primary">{UIText.RESULTS}</Button>
      </div>
      <Label>Time</Label>
      <div class="graphic-time">
        <Button color="primary">{UIText.TIME}</Button>
        <Button color="primary">{UIText.START_TIME}</Button>
        <Button color="primary">{UIText.STOP_TIME}</Button>
      </div>
      <Label>Clear</Label>
      <div class="graphic-clear">
        <Button color="danger">{UIText.CLEAR_SEQUENCE}</Button>
        <Button color="danger">{UIText.CLEAR_ALL}</Button>
      </div>
    </CardBody>
    <CardFooter />
  </Card>
</div>
