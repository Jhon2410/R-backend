const mongoose = require("mongoose");
require('dotenv').config()
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(process.env.mongoCluster);
}
module.exports = mongoose;