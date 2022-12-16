chrome.runtime.sendMessage({ message: 'get words' }).then(() => {
  
  console.log("message executed");

  chrome.storage.sync.get("words").then((result) => {
    words = result.words;

    console.log("words:", words);
    var regex = new RegExp('\\b(' + words.join('|') + ')\\b', 'gi');

    var allElements = document.getElementsByTagName('*');

    for (var x = 0; x < allElements.length; x++) {
      var element = allElements[x];

      for (var y = 0; y < element.childNodes.length; y++) {
        var node = element.childNodes[y];

        if (node.nodeType === 3) {
          var text = node.nodeValue;

          var replacedText = text.replace(regex, '------');

          if (replacedText !== text) {
            element.replaceChild(document.createTextNode(replacedText), node);
          }
        }
      }
    }
  });
});

