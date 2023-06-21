'use strict';

const fetch = require('node-fetch');

/**
 * exchange service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::exchange.exchange',{
    /**
     * Enum exchange codes. Used to specify different algos for different exchanges
     */
    exchangeList(){
        const exchanges = Object.freeze({
            GEM: 'GEM', //GET https://api.gemini.com/v1/pubticker/
            BTH: 'BTH' //https://api.bithumb.com/public/orderbook/ALL_KRW
        });

        return exchanges;
    },
    /**
     * We want to get all exchanges from our DB,
     * so we can query api to get the data for price extraction
     * 
     * @returns object
     */
    async getExchanges(){
        const exchanges = await strapi.entityService.findMany('api::exchange.exchange', {
            populate: {
                country: {
                    populate: {
                        currency: true,
                      },
                }
            }
        });

        return exchanges;
    },
    /**
     * Process exchanges. For each exchange, we will identify the exchange, and 
     * query the exchange api
     * 
     * @param {*} exchanges - object of exchanges from our database
     * @param {*} cryptos - object of cryptos from our database
     */
    async processExchanges(exchanges, cryptos){
        exchanges.map(async (item)=>{
            switch(item.code) {
                case this.exchangeList().GEM:
                    await this.processGem(item, cryptos);
                    break;
                case this.exchangeList().BTH:
                    await this.processBth(item, cryptos);
                    break;
                default:
                    console.log('Exchange invalid...')
              }
        });
    },
    /**
     * We want to process bithumb API values
     * We will query the api, extract the relevant crypto prices
     * in Korean WON. We will then add the data to the database
     * 
     * @param {*} exchangeData - object of exchanges from our database
     * @param {*} cryptos - object of cryptos from our database
     */
    async processBth(exchangeData, cryptos){
        console.log(`Getting ${exchangeData.name} data...`)
        const api = exchangeData.endpoint;
        
        try{
            
            const response = await fetch(api);
            const data = await response.json();

            cryptos.map((crypto)=>{
                const price = data.data[crypto.code].bids[0].price;
                //add the price to the database
                const entry = strapi.service('api::crypto-fiat-price.crypto-fiat-price').addCryptoPrice(crypto.id, exchangeData.country.currency.id, exchangeData.id, price)
            });
        } catch {
            console.log(`Error. Unable to get ${exchangeData.name} data`);
        }
    },
    /**
     * We want to process Gemini API values
     * We will query the api, extract the relevant crypto prices
     * in USD. We will then add the data to the database
     * 
     * @param {*} exchangeData - object of exchanges from our database
     * @param {*} cryptos - object of cryptos from our database
     */
    async processGem(exchangeData, cryptos){
        console.log(`Getting ${exchangeData.name} data...`);

        cryptos.map(async (crypto)=>{
            try{
                const api = `${exchangeData.endpoint}${crypto.code}${exchangeData.country.currency.code}`;

                const response = await fetch(api);
                const data = await response.json();

                const price = data.bid;
                //add the price to the database
                const entry = strapi.service('api::crypto-fiat-price.crypto-fiat-price').addCryptoPrice(crypto.id, exchangeData.country.currency.id, exchangeData.id, price);
            } catch {
                console.log(`Unable to get ${exchangeData.name} ${crypto.code} data...`)
            }
        });
    }
});
