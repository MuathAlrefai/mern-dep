import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AuthorHome = (props) => {
    
  const deleteAuthor = (authorId) => {
    axios
      .delete("http://localhost:8000/api/authors/" + authorId + "/delete")
      .then((res) => {
        props.removeFromDom(authorId);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
        <h1>Favorite Authors</h1>
        <p><Link to={"/authors/new"}>Add a new Author</Link></p>
      <table style={{ border: "1px solid black", textAlign: "center", margin: '0 auto' }}>
        <tbody>
          <tr>
            <th style={{ border: "1px solid black" }}>Author</th>
            <th style={{ border: "1px solid black" }}>Actions Available</th>
          </tr>
          {props.authors.map((author, i) => (
            <tr>
              <td key={i} style={{ border: "1px solid black" }}>
                {author.name}
              </td>
              <td style={{ border: "1px solid black" }}>
                <button>
                  <Link to={"/authors/" + author._id + "/edit"} style={{color: 'black', textDecoration: 'none'}}>Edit</Link>
                </button>
                <></> | <button onClick={ e => deleteAuthor(author._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default AuthorHome;
