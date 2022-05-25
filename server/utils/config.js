require('dotenv').config()

const {
  PORT,
  MONGO_URI,
  REDIS_USERNAME,
  REDIS_PASSWORD,
  REDIS_HOST,
} = process.env

module.exports = {
  PORT,
  MONGO_URI,
  REDIS_USERNAME,
  REDIS_PASSWORD,
  REDIS_HOST,
}