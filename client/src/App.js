import "./App.css";
import React, {useState, useEffect} from "react";
import { Routes, Route } from "react-router-dom";
import AuthorForm from "./components/AuthorForm";
import AuthorHome from "./components/AuthorHome";
import axios from "axios";
import EditAuthorForm from "./components/EditAuthorForm";

function App() {
  const [authors, setAuthors] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/authors")
      .then((res) => {
        setAuthors(res.data.authors);
        setLoaded(true);
      })
      .catch((err) => console.error(err));
  }, authors);

  const removeFromDom = (authorId) => {
    setAuthors(authors.filter((author) => author._id != authorId));
  };
  return <div className="App">
    <Routes>
      <Route path="/authors/new" element={<AuthorForm />} />
      {loaded && <Route path="/" element={<AuthorHome authors={authors} removeFromDom={removeFromDom} />} />}
      <Route path="/authors/:id/edit" element={<EditAuthorForm />} />
    </Routes>
  </div>;
}

export default App;
