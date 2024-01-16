import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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
import 'sweetalert2/dist/sweetalert2.min.css';
import styles from './css/Login.module.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8080/auth/login', {
        username,
        password,
      });

      const { token } = response.data;
      localStorage.setItem('token', token);

      navigate('/menu');
    } catch (error) {
      setLoginAttempts(loginAttempts + 1);

      if (loginAttempts === 2) {
        setIsLocked(true);
        showLockedModal();
      }

      // Puedes manejar errores específicos aquí, por ejemplo, mostrar un mensaje de error al usuario
      console.error('Error de autenticación:', error);
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
      <div className={styles.cuerpo}>
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
