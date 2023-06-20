module.exports = {
    routes: [
      {
        method: 'GET',
        path: '/exchange/getAndSetData',
        handler: 'exchange.getAndSetData',
        config: {
          policies: [],
          middlewares: [],
        },
       },
    ],
  };
  