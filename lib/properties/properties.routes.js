
module.exports = {
  routes: async () => {
    const controllers = await require('./properties.controllers.js')();
    const propertiesModels = require('./properties.models');
    return [
      {
        method: 'GET',
        path: '/properties',
        handler: controllers.getProperties,
        config: {
          description: 'Get properties',
          notes: 'Get properties for an inputted search query',
          tags: ['api', 'Properties'],
          validate: {
            query: propertiesModels.apiFilterQuery,
          }
        }
      },
    ];
  },
};
