




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
   // VisibilityState,
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

import React, { useState } from 'react'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
//import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
//import { FooterCell } from "./FooterCell";
//import { updateRow } from "./actionsSeek";
import "@/components/table.css";


//import { SprUslSeek } from "@/components/types";

  // interface DataTableProps<TData, TValue> {
  //   columns: ColumnDef<TData, TValue>[];
  //   data: SprUslSeek[];
  // }

  interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
  }

  export function SprTable<TData, TValue>({columns, data,}: DataTableProps<TData, TValue>) {
//export function SprTable<SprUslSeek, TValue>({columns,data}: DataTableProps<SprUslSeek, TValue>) {
 
  // const [dataSpr, setDataSpr] = useState(() => [...data]);
  // const [originalData, setOriginalData] = useState(() => [...data]);
  // для сортировки. SortingState получаем из таблицы
  const [sorting,setSorting] = useState<SortingState>([])
  // для фильтрации ColumnFiltersState получаем из таблицы
  const [columnFilters,setColumnFilters] = useState<ColumnFiltersState>([])
  // для скрытие колонок. VisibilityState получаем из таблицы
  //const [columnVisibility,setColumnVisibility] = useState<VisibilityState>({})
  const [columnVisibility] = useState({
    uslfrmhsp: false, //hide this column by default
    uslfrmidn: false, //hide this column by default
  });
  // для отмеченных строк
  const [rowSelection,setrowSelection] = useState({})

  //const [datainp, setDatainp] = useState(() => [...data]); // для обновления
  // ------------------------------------------------------
  const [editedRows, setEditedRows] = React.useState({});
  //const [validRows, setValidRows] = React.useState({});

 // const [isValidating, setIsValidating] = React.useState(true);

  const [pagination, setPagination] = useState({
    pageIndex: 0, //initial page index
    pageSize: 10, //default page size
    });
  
//   useEffect(() => {
//       console.log("useEffect=",isValidating);
//   //   if (isValidating) return; 
//       setDataSpr([...originalData]);
//       data = [...originalData]
//   }, [isValidating]);

  //console.log("data-table-data=",data);
  //console.log("data-table-dataSpr=",dataSpr);
  //console.log("data-table-originalData=",originalData);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),               // основные табличные функций
    getPaginationRowModel: getPaginationRowModel(),   // для листания
    getSortedRowModel: getSortedRowModel(),           // для сортировки
    getFilteredRowModel: getFilteredRowModel(),       // для фильтраций
    onPaginationChange: setPagination,                //update the pagination state when internal APIs mutate the pagination state

    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    // onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setrowSelection,
      
    state: {
      sorting, 
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
    meta: {
      editedRows,
      setEditedRows,
    },
  });


  return (
    <div className="w-full">
      {/* ----------   заголовок -------------------------- */}
        <div className="flex flex-col">
            {/* для полей фильтраций по тарификатору */}
            <div className="flex items-center w-full ">
                <Input placeholder="Фильтр для услуг"
                      value={table.getColumn("uslnam")?.getFilterValue() as string || ""} 
                      onChange={(e) => {
                          table.getColumn("uslnam")?.setFilterValue(e.target.value);
                      }}
                      className="max-w-sm"
                />
                <h1 className="rounded-md border bg-green-200 text-2xl font-bold text-center w-full">ИЩУ</h1>
            </div>

            {/* для полей фильтраций по наменованию */}
            {/* <div className="flex items-center py-4">
                <Input placeholder="Фильтр по наменованию"
                      value={table.getColumn("uslnam")?.getFilterValue() as string || ""} 
                      onChange={(e) => {
                          table.getColumn("uslnam")?.setFilterValue(e.target.value);
                      }}
                      className="max-w-sm"
                />
            </div> */}

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
