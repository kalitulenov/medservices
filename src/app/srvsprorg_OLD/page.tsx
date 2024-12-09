

import React from 'react'
import { SprOrgTable } from './data-table'
import { columns } from './columns'

const dataDB = [
    {
        "Id": 1,
        "OrgNam": "ТОО РСВЦ",
        "OrgAdr": "ул.Толе би 123",
        "OrgTel": "11111111",
        "OrgDmu": "да",
    },
    {
        "Id": 2,
        "OrgNam": "ТОО СУНКАР",
        "OrgAdr": "ул.Казыбек би 123",
        "OrgTel": "22222222222",
        "OrgDmu": "да",
    },
    {
        "Id": 3,
        "OrgNam": "ТОО САНА",
        "OrgAdr": "ул.Гагарина 123",
        "OrgTel": "3333333333",
        "OrgDmu": "да",
    },
    {
        "Id": 4,
        "OrgNam": "ТОО ДАРИГА",
        "OrgAdr": "ул.Ленина 123",
        "OrgTel": "44444444444",
        "OrgDmu": "да",
    },
    {
        "Id": 5,
        "OrgNam": "ТОО АСМЕД",
        "OrgAdr": "ул.Озтурк 123",
        "OrgTel": "55555555555",
        "OrgDmu": "нет",
    },
];
//     {
//         "Id": 6,
//         "OrgNam": "ТОО АСМЕД",
//         "OrgAdr": "ул.Озтурк 123",
//         "OrgTel": "55555555555",
//         "OrgDmu": "нет",
//     },
//     {
//         "Id": 7,
//         "OrgNam": "ТОО АСМЕД",
//         "OrgAdr": "ул.Озтурк 123",
//         "OrgTel": "55555555555",
//         "OrgDmu": "нет",
//     },
//     {
//         "Id": 8,
//         "OrgNam": "ТОО АСМЕД",
//         "OrgAdr": "ул.Озтурк 123",
//         "OrgTel": "55555555555",
//         "OrgDmu": "нет",
//     },
//     {
//         "Id": 9,
//         "OrgNam": "ТОО АСМЕД",
//         "OrgAdr": "ул.Озтурк 123",
//         "OrgTel": "55555555555",
//         "OrgDmu": "нет",
//     },
//     {
//         "Id": 10,
//         "OrgNam": "ТОО АСМЕД",
//         "OrgAdr": "ул.Озтурк 123",
//         "OrgTel": "55555555555",
//         "OrgDmu": "нет",
//     },
//     {
//         "Id": 11,
//         "OrgNam": "ТОО АСМЕД",
//         "OrgAdr": "ул.Озтурк 123",
//         "OrgTel": "55555555555",
//         "OrgDmu": "нет",
//     },
//     {
//         "Id": 12,
//         "OrgNam": "ТОО АСМЕД",
//         "OrgAdr": "ул.Озтурк 123",
//         "OrgTel": "55555555555",
//         "OrgDmu": "нет",
//     },
//     {
//         "Id": 13,
//         "OrgNam": "ТОО АСМЕД",
//         "OrgAdr": "ул.Озтурк 123",
//         "OrgTel": "55555555555",
//         "OrgDmu": "нет",
//     },
//     {
//         "Id": 14,
//         "OrgNam": "ТОО АСМЕД",
//         "OrgAdr": "ул.Озтурк 123",
//         "OrgTel": "55555555555",
//         "OrgDmu": "нет",
//     },
//     {
//         "Id": 15,
//         "OrgNam": "ТОО АСМЕД",
//         "OrgAdr": "ул.Озтурк 123",
//         "OrgTel": "55555555555",
//         "OrgDmu": "нет",
//     },
//     {
//         "Id": 16,
//         "OrgNam": "ТОО АСМЕД",
//         "OrgAdr": "ул.Озтурк 123",
//         "OrgTel": "55555555555",
//         "OrgDmu": "нет",
//     },
//     {
//         "Id": 17,
//         "OrgNam": "ТОО АСМЕД",
//         "OrgAdr": "ул.Озтурк 123",
//         "OrgTel": "55555555555",
//         "OrgDmu": "нет",
//     },
//     {
//         "Id": 18,
//         "OrgNam": "ТОО АСМЕД",
//         "OrgAdr": "ул.Озтурк 123",
//         "OrgTel": "55555555555",
//         "OrgDmu": "нет",
//     },
//     {
//         "Id": 19,
//         "OrgNam": "ТОО АСМЕД",
//         "OrgAdr": "ул.Озтурк 123",
//         "OrgTel": "55555555555",
//         "OrgDmu": "нет",
//     },
//     {
//         "Id": 20,
//         "OrgNam": "ТОО АСМЕД",
//         "OrgAdr": "ул.Озтурк 123",
//         "OrgTel": "55555555555",
//         "OrgDmu": "нет",
//     },
//   ];


const SprOrg = () => {
  return (
    <div className='container py-5 px-20 mx-auto'>
     {/* <SprOrgTable columns={columns} data={dataDB} /> */}
       <SprOrgTable />
    </div>  
   )
}

export default SprOrg;