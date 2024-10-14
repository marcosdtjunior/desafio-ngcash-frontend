import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import api from '../../services/api';

function SignUp() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (!username || !password) {
        setError('Preencha todos os campos!');
        return;
      }

      await api.post('/user', {
        username, password
      });

      navigate('/');
    } catch (error) {
      setError(error.response.data.mensagem);
    }
  }

  function backToLogin() {
    navigate('/');
  }

  return (
    <div className='container'>
      <form className='form-sign-in'>
        <h2>Cadastro</h2>
        <div className='inputs' onClick={(e) => setError('')}>
          <input
            type="text"
            placeholder='nome de usuário'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder='senha'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className='signUpButtons'>
          <button onClick={handleSubmit}>Cadastrar</button>
          <button onClick={backToLogin}>Voltar para Login</button>
        </div>
        {error && <span>{error}</span>}
      </form>
    </div>
  );
}

export default SignUp;
