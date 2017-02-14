import dotenv from 'dotenv'
import path from 'path'

dotenv.config({path: `${__dirname}/../../../.env`})

export default {
  entry: {
    GetComponents: [
      'babel-polyfill',
      './src/getComponents/index.js'
    ],
    PostComponents: [
      'babel-polyfill',
      './src/postComponents/index.js'
    ],
    PatchComponents: [
      'babel-polyfill',
      './src/patchComponents/index.js'
    ],
    PatchIncidents: [
      'babel-polyfill',
      './src/patchIncidents/index.js'
    ],
    DeleteComponents: [
      'babel-polyfill',
      './src/deleteComponents/index.js'
    ],
    DeleteIncidents: [
      'babel-polyfill',
      './src/deleteIncidents/index.js'
    ],
    GetIncidents: [
      'babel-polyfill',
      './src/getIncidents/index.js'
    ],
    GetIncidentUpdates: [
      'babel-polyfill',
      './src/getIncidentUpdates/index.js'
    ],
    PostIncidents: [
      'babel-polyfill',
      './src/postIncidents/index.js'
    ],
    CollectMetricsData: [
      'babel-polyfill',
      './src/collectMetricsData/index.js'
    ],
    GetExternalMetrics: [
      'babel-polyfill',
      './src/getExternalMetrics/index.js'
    ],
    PostMetrics: [
      'babel-polyfill',
      './src/postMetrics/index.js'
    ],
    S3PutObject: [
      'babel-polyfill',
      './src/s3PutObjects/index.js'
    ],
    S3SyncObjects: [
      'babel-polyfill',
      './src/s3SyncObjects/index.js'
    ],
    CognitoCreateUserPool: [
      'babel-polyfill',
      './src/cognitoCreateUserPool/index.js'
    ],
    CognitoCreateUserPoolClient: [
      'babel-polyfill',
      './src/cognitoCreateUserPoolClient/index.js'
    ],
    CognitoCreateUser: [
      'babel-polyfill',
      './src/cognitoCreateUser/index.js'
    ]
  },
  output: {
    path: './build/functions',
    library: '[name]',
    libraryTarget: 'commonjs2',
    filename: '[name]/index.js'
  },
  target: 'node',
  externals: { 'aws-sdk': 'commonjs aws-sdk' },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: [ 'es2015', 'stage-0' ]
        }
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },
  resolve: {
    root: path.resolve(__dirname, '../src')
  }
}
