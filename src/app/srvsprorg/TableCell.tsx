
import { useEffect, useState } from "react";
import "./table.css";

type Option = {
    label: string;
    value: string;
  };
  
  export const TableCell = ({ getValue, row, column, table }) => {
    const initialValue = getValue()
    const columnMeta = column.columnDef.meta
    const tableMeta = table.options.meta
    const [value, setValue] = useState(initialValue)

    // console.log("TableCell-tableMeta=",tableMeta);
    // console.log("TableCell-columnMeta=",columnMeta);
 
    useEffect(() => {setValue(initialValue)}, [initialValue])

    const onBlur = () => {
      // console.log("TableCell-rowIndex=",row.index, column.id, value);
      tableMeta?.updateData(row.index, column.id, value)}
    //  удалил ветку для (columnMeta?.type===select)
    // const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    //   setValue(e.target.value)
    //   tableMeta?.updateData(row.index, column.id, e.target.value)
    // }

    if (tableMeta?.editedRows[row.id]) {
      return (
        <input
          value={value}
          onChange={e => setValue(e.target.value)}
          onBlur={onBlur}
          type={columnMeta?.type || "text"}
        />)
      
    }
    return <span>{value}</span>
  }