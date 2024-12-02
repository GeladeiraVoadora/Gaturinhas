import './Style.css';
import { Formik, FormikProps, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import Axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

interface LoginValues {
  email: string;
  password: string;
}

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const openModal = (message: string) => {
    setModalMessage(message);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleClickLogin = async (values: LoginValues) => {
    try {
      const response = await Axios.post("http://localhost:3030/api/login", {
        email: values.email,
        password: values.password,
      });

      if (response.data.result === true) {
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("invId", response.data.invId);
        openModal("Logado com sucesso!");
        setTimeout(() => {
          navigate("/home");
          window.location.reload();
        }, 2000);
      } else if (response.data.error === "Usuário não encontrado") {
        openModal("Usuário não encontrado");
      } else {
        openModal("Senha incorreta");
      }
    } catch (error) {
      openModal("Erro ao fazer login");
      console.error("Erro ao fazer login:", error);
    }
  };

  const validationLogin = yup.object().shape({
    email: yup
      .string()
      .email("Insira um e-mail válido")
      .required("Este campo é obrigatório"),
    password: yup
      .string()
      .min(8, "A senha deve ter no mínimo 8 caracteres")
      .required("Este campo é obrigatório"),
  });

  return (
    <div className="container">
      <div className="login-logo">
        <img src="https://i.imgur.com/Uk3iJSv.png" alt="Login App" />
      </div>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={handleClickLogin}
        validationSchema={validationLogin}
      >
        {({ handleSubmit }: FormikProps<LoginValues>) => (
          <form onSubmit={handleSubmit} className="login-form">
            <div className="login-form-group">
              <Field
                name="email"
                className="form-field"
                placeholder="E-mail"
              />
              <ErrorMessage component="span" name="email" className="form-error" />
            </div>
            <div className="login-form-group">
              <Field
                type="password"
                name="password"
                className="form-field"
                placeholder="Senha"
              />
              <ErrorMessage component="span" name="password" className="form-error" />
            </div>
            <button className="button" type="submit">
              Logar
            </button>
            <Link to="/register" className="switch-link">
              Não tenho conta
            </Link>
          </form>
        )}
      </Formik>
      

      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{modalMessage}</h2>
            <button onClick={closeModal} className="modal-close">
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
