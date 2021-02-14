window._ = require('lodash');

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

window.axios = require('axios');

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

var baseurl = window.location.protocol + "//" + window.location.host;
window.axios.defaults.baseURL = baseurl+`/api`
window.axios.defaults.headers.post['Accept'] = 'application/json';
window.axios.defaults.headers.post['Content-Type'] = 'application/json';
window.axios.defaults.headers.put['Accept'] = 'application/json';
window.axios.defaults.headers.put['Content-Type'] = 'application/json';
let token = localStorage.getItem('config-X');
if(token != null){
	window.axios.defaults.headers.common = {
		"Authorization": "Bearer " + token
	}
}
window.axios.interceptors.response.use( (response) => {
    // Return a successful response back to the calling service
    return response;
}, (error) => {

    if (error.response.status == 429){
        alert('Too Many Requests, Please Try Again Later.')
    }

    // Return any error which is not due to authentication back to the calling service
    if (error.response.status !== 401) {
        return new Promise((resolve, reject) => {
            reject(error.response);
        });
    }

    // Logout user if token refresh didn't work or user is disabled
    if (error.config.url == '/api/auth/refresh' || error.response.data.message == 'Unauthorized') {
      
        Vue.local.remove('config-X')
        Vue.router.push('/')
        alert('Session Expired. Please Login Again.')

        return new Promise((resolve, reject) => {
            reject(error);
        });
    }

    if (error.response.status == 401) {
        return new Promise((resolve, reject) => {
            reject(error);
        });
    }
});

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

// import Echo from 'laravel-echo'

// window.Pusher = require('pusher-js');

// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: process.env.MIX_PUSHER_APP_KEY,
//     // cluster: process.env.MIX_PUSHER_APP_CLUSTER,
//     // encrypted: true,
//     wsHost: window.location.hostname,
//     wsPort: 6001,
//     disableStats: false,
// });