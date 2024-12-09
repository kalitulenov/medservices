"use client";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
//import SprOrg from "./page";
import { Checkbox } from "@/components/ui/checkbox";
import { EditCell } from "@/components/EditCell";
import { SprOrg } from '@/components/types';

import { TableCell } from "@/components/TableCell";

import { useEffect, useState } from "react";

// export type SprOrg = {
//     Id:         number
//     OrgNam:     string
//     OrgAdr:     string
//     OrgTel:     string
//     OrgDmu:     string
// }


export const columns: ColumnDef<SprOrg>[] = [
    {
      id: "select",
      header: ({table})=>{
        return <Checkbox
                  checked={table.getIsAllPageRowsSelected()}
                  onCheckedChange={(value)=>{table.toggleAllPageRowsSelected(!!value);}}
                />
      },
      cell: ({row}) => {
        return <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value)=>{row.toggleSelected(!!value);}}
      />
      },
      enableSorting: false,
      enableHiding: false,
    },
    {
        // header: "ID",  
        // для сортировки столбца
        header: ({column}) => {
                return (
                  <Button variant="ghost" onClick={()=>{
                        column.toggleSorting(column.getIsSorted()==="asc");
                  }}>
                    Код Клиник
                    <ArrowUpDown className="ml-2 h-4 w-4"></ArrowUpDown>
                  </Button>
                )
        },
        accessorKey: "Id"
    },
    {
        header: "Клиника",  
        accessorKey: "OrgNam",
        cell: TableCell,
      //   cell: ({ row }) => {
      //     const value = row.getValue("OrgNam");
      //     const [valuenew, setValue] = useState(value)
      //     return <input value={valuenew as string} 
      //     onFocus={e => (e.target.style.background = "pink")}
      //     onBlur={e => (e.target.style.background = "white")}
      //     onChange={e => setValue(e.target.value)} />
      //  },
      //  cell:({ row, table}) => TableCell({ row, table })
    },
    {
        header: "Адрес",  
        accessorKey: "OrgAdr",
        cell: TableCell,
    },
    {
        header: "Телефон",  
        accessorKey: "OrgTel",
        cell: TableCell,
    },
    {
        header: "Даму",  
        accessorKey: "OrgDmu",
        cell: TableCell,
    },
    {
        id: "actions",
        cell: ({ row}: any) => {
          const hospital = row.original;
          const hospitalId = hospital.Id;
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-8 h-8 p-0">
                  <MoreHorizontal className="w-4 h-4"></MoreHorizontal>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => {
                    navigator.clipboard.writeText(hospitalId.toString());  //копирование на буфер
                  }}
                >
                  Copy person name
                </DropdownMenuItem>

                <DropdownMenuItem >Edit</DropdownMenuItem>
                <DropdownMenuSeparator />
                 <DropdownMenuItem >Delete</DropdownMenuItem>

              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
      {
        header: "Edit",  
        //cell: ({ row, table }) => EditCell({ row, table })
        cell: EditCell,
      }
     
    // {
    //     header: "Data of Birth",
    //     accessorKey: "date_of_birth",
    //     // костамизация ячейки (для этого страница д.б use client)
    //     cell: ({ row }) => {
    //       const date_of_birth = row.getValue("date_of_birth");
    //       const formatted = new Date(date_of_birth as string).toLocaleDateString();
    //       return <div className="font-medium">{formatted}</div>;
    //     },
    //   },

]


{/* <DropdownMenuItem onClick={() => onEdit(row.original)}>Edit</DropdownMenuItem>
<DropdownMenuSeparator />
 <DropdownMenuItem onClick={() => onDelete(row.original)}>Delete</DropdownMenuItem> */}




// import { Button } from "@/components/ui/button";
// //import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
// import { ColumnDef, createColumnHelper, RowData } from "@tanstack/react-table";
// import { ArrowUpDown, MoreHorizontal } from "lucide-react";
// import SprOrg from "./page";
// import { Checkbox } from "@/components/ui/checkbox";
// //import { useEffect, useState } from "react";
// import { EditCell } from "@/components/EditCell";
// import { TableCell } from "@/components/TableCell";
// //import { table } from "console";


// export type SprOrg = {
//   Id:         number
//   OrgNam:     string
//   OrgAdr:     string
//   OrgTel:     string
//   OrgDmu:     string
// }

// interface DataTableProps<TData, TValue> {
//   columns: ColumnDef<TData, TValue>[];
//   data: TData[];
// }

// const columnHelper = createColumnHelper<SprOrg>()

// //export const columns: ColumnDef<SprOrg>[] = [
//  // export const columns: ColumnDef<SprOrg>[] = [
// export const columns = [
//   columnHelper.accessor('Id', {
//     header: "select",
//     cell: TableCell,
//     meta: {
//       type: 'number',
//     },
//     enableSorting: false,
//     enableHiding: false,
//   }),
//   columnHelper.accessor('Id', {
//     header: 'Full Name',
//     cell: TableCell,
//     meta: {
//       type: 'number',
//     },
//   }),
//     columnHelper.accessor('OrgNam', {
//     header: 'Клиника',
//     cell: TableCell,
//     meta: {
//       type: 'text',
//       required: true,
//       pattern: '^[a-zA-Z ]+$',
//     },
//   }),
//   columnHelper.accessor('OrgAdr', {
//     header: 'Адрес',
//     cell: TableCell,
//     meta: {
//       type: 'text',
//       required: true,
//       pattern: '^[a-zA-Z ]+$',
//     },
//   }),
  
//   columnHelper.accessor('OrgTel', {
//     header: 'Телефон',
//     cell: TableCell,
//     meta: {
//       type: 'number',
//     },
//   }),
//   columnHelper.accessor('OrgDmu', {
//     header: 'Даму',
//     cell: TableCell,
//     meta: {
//       type: 'text',
//       required: true,
//       pattern: '^[a-zA-Z ]+$',
//     },
//   }),
//   // columnHelper.display({
//   //   id: 'Id',
//   //   cell: EditCell,
//   // }),
// ]
