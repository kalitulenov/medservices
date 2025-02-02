
"use client"

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    ColumnFiltersState,
    useReactTable,
    VisibilityState,
    // getFilteredRowModel,
    // getSortedRowModel,
  } from "@tanstack/react-table";

  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";

import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
//import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { FooterCell } from "@/components/FooterCell";
import { SprUsr } from "@/components/types";
import useUsers from "./actionsUsr";
import { columns } from "./columns";

  // interface DataTableProps<TData, TValue> {
  //   columns: ColumnDef<SprUsr, TValue>[];
  //   data: SprUsr[];
  // }

//export function SprTable<TData, TValue>({data,columns}: DataTableProps<TData, TValue>) {
   
export const SprTable  = () => { 
 
  //const {updateRow, addRow, deleteRow} =  useSprUsr(); 
  const { data: originalData , isValidating, deleteRow, updateRow, addRow} = useUsers();

  const [data, setData] = useState<SprUsr[]>([]);
  // для сортировки. SortingState получаем из таблицы
  const [sorting,setSorting] = useState<SortingState>([])
  // для фильтрации ColumnFiltersState получаем из таблицы
  const [columnFilters,setColumnFilters] = useState<ColumnFiltersState>([])
  // для скрытие колонок. VisibilityState получаем из таблицы
  const [columnVisibility,setColumnVisibility] = useState<VisibilityState>({})
  // для отмеченных строк
  const [rowSelection,setrowSelection] = useState({})

  //const [datainp, setDatainp] = useState(() => [...data]); // для обновления
  // ------------------------------------------------------
  const [editedRows, setEditedRows] = React.useState({});
  const [validRows, setValidRows] = React.useState({});

  //const [isValidating, setIsValidating] = React.useState(true);
  //const isValidating = true;

    const [pagination, setPagination] = useState({
    pageIndex: 0, //не работает
    pageSize: 10,  //работает
    });

  useEffect(() => {
     if (isValidating) return; 
        setData([...originalData]);
  }, [isValidating]);


  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),               // основные табличные функций
    getPaginationRowModel: getPaginationRowModel(),   // для листания
    getSortedRowModel: getSortedRowModel(),           // для сортировки
    getFilteredRowModel: getFilteredRowModel(),       // для фильтраций
    onPaginationChange: setPagination, // update the pagination state when internal APIs mutate the pagination state
    initialState: {
      pagination: {
        pageIndex: 0, // работает
        pageSize: 4, // не работает
      },
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setrowSelection,
    state: {
      sorting, 
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,     //   new
    },
    meta: {
        editedRows,
        setEditedRows,
        validRows,
        setValidRows,
  
        // ---------------------------------------------------------
        revertData: (rowIndex: number) => {
              setData((old) => old.map((row, index) => 
                {
                  if (index === rowIndex) {return {...originalData[rowIndex]}}
                  else {return row} 
                })
              )
          },

        updateRow: (rowIndex: number) => {
          console.log("data-table-updateRow=",rowIndex,data);

          updateRow(data[rowIndex].id, data[rowIndex]);
        },

        updateData: (rowIndex: number, columnId: string, value: string) =>
          {
              console.log("updateData-begin=");
       
              setData((old) =>old.map((row, index) => 
                {
                  if (index === rowIndex) 
                    {
                        return {...old[rowIndex],[columnId]: value,};
                    }
                    return row;
                })
              );
        },

        removeRow: (rowIndex: number) => {
          console.log("removeRow-rowIndex=",rowIndex);
          deleteRow(data[rowIndex].id);
        },
  
        addRow: () => {
          const id = Math.floor(Math.random() * 10000);
          const newRow: SprUsr = {
            id:     id,
            usrkod: id,
            usrorg: "",
            usrlog: "",
            usrpsw: "",
            usrtyp: "",
            usrfio: "Новый пользователь",
            usrtel: ""
          };
          addRow(newRow);
        },
  
      },
    });

  table.initialState.pagination.pageIndex=table.getState().pagination.pageIndex;

  return (
    <div className="w-full">
      {/* ----------   заголовок -------------------------- */}
        <div className="flex">
            {/* для полей фильтраций */}
            <div className="flex items-center py-2 w-full">
                <Input placeholder="Фильтр для ползавтелей"
                      value={table.getColumn("usrfio")?.getFilterValue() as string || ""} 
                      onChange={(e) => {
                          table.getColumn("usrfio")?.setFilterValue(e.target.value);
                      }}
                      className="max-w-sm"
                />
                <h1 className="rounded-md border bg-green-200 text-2xl font-bold text-center w-full">ПОЛЬЗОВАТЕЛИ</h1>
            </div>

            {/* для выпадающей меню className="ml-auto" сдвиг налево до упора*/}
            {/* вызывал ошибку во время рендеринга
            
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant="outline" className="ml-auto">
                  Реквизиты
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table.getAllColumns().filter(column=>column.getCanHide()).map(column=>{
                  return (
                    <DropdownMenuCheckboxItem key={column.id} 
                                              className="capitalize"
                                              checked={column.getIsVisible()}
                                              onCheckedChange={(value: boolean)=>{
                                                                column.toggleVisibility(!!value);
                                                              }}
                      >
                        {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
              </DropdownMenuContent>
            </DropdownMenu> 
            
            */}
        </div>

      {/* таблица */}
      <div className="rounded-md border w-full">
        <Table>
          {/* ----------   заголовок таблицы -------------------------- */}
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? 
            (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) 
            : 
            (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>

          <tfoot>
          <tr>
            <th colSpan={table.getCenterLeafColumns().length} align="right">
              <FooterCell table={table} />
            </th>
          </tr>
        </tfoot>

        </Table>
      </div>
      {/* пагинация */}
      <div className="flex items-center justify-start space-x-2 py-4">
        {/* кнопка для перехода на пред страницу */}
        <Button variant="outline" 
                size="sm" 
                onClick={()=>{table.previousPage();}} 
                disabled={!table.getCanPreviousPage()}  // отключить кнопку если нет предыдущ страницы
        >
          Предыдущий
        </Button>

        {/* кнопка для перехода на след страницу */}
        <Button variant="outline" 
                size="sm" 
                onClick={()=>{table.nextPage();}} 
                disabled={!table.getCanNextPage()}  // отключить кнопку если нет след страницы
        >
          Следующий
        </Button>

      </div>
      {/* показать кол выьранных строк */}
      <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} из {" "}
            {table.getFilteredRowModel().rows.length} строк выбранных
      </div>

    </div>
  );
}
