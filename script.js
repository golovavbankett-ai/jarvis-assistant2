const button = document.getElementById("speak");
const output = document.getElementById("output");

// Проверяем поддержку распознавания речи
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
  const recognition = new SpeechRecognition();
  recognition.lang = "ru-RU";

  button.addEventListener("click", () => {
    output.textContent = "🎧 Слушаю...";
    recognition.start();
  });

  recognition.onresult = (event) => {
    const text = event.results[0][0].transcript.toLowerCase();
    output.textContent = "🗣 Ты сказал: " + text;
    answer(text);
  };

  recognition.onerror = () => {
    output.textContent = "❌ Ошибка при распознавании речи.";
  };
} else {
  output.textContent = "⚠ Голосовое распознавание не поддерживается этим браузером.";
}

// Функция ответов Джарвиза
function answer(message) {
  let reply = "";

  if (message.includes("привет")) reply = "Привет, друг! Я Джарвиз.";
  else if (message.includes("как дела")) reply = "Отлично, готов помогать!";
  else if (message.includes("время")) reply = "Сейчас " + new Date().toLocaleTimeString();
  else reply = "Не понял команду.";

  output.textContent = reply;
  speak(reply);
}

// Озвучка ответа
function speak(text) {
  const speech = new SpeechSynthesisUtterance(text);
  speech.lang = "ru-RU";
  speech.rate = 1;
  speech.pitch = 1;
  window.speechSynthesis.speak(speech);
}