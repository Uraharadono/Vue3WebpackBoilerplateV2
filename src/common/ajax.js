import axios from "axios";
import { stringify } from "qs";
import { authHeader } from "./auth-header";

function forwardTo(url) {
    window.location = url;
}

function handleError(error) {
    let response = {};

    if (error && error.response.status === 401) {
        let redirectUrl = "/login";
        if(window.location.pathname != "/")
        {
            redirectUrl += "?returnUrl=" + window.location.pathname;
        }
        forwardTo(redirectUrl);
    }

    // missing role
    //if (error && error.response.status === 403) {
    //  console.log("has no rights to do this")
    //}

    if (error.response) {
        response = {
            status: error.response.status,
            publicMessage: error.response.statusText,
            ...error.response.data
        };
    }

    return Promise.reject(response);
}

function createRequest(url, data, type, customHeaders = {}, responseType ) {
    // eslint-disable-next-line no-undef
    const absoluteUrl = API_BASE_URL + url;

    const headers = {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        ...customHeaders,
        ...authHeader()// In my case always add auth header
    };

    // if (info && info.accessToken) {
    //     // const info = fetchAuthInfo();
    //     // headers.Authorization = `Bearer ${info.accessToken}`;
    // }

    return {
        url: absoluteUrl,
        headers,
        method: type,
        data,
        withCredentials: true,
        responseType: responseType
    };
}

function get(url, data = {}, customHeaders = {}) {
    const request = Object.assign({}, createRequest(url, null, "GET", customHeaders), {
        params: data,
        paramsSerializer: params =>
            stringify(params, { allowDots: true, skipNulls: true })
    });
    return axios(request)
        .then(response => response.data)
        .catch(handleError);
}

function post(url, data = null) {
    return axios(createRequest(url, data, "POST"))
        .then(response => response.data)
        .catch(handleError);
}

function put(url, data = null) {
    return axios(createRequest(url, data, "PUT"))
        .then(response => response.data)
        .catch(handleError);
}

function del(url, data = null) {
    return axios(createRequest(url, data, "DELETE"))
        .then(response => response.data)
        .catch(handleError);
}

function constructFetchUrl(url, data = null)
{
    return createRequest(
        url +
      "?" +
      stringify(data, { allowDots: true, skipNulls: true }, null, "GET")
    ).url;
}

function getFile(url, data = {}) {
    const request = Object.assign({}, createRequest(url, null, "GET", {}, 'blob'), {
        params: data,
        paramsSerializer: params =>
            stringify(params, { allowDots: true, skipNulls: true })
    });
    return axios(request)
        .then(response => response.data)
        .catch(handleError);
}

function getFilePost(url, data = {}) {
    const request = Object.assign({}, createRequest(url, data, "POST", {}, 'blob'), {
        params: data,
        paramsSerializer: params =>
            stringify(params, { allowDots: true, skipNulls: true })
    });
    return axios(request)
        .then(response => response.data)
        .catch(handleError);
}

export default {
    createRequest,
    constructFetchUrl,
    get,
    post,
    put,
    del,
    getFile,
    getFilePost,
};


/* ******************************************************************
    Code below is me trying to use Javascript fetch to do calls.
    It had numerous issues over the time e.g. constructing the urls params and so forth.
    In the end it was throwing errors when there was no json in success response so I abandoned it.
    AT least I tried.
 ****************************************************************** */

// // INSPIRATION:
// // https://github.com/Uraharadono/ReactTodo/blob/master/src/common/ajax.js
// // https://gauravsobti1.medium.com/simple-wrapper-over-fetch-api-3a48c8801fb6

// import { authHeader } from "./auth-header";

// function forwardTo(url) {
//   window.location = url;
// }

// function constructResponse(res) {
//   console.log(res);
//   if (res.ok) {
//     console.log(res);
//     // console.log(res.json());
//     // console.log(res.json() == null);
//     return res.json();
//   } else {
//     // handleError(res); // it would be better to use it like so, but for whatever reason I get error in promise

//     if (res && res.status === 401) {
//       forwardTo("/login");
//     }

//     return res.json().then(function(json) {
//       // to be able to access error status when you catch the error
//       return Promise.reject({
//         status: res.status,
//         ok: false,
//         message: json.message,
//         body: json
//       });
//     });
//   }
// }

// function handleError(error) {
//   // console.log(error);
//   let response = {};

//   if (error && error.status === 401) {
//     forwardTo("/login");
//   }

//   if (error) {
//     response = {
//       status: error.status,
//       publicMessage: error.statusText,
//       ...error.body
//     };
//   }

//   // console.log(response);
//   return Promise.reject(response);
// }

// function getAbsoluteUrl(url) {
//   return API_BASE_URL + url;
// }

// function createRequest(data, type, customHeaders = {}) {
//   const headers = {
//     "Content-Type": "application/json", // by default setting the content-type to be json type
//     "X-Requested-With": "XMLHttpRequest",
//     ...customHeaders,
//     ...authHeader()
//   };

//   // Add headers regardless - wont work cause we have object in our auth header so it will mess things up
//   // headers.Authorization = authHeader();

//   return {
//     method: type,
//     headers: headers,
//     body: data ? JSON.stringify(data) : null
//   };
// }

// function get(url, data = {}) {
//   const request = Object.assign({}, createRequest(url, null, "GET"), {
//     params: data,
//     paramsSerializer: params =>
//       stringify(params, { allowDots: true, skipNulls: true })
//   });
//   let abosoluteUrl = "";
//   if (data == {}) abosoluteUrl = getAbsoluteUrl(url);
//   else
//     abosoluteUrl =
//       getAbsoluteUrl(url) +
//       "?" +
//       Object.entries(data)
//         .map(([key, val]) => `${key}=${val}`)
//         .join("&");

//   // return fetch(abosoluteUrl, request)
//   return fetch(abosoluteUrl)
//     .then(response => constructResponse(response))
//     .catch(handleError);
// }

// function post(url, data = null) {
//   return fetch(getAbsoluteUrl(url), createRequest(data, "POST"))
//     .then(response => constructResponse(response))
//     .catch(handleError);
// }

// function put(url, data = null) {
//   return fetch(getAbsoluteUrl(url), createRequest(data, "PUT"))
//     .then(response => constructResponse(response))
//     .catch(handleError);
// }

// function del(url, data = null) {
//   return fetch(getAbsoluteUrl(url), createRequest(data, "DELETE"))
//     .then(response => response.data)
//     .catch(handleError);
// }

// export default {
//   get,
//   post,
//   put,
//   del
// };
