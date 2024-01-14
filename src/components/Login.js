// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  Input,
  FormGroup,
  ModalFooter,
} from 'reactstrap';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css'; // Importa los estilos de SweetAlert2
import styles from './css/Login.module.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    // Lógica de autenticación
    // Incrementar loginAttempts si falla
    // Bloquear si loginAttempts alcanza 3

    if (username === '123' && password === '123') {
      navigate('/menu'); // Aquí es donde se realiza la navegación
    } else {
      setLoginAttempts(loginAttempts + 1);

      if (loginAttempts === 2) {
        setIsLocked(true);
        showLockedModal();
      }
    }
  };

  const showLockedModal = () => {
    setIsModalOpen(true);

    Swal.fire({
      icon: 'error',
      title: 'Cuenta Bloqueada',
      text: '¡Tu cuenta ha sido bloqueada!',
    });
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.cuerpo} >
        <Card className={styles.card}>
          <CardHeader className={styles.cardheader}>
            <h2>Login</h2>
          </CardHeader>
          <CardBody className={styles.cardbody}>
            <Input
              type="text"
              placeholder="Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={handleLogin} disabled={isLocked}>
              Iniciar Sesión
            </Button>
            {isLocked && (
              <p>
                ¡Tu cuenta ha sido bloqueada!{' '}
                <Button onClick={showLockedModal}>Ver detalle</Button>
              </p>
            )}
          </CardBody>
        </Card>

        <Modal isOpen={isModalOpen} toggle={closeModal}>
          <ModalHeader toggle={closeModal}>Detalle del Bloqueo</ModalHeader>
          <ModalBody>
            Has alcanzado el límite de intentos de inicio de sesión. Tu cuenta ha sido bloqueada.
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={closeModal}>
              Cerrar
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
};

export default Login;
