let mongoURI: string;

if (process.env.NODE_ENV === 'production') {
  mongoURI = require('./prod');
} else {
  mongoURI = require('./dev');
}

export { mongoURI }