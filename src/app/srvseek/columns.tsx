



"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { SprUslSeek } from '@/components/types';

import { useEffect, useState } from "react";
import { spruslfrm } from "@prisma/client";

export const columns: ColumnDef<SprUslSeek>[] = [
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
    {
        header: "Услуга",  
        accessorKey: "uslnam"
    },
    {
        header: "Ед.изм",  
        accessorKey: "usledn"
    },
    {
      header: "Min_Возраст",  
      accessorKey: "uslminlet",
      //cell: TableCell,
      //meta: {type: 'number',},
    },
    {
      header: "Max_Возраст",  
      accessorKey: "uslmaxlet",
      //cell: TableCell,
      //meta: {type: 'number',},
    },
    {
      header: "Клиника",  
      accessorKey: "uslhspnam",
    },

]


