
window.onload = function() {
    setTimeout(function() {
        document.getElementById('continue-btn').style.display = 'inline-block';
    }, 2000);
};


let keyboard = document.getElementById('keyboard');
let qwertyLayout = "QWERTYUIOPASDFGHJKLZXCVBNM";
const getRandomWord = () => {
    return words[Math.floor(Math.random() * words.length)];
}

for (let i = 0; i < qwertyLayout.length; i++) {
    let button = document.createElement('button');
    button.textContent = qwertyLayout[i];
    keyboard.appendChild(button);
}