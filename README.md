# Hatespeech WebFilter Chrome Extension
**Author:** Nitya Agarwala  
**Created:** 12 November 2022 <br/>
**Description:** client and backend server for WebSafe App <br/>

## Summary
This is the chrome extension for the partner **WebSafe** web app: [here](https://github.com/nitya308/hatespeech-webfilter) <br/><br/>
The internet can be an unsafe place for many with the amount of content out there. While some sites have thier own measures to counteract hate speech, there is no ne solution that makes the entire web safe, custom to the user's needs. <br/> <br/>
That's where this app comes in. It allows the user to add a custom set of trigger words. These words will then be blurred out on all website the user visits and the user can choose to reveal them if they want. <br/> <br/>
The app uses **Firebase** to authenticate and store users along with their word preferences. The web app allows users to enter custom words, and toggles showing or hiding a list of the user's banned words. **React** and **Redux** actions are used to update the state and store the user information across the app. The data is sent to the Firebase database using the **Node.js** backend.
This is the chrome extension that blurs out any trigger words by fetching the custom list of words to watch for each user from the hatespeech-webfilter API.

## Services
This extension uses Google Oauth2.0 authentication by calling chrome.identity services and using an interactive popup to prompt users to sign in. 
It connects to WebSafe's backend API to retrieve and add data to the Google Cloud Firestore database.

##Scripts
The service worker script is called `background.js`. 
It has two main functions: one to authenticate the user and one to `fetch` words using a query to the WebSafe backend API.<br/>
It uses `sync storage` provided by chrome to update the values once fetched so repeated calls are not made to the API. Once filled, values are cached unless the user updates thier word list using the Web App. <br/>
The service implements the `chrome.runtime.onMessage.addListener` with function to listen for appropriate messages from the content script and launch functions as neccesary.
<br/><br/>

The content script is called `content.js`. This runs whenever a new page is loaded. It sends a message to the background script to fetch the word list for the signed in user. 
Once the operation is complete, the trigger words list is accessed from `chrome.storage.sync`.
```
chrome.storage.sync.get("words").then((result) => {
  }
});
```
