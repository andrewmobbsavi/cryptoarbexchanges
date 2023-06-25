'use strict';

/**
 * seeder controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::seeder.seeder',{
    /**
     * This will seed the database with live data
     */
    async seed(ctx){
        console.log("Seeding database. Please wait.");

        const seeded = await strapi.service('api::seeder.seeder').getSeeded();
        
        if(seeded){
            if(seeded.seeded){
                return {
                    status: false,
                    message: 'Seed has already been completed...'
                }
            }
        }

        await strapi.service('api::seeder.seeder').seedCurrencies();
        await strapi.service('api::seeder.seeder').seedCrypto();
        await strapi.service('api::seeder.seeder').seedCountries();
        await strapi.service('api::seeder.seeder').seedExchanges();
        
        //Set the seeded status to yes
        await strapi.service('api::seeder.seeder').setSeeded();

        console.log('Seeding complete...');

        return {
            status: true,
            message: 'Seeding complete...'
        }

    }
});
