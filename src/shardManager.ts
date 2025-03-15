import { ShardingManager } from "discord.js";
import "dotenv/config";

const manager = new ShardingManager("src/index.ts", {
  execArgv: ["--import", "tsx"], // Ensures it runs TypeScript files
  token: process.env.DISCORD_TOKEN,
  totalShards: "auto",
});

manager.on("shardCreate", (shard) => {
  console.log(`✅ Launched shard ${shard.id}`);
});

manager.spawn().catch((error) => {
  console.error("❌ Failed to launch shards:", error);
});
