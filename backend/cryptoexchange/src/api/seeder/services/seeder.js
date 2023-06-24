'use strict';

/**
 * seeder service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::seeder.seeder',{
    /**
     * Sets the seeded status of the database to true
     */
    async setSeeded(){
        console.log('Setting seed status...');
        try{
            await strapi.entityService.create('api::seeder.seeder', {
                data: {
                    seeded: true
                },
            });
        } catch (err){
            console.log(err.details);
        }
    },
    /**
     * Checks that the seed boolean exists and has been populated
     * @returns obj or null
     */

    async getSeeded(){
        const getme = await strapi.entityService.findMany('api::seeder.seeder', {
            fields: ['seeded'],
        });

        return getme;
    },
    /**
     * Seeds fiat currencies in db
     * Only seed if there are no currencies
     */
    async seedCurrencies(){
        console.log('Seeding currencies...');
        const currencies = await strapi.entityService.findMany('api::currency.currency',{});
        
        if(currencies.length <= 0){
            await strapi.entityService.create('api::currency.currency',{
                data:{
                    name: 'Korean Won',
                    code: 'KRW'
                }
            });

            await strapi.entityService.create('api::currency.currency',{
                data:{
                    name: 'US Dollar',
                    code: 'USD'
                }
            });
        }
    },
    /**
     * Seeds crypto currencies in db
     * Only seed if there are no crypto currencies
     */
    async seedCrypto(){
        console.log('Seeding crypto...');
        const crypto = await strapi.entityService.findMany('api::crypto.crypto',{});
        
        if(crypto.length <= 0){
            await strapi.entityService.create('api::crypto.crypto',{
                data:{
                    name: 'Bitcoin',
                    code: 'BTC'
                }
            });
        }
    },
    /**
     * Seeds countries in db
     * Only seed if there are no countries
     */
    async seedCountries(){
        console.log('Seeding countries...');
        const countries = await strapi.entityService.findMany('api::country.country',{});
        
        
        if(countries.length <= 0){
            //we need to populate currencies first
            const currencies = await strapi.entityService.findMany('api::currency.currency',{});
            
            //Use for rather than foreach to respect await
            for(let i = 0; i < currencies.length; i++){
                switch(currencies[i].code){
                    case 'USD':
                        await strapi.entityService.create('api::country.country',{
                            data:{
                                name: 'United States',
                                code: 'USA',
                                currency: currencies[i].id
                            }
                        });
                        break;
                    case 'KRW':
                        await strapi.entityService.create('api::country.country',{
                            data:{
                                name: 'Korea',
                                code: 'KRW',
                                currency: currencies[i].id
                            }
                        });
                        break;
                }
                
            }
            
        }
    },
    /**
     * Seeds exchanges in db
     * Only seed if there are no exchanges
     */
    async seedExchanges(){
        console.log('Seeding exchanges...');
        const exchanges = await strapi.entityService.findMany('api::exchange.exchange',{});
        
        if(exchanges.length <= 0){
            const countries = await strapi.entityService.findMany('api::country.country',{});
            
            for(let i = 0; i < countries.length; i++){
                switch (countries[i].code){
                    case 'USA':
                        console.log('Adding USA Exchange');
                        console.log(countries[i].code);
                        await strapi.entityService.create('api::exchange.exchange',{
                            data:{
                                name: 'Gemini',
                                endpoint: 'https://api.gemini.com/v1/pubticker/',
                                code: 'GEM',
                                country: countries[i].id
                            }
                        });
                        break;
                    case 'KRW':
                        console.log('Adding Korea Exchange');
                        console.log(countries[i].code);
                        await strapi.entityService.create('api::exchange.exchange',{
                            data:{
                                name: 'Bithumb',
                                endpoint: 'https://api.bithumb.com/public/orderbook/ALL_KRW',
                                code: 'BTH',
                                country: countries[i].id
                            }
                        });
                        break;
                }
            }
        }
    },

});
