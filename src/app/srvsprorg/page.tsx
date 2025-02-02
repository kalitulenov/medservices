

import React from 'react'
import { SprTable } from './data-table'

export default async function SprOrgPage() {
  return (
    <div className='container py-5 px-20 mx-auto'>
     {/* <SprTable columns={columns} data={defaultData} /> */}
       <SprTable />
    </div>  
   )
}
