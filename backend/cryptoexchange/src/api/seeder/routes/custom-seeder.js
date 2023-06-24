module.exports = {
    routes: [
      {
        method: 'GET',
        path: '/seeder/seed',
        handler: 'seeder.seed',
        config: {
          policies: [],
          middlewares: [],
        },
       },
    ],
  };
  