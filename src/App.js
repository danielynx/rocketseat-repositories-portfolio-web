import React, { useState, useEffect } from "react";
import qs from 'qs';

import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  
  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const title = `New Repository ${Date.now()}`;

    const repository = {
      title,
      "url": `https://github.com/danielynx/${title}`,
      "techs": [
        "NodeJS",
        "ReactJS",
        "React Native"
      ]
    };

    const response = await api.post('repositories', repository);

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {    
    await api.delete(`repositories/${id}`);

    const repositoryIndex = repositories.findIndex(repository => repository.id === id);

    repositories.splice(repositoryIndex, 1);

    setRepositories([...repositories]);
  }

  return (
    <>
      <ul data-testid="repository-list">
        {repositories.map(repository => 
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>)
        }
      </ul>
      <button onClick={handleAddRepository}>
        Adicionar
      </button>
    </>
  );
}

export default App;
