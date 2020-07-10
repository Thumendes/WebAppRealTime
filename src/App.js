import React, { useRef, useState, useEffect } from "react";
import io from "socket.io-client";
import "./style.css";

const socket = io("http://localhost:3001");

const App = () => {
  const nameRef = useRef(null);
  const ageRef = useRef(null);
  const genreRef = useRef(null);
  const [pessoas, setPessoas] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    socket.emit("add", {
      name: nameRef.current.value,
      age: ageRef.current.value,
      genre: genreRef.current.value,
    });
  };

  useEffect(() => {
    socket.on("render", (data) => {
      setPessoas(data);
    });
  }, []);

  return (
    <div className="container">
      <div>
        {pessoas.map((pessoa, index) => (
          <div className="pessoa" key={index}>
            <span className={pessoa.genre === "M" ? "male" : "female"}>
              {pessoa.genre}
            </span>
            <span>{pessoa.name}</span>
            <span>{pessoa.age}</span>
            <button onClick={() => socket.emit("delete", index)}>Exclui</button>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="form">
        <h1>Mini Chat</h1>
        <input ref={nameRef} placeholder="name" />
        <input ref={ageRef} placeholder="age" />
        <input ref={genreRef} placeholder="genre" />
        <button>Enviar</button>
      </form>
    </div>
  );
};

export default App;
