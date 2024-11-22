document.addEventListener("DOMContentLoaded", function () {
    // Funzione per l'effetto di scrittura automatica con controllo della velocità tramite 'delay'
    function typeEffect(element, text, delay, callback) {
        let index = 0;
        element.innerHTML = ""; // Pulisce il contenuto dell'elemento all'inizio

        function addLetter() {
            if (index < text.length) {
                element.innerHTML += text.charAt(index); // Aggiungi il prossimo carattere
                index++;
                setTimeout(addLetter, delay); // Tempo tra i caratteri
            } else if (callback) {
                callback(); // Chiama la callback per passare al prossimo elemento
            }
        }

        addLetter(); // Inizia l'animazione
    }

    // Seleziona tutti gli elementi di testo da animare in ordine
    const elements = Array.from(document.querySelectorAll("h2, h3, p, a, li"));

    // Salva il testo originale di ciascun elemento e pulisci il contenuto
    const originalTexts = elements.map(element => {
        const text = element.innerText;
        element.innerHTML = ""; // Svuota temporaneamente il contenuto per nasconderlo
        return text;
    });

    // Funzione per animare ciascun elemento uno alla volta
    function animateElementsInSequence(index = 0, delay = 30) {
        if (index < elements.length) {
            const element = elements[index];
            const text = originalTexts[index]; // Recupera il testo originale
            typeEffect(element, text, delay, function () {
                animateElementsInSequence(index + 1, delay); // Passa all'elemento successivo con lo stesso delay
            });
        }
    }

    // Avvia l'animazione del primo elemento con il delay desiderato (in millisecondi)
    animateElementsInSequence(0, 30); // Cambia '100' per modificare la velocità generale
});
