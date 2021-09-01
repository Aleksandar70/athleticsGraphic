<script lang="ts">
  import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "sveltestrap";
  import { UIText } from "../../../global/constants/ui_text";
  import { Icon } from "sveltestrap";
  import "./graphicControl.style.css";
</script>

<div class="graphic-controls">
  <Card class="mb-3">
    <CardHeader>
      <CardTitle>{UIText.TV_GRAPHIC} <Icon name="tv" /></CardTitle>
    </CardHeader>
    <CardBody>
      <Button color="primary">{UIText.EVENT_ANNOUNCEMENT}</Button>
      <Button color="primary">{UIText.SHOW_PERSONAL_BEST}</Button>
      <Button color="primary">{UIText.SHOW_PERSONAL_DATA}</Button>
      <div class="graphic-clear">
        <Button color="danger">{UIText.CLEAR_SEQUENCE}</Button>
        <Button color="danger">{UIText.CLEAR_ALL}</Button>
      </div>
    </CardBody>
    <CardFooter />
  </Card>
</div>
