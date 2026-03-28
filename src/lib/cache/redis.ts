import Redis from "ioredis";
class RedisClient {
  private static instance: Redis | null = null;
  private static retryCount = 0;
  private static maxRetries = 3;
  static getInstance() {
    if (!this.instance) {
      this.instance = new Redis(
        process.env.NODE_ENV || "redis://localhost:6379",
        {
          maxRetriesPerRequest: 3,
          enableReadyCheck: true,
          retryStrategy: (times: number) => {
            if (times > this.maxRetries) {
              console.error("Redis max retries exceeded");
              return null;
            }
            this.retryCount = times;
            return Math.min(times * 50, 2000);
          },
          reconnectOnError: (err) => {
            const targetError = "READONLY";
            if (err.message.includes(targetError)) {
              return true;
            }
            return false;
          },
        },
      );

      this.instance.on("connect", () => {
        console.log("✅ Redis connected successfully");
        this.retryCount = 0;
      });

      this.instance.on("error", (err) => {
        console.error("❌ Redis connection error:", err);
      });

      this.instance.on("close", () => {
        console.log("⚠️  Redis connection closed");
      });
    }
    return this.instance;
  }
  static async disconnect(): Promise<void> {
    if (this.instance) {
      await this.instance.quit();
      this.instance = null;
    }
  }
}
// Graceful shutdown
process.on("SIGTERM", async () => {
  await RedisClient.disconnect();
});

process.on("SIGINT", async () => {
  await RedisClient.disconnect();
});
export const redis = RedisClient.getInstance();
