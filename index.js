'use strict';
const { getTweetCreatedTime } = require('./apis');

module.exports.handler = async (event) => {
  const tweetId = event.id;

  if (tweetId == null) {
    return {
      statusCode: 400,
      headers: 'application/json',
      body: JSON.stringify({ error: 'id is empty' }),
    };
  }
  try {
    const data = await getTweetCreatedTime(tweetId);
    if (data !== '') {
      return {
        statusCode: 200,
        headers: 'application/json',
        body: JSON.stringify({ data }),
      };
    }
  } catch (error) {
    const statusCode = error.code || '500';
    const detail = error.message || 'Internal Server Error.';
    return {
      statusCode,
      headers: 'application/json',
      body: JSON.stringify({ errors: [{ status: statusCode, detail }] }),
    };
  }

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
