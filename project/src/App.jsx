import { useState } from 'react'
import api from './services/api';
import { BiZoomIn } from "react-icons/bi";
import './App.css'

function App() {

  const [input, setInput] = useState( );
  const [cep, setCep] = useState({ });

  const handleSearch = async ( ) => {

    if( input == '') {
      setInput("");
      alert('preencha o CEP');
    }

    try {
      const response = await api.get(`${input}/json`);
      console.log(response.data);
      return setCep(response.data);
    } catch {
      alert('houve um erro');
    }

  }

  return (

    <>
      <div className='container'>
        <h1 className='title'>
          Buscador de CEP
        </h1>

        <div className='containerInput'>
          <input type="text"
          placeholder='Digite aqui seu CEP'
          onChange={(event) => setInput(event.target.value)}
          value={input}
          />

          <button className='button' onClick={handleSearch}>
            <BiZoomIn className='icon'/>
          </button>
        </div>

        {Object.keys(cep).length>0 && (
          <main className='mainContainer'>
            <h2 className='description'>CEP: {cep.cep}</h2>
            <h3 className='description'>Cidade: {cep.localidade}</h3>
            <h3 className='description'>Unidade federativa: {cep.uf}</h3>
            <h3 className='description'>Bairro: {cep.bairro}</h3>
          </main>
        )}
      </div> 
    </>
  )
}

export default App
