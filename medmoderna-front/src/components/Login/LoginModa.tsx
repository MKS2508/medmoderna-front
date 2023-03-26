import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';

export const GoogleSignInButton = styled.button`
  background-color: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 5px;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 500;
  padding: 10px 15px;
  transition: background-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-decoration: none;
  width: 100%;

  &:hover {
    background-color: rgba(255, 255, 255, 0.25);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }

  &:active {
    background-color: rgba(255, 255, 255, 0.1);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;


const LoginButton = styled.button`
  background-color: #24292e;
  color: white;
  padding: 10px 20px;
  border-radius: 6px;
  border: none;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #404448;
  }
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  height: 80%;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 50px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Input = styled.input`
  background-color: rgba(255, 255, 255, 0.1);
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 16px;
  outline: none;
`;

const SubmitButton = styled.button`
  background-color: #2ecc71;
  color: white;
  padding: 10px 20px;
  border-radius: 6px;
  border: none;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #27ae60;
  }
`;

Modal.setAppElement('#root');

const LoginComponent = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        console.log("MODAL ABIERTO")
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleSubmit = (e:any) => {
        e.preventDefault();
        // Implementar lógica de inicio de sesión y registro aquí
        console.log('Formulario enviado');
    };


    return (
        <>
            <LoginButton onClick={openModal}>Iniciar Sesión</LoginButton>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Login Modal"
                style={{
                    overlay: {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        zIndex: 99
                    },
                    content: {
                        position: 'static',
                        border: 'none',
                        padding: 0,
                        background: 'transparent',
                        zIndex: 99

                    },
                }}
            >
                <ModalContainer>
                    <CloseButton onClick={closeModal}>&times;</CloseButton>
                    <h2>Iniciar sesión / Registro</h2>
                    <Form onSubmit={handleSubmit}>
                        <Input type="email" placeholder="Correo electrónico" required />
                        <Input type="password" placeholder="Contraseña" required />
                        <SubmitButton type="submit">Iniciar sesión / Registrarse</SubmitButton>
                    </Form>
                    {/* Aquí puedes agregar el botón de inicio de sesión con Google */}
                    <GoogleSignInButton>Inicia sesion</GoogleSignInButton>
                </ModalContainer>
            </Modal>
        </>
    );
};

export default LoginComponent;

