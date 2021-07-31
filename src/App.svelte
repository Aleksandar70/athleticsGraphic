<script lang="ts">
  import DataTable from "./components/data_table/DataTable.svelte";

  const columns = ["Name", "Email", "Phone"];
  let data = [
    {
      name: "Nikola",
      email: "coni@mail.com",
      phone: "1234356789",
    },
    {
      name: "Sasa",
      email: "sasa@mail.com",
      phone: "2123456789",
    },
    {
      name: "Dzic",
      email: "dzic@mail.com",
      phone: "3123456789",
    },
  ];

  $: tableData = data.map((d) => [d.name, d.email, d.phone]);
</script>

<DataTable headers={columns} rows={tableData} />
