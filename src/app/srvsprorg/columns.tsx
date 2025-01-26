

"use client";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { SprOrg } from './types';

import { EditCell } from "@/components/EditCell";
import { TableCell } from "@/components/TableCell";

import { useEffect, useState } from "react";

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
        accessorKey: "id"
    },
    {
        header: "Клиника",  
        accessorKey: "orgnam",
        cell: TableCell,
        meta: {
          type: 'text',
        },
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
        accessorKey: "orgadr",
        cell: TableCell,
        meta: {
          type: 'text',
        },
    },
    {
        header: "Телефон",  
        accessorKey: "orgtel",
        cell: TableCell,
        meta: {
          type: 'text',
        },
    },
    {
        header: "Даму",  
        accessorKey: "orgdmu",
        cell: TableCell,
        meta: {
          type: 'select',
          options: [
            { value: '', label: 'Select' },
            { value: 'да', label: 'да' },
            { value: 'нет', label: 'нет' },
          ],
          required: true,
        },
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


