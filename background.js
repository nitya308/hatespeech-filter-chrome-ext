chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'login') {
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
        // The ID token is in the URL hash
        const urlHash = redirectUrl.split('#')[1];
        const params = new URLSearchParams(urlHash);
        const jwt = params.get('id_token');

        // Parse the JSON Web Token
        const base64Url = jwt.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        const token = JSON.parse(atob(base64));

        console.log('token', token);
        // store token.userID in chrome.storage.sync
        chrome.storage.sync.set({ userID: token.userID })

        


      }
    });
  }

  else if (request.message === 'getWords') {
    chrome.storage.sync.get("userID").then((result) => {
      console.log("Value currently is " + result.userID);
      const apiURL = "http://localhost:3001/api/words";
      fetch(apiURL + new URLSearchParams({ userID: result.userID }))
        .then((response) => {
          return (response.json());
        })
        .then((data) => {
          console.log(data);
          chrome.storage.sync.set({ words: data })
            .then(() => {
              console.log("Value is set to " + value);
            });
        })
    })
      .catch((error) => {
        console.log(error);
      });
  }

});