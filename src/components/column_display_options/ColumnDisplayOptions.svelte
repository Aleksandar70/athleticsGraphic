<script>
  import { hideColumn } from "../data_table/table.helper";

  export let headerData;
  export let rowData;
</script>

<div class="fields-data">
  {#each headerData as field}
    <label>
      <input
        type="checkbox"
        on:change={() => {
          field.show = !field.show;
          rowData = hideColumn(field, rowData);
        }}
        value={field.value}
        checked={field.show}
      />
      {field.value}
    </label>
  {/each}
</div>
