'use strict';

const axios = require('axios');

module.exports.getAccessToken = async (event) => {

  const MEETUP_OAUTH_URL = 'https://secure.meetup.com/oauth2/access'
  + '?client_id=1pcniov4vgu7t6ni21bgqi5p2t'
  + '&client_secret=6rn3iu84a6g3397hifrqv1dpsa'
  + '&grant_type=authorization_code'
  + '&redirect_uri=https://sarahb831.github.io/meetup-events/'
  + '&code=' + event.pathParameters.code;
 // + '&code=1d81994f83b2cda10f78ddf000bec98f';

  const info = await axios.post(MEETUP_OAUTH_URL);

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify({
      access_token: info.data.access_token,
      refresh_token: info.data.refresh_token,
    }),
  };
};

module.exports.getRefreshToken =async (event) => {

  const MEETUP_OAUTH_URL = 'https://secure.meetup.com/oauth2/access'
  + '?client_id=1pcniov4vgu7t6ni21bgqi5p2t'
  + '&client_secret=6rn3iu84a6g3397hifrqv1dpsa'
  + '&grant_type=refresh_token'
  + '&refresh_token=' + event.pathParameters.code;
  const info = await axios.post(MEETUP_OAUTH_URL);

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify({
      access_token: info.data.access_token,
      refresh_token: info.data.refresh_token,
    }),
  };
};