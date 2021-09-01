<script ang="ts">
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
</script>

<Card class="mb-3">
  <CardHeader>
    <CardTitle>{UIText.TV_GRAPHIC} <Icon name="tv" /></CardTitle>
  </CardHeader>
  <CardBody>
    <Button>{UIText.EVENT_ANNOUNCEMENT}</Button>
    <Button>{UIText.SHOW_PERSONAL_BEST}</Button>
    <Button>{UIText.SHOW_PERSONAL_DATA}</Button>
    <Button>{UIText.CLEAR_SEQUENCE}</Button>
    <Button>{UIText.CLEAR_ALL}</Button>
  </CardBody>
  <CardFooter
    ><Button>{UIText.SEND}</Button>
    <Button>{UIText.CANCEL}</Button>
  </CardFooter>
</Card>
