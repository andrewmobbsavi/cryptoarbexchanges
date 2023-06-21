'use strict';

/**
 * fiat-exchange-rate controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::fiat-exchange-rate.fiat-exchange-rate',{
    async getAndSetRates(ctx){

        const currencies = await strapi.entityService.findMany('api::currency.currency', {
            fields: ['name', 'code'],
            sort: { name: 'ASC' }
        });

        await strapi.service('api::fiat-exchange-rate.fiat-exchange-rate').processCurrencies(currencies);

        return {
            status: true,
            message: 'Exchange rates processed.'
        }

    }

});
