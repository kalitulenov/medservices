
// import { Button } from '@/components/ui/button';
// import { Row, Table } from '@tanstack/react-table';
// import React, { useState } from 'react';
import { MouseEvent } from "react";


// interface DataTableRowActionsProps<TData> {
//   row: Row<TData>;
//   table: Table<TData>;
// }


//export const EditCell = <TData,>({ row, table }: DataTableRowActionsProps<TData>) => {
   export const EditCell = ({ row, table }) => {
         const meta = table.options.meta;
         const validRow = meta?.validRows[row.id];
         //const editedRows = meta?.editedRows[row.id];
         //const selectRow = table.rowSelection;

         const disableSubmit = validRow ? Object.values(validRow)?.some(item => !item) : false;
                         
         console.log("EditCell-row=",row);
         console.log("EditCell-table=",table);
         console.log("EditCell-meta=",meta);
         console.log("EditCell-validRow=",validRow);
         console.log("EditCell-meta?.editedRows[row.id]=",meta?.editedRows[row.id]);
         console.log("EditCell-disableSubmit=",disableSubmit);
       
         const setEditedRows = (e: MouseEvent<HTMLButtonElement>)=> {
                const elName = e.currentTarget.name;
                console.log("elName=",elName);
                meta?.setEditedRows((old: []) => ({...old,[row.id]: !old[row.id],}));

                console.log("meta?.setEditedRows=",meta?.setEditedRows);
                
                if (elName !== "edit") {
                  e.currentTarget.name === "cancel" ? 
                                            meta?.revertData(row.index) 
                                            : 
                                            meta?.updateRow(row.index);
                }
            };

          const removeRow = () => {
            console.log("removeRow=",row.index);
            meta?.removeRow(row.index);
          };

         // console.log("editedRows2=",editedRows);

          return (
            <div className="edit-cell-container">
            {/* // <div className="flex rounded-3xl w-8 h-8 gap-4 border-4 items-center">  */}
                {meta?.editedRows[row.id] ? (
                  <div className="edit-cell">
                      <button onClick={setEditedRows} name="cancel">
                        ⚊
                      </button>{" "}
                      <button onClick={setEditedRows} name="done" disabled={disableSubmit}>
                        ✔
                      </button>
                  </div>
                ) : (
                  <div className="edit-cell">
                      <button onClick={setEditedRows} name="edit">
                        ✐
                      </button>
                      <button onClick={removeRow} name="remove">
                        X
                      </button>
                  </div>
                )}
           </div>
            // <div >
            //   {meta?.editedRows[row.id] ? (
            //             <div className='flex gap-2 '>
            //                 <button onClick={setEditedRows}  className="btn bg-blue-300 rounded-full  hover:bg-gray-300 text-4xl" name="cancel">⚊</button>
            //                 <Button onClick={setEditedRows} className="btn bg-blue-300 rounded-full " name="done"> ✔ </Button>
            //             </div>
            //           ) 
            //           : 
            //           (
            //             <div className='flex gap-2'>
            //                 <button onClick={setEditedRows}  className="btn bg-blue-300 rounded-full  hover:bg-gray-300 text-3xl" name="edit">✐</button>

            //                 <Button onClick={removeRow} className="btn bg-red-300 rounded-full hover:bg-gray-300 " name="delete"> X </Button>
            //             </div>
            //         )
            //           }
            // </div>
          );
        }


