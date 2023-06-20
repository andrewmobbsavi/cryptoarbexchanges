'use strict';

/**
 * crypto-fiat-price service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::crypto-fiat-price.crypto-fiat-price',{
    /**
     * 
     * @param {*} crypto 
     * @param {*} fiat 
     * @param {*} exchange 
     * @param number rate 
     * @returns object
     */
    async addCryptoPrice(crypto, fiat, exchange, rate){
        const entry = await strapi.entityService.create('api::crypto-fiat-price.crypto-fiat-price', {
            data: {
                crypto: crypto,
                currency: fiat,
                exchanges: exchange,
                rate: rate
            },
        });

        return entry;
    }
});
