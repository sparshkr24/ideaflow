import React, { useState, useEffect } from "react";

const NotesApp = () => {
  const [notes, setNotes] = useState<{ text: string; references: number[] }[]>(
    []
  );
  const [inputNote, setInputNote] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState<number | null>(null);

  useEffect(() => {
    if (inputNote.endsWith(">") && inputNote.length > 1) {
      const filterValue = inputNote.slice(0, -1).toLowerCase();
      const filteredSuggestions = notes
        .map((note) => note.text)
        .filter((text) => text.toLowerCase().startsWith(filterValue));
      setSuggestions(filteredSuggestions);
      setSelectedSuggestionIndex(null);
    } else {
      setSuggestions([]);
      setSelectedSuggestionIndex(null);
    }
  }, [inputNote, notes]);

  const handleAddNote = () => {
    if (inputNote.trim() === "") {
      return;
    }

    const newNote = {
      text: inputNote,
      references: [],
    };

    setNotes((prevNotes) => [newNote, ...prevNotes]);
    setInputNote("");
    setSuggestions([]);
  };

  const handleNoteInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputNote(event.target.value);
  };

  const handleReference = (noteIndex: number) => {
    const referenceText = notes[noteIndex].text;
    setInputNote(inputNote + ` <${referenceText}> `);
    setSuggestions([]);
  };

  const handleSuggestionSelect = (index: number) => {
    if (suggestions[index]) {
      setInputNote(suggestions[index] + " ");
      setSuggestions([]);
      setSelectedSuggestionIndex(null);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setSelectedSuggestionIndex((prevIndex) =>
        prevIndex === null ? suggestions.length - 1 : Math.max(prevIndex - 1, 0)
      );
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      setSelectedSuggestionIndex((prevIndex) =>
        prevIndex === null ? 0 : Math.min(prevIndex + 1, suggestions.length - 1)
      );
    } else if (event.key === "Enter") {
      event.preventDefault();
      if (selectedSuggestionIndex !== null) {
        handleSuggestionSelect(selectedSuggestionIndex);
      } else {
        handleAddNote();
      }
    }
  };

  return (
    <div className="p-4 bg-gray-800 text-white">
      <h1 className="text-2xl font-semibold mb-4">Notes App</h1>
      <div className="flex mb-4">
        <input
          type="text"
          className="border rounded p-2 mr-2 flex-grow bg-gray-700 text-white"
          placeholder="Write a note..."
          value={inputNote}
          onChange={handleNoteInputChange}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={handleAddNote}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Save
        </button>
      </div>
      {suggestions.length > 0 && (
        <ul className="absolute bg-gray-700 text-white p-2 mt-2 w-full border rounded">
          {suggestions.map((suggestion, index) => (
            <li
              key={suggestion}
              className={`cursor-pointer ${index === selectedSuggestionIndex ? "bg-blue-500 text-white" : ""}`}
              onClick={() => handleSuggestionSelect(index)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
      <div>
        {notes.map((note, index) => (
          <div key={index} className="border p-2 mb-2 bg-gray-700">
            {`${notes.length - index}. ${note.text}`}
            {note.references.map((referenceIndex: number) => (
              <span
                key={referenceIndex}
                className="text-blue-500 ml-2 cursor-pointer hover:underline"
                onClick={() => handleReference(referenceIndex)}
              >
                {"<>"}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotesApp;
