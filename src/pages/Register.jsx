import React, { useState } from 'react';
import logo from '../assets/logos/macawmusicslogo.png';
import '../styles/reset.css';
import '../styles/register.css';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();

    if (username.trim() && password.trim()) {
      const users = JSON.parse(localStorage.getItem('macawUsers')) || [];

      const userExists = users.find((u) => u.username === username);
      if (userExists) {
        alert('Esse nome de usuário já existe!');
        return;
      }

      const updatedUsers = [...users, { username, password }];
      localStorage.setItem('macawUsers', JSON.stringify(updatedUsers));

      alert('Cadastro realizado com sucesso!');
      window.location.href = '/login'; 
    } else {
      alert('Preencha todos os campos!');
    }
  };

  return (
    <div className="login-container">
      <div className="conteudo">

        <img src={logo} alt="macawmusic logo" className="logo" />
        <p class="titulo-cadastro">Crie sua Conta</p>
        <form onSubmit={handleRegister}>
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
              placeholder="Digite uma senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
        <label>Email:</label>
        <input 
            placeholder='Digite um email'
            type="email"/>
          </div>
          <button type="submit" id="enviar">Cadastrar</button>
        </form>

        <p style={{ marginTop: '1rem' }}>
          Já tem conta? <a class="botao-tem-login" href="/login">Faça login</a>
        </p>
      </div>
    </div>
  );
}

export default Register;