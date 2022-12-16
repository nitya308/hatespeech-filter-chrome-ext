chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'get words') {

    // console.log("Message recieved");

    // get userID from chrome.storage.sync
    chrome.storage.sync.get("userID").then((result) => {

      // console.log("Got userID:", result.userID);

      const userID = result.userID;

      if (userID === undefined) {
        // console.log("userID is undefined");
        chrome.identity.getProfileUserInfo(function (info) {
          const email = info.email;
          // console.log("Got email:", email);
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
        // console.log("userID is defined, in else");
        // get words list from apiURL
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
    });
  }
});