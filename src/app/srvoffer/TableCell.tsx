




import { useState, useEffect, ChangeEvent } from "react";
import "./table.css";
import { Checkbox } from "@/components/ui/checkbox";

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
    console.log("TableCell-value=",value);
   
    useEffect(() => {setValue(initialValue)}, [initialValue])

    // const onCheckedChange = () => {
    //   const offer = row.original;
    //   var offerflg = offer.uslfrmflg;
    //   offerflg=!offerflg;
    //   console.log("TableCell-onCheckedChange2=",offerflg);
    //   return <Checkbox checked={offerflg}
    //     />
    // }

    const onBlur = () => {
      console.log("TableCell-onBlur=",row.index, column.id, value);
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

    if (tableMeta?.editedRows[row.id]) 
      {
        switch (columnMeta?.type)
        {
              case "select":
                return <select
                    onChange={onSelectChange}
                    value={initialValue}
                    required={columnMeta?.required}
                    title={validationMessage}
                  >
                    {columnMeta?.options?.map((option: Option) => 
                      (<option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                      )
                    )}
                 </select>
              case "boolean":
                // const offer = row.original.uslfrmflg;
                // var offerflg = offer.uslfrmflg;
                // console.log("TableCell-onCheckedChange1=",offerflg);
               // return <Checkbox checked={offerflg} onCheckedChange={onCheckedChange}
                // return <Checkbox checked={offerflg}
                //                   onCheckedChange={()=>{
                //                     offerflg=!offerflg;
                //                     setValue(offerflg);
                //                     console.log("TableCell-onCheckedChange=",offerflg);
                //                   }}
                // />

         
                return <input type="checkbox" 
                              checked={row.original.uslfrmflg}
                              onBlur={onBlur}
                              onChange={()=>
                                {row.original.uslfrmflg=!row.original.uslfrmflg;
                                  setValue(row.original.uslfrmflg);
                                 console.log("TableCell-onCheckedChange2=",!row.original.uslfrmflg);}} 
                                 />
              default: 
                  return <input
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      onBlur={onBlur}
                      type={columnMeta?.type || "text"}
                      required={columnMeta?.required}
                      pattern={columnMeta?.pattern}
                      title={validationMessage}
                    />
              
    }}
     else 
        {
          //console.log("TableCell-columnMeta?.type=",columnMeta?.type);
          if (columnMeta?.type === "boolean") {
            const offer = row.original;
          // console.log("TableCell-offer=",offer);

            const offerflg = offer.uslfrmflg;
            //console.log("TableCell-offerflg=",offerflg);
            return <Checkbox checked={offerflg}  
          //    onCheckedChange={onCheckedChange}

            />}
        }

    return <span>{value}</span>
  }