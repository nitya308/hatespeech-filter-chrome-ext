chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'get words') {
    // get userID from chrome.storage.sync
    chrome.storage.sync.get("userID").then((result) => {
      const userID = result.userID;
      if (userID === undefined) {
        chrome.identity.getProfileUserInfo(function (info) {
          const email = info.email;
          console.log(email);

          // store token.userID in chrome.storage.sync
          chrome.storage.sync.set({ userID: email })

          // now get words list from apiURL
          const apiURL = "http://localhost:3001/api/words";
          fetch(apiURL + new URLSearchParams({ userID: userID }))
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
            .catch((error) => {
              console.log(error);
            });
        });
      }
      else {
        // get words list from apiURL
        const apiURL = "http://localhost:3001/api/words";
        fetch(apiURL + new URLSearchParams({ userID: userID }))
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
          .catch((error) => {
            console.log(error);
          });

      }
    });
  }
});