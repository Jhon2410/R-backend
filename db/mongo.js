const mongoose = require("mongoose");
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect("mongodb+srv://anderson:anderson@cluster0.hykao.mongodb.net/jhon");
}
module.exports = mongoose;