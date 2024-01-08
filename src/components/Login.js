// Login.js
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const history = useHistory();

  const handleLogin = () => {
    // Lógica de autenticación
    // Incrementar loginAttempts si falla
    // Bloquear si loginAttempts alcanza 3

    if (username === '123' && password === '123') {
      history.push('/menu');
    } else {
      setLoginAttempts(loginAttempts + 1);

      if (loginAttempts === 2) {
        setIsLocked(true);
      }
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input type="text" placeholder="Usuario" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin} disabled={isLocked}>
        Iniciar Sesión
      </button>
      {isLocked && <p>¡Tu cuenta ha sido bloqueada!</p>}
    </div>
  );
};

export default Login;
