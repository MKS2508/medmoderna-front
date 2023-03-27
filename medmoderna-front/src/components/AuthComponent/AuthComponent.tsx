import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AnimatePresence, motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
import LayoutBase from "../../components/LayoutBase/LayoutBase";
const AuthContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  min-height: 100vh; // added
`;


const AuthCard = styled(motion.div)`
  display: flex;
  
  width: 50%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding-top: 2rem;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const AuthTitle = styled.h2`
  margin-bottom: 20px;
`;

const AuthForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const AuthInput = styled.input`
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 10px;
  color: #ffffff;
  outline: none;
  transition: all 0.3s;
  &:focus {
    box-shadow: 0 0 5px rgba(81, 203, 238, 1);
    padding: 10px;
    border: 1px solid rgba(81, 203, 238, 1);
  }
`;

const SubmitButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
  opacity: 0.9;
  border-radius: 5px;
`;

const ErrorText = styled.span`
  color: #f44336;
  font-size: 12px;
`;

const AuthSwitch = styled.button`
  background: none;
  border: none;
  color: #ffffff;
  text-decoration: underline;
  cursor: pointer;
  font-size: 14px;
  &:hover {
    color: #4caf50;
  }
`;


const cardVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
};

const AuthComponent = ({ onAuthSuccess }: { onAuthSuccess: () => void }) => {
    const [isLogin, setIsLogin] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data: any) => {
        try {
            const route = isLogin ? 'http://localhost:8080/api/auth/login' : 'http://localhost:8080/api/auth/signup';
            const response = await fetch(route, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
                credentials: 'include',
            });

            if (!response.ok) {
                const responseText = await response.text();
                const errorData = responseText ? JSON.parse(responseText) : {};
                throw new Error(errorData.message || 'Something went wrong');
            }

            onAuthSuccess();

            toast.success(isLogin ? 'Logged in successfully' : 'Registered successfully');
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    return ( <>
            <AuthContainer>
                <AnimatePresence>
                    <AuthCard
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={cardVariants}
                        transition={{ duration: 0.5 }}
                    >
                        <AuthTitle>{isLogin ? 'Login' : 'Sign Up'}</AuthTitle>
                        <AuthForm onSubmit={handleSubmit(onSubmit)}>
                            {!isLogin && (
                                <AuthInput
                                    type="text"
                                    placeholder="Name"
                                    {...register('name', { required: 'Name is required' })}
                                />
                            )}
                            {errors.name && <ErrorText>Nombre incorrecto</ErrorText>}
                            <AuthInput
                                type="email"
                                placeholder="Email"
                                {...register('email', { required: 'Email is required' })}
                            />
                            {errors.email && <ErrorText>Email Incorrecto</ErrorText>}
                            <AuthInput
                                type="password"
                                placeholder="Password"
                                {...register('password', { required: 'Password is required' })}
                            />
                            {errors.password && <ErrorText>Pass incorrecta</ErrorText>}
                            <SubmitButton type="submit">{isLogin ? 'Login' : 'Sign Up'}</SubmitButton>
                        </AuthForm>
                        <AuthSwitch onClick={() => setIsLogin((prev) => !prev)}>
                            {isLogin ? 'New user? Sign Up' : 'Already have an account? Login'}
                        </AuthSwitch>
                    </AuthCard>
                </AnimatePresence>
            </AuthContainer>
            <ToastContainer />
    </>

    );
};

export default AuthComponent;