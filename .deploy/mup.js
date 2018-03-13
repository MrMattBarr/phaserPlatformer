module.exports = {
  servers: {
    one: {
      host: '34.193.226.176',
      username: 'ubuntu',
      pem: '/Users/mbarr/.ssh/awsls.pem'
    }
  },

  app: {
    // TODO: change app name and path
    name: 'playground',
    path: '~/Code/playground',

    servers: {
      one: {},
    },

    buildOptions: {
      serverOnly: true,
    },
    env: {
      PORT: 3456,
      ROOT_URL: 'http://34.193.226.176',
      MONGO_URL: 'mongodb://localhost/meteor',
    },
    docker: {
      // change to 'abernix/meteord:base' if your app is using Meteor 1.4 - 1.5
      image: 'abernix/meteord:node-8.4.0-base',
    },

    // Show progress bar while uploading bundle to server
    // You might need to disable it on CI servers
    enableUploadProgressBar: true
  },

  mongo: {
    version: '3.4.1',
    servers: {
      one: {}
    }
  }
};