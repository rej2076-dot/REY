// Вставь свой ключ прямо сюда
const API_KEY = "AIzaSyB9X7BiaWzVDyB_zO50VVRwEsYjoeGP0K0"; 

async function askGemini(text) {
    const greeting = document.getElementById('greeting');
    greeting.innerText = "РЭЙ: Загрузка...";
    
    console.log("Отправляем запрос:", text);

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: text }] }]
            })
        });

        const data = await response.json();
        console.log("Ответ от Google:", data); // ЭТО ВАЖНО

        if (data.candidates && data.candidates[0].content.parts[0].text) {
            greeting.innerText = "РЭЙ: " + data.candidates[0].content.parts[0].text;
        } else {
            greeting.innerText = "РЭЙ: Ответ получен, но формат неверный.";
        }
    } catch (error) {
        console.error("Ошибка при запросе:", error);
        greeting.innerText = "РЭЙ: Ошибка сети. Смотри консоль.";
    }
}

// Проверь, чтобы этот кусок кода привязывал функцию к кнопке или полю ввода
// Например, если у тебя есть кнопка с id "send-btn":
// document.getElementById('send-btn').addEventListener('click', () => {
//     const input = document.getElementById('user-input').value;
//     askGemini(input);
// });
