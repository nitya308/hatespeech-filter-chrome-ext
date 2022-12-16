chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'get words') {

    // get userID from chrome.storage.sync
    chrome.storage.sync.get("userID").then((result) => {

      const userID = result.userID;
      auth();

      // if (userID === undefined) {
      //   // console.log("userID is undefined");
      //   auth();
      //   // now get words list from apiURL
      //   getWords(email);
      // }

      // else {
      //   // console.log("userID is defined, in else");
      //   // get words list from apiURL
      //   getWords(userID);
      // }
    });
  }
});

function auth() {
  var auth_url = 'https://accounts.google.com/o/oauth2/auth?';
  var client_id = '908196517973-uh3j9o4mrbl187al3pnd8141he4vt689.apps.googleusercontent.com';
  var redirect_url = chrome.identity.getRedirectURL();
  var auth_params = {
    client_id: client_id,
    redirect_uri: redirect_url,
    response_type: 'token',
    scope: 'openid email',
  };
  console.log('HERE');
  const url = new URLSearchParams(Object.entries(auth_params));
  url.toString();
  auth_url += url;

  chrome.identity.launchWebAuthFlow({ url: auth_url, interactive: true }, function (redirectUrl) {
    if (redirectUrl != null) {
      console.log(redirectUrl);
      // The ID token is in the URL hash
      const urlHash = redirectUrl.split('#')[1];
      const params = new URLSearchParams(urlHash);
      const jwt = params.get('access_token');
      console.log("JWT:", jwt);

      // var base64Url = jwt.split('.')[1];
      // var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      // var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      //   return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      // }).join(''));

      // console.log(JSON.parse(jsonPayload));

      // Parse the JSON Web Token
      const base64Url = jwt.split('.')[1];
      // const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      // console.log('base64', base64);
      var payload = JSON.parse(base64urlDecode(base64Url));
      console.log('token', payload);

      // // store token.userID in chrome.storage.sync
      // chrome.storage.sync.set({ userID: userID })

      return userID
    }
  });
}

function getWords(userID) {
  const apiURL = "http://localhost:3001/api/words?";
  fetch(apiURL + new URLSearchParams({ userID: userID }))
    .then((response) => {
      console.log("Got response:", response);
      return (response.json());
    })
    .then((data) => {
      console.log(data);
      chrome.storage.sync.set({ words: data })
        .then(() => {
          console.log("words in storage is set to " + data);
        });
    })
    .catch((error) => {
      console.log(error);
    });
}