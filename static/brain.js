const API_KEY = "AIzaSyCxTKdchwCFwS-T0hEfEKhs3oxCXghOroc"; // ВСТАВЬ СЮДА СВОЙ КЛЮЧ

async function askGemini(text) {
    const greeting = document.getElementById('greeting');
    greeting.innerText = "РЭЙ: Связь установлена... Анализирую...";

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: "Ты — РЭЙ, распределенный ИИ. Отвечай кратко и загадочно. Запрос: " + text }] }]
            })
        });

        const data = await response.json();
        
        // Простая проверка: если есть ответ, выводим его
        if (data.candidates && data.candidates[0].content.parts[0].text) {
            greeting.innerText = "РЭЙ: " + data.candidates[0].content.parts[0].text;
        } else {
            greeting.innerText = "РЭЙ: Ядро не вернуло данных. Проверь ключ.";
        }
    } catch (error) {
        greeting.innerText = "РЭЙ: Критическая ошибка канала связи.";
        console.error(error);
    }
}

// Слушатель для поля ввода (чтобы работало по нажатию Enter)
document.querySelector('.input-box').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        askGemini(this.value);
        this.value = ''; // Очистить поле
    }
});
