'use strict';

const axios = require('axios');

module.exports.getAccessToken = async (event) => {

  const MEETUP_OAUTH_URL = 'https://secure.meetup.com/oauth2/access'
  + '?client_id=1pcniov4vgu7t6ni21bgqi5p2t'
  + '&client_secret=6rn3iu84a6g3397hifrqv1dpsa'
  + '&grant_type=authorization_code'
  + '&redirect_uri=https://sarahb831.github.io/meetup-events/'
  + '&code=' + event.pathParameters.code;
 // + '&code=fe279b2c4b51c2681ffe1f69d4ebee06';

  const info = await axios.post(MEETUP_OAUTH_URL);

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      access_token: info.data.access_token,
      refresh_token: info.data.refresh_token,
    }),
  };
};