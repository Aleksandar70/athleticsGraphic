import type { TableData } from "../../../global/types";

export const search = (
  searchValue: string,
  searchKey: string,
  tableData: TableData
): TableData => {
  return tableData.filter((row) =>
    (
      row.find(
        (field) =>
          (field.id as string).toLowerCase() === searchKey.toLowerCase()
      ).value as string
    )
      .toLowerCase()
      .includes(searchValue.toLowerCase())
  );
};
