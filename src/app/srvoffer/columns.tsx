

"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { SprUsl } from './types';

import { useEffect, useState } from "react";
import { TableCell } from "./TableCell";
import { EditCell } from "./EditCell";
import { sprfrmusl } from "@prisma/client";

export const columns: ColumnDef<sprfrmusl>[] = [
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
        accessorKey: "usltrf"
    },

    // {
    //     header: "Тарификатор",  
    //     accessorKey: "UslTrf"
    // },

    {
        header: "Услуга",  
        accessorKey: "uslnam"
    },
    {
        header: "Ед.изм",  
        accessorKey: "usledn"
    },
    {
      header: "*",
      accessorKey: "uslfrmflg",
      cell: TableCell,
      // cell: ({row}) => {
      //   const offer = row.original;
      //   var offerflg = offer.uslfrmflg;
      //   return <Checkbox checked={offerflg}
      //   onCheckedChange={()=>{
      //     offerflg=!offerflg;
      //     console.log("TableCell-onCheckedChange=",offerflg);
      //   }}
      //   />},

      meta: {type: 'boolean',},
    },
    {
      header: "Min_Возраст",  
      accessorKey: "uslminlet",
      cell: TableCell,
      meta: {type: 'number',},
    },
    {
      header: "Max_Возраст",  
      accessorKey: "uslmaxlet",
      cell: TableCell,
      meta: {type: 'number',},
    },
    {
      header: "Edit",  
      //cell: ({ row, table }) => EditCell({ row, table })
      cell: EditCell,
    }



]


