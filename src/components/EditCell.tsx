
import { MouseEvent } from "react";

export const EditCell = ({ row, table }) => {
    const meta = table.options.meta
    const setEditedRows = (e: MouseEvent<HTMLButtonElement>) => {
      const elName = e.currentTarget.name

      meta?.setEditedRows((old: []) => ({...old,[row.id]: !old[row.id],}))
      // отмена изменения
      if (elName === "cancel") {meta?.revertData(row.index)}

      // записать изменения в БД
      if (elName === "done") {meta?.updateRow(row.index)}
    }

    // удаление записи из БД
    const removeRow = () => {
    //  console.log("EditCell-removeRow=");
      meta?.removeRow(row.index);
    };

    return (
        <div className="edit-cell-container">
        {/* // <div className="flex rounded-3xl w-8 h-8 gap-4 border-4 items-center">  */}
            {meta?.editedRows[row.id] ? (
              <div className="edit-cell-action">
                  <button onClick={setEditedRows} name="cancel">
                    ⚊
                  </button>{" "}
                  <button onClick={setEditedRows} name="done" >
                    ✔
                  </button>
              </div>
            ) : (
              <div className="edit-cell-action">
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

  }