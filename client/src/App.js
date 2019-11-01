import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [projects, setProjects] = useState(null);

  useEffect(() => {
    axios.get('http://127.0.0.1:4000/api/projects/')
      .then((res) => {
        setProjects(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  })

  return (
    projects && 
      <ol>
        {
          projects.map(({name, id}) => <li key={id}>{name}</li>)
        }
      </ol>
  );
}

export default App;
