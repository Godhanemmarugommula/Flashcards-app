import React, { useState } from 'react';
import './App.css';

function App() {
  const [flashcards, setFlashcards] = useState([
    { id: 1, question: 'What is React?', answer: 'A JavaScript library for building user interfaces.' },
    { id: 2, question: 'What is a component?', answer: 'A building block of a React application.' },
  ]);
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleAddFlashcard = () => {
    if (newQuestion && newAnswer) {
      const newFlashcard = {
        id: flashcards.length + 1,
        question: newQuestion,
        answer: newAnswer,
      };
      setFlashcards([...flashcards, newFlashcard]);
      setNewQuestion('');
      setNewAnswer('');
    }
  };

  const handleEditFlashcard = (index) => {
    setEditMode(true);
    setEditIndex(index);
    setNewQuestion(flashcards[index].question);
    setNewAnswer(flashcards[index].answer);
  };

  const handleSaveEdit = () => {
    const updatedFlashcards = flashcards.map((card, index) =>
      index === editIndex ? { ...card, question: newQuestion, answer: newAnswer } : card
    );
    setFlashcards(updatedFlashcards);
    setEditMode(false);
    setEditIndex(null);
    setNewQuestion('');
    setNewAnswer('');
  };

  const handleDeleteFlashcard = (index) => {
    const updatedFlashcards = flashcards.filter((_, i) => i !== index);
    setFlashcards(updatedFlashcards);
    setCurrentIndex(0);
    setFlipped(false);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
    setFlipped(false);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? flashcards.length - 1 : prevIndex - 1
    );
    setFlipped(false);
  };

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  const currentFlashcard = flashcards[currentIndex];

  return (
    <div className="app">
      <h1>Flashcard Learning Tool</h1>
      <div className="flashcard-container">
        {currentFlashcard && (
          <div className={`flashcard ${flipped ? 'flipped' : ''}`} onClick={handleFlip}>
            <div className="front">
              <p>{currentFlashcard.question}</p>
            </div>
            <div className="back">
              <p>{currentFlashcard.answer}</p>
            </div>
          </div>
        )}
      </div>
      <div className="navigation">
        <button onClick={handlePrevious} className="small-button">Previous</button>
        <button onClick={handleNext} className="small-button">Next</button>
      </div>
      <div className="dashboard">
        <h2>{editMode ? 'Edit Flashcard' : 'Add Flashcard'}</h2>
        <div className="input-group">
          <input
            type="text"
            placeholder="Question"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            className="input-field"
          />
          <textarea
            placeholder="Answer"
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
            className="textarea-field"
          />
        </div>
        {editMode ? (
          <button onClick={handleSaveEdit} className="submit-button">Save</button>
        ) : (
          <button onClick={handleAddFlashcard} className="submit-button">Add</button>
        )}
      </div>
      <div className="flashcard-actions">
        {flashcards.map((card, index) => (
          <div key={card.id} className="flashcard-actions-item">
            <div className="flashcard-info">
              <p className="flashcard-question">Q: {card.question}</p>
              <p className="flashcard-answer">A: {card.answer}</p>
            </div>
            <div className="flashcard-buttons">
              <button onClick={() => handleEditFlashcard(index)} className="edit-button">Edit</button>
              <button onClick={() => handleDeleteFlashcard(index)} className="delete-button">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
