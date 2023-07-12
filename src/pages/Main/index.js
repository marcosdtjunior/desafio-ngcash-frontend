import './styles.css';
import { getItem, clearAll } from '../../utils/storage';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { useEffect, useState, useRef } from 'react';

function Main() {
  const navigate = useNavigate();
  const username = getItem('username');
  const token = getItem('token');
  const [balance, setBalance] = useState(0);
  const [depositValue, setDepositValue] = useState(0);
  const [withdrawValue, setWithdrawValue] = useState(0);
  const [transferValue, setTransferValue] = useState(0);
  const [error, setError] = useState('');

  const selectRef = useRef(null);
  const inputDepRef = useRef(null);
  const inputWitRef = useRef(null);
  const inputTraRef = useRef(null);

  useEffect(() => {
    getUserBalance();
    getUsers();
    inputDepRef.current.value = '';
    inputWitRef.current.value = '';
    inputTraRef.current.value = '';
  }, []);

  function returnToLogin() {
    clearAll();
    navigate('/');
  }

  async function getUserBalance() {
    try {
      const response = await api.get('/balance', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setBalance(response.data.accountBalance);

    } catch (error) {
      setError(error.response.data.message);
    }
  }

  async function getUsers() {
    try {
      const response = await api.get('/users', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      for (let item of response.data) {
        let option = document.createElement('option');
        option.appendChild(document.createTextNode(item.username));
        option.value = item.id;
        selectRef.current.appendChild(option);
      }

    } catch (error) {
      setError(error.response.data.message);
    }
  }

  async function makeDeposit() {
    try {
      await api.post('/deposit', { value: depositValue }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      inputDepRef.current.value = '';
      getUserBalance();

    } catch (error) {
      setError(error.response.data.message);
    }
  }

  async function makeWithdraw() {
    try {
      await api.post('/withdraw', { value: withdrawValue }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      inputWitRef.current.value = '';
      getUserBalance();

    } catch (error) {
      setError(error.response.data.message);
    }
  }

  async function makeTransfer() {
    try {
      await api.post('/transfer', {
        transferUsername: selectRef.current.options[selectRef.current.selectedIndex].text,
        value: transferValue
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      inputTraRef.current.value = '';
      getUserBalance();

    } catch (error) {
      setError(error.response.data.message);
    }
  }

  return (
    <div className='container' onClick={(e) => setError('')}>
      <nav>
        <h1>My Bank</h1>
        <h2>{username}</h2>
        <a href='/' onClick={returnToLogin}>Sair</a>
      </nav>
      <div className='panels'>
        <div className='userPanel'>
          <h3>SALDO</h3>
          <h3>R$ {balance},00</h3>
        </div>
        <div className='operationsPanel'>
          <div className='depositPanel'>
            <button onClick={makeDeposit}>Realizar depósito</button>
            <input
              ref={inputDepRef}
              type='number'
              value={depositValue}
              onChange={(e) => setDepositValue(e.target.value)}
            />
          </div>
          <div className='withdrawPanel'>
            <button onClick={makeWithdraw}>Realizar saque</button>
            <input
              ref={inputWitRef}
              type='number'
              value={withdrawValue}
              onChange={(e) => setWithdrawValue(e.target.value)}
            />
          </div>
          <div className='transferPanel'>
            <button onClick={makeTransfer}>Realizar transferência</button>
            <input
              ref={inputTraRef}
              type='number'
              value={transferValue}
              onChange={(e) => setTransferValue(e.target.value)}
            />
          </div>
          <div className='userTransfer'>
            <label>Selecione um usuário:</label>
            <select ref={selectRef}></select>
          </div>
        </div>
        {error && <span>{error}</span>}
      </div>
    </div>
  );
}

export default Main;
