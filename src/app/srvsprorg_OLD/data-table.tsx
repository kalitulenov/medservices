
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
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
//import { columns } from "./columns";
import useSprOrg from "@/components/useSprOrg";
import { SprOrg } from "@/components/types";
//import { string } from "zod";
import { columns } from "./columns";
import { data } from "./data";


  interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
  }
  
  // загрузка меню из БД ---------------------------
async function loader() {
   return data;
  //    try {
  //        const response = await db.sprmnubar.findMany({
  //              where: {typeusr: session.usertype}
  //        });
  //        //console.log("response=",response);
  //        return response;
  //  } catch (error) {
  //    console.error(error);
  //  }
 }
 

//export function SprOrgTable<TData, TValue>({columns,data}: DataTableProps<TData, TValue>) {
 export const SprOrgTable = ()  => {
  // для сортировки. SortingState получаем из таблицы
  const [sorting,setSorting] = useState<SortingState>([])
  // для фильтрации ColumnFiltersState получаем из таблицы
  const [columnFilters,setColumnFilters] = useState<ColumnFiltersState>([])
  // для скрытие колонок. VisibilityState получаем из таблицы
  const [columnVisibility,setColumnVisibility] = useState<VisibilityState>({})
  // для отмеченных строк
  const [rowSelection,setrowSelection] = useState({})

  //console.log("data_table-data=",data);
  //const { data: any } = loader();
   
  const {data} =  loader();


  // ------------------------------------------------------
  const {isValidating, addRow, updateRow, deleteRow } = useSprOrg();

  console.log("data_table-isValidating=",isValidating);
  // console.log("data_table-addRow=",addRow);
  // console.log("data_table-updateRow=",updateRow);
  // console.log("data_table-deleteRow=",deleteRow);

  //const defaultData = [...data];

  //const [data, setData] = useState<SprOrg[]>([]);
  
  //const [dataOrg, setDataOrg] = useState(() => [...data]); // для обновления
  //console.log("data_table-defaultData=",defaultData);

  const [datainp, setDatainp] = useState(() => [...data]); // для обновления
  // ------------------------------------------------------
  const [editedRows, setEditedRows] = React.useState({});
  const [validRows, setValidRows] = React.useState({});

  useEffect(() => {
    console.log("data_table-useEffect=",isValidating);

    if (isValidating) return; 
                   setData([...data]);}, [isValidating]);
                   

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),               // основные табличные функций
    getPaginationRowModel: getPaginationRowModel(),   // для листания
    getSortedRowModel: getSortedRowModel(),           // для сортировки
    getFilteredRowModel: getFilteredRowModel(),       // для фильтраций

    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setrowSelection,
      
    state: {
      sorting, 
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    meta: {
      editedRows,
      setEditedRows,
      validRows,
      setValidRows,
      // отменить обновление
      revertData: (rowIndex: number) => {
        console.log("revertData-rowIndex=",rowIndex);
        console.log("revertData-data=",data);
        console.log("revertData-dataOrg=",data);
        console.log("revertData-data=",data[rowIndex]);
        console.log("revertData-isValidating=",isValidating);

        setData((old) => old.map((row, index) => index === rowIndex ? data[rowIndex] : row));
      },

       //------------  обновить строку ----------------------------------------------------------------
       updateRow: (rowIndex: number) => {updateRow(data[rowIndex].Id, data[rowIndex]);},
     
      // // //--    обновить  ???  --------------------------------------------------------------------------
      // updateData: (rowIndex: number, columnId: string, value: string, isValid: boolean) => 
      //   {
      //     setDataOrg((old) => old.map((row, index) => 
      //       {
      //         if (index === rowIndex) {return {...old[rowIndex],[columnId]: value,};}
      //         return row;
      //       })
      //     );
      //     setValidRows((old) => ({...old,[rowIndex]: { ...old[rowIndex], [columnId]: isValid },}));
      // },
      //------------- добавить запись ---------------------------------------------------------------
      addRow: () => 
        {
        const Id = Math.floor(Math.random() * 10000);
        const newRow: SprOrg = {Id, OrgNam: "",OrgAdr: "", OrgTel: "",OrgDmu: "",};
        addRow(newRow);
      },

      //------------ удалить строку ----------------------------------------------------------------
      removeRow: (rowIndex: number) => {deleteRow(data[rowIndex].Id);},

      //----------------------- удалить выбранные строки -----------------------------------------------------
      removeSelectedRows: (selectedRows: number[]) => 
        {
        selectedRows.forEach((rowIndex) => {deleteRow(data[rowIndex].Id);});
        },

    },
  });

  return (
    <div className="w-full">
      {/* ----------   заголовок -------------------------- */}
        <div className="flex">
            {/* для полей фильтраций */}
            <div className="flex items-center py-4">
                <Input placeholder="Filter hosp name"
                      value={table.getColumn("OrgNam")?.getFilterValue() as string || ""} 
                      onChange={(e) => {
                          table.getColumn("OrgNam")?.setFilterValue(e.target.value);
                      }}
                      className="max-w-sm"
                />
            </div>

            {/* для выпадающей меню className="ml-auto" сдвиг налево до упора*/}
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
          Previous
        </Button>

        {/* кнопка для перехода на след страницу */}
        <Button variant="outline" 
                size="sm" 
                onClick={()=>{table.nextPage();}} 
                disabled={!table.getCanNextPage()}  // отключить кнопку если нет след страницы
        >
          Next
        </Button>

      </div>
      {/* показать кол выьранных строк */}
      <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of {" "}
            {table.getFilteredRowModel().rows.length} row(s) selected
      </div>

    </div>
  );
}
