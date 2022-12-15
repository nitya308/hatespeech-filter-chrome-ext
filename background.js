document.addEventListener('DOMContentLoaded', () => {
  // get words list from apiURL
  // save words list to chrome.storage.sync

  const apiURL = "";

  fetch(apiURL + new URLSearchParams({ userID: "value" }))
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
});
