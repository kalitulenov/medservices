

"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
//import { Checkbox } from "@/components/ui/checkbox";
import { SprUslFrm } from '@/components/types';
import { EditCell } from "@/components/EditCell";
import { TableCell } from "@/components/TableCell";
import { Checkbox } from "@/components/ui/checkbox";
import React, { useEffect, useState } from 'react'

export const columns: ColumnDef<SprUslFrm>[] = [
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
        accessorKey: "uslfrmtrf"
    },
    {
      header: "КодКлиники",  
      accessorKey: "uslfrmhsp",
    },
    {
      header: "ID_Клиники",  
      accessorKey: "uslfrmidn",
    },
    {
        header: "Услуга",  
        accessorKey: "uslfrmnam"
    },
    {
        header: "Ед.изм",  
        accessorKey: "uslfrmedn"
    },
    {
      header: "Выбор",
      accessorKey: "uslfrmflg",
      cell: TableCell,
      // cell: ({row}) => {
      //   return <Checkbox checked={row.original.uslfrmflg}
      //   onCheckedChange={()=>{row.original.uslfrmflg=!row.original.uslfrmflg;
      //     console.log("TableCell-onCheckedChange=",row.original.uslfrmflg); 
      //     }}
      //   />},
      meta: {type: 'boolean',},
    },

    {
      header: "Min_Возраст",  
      accessorKey: "uslminlet",
      cell: TableCell,
      meta: {type: 'text',},
    },
    {
      header: "Max_Возраст",  
      accessorKey: "uslmaxlet",
      cell: TableCell,
      meta: {type: 'text',},
    },
    {
      header: "Edit", 
      cell: EditCell,
    },

]


