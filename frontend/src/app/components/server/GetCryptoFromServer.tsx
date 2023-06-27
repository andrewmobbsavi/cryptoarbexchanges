'use server'

import {getCryptos} from '../../../../utils/urls';

export default async function GetCryptoFromServer(){ 
    
    const cryptoUri = getCryptos();

    const getCryptoMain = async () => {
        const req = await fetch(cryptoUri);
        const newData = await req.json();
        const data = await newData.data;
        return data;
    };

    const cryptos = await getCryptoMain();

    return (
        <>{cryptos}</>
    )
}