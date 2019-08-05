import axios from 'axios';
import { mockEventsSingle } from "./mock-events";

async function getSuggestions(query) {
    if (window.location.href.startsWith('http://localhost')) {
        return [
          {
            city: 'Munich',
            country: 'de',
            localized_country_name: 'Germany',
            name_string: 'Munich, Germany',
            zip: 'meetup3',
            lat: 48.14,
            lon: 11.58
          },
          {
            city: 'Munich',
            country: 'us',
            localized_country_name: 'USA',
            state: 'ND',
            name_string: 'Munich, North Dakota, USA',
            zip: '58352',
            lat: 48.66,
            lon: -98.85
          }
        ]
    } 

    const token = await getAccessToken();
    if (token) {
        const url = 'https://api.meetup.com/find/locations?&sign=true&photo-host=public&query='
            + query
            + '&access_token='
            + token;
        const result = await axios.get(url);
        return result.data;
    }
    return [];
}

async function getEvents(lat, lon) {
    if (window.location.href.startsWith('http://localhost')) {
        return mockEventsSingle.events;
    }

    const token = await getAccessToken();
    if (token) {
        let url = 'https://api.meetup.com/find/upcoming_events?&sign=true&photo-host=public'
            + '&access_token=' + token;
            //use optional lon and lat if have them
        if (lat && lon) {
            url += '&lat=' + lat + '&lon=' + lon;
        }
        const result = await axios.get(url);
        return result.data.events;
    }
    return [];
}

async function getOrRenewAccessToken(type, key) {
    let url;
    if (type == 'get') {
        //Lambda endpoint to get token by authorization code
        url = 'https://woyjybx9i4.execute-api.us-west-1.amazonaws.com/dev/api/token/'
            + key;
    }
    else if (type == 'renew') {
        // Lambda endpoint to get token by refresh token
        url = 'https://woyjybx9i4.execute-api.us-west-1.amazonaws.com/dev/api/refreshtoken/'
            + key;
    }

    // use Axios to make GET request to endpoint
    const tokenInfo = await axios.get(url);

    // save tokens to local storage with timestamp
    localStorage.setItem('access_token', tokenInfo.data.access_token);
    localStorage.setItem('refresh_token', tokenInfo.data.refresh_token);
    localStorage.setItem('last_saved_time', Date.now());

    //return access_token
    return tokenInfo.data.access_token;
    
};

function getAccessToken() {
    const accessToken = localStorage.getItem('access_token');

    if (!accessToken) {
        const searchParams = new URLSearchParams(window.location.search); // check for auth code in url
        const code = searchParams.get('code');

        if (!code) {  // redirect to MeetupAPI to get auth code
            window.location.href='https://secure.meetup.com/oauth2/authorize?client_id=1pcniov4vgu7t6ni21bgqi5p2t&response_type=code&redirect_uri=https://sarahb831.github.io/meetup-events/';
            return null;
        }
        return getOrRenewAccessToken('get', code);
    }

    const lastSavedTime = localStorage.getItem('last_saved_time');
    if (accessToken && (Date.now() - lastSavedTime < 3600000)) {
        return accessToken;
    }

    // if access_token is expired try to renew it using refresh_token
    const refreshToken = localStorage.getItem('refresh_token');
    return getOrRenewAccessToken('renew', refreshToken);
};

export { getSuggestions, getEvents };