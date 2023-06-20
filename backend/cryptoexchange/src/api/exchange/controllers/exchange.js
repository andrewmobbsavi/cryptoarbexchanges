'use strict';

/**
 * exchange controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::exchange.exchange',{

    /**
     * Go through all exchanges. Wrapper function.
     * We want to get all exchanges, extract the crypto price, get fiat price, and save.
     */
    async getAndSetData(ctx){
        const exchanges = await strapi.service('api::exchange.exchange').getExchanges();

        const cryptos = await strapi.service('api::crypto.crypto').getCryptos();

        const status = await strapi.service('api::exchange.exchange').processExchanges(exchanges, cryptos);
    },
});
