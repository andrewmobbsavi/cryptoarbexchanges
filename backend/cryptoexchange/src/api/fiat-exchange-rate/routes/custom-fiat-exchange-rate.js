module.exports = {
    routes: [
      {
        method: 'GET',
        path: '/fiat-exchange-rate/getAndSetRates',
        handler: 'fiat-exchange-rate.getAndSetRates',
        config: {
          policies: [],
          middlewares: [],
        },
       },
    ],
  };
  