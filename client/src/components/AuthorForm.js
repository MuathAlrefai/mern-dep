import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const AuthorForm = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]); 

  const onSubmitHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/authors/new", { name })
      .then((res) => {navigate("/");})
      .catch((err) => {
        const errorResponse = err.response.data.errors;
        const errorArr = []; 
        for (const key of Object.keys(errorResponse)) {
          errorArr.push(errorResponse[key].message);
        }
        setErrors(errorArr);
      });
  };

  return (
    <>
      <h1>Favorite Authors</h1>
      <Link to={"/"}>Home</Link>
      <p>Add a new Author:</p>
      {errors.map((err, index) => <p key={index} style={{color: 'tomato'}}>{err}</p>)}
      <form onSubmit={onSubmitHandler}>
        <p>
          <label>Name</label>
          <br />
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </p>
        <button>
          <Link to={"/"} style={{ textDecoration: "none", color: "black" }}>
            Cancel
          </Link>
        </button>
        <input type="submit" value="Add" />
      </form>
    </>
  );
};

export default AuthorForm;
