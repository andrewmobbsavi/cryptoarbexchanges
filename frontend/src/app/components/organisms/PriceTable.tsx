'use client'

import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
  } from '@chakra-ui/react'


export default function PriceTable({exchanges}:{exchanges: number[]}){ 
    

    return (
        <TableContainer>
            <Table>
                <TableCaption>Imperial to metric conversion factors</TableCaption>
                <Thead>
                <Tr>
                    <Th className='text-white'>To convert</Th>
                    <Th className='text-white'>into</Th>
                    <Th isNumeric className='text-white'>multiply by</Th>
                </Tr>
                </Thead>
                <Tbody>
                {
                    exchanges?.map((exchange: number, key: number) => {
                        return <Tr key={key}><Td>{exchange}</Td></Tr>
                    })
                }
                </Tbody>
                <Tfoot>
                </Tfoot>
            </Table>
        </TableContainer>
    )
}