<script lang="ts">
  const columns = ["Name", "Email", "Phone Number"];
  let data = [
    {
      name: "Nikola",
      email: "coni@mail.com",
      phone: "123456789",
    },
    {
      name: "Sasa",
      email: "sasa@mail.com",
      phone: "123456789",
    },
    {
      name: "Dzic",
      email: "dzic@mail.com",
      phone: "123456789",
    },
  ];

  let vals = [];

  data.forEach((obj) => {
    vals.push(Object.values(obj));
  });

  const logit = () => console.log(vals);

  console.log(vals);

  function deleteRow(rowToBeDeleted) {
    data = data.filter((row) => row != rowToBeDeleted);
  }
</script>

<table class="result-data">
  <tr>
    {#each columns as column}
      <th>{column}</th>
    {/each}
  </tr>
  {#each vals as row}
    <tr>
      {#each row as value}
        <td contenteditable="true" bind:innerHTML={value} />
      {/each}
    </tr>
  {/each}
</table>

<style lang="scss">
  $table-breakpoint: 480px;
  $table-background-color: #fff;
  $table-text-color: #024457;
  $table-outer-border: 1px solid #167f92;
  $table-cell-border: 1px solid #d9e4e6;

  $table-border-radius: 10px;
  $table-focus-color: #c0fcf6;
  $table-highlight-color: #eaf3f3;
  $table-header-background-color: #167f92;
  $table-header-text-color: #fff;
  $table-header-border: 1px solid #fff;

  @mixin result-data(
    $breakpoint: $table-breakpoint,
    $background-color: $table-background-color,
    $text-color: $table-text-color,
    $outer-border: $table-outer-border,
    $cell-border: $table-cell-border,
    $border-radius: none,
    $highlight-color: none,
    $header-background-color: $table-background-color,
    $header-text-color: $table-text-color,
    $header-border: $table-cell-border
  ) {
    .result-data {
      margin: 1em 0;
      max-width: 100%;
      white-space: nowrap;
      overflow: hidden;
      background: $background-color;
      color: $text-color;
      border-radius: $border-radius;
      border: $outer-border;

      tr {
        border: $cell-border;

        &:nth-child(odd) {
          background-color: $highlight-color;
        }
      }

      th {
        display: none;
        border: $header-border;
        background-color: $header-background-color;
        color: $header-text-color;
        padding: 1em;

        &:first-child {
          display: table-cell;
          text-align: center;
        }

        &:nth-child(2) {
          display: table-cell;

          &:after {
            content: attr(data-th);
          }
        }

        @media (min-width: $breakpoint) {
          &:nth-child(2) {
            &:after {
              display: none;
            }
          }
        }
      }

      td {
        display: block;
        word-wrap: break-word;

        &:focus {
          background: $table-focus-color;
        }

        &:first-child {
          display: table-cell;
          text-align: center;
          border-right: $cell-border;
        }

        @media (min-width: $breakpoint) {
          border: $cell-border;
        }
      }

      th,
      td {
        text-align: left;
        margin: 0.5em 1em;

        @media (min-width: $breakpoint) {
          display: table-cell;
          padding: 1em;
        }
      }
    }
  }

  @include result-data(
    $border-radius: $table-border-radius,
    $highlight-color: $table-highlight-color,
    $header-background-color: $table-header-background-color,
    $header-text-color: $table-header-text-color,
    $header-border: $table-header-border
  );
</style>
