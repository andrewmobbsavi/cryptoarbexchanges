'use strict';

const fetch = require('node-fetch');

/**
 * fiat-exchange-rate service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::fiat-exchange-rate.fiat-exchange-rate',{
    /**
     * Create the exchange rate api link
     * @param str baseCurrency 
     * @param str compCurrencies (comma separated)
     * @param str apiUrl
     * 
     * @returns str - complete api endpoint for exchange rate collection
     */
    
    generateFullApi(compCurrencies, apiBaseUrl){
        return `${apiBaseUrl}${process.env.EXCHANGE_API_SYMBOLS_PARAM}${compCurrencies}`;
    },
    /**
     * Generates the base api url for the exchange rate collector
     * 
     * @returns str - base api url for exchange rates
     */
    generateBaseApiUrl(){
       return `${process.env.EXCHANGE_API_URL}${process.env.EXCHANGE_API_KEY_PARAM}${process.env.EXCHANGE_API_KEY}`;
    },
    /**
     * Processes the currencies, calls apis, adds exchange rate to DB
     * 
     * Note: free exchange rate converter only allows base currency in Euros
     * Therefore extra step is necessary to calculate rates across currencies
     * 
     * @param {*} currencies 
     */
    async processCurrencies(currencies){
        const currenciesDelim = await this.getCommaDelimCurrencies(currencies);
        const baseApiUrl = this.generateBaseApiUrl();
        const fullApiEndpoint = this.generateFullApi(currenciesDelim, baseApiUrl);
        const exchangeRates = await this.getExchangeRates(fullApiEndpoint);

        await this.processRates(exchangeRates, currencies);
    },
    /**
     * get a comma delimited string of all currency codes
     * @param {*} currencies - object of all fiat currencies in db
     */
    async getCommaDelimCurrencies(currencies){
        const currenciesCommaDelimited = await currencies.map((item)=>{
            return item.code;
        }).join(',');

        return currenciesCommaDelimited;
    },
    /**
     * Fetches exchange rate data from the api
     * 
     * @param str fullApiEndpoint 
     * @returns {*}
     */
    async getExchangeRates(fullApiEndpoint){
        try{
            const response = await fetch(fullApiEndpoint);
            const data = await response.json();
            console.log(data.rates);
            return data.rates;
        } catch {
            return {};
        }
    },
    /**
     * Process exchange rate data from the api vs currency data from database
     * 
     * @param {*} rates 
     * @param {*} currencies 
     */
    async processRates(rates, currencies){
        /*
            For loop ultimately has superior performance than map, although harder to read
            High big 0 though with nested loop. Is there a better way to do this? 
        */
        for(let i = 0; i < currencies.length; i++){
            const baseCur = currencies[i].code;
            const baseRate = rates[baseCur];
            
            for(let p = 0; p < currencies.length; p++){
                const compCur = currencies[p].code;
                const compRate = rates[compCur];

                //Divide by the base to get rate
                const realRate = compRate / baseRate;
                await this.saveRate(currencies[i], currencies[p], realRate);
            }
        }
    },
    /**
     * Save the new exchange rate to the database
     * @param {*} baseCur 
     * @param {*} compCur 
     * @param float rate 
     * 
     * Void
     */
    async saveRate(baseCur, compCur, rate){
        try{
            await strapi.entityService.create('api::fiat-exchange-rate.fiat-exchange-rate', {
                data: {
                    base_currency: baseCur.id,
                    currency: compCur.id,
                    rate: rate
                },
            });
        } catch (err){
            console.log(err.details);
        }
    }
});
