'use strict';

/**
 * crypto service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::crypto.crypto',{
    async getCryptos(){
        const cryptos = await strapi.entityService.findMany('api::crypto.crypto', {});
        return cryptos;
    }
});
