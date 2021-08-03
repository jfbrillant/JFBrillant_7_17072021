export function decodeHTMLEntities(input) {
    var textArea = document.createElement("textarea");
    textArea.innerHTML = input;
    return textArea.value;
  }