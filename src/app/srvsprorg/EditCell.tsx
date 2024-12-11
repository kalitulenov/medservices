
import { MouseEvent } from "react";

export const EditCell = ({ row, table }) => {
    const meta = table.options.meta
    const setEditedRows = (e: MouseEvent<HTMLButtonElement>) => {
      const elName = e.currentTarget.name
      meta?.setEditedRows((old: []) => ({...old,[row.id]: !old[row.id],}))

      console.log("EditCell-elName=",elName);

      // отмена изменения
      if (elName === "cancel") {meta?.revertData(row.index)}

      // записать изменения в БД
      if (elName === "done") {meta?.updateRow(row.index)}
    }

    // удаление записи из БД
    const removeRow = () => {
      meta?.removeRow(row.index);
    };

    return (
        <div className="edit-cell-container">
        {/* // <div className="flex rounded-3xl w-8 h-8 gap-4 border-4 items-center">  */}
            {meta?.editedRows[row.id] ? (
              <div className="edit-cell">
                  <button onClick={setEditedRows} name="cancel">
                    ⚊
                  </button>{" "}
                  <button onClick={setEditedRows} name="done" >
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
    )

    // TAILWIND
    // return (
    //             <div >
    //           {meta?.editedRows[row.id] ? (
    //                     <div className='flex gap-2 '>
    //                         <button onClick={setEditedRows}  className="btn bg-blue-300 rounded-full  hover:bg-gray-300 text-4xl" name="cancel">⚊</button>
    //                         <button onClick={setEditedRows} className="btn bg-blue-300 rounded-full " name="done"> ✔ </button>
    //                     </div>
    //                   ) 
    //                   : 
    //                   (
    //                     <div className='flex gap-2'>
    //                         <button onClick={setEditedRows}  className="btn bg-blue-300 rounded-full  hover:bg-gray-300 text-3xl" name="edit">✐</button>

    //                         <button onClick={setEditedRows} className="btn bg-red-300 rounded-full hover:bg-gray-300 " name="delete"> X </button>
    //                     </div>
    //                 )
    //                   }
    //         </div>
    // )


    // ОРИГИНАЛ
    // return meta?.editedRows[row.id] ? (
    //     <>
    //       <button onClick={setEditedRows} name="cancel">
    //         X
    //       </button>{" "}
    //       <button onClick={setEditedRows} name="done">
    //         ✔
    //       </button>
    //     </>
    //   ) : (
    //     <button onClick={setEditedRows} name="edit">
    //       ✐
    //     </button>
    //   )





  }