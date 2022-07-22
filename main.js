// Fikri Rahmat Nurhidayat
// https://microsoft.github.io/monaco-editor/api/modules/monaco.editor.html

const container = document.getElementById("container");
const answers = [];
const initialCode = `function addTwoNumber(a, b) {
  return __BLANKFILL__ + __BLANKFILL__;
}
`;

var editor = monaco.editor.create(container, {
  value: initialCode,
  minimap: {
    enabled: false,
  },
  theme: "vs-dark",
  scrollbar: {
    vertical: "hidden",
    horizontal: "hidden",
  },
  language: "javascript",
});

editor.onDidChangeModelContent(handleTextChange);

// Set initial value
handleTextChange(initialCode);

function handleTextChange() {}

function createCode() {
  if (answers.length === 0) return initialCode;

  let code = initialCode;

  answers.forEach((answer) => {
    code = code.replace("__BLANKFILL__", answer);
  });

  return code;
}

function onAnswerPicked(v) {
  answers.push(v);
  document.dispatchEvent(answer);
}

const answer = new CustomEvent("answer", {
  bubbles: true,
  cancelable: false,
  detail: { code: () => createCode() },
});

document.addEventListener("answer", function (e) {
  monaco.editor
    .colorize(e.detail.code(), "javascript", {
      theme: "vs-dark",
      tabSize: 2,
    })
    .then((content) => {
      content = content.replace(
        /__BLANKFILL__/g,
        '<input type="text" class="box" disabled>'
      );
      container.innerHTML = content;
    })
    .catch(console.error);
});

document.dispatchEvent(answer);
