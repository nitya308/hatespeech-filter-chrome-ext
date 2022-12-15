document.addEventListener('DOMContentLoaded', () => {
  // get words list from apiURL
  // save words list to chrome.storage.sync

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
);
