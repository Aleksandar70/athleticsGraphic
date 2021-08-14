import type { ITableField, ITableHeader } from "./interfaces";

export type HeaderField = ITableHeader;
export type Headers = HeaderField[];

export type TableField = ITableField;
export type TableRow = TableField[];
export type TableData = TableRow[];

export type RawData = Record<string, unknown>[];
