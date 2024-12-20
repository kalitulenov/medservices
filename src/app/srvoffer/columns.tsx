

"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { SprUsl } from './types';

import { useEffect, useState } from "react";

export const columns: ColumnDef<SprUsl>[] = [
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
                Тарификатор
                    <ArrowUpDown className="ml-2 h-4 w-4"></ArrowUpDown>
                  </Button>
                )
        },
        accessorKey: "UslTrf"
    },

    // {
    //     header: "Тарификатор",  
    //     accessorKey: "UslTrf"
    // },

    {
        header: "Услуга",  
        accessorKey: "UslNam"
    },
    {
        header: "Ед.изм",  
        accessorKey: "UslEdn"
    },
    {
        header: "Цена",  
        accessorKey: "UslZen"
    }
]


