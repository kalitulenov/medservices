

"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
//import { Checkbox } from "@/components/ui/checkbox";
import { SprOrg } from '@/components/types';

import { EditCell } from "@/components/EditCell";
import { TableCell } from "@/components/TableCell";

export const columns: ColumnDef<SprOrg>[] = [
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
        header: "Edit",  
        cell: EditCell,
      }

]


