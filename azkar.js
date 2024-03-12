document.addEventListener('DOMContentLoaded', function () {
    toggleVisibility('morningAzkar', true);
    toggleVisibility('eveningAzkar', false);
});

var quranVisible = false;

fetch('azkar.json')
    .then(response => response.json())
    .then(data => {
        displayAzkar(data.morningAzkar, 'morningAzkar');
        displayAzkar(data.eveningAzkar, 'eveningAzkar');
    });

function displayAzkar(azkarData, elementId) {
    var azkarElement = document.getElementById(elementId);
    azkarElement.innerHTML = '';

    azkarData.forEach(azkar => {
        var azkarText = azkar.azkar;
        var azkarCount = azkar.count;

        var button = document.createElement('button');
        button.textContent = ` (${azkarCount})`;
        button.classList.add('counter-button');
        button.addEventListener('click', function() {
            decrementCounter(this);
        });

        var paragraph = document.createElement('h4');
        paragraph.textContent = azkarText;

        azkarElement.appendChild(paragraph);
        azkarElement.appendChild(button);
        azkarElement.appendChild(document.createElement('br'));
    });
}

function toggleVisibility(elementId, isVisible) {
    var element = document.getElementById(elementId);
    if (isVisible) {
        element.classList.remove("hidden");
        element.classList.add("visible");
    } else {
        element.classList.remove("visible");
        element.classList.add("hidden");
    }
}

function toggleQuran() {
    toggleVisibility('quranInfo', !quranVisible);
    toggleVisibility('morningAzkar', false);
    toggleVisibility('eveningAzkar', false);
    quranVisible = !quranVisible;
}

function decrementCounter(button) {
    var text = button.textContent;
    var countIndex = text.indexOf('(') + 1;
    var count = parseInt(text.substring(countIndex, text.length - 1));
    if (count > 0) {
        count--;
        button.textContent = text.substring(0, countIndex) + count + ')';
    }
}
