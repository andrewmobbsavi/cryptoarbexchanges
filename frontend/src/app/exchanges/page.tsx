'use client';

import { useState, useEffect } from 'react';

import PriceTable from '../components/organisms/PriceTable';
import {getPrices, getCryptos, getFiat} from '../../../utils/urls';
import {getQueryDate} from '../../../utils/dates';
import { Container, Heading } from '@chakra-ui/react';
import { Flex, Spacer } from '@chakra-ui/react'
import { Select } from '@chakra-ui/react';
import useSWR from 'swr';

//We want to view all prices / exchanges from yesterday to the present
const date = getQueryDate(1);

//We want to get the exchanges
const pricesUri = getPrices(1, date, 'BTC', 'USD', 'KRW');
const cryptoUri = getCryptos();
const fiatUri = getFiat();

const fetcher = async (...args: any) => {
    const req = await fetch(args);
    const {data} = await req.json();
    
    return data;
};


export default function Home() {
    const { data : cryptoData } = useSWR(cryptoUri, fetcher);
    const { data : fiatData } = useSWR(fiatUri, fetcher);

    const exchanges: number[] = [2,4,6,8,10,12];


    return (
        <>

            <Heading as='h1' size='3xl' className='mb-7'>
                Find Overseas Crypto Arb Opportunities
            </Heading>

            <Flex w='80%' gap='2'>
                <Select className='bg-slate-800 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' placeholder='Select Crypto'>
                {
                    cryptoData?.map((item: any, key: number) => {
                        return <option value={item.attributes.code} key={key}>{item.attributes.code}</option>
                    })
                }
                </Select>


                <Spacer />

                <Select className='bg-slate-800 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' placeholder='Select Base Fiat'>
                {
                    fiatData?.map((item: any, key: number) => {
                        return <option value={item.attributes.code} key={key}>{item.attributes.name}</option>
                    })
                }
                </Select>

                <Spacer />

                <Select className='bg-slate-800 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' placeholder='Select Comparison Fiat'>
                {
                    fiatData?.map((item: any, key: number) => {
                        return <option value={item.attributes.code} key={key}>{item.attributes.name}</option>
                    })
                }
                </Select>
            </Flex>
            
            <PriceTable 
                exchanges={exchanges}
            />
        </>
    )
}
