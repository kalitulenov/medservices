


"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
//import { Checkbox } from "@/components/ui/checkbox";
import { EditCell } from "@/components/EditCell";
import { SprUsr } from '@/components/types';

import { TableCell } from "@/components/TableCell";

export const columns: ColumnDef<SprUsr>[] = [
    // {
    //   id: "select",
    //   header: ({table})=>{
    //     return <Checkbox
    //               checked={table.getIsAllPageRowsSelected()}
    //               onCheckedChange={(value)=>{table.toggleAllPageRowsSelected(!!value);}}
    //             />
    //   },
    //   cell: ({row}) => {
    //     return <Checkbox
    //             checked={row.getIsSelected()}
    //             onCheckedChange={(value)=>{row.toggleSelected(!!value);}}
    //   />
    //   },
    //   enableSorting: false,
    //   enableHiding: false,
    // },
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
        accessorKey: "id"
    },

    {
      header: "Код",  
      accessorKey: "usrkod",
      cell: TableCell,
      meta: {
        type: 'number',
      },
     },

     {header: 'Клиника',
      accessorKey: "usrorg",
      cell: TableCell,
      meta: {
            type: 'select',
            options: [
              { value: '', label: 'Select' },
              { value: 'РСВЦ', label: 'РСВЦ' },
              { value: 'Кокжайлау', label: 'Кокжайлау' },
              { value: 'Аллергоцентр', label: 'Аллергоцентр' },
              { value: 'Достар Мед', label: 'Достар Мед' },
              { value: 'Сункар', label: 'Сункар' },
              { value: 'Гастроцентр', label: 'Гастроцентр' },
            ],
            required: true,
      },
    },
    {
      header: "Логин",  
      accessorKey: "usrlog",
      cell: TableCell,
      meta: {
        type: 'text',
      },
    },

    {
      header: "Пароль",  
      accessorKey: "usrpsw",
      cell: TableCell,
      meta: {
        type: 'text',
      },
    },

    {
        header: "Тип",  
        accessorKey: "usrtyp",
        cell: TableCell,
        meta: {
          type: 'select',
          options: [
            { value: '', label: 'Select' },
            { value: 'Adm', label: 'Adm' },
            { value: 'Usr', label: 'Usr' },
          ],
          required: true,
        },
    },

    {
      header: "ФИО",  
      accessorKey: "usrfio",
      cell: TableCell,
      meta: {
        type: 'text',
      },
     },

    {
        header: "Телефон",  
        accessorKey: "usrtel",
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


