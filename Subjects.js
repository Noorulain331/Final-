import React, { useState } from "react";
import './Subjects.css';

function Subjects() {
  const [categories, setCategories] = useState({
    Mathematics: ["Algebra Basics", "Calculus - Differentiation", "Linear Algebra"],
    Science: ["Newton's Laws", "Periodic Table", "Photosynthesis Process"],
    Literature: ["Poetry Techniques", "Analyzing Shakespeare"],
  });

  const [searchTerm, setSearchTerm] = useState("");

  const filteredNotes = () => {
    if (!searchTerm.trim()) return categories;

    const result = {};
    Object.keys(categories).forEach((category) => {
      const filtered = categories[category].filter((note) =>
        note.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (filtered.length) {
        result[category] = filtered;
      }
    });
    return result;
  };

  return (
    <div className="App">
      <h1>Search and Filter Notes</h1>

      <div className="search-section">
        <input
          type="text"
          placeholder="Search by keyword..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="results">
        {Object.keys(filteredNotes()).length > 0 ? (
          Object.keys(filteredNotes()).map((category) => (
            <div key={category} className="category">
              <h2>{category}</h2>
              <ul>
                {filteredNotes()[category].map((note, index) => (
                  <li key={index}>{note}</li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p>No results found for "{searchTerm}"</p>
        )}
      </div>
    </div>
  );
}

export default Subjects;
