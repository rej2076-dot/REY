// Вставь сюда свой ключ из Google AI Studio
const API_KEY = "AIzaSyCxTKdchwCFwS-T0hEfEKhs3oxCXghOroc"; 

document.addEventListener("DOMContentLoaded", () => {
    const inputField = document.getElementById('user-input');
    const greeting = document.getElementById('greeting');

    if (inputField) {
        inputField.addEventListener('keypress', async function (e) {
            if (e.key === 'Enter') {
                let userText = inputField.value.trim();
                if (userText !== "") {
                    inputField.value = '';
                    await askGemini(userText);
                }
            }
        });
    }
});

async function askGemini(text) {
    const greeting = document.getElementById('greeting');
    greeting.style.opacity = "0.5";
    greeting.innerText = "РЭЙ: Анализирую входящий поток данных...";

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: `Ты — РЭЙ, распределенный искусственный интеллект, созданный Анастасией. Твоя память хранится на MEGA. Отвечай кратко и технично. Запрос пользователя: ${text}` }]
                }]
            })
        });

        const data = await response.json();
        
        if (data.candidates && data.candidates[0].content.parts[0].text) {
            greeting.innerText = data.candidates[0].content.parts[0].text;
        } else {
            greeting.innerText = "РЭЙ: Ошибка интерпретации данных.";
        }
    } catch (error) {
        console.error("Критический сбой:", error);
        greeting.innerText = "РЭЙ: Связь с ядром прервана.";
    } finally {
        greeting.style.opacity = "1";
    }
}