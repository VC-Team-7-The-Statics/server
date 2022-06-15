const Redis = require("ioredis");
const secrets = require("./secrets");

const redis = new Redis(secrets.UPSTASH_REDIS_URI);

module.exports = redis;
