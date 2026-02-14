export async function notifySocketServer(customerData) {
  try {
    console.log("📢 Sending socket notification...");
    console.log("📦 Data:", customerData);
    const response = await fetch(`${process.env.SOCKET_URL}/emit-booking`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(customerData),
      signal: AbortSignal.timeout(3000), // 3 second timeout
    });
    if (response.ok) {
      const result = await response.json();
      console.log("✅ Socket notified successfully");
      console.log(`📊 Connected clients: ${result.clientCount || 0}`);
      return true;
    } else {
      console.error(`❌ Socket server error: ${response.status}`);
      return false;
    }
  } catch (error) {
    // Don't throw - this is non-critical
    console.error("⚠️ Socket notification failed:", error.message);
    return false;
  }
}
