
import { useEffect, useState, ChangeEvent } from "react";
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
    const [validationMessage, setValidationMessage] = useState("");

    // console.log("TableCell-tableMeta=",tableMeta);
    // console.log("TableCell-columnMeta=",columnMeta);
 
    useEffect(() => {setValue(initialValue)}, [initialValue])

    const onBlur = (e: ChangeEvent<HTMLInputElement>) => {
      // console.log("TableCell-rowIndex=",row.index, column.id, value);
      displayValidationMessage(e);
      tableMeta?.updateData(row.index, column.id, value)
    }
    
    const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
      displayValidationMessage(e);
      setValue(e.target.value);
      console.log("TableCell-onSelectChange=",row.index, column.id, e.target.value, e.target.validity.valid);
      tableMeta?.updateData(row.index, column.id, e.target.value, e.target.validity.valid);
    };

    const displayValidationMessage = <T extends HTMLInputElement | HTMLSelectElement>(e: ChangeEvent<T>) =>{
      if (columnMeta?.validate) {
        const isValid = columnMeta.validate(e.target.value);
        if (isValid) {
          e.target.setCustomValidity("");
          setValidationMessage("");
        } else {
          e.target.setCustomValidity(columnMeta.validationMessage);
          setValidationMessage(columnMeta.validationMessage);
        }
      } else if (e.target.validity.valid) {setValidationMessage("");} 
             else {setValidationMessage(e.target.validationMessage);}
    };

    if (tableMeta?.editedRows[row.id]) {
      return columnMeta?.type === "select" ? (
        <select
        onChange={onSelectChange}
        value={initialValue}
        required={columnMeta?.required}
        title={validationMessage}
      >
        {columnMeta?.options?.map((option: Option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      ) : (
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={onBlur}
          type={columnMeta?.type || "text"}
          required={columnMeta?.required}
          pattern={columnMeta?.pattern}
          title={validationMessage}
        />
      );
    }
    
    return <span>{value}</span>
  }