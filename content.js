chrome.storage.sync.get("words").then((result) => {
  console.log("Value currently is " + result.key);
  var allElements = document.getElementsByTagName('*');

  for (var x = 0; x < allElements.length; x++) {
    var element = allElements[x];

    for (var y = 0; y < element.childNodes.length; y++) {
      var node = element.childNodes[y];

      if (node.nodeType === 3) {
        var text = node.nodeValue;

        var replacedText = text.replace(/text/gi, '------');

        if (replacedText !== text) {
          element.replaceChild(document.createTextNode(replacedText), node);
        }
      }
    }
  }
});

