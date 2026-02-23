// testMongo.js

const { dbConnect } = require("@/lib/dbConnect");

async function test() {
  try {
    const payments = dbConnect("payments");
    const count = await payments.countDocuments();
    console.log("✅ Connected! Payments documents count:", count);
  } catch (err) {
    console.error("❌ Connection error:", err);
  } finally {
    process.exit();
  }
}

test();
