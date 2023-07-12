import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import api from '../../services/api';
import { setItem, getItem } from '../../utils/storage';

function SignIn() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const token = getItem('token');

    if (token) {
      navigate('/main');
    }
  });

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (!username || !password) {
        setError('Preencha todos os campos!');
        return;
      }

      const response = await api.post('/login', {
        username, password
      });

      const { token, user } = response.data;
      setItem('token', token);
      setItem('username', user.username);

      navigate('/main');
    } catch (error) {
      setError(error.response.data.mensagem);
    }
  }

  function registerUser() {
    navigate('/signUp');
  }

  return (
    <div className='container'>
      <form className='form-sign-in'>
        <h2>My Bank - Banco Digital</h2>
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
        <div className='buttons'>
          <button onClick={handleSubmit}>Login</button>
          <button onClick={registerUser}>Cadastre-se</button>
        </div>
        {error && <span>{error}</span>}
      </form>
    </div>
  );
}

export default SignIn;
