'use strict';

/**
 * seeder router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::seeder.seeder');
