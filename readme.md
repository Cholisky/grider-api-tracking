Simple express based auth server to accompany Stephen Grider's react-native tutorials on Udemy

Create the file in the root of the project folder for keys and constants.

/* keystore.js */
module.exports = {
  PORT: <int>,
  JWT_KEY: <string>,
  MONGO_URI: <string>,
};

Start the server with `npm run dev`