const Twitter = require('twitter-lite');
const { SHOW_TWEET_PATH } = require('./helpers');

const user = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
});

async function authApp() {
  const response = await user.getBearerToken();
  return new Twitter({
    bearer_token: response.access_token,
  });
}

/**
 * Make network requrest to get the created time of a tweet
 * @param {string} id
 * @returns {string} createdTime
 */
async function getTweetCreatedTime(id) {
  try {
    const app = await authApp();
    const response = await app.get(SHOW_TWEET_PATH, { id });
    const createdTime = await response.created_at;
    return createdTime;
  } catch (error) {
    console.log(error);
  }
}

module.exports = { getTweetCreatedTime };
