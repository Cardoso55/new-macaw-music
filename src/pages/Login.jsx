import logo from '../assets/logos/macawmusicslogo.png';
import '../styles/reset.css';
import '../styles/login.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (username.trim() && password.trim()) {
      const users = JSON.parse(localStorage.getItem('macawUsers')) || [];

      const foundUser = users.find(
        (u) => u.username === username && u.password === password
      );

      if (foundUser) {
        localStorage.setItem('macawUser', JSON.stringify(foundUser));
        alert(`Bem-vindo, ${username}!`);
        navigate('/');
      } else {
        alert('Usuário ou senha incorretos!');
      }
    } else {
      alert('Preencha todos os campos!');
    }
  };

  return (
    <div className="login-container">
      <div className="conteudo">
        <img src={logo} alt="macawmusic logo" className="logo" />
        <p className="titulo-cadastro">Bem-vindo de volta!</p>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username">Usuário:</label>
            <input
              type="text"
              id="username"
              name="username"
              required
              placeholder="Nome de usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Senha:</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" id="enviar">Continuar</button>
        </form>
        <p className="link-cadastro">
          Não tem uma conta? <a href="/register" className="botao-tem-login">Cadastre-se</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
