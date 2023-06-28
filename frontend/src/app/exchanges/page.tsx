'use client';

import { useState, useEffect } from 'react';

import PriceTable from '../components/organisms/PriceTable';
import { getPrices, getCryptos, getExchangeRatesUri, getCountriesUri } from '../../../utils/urls';
import { getQueryDate } from '../../../utils/dates';
import { Container, Heading } from '@chakra-ui/react';
import { Flex, Spacer } from '@chakra-ui/react'
import { Select } from '@chakra-ui/react';
import useSWR from 'swr';



//We want to get the exchanges
const cryptoUri = getCryptos();
const countriesUri = getCountriesUri();

const fetcher = async (...args: any) => {
    const req = await fetch(args);
    const {data} = await req.json();
    return data;
};


export default function Home() {
    //We want to view all prices / exchanges from yesterday to the present
    const date = getQueryDate(1);

    const [fiatA, setFiatA] = useState('USD');
    const [fiatB, setFiatB] = useState('KRW');
    const [cryptoCode, setCryptoCode] = useState('BTC');

    const [pricesUri, setPricesUri] = useState('');
    const [exchangeRatesUri, setExchangeRatesUri] = useState('');

    const [exchangeRate, setExchangeRate] = useState(0);

    const [exchangeDataMain, setExchangeDataMain] = useState([]);

    const { data : cryptoData } = useSWR(cryptoUri, fetcher);
    const { data : countriesData } = useSWR(countriesUri, fetcher);

    const exchanges: number[] = [2,4,6,8,10,12];

    console.log(countriesData)

    useEffect(()=>{
        setPricesUri(getPrices(1, date, cryptoCode, fiatA, fiatB));
        setExchangeRatesUri(getExchangeRatesUri(fiatA, fiatB));

        fetch(pricesUri)
            .then((res) => res.json())
            .then((data) => {
                setExchangeDataMain(data.data)
        });

        fetch(exchangeRatesUri)
        .then((res) => res.json())
        .then((data) => {
            setExchangeRate(data?.data[0]?.attributes?.rate)
        });

    },[fiatA, fiatB, cryptoCode, pricesUri, date, exchangeRatesUri]);
    
    return (
        <>

            <Heading as='h1' size='3xl' className='mb-7'>
                Find Overseas Crypto Arb Opportunities
            </Heading>
            
            {
                // exchangeDataMain.map((item, key)=>{
                //     return <p key={key}>{item.id}</p>
                // })
            }

            <Flex w='80%' gap='2'>
                <Select className='bg-slate-800 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                
                placeholder='Select Crypto'

                onChange={(event) => {
                        setCryptoCode(event.target.value);
                    }
                }
                
                >
                {
                    cryptoData?.map((item: any, key: number) => {
                        return <option value={item.attributes.code} key={key}>{item.attributes.code}</option>
                    })
                }
                </Select>


                <Spacer />

                <Select 
                    className='bg-slate-800 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' 
                    
                    placeholder='Select Base Country'

                    onChange={(event) => {
                            setFiatA(event.target.value);
                            setPricesUri(getPrices(1, date, cryptoCode, fiatA, fiatB));
                        }
                    }
                    
                >
                {
                    countriesData?.map((item: any, key: number) => {
                        return <option value={item.attributes.currency.data.attributes.code} key={key}>{item.attributes.name}</option>
                    })
                }
                </Select>

                <Spacer />

                <Select className='bg-slate-800 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' 
                
                placeholder='Select Comparison Country'

                
                onChange={(event) => {
                        setFiatB(event.target.value);
                        setPricesUri(getPrices(1, date, cryptoCode, fiatA, fiatB));
                    }
                }
                >
                {
                    countriesData?.map((item: any, key: number) => {
                        return <option value={item.attributes.currency.data.attributes.code} key={key}>{item.attributes.name}</option>
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
