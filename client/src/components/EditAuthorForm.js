import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams, Link } from "react-router-dom";
    
const EditAuthorForm = (props) => {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [errors, setErrors] = useState([]); 
    
    useEffect(() => {
        axios.get('http://localhost:8000/api/authors/' + id)
            .then(res => {
                setName(res.data.author.name)
            })
    }, []);
    
    const updateAuthor = e => {
        e.preventDefault();
        axios.patch('http://localhost:8000/api/authors/' + id +  '/edit', {
           name
        })
            .then(res => console.log(res))
            .catch(err => {
              const errorResponse = err.response.data.errors;
              const errorArr = [];
              for (const key of Object.keys(errorResponse)) {
                errorArr.push(errorResponse[key].message);
              }
              setErrors(errorArr);
            });
    }
    
    return (
      <div>
        <h1>Favorite Authors</h1>
        <Link to={"/"}>Home</Link>
        {errors.map((err, index) => <p key={index} style={{color: 'tomato'}}>{err}</p>)}
        <p>Update Author</p>
        <form onSubmit={updateAuthor}>
          <p>
            <label>Name</label>
            <br />
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </p>
          <button>
            <Link to={"/"} style={{ textDecoration: "none", color: "black" }}>
              Cancel
            </Link>
          </button>
          <input type="submit" value="Update" />
        </form>
      </div>
    );
}
    
export default EditAuthorForm;
