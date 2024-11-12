
let flashcards = JSON.parse(localStorage.getItem('flashcards')) || [];
let currentEditId = null;


function addFlashcard() {
    const question = document.getElementById('new-question').value.trim();
    const answer = document.getElementById('new-answer').value.trim();

    if (question && answer) {
        const flashcard = { id: Date.now(), question, answer };
        flashcards.push(flashcard);
        localStorage.setItem('flashcards', JSON.stringify(flashcards));
        renderFlashcards();
        document.getElementById('new-question').value = '';
        document.getElementById('new-answer').value = '';
    } else {
        alert('Please provide both a question and an answer.');
    }
}

function renderFlashcards() {
    const flashcardsList = document.getElementById('flashcards');
    flashcardsList.innerHTML = '';

    flashcards.forEach(flashcard => {
        const li = document.createElement('li');
        li.classList.add('flashcard-item');
        li.innerHTML = `
            <div>
                <strong>${flashcard.question}</strong>
                <button onclick="showAnswer(${flashcard.id})">Show Answer</button>
            </div>
            <div>
                <button onclick="editFlashcard(${flashcard.id})">Edit</button>
                <button onclick="confirmDeleteFlashcard(${flashcard.id})">Delete</button>
            </div>
        `;
        flashcardsList.appendChild(li);
    });
}


function showAnswer(id) {
    const flashcard = flashcards.find(f => f.id === id);
    alert(`Answer: ${flashcard.answer}`);
}


function editFlashcard(id) {
    const flashcard = flashcards.find(f => f.id === id);
    document.getElementById('edit-question').value = flashcard.question;
    document.getElementById('edit-answer').value = flashcard.answer;
    currentEditId = id;
    document.getElementById('edit-form').style.display = 'block';
}


function saveEdit() {
    const question = document.getElementById('edit-question').value.trim();
    const answer = document.getElementById('edit-answer').value.trim();

    if (question && answer) {
        const flashcard = flashcards.find(f => f.id === currentEditId);
        flashcard.question = question;
        flashcard.answer = answer;
        localStorage.setItem('flashcards', JSON.stringify(flashcards));
        renderFlashcards();
        cancelEdit();
    } else {
        alert('Please provide both a question and an answer.');
    }
}


function cancelEdit() {
    document.getElementById('edit-form').style.display = 'none';
    document.getElementById('edit-question').value = '';
    document.getElementById('edit-answer').value = '';
}


function confirmDeleteFlashcard(id) {
    if (confirm('Are you sure you want to delete this flashcard?')) {
        deleteFlashcard(id);
    }
}


function deleteFlashcard(id) {
    flashcards = flashcards.filter(f => f.id !== id);
    localStorage.setItem('flashcards', JSON.stringify(flashcards));
    renderFlashcards();
}


renderFlashcards();
