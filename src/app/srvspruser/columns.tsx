


"use client";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { EditCell } from "./EditCell";
import { SprUsr } from './types';

import { TableCell } from "./TableCell";

import { useEffect, useState } from "react";

export const columns: ColumnDef<SprUsr>[] = [
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
                    Код
                    <ArrowUpDown className="ml-2 h-4 w-4"></ArrowUpDown>
                  </Button>
                )
        },
        accessorKey: "Id"
    },

    {
      header: "Код",  
      accessorKey: "UsrKod",
      cell: TableCell,
      meta: {
        type: 'number',
      },
     },

     {header: 'Клиника',
      accessorKey: "UsrOrg",
      cell: TableCell,
      meta: {
            type: 'select',
            options: [
              { value: '', label: 'Select' },
              { value: 'Алматы', label: 'Алматы' },
              { value: 'Астана', label: 'Астана' },
              { value: 'Тараз', label: 'Тараз' },
              { value: 'Шымкент', label: 'Шымкент' },
            ],
            required: true,
      },
    },

    {
      header: "Логин",  
      accessorKey: "UsrLog",
      cell: TableCell,
      meta: {
        type: 'text',
      },
    },

    {
      header: "Пароль",  
      accessorKey: "UsrPsw",
      cell: TableCell,
      meta: {
        type: 'text',
      },
    },

    {
        header: "Тип",  
        accessorKey: "UsrTyp",
        cell: TableCell,
        meta: {
          type: 'text',
        },
    },

    {
      header: "ФИО",  
      accessorKey: "UsrFio",
      cell: TableCell,
      meta: {
        type: 'text',
      },
     },

    {
        header: "Телефон",  
        accessorKey: "UsrTel",
        cell: TableCell,
        meta: {
          type: 'text',
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


