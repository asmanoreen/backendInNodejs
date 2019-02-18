require('dotenv').config();
const env = process.env.NODE_ENV;

const dev = {
 app: {
   port: 3000
 }
};
const test = {
 app: {
   port: 5000
 }
};
const config={
  dev,
  test
};
switch (env) {
    case "dev":
        module.exports = config[env];
        break;
    case "test":
        module.exports = config[env];
        break;
    default:
        console.log("not set");
}
