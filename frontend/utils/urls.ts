module.exports = {
    /**
     * @param page - int 
     * @param date - str YYYY-MM-DD
     */
    getPrices(page: number, date: string, cryptoCode: string, fiatAlphaCode: string, fiatBetaCode: string) :string {
        return `${process.env.NEXT_PUBLIC_BACKEND_URI}crypto-fiat-prices?populate[crypto][fields][0]=id&populate[crypto][fields][1]=code&populate[currency][fields][0]=id&populate[currency][fields][1]=code&populate[exchange][fields][0]=id&populate[exchange][fields][1]=name&sort[createdAt]=DESC&fields[0]=rate&fields[1]=createdAt&&pagination[pageSize]=100&pagination[page]=1&filters[createdAt][$gte]=${date}&filters[crypto][code][0]=${cryptoCode}&filters[currency][code][0]=${fiatAlphaCode}&filters[currency][code][1]=${fiatBetaCode}`;
    },
    getCryptos(){
        return `${process.env.NEXT_PUBLIC_BACKEND_URI}cryptos?[fields][1]=code&[fields][2]=name&sort[code]=ASC`;
    },
    getFiat(){
        return `${process.env.NEXT_PUBLIC_BACKEND_URI}currencies?[fields][1]=code&[fields][2]=name&sort[code]=ASC`;
    },
    getExchangeRatesUri(baseCur: string, compareCur: string){
        return `${process.env.NEXT_PUBLIC_BACKEND_URI}fiat-exchange-rates?sort[createdAt]=DESC&fields[0]=rate&fields[1]=createdAt&&pagination[pageSize]=1&pagination[page]=1&filters[crypto][code][0]=BTC&filters[base_currency][code][0]=${baseCur}&filters[currency][code][1]=${compareCur}`;
    },
    getCountriesUri(){
        return `${process.env.NEXT_PUBLIC_BACKEND_URI}countries?[fields][0]=code&[fields][1]=name&populate[currency][fields][0]=id&populate[currency][fields][1]=code&sort[name]=ASC`;
    }

}