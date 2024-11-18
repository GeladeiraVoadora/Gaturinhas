import './Style.css';
import { Formik, FormikProps, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

interface LoginValues {
  email: string;
  password: string;
}

interface RegisterValues extends LoginValues {
  confirmPassword: string;
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

  const handleClickRegister = async (values: RegisterValues) => {
    try {
      const response = await Axios.post("http://localhost:3030/api/usuario", {
        email: values.email,
        password: values.password,
      });

      if (response.data.error === "já existe usuário com essas credenciais") {
        openModal("Usuário já existe");
      } else {
        openModal("Cadastrado com sucesso!");
      }
    } catch (error) {
      openModal("Erro ao registrar usuário");
      console.error("Erro ao registrar usuário:", error);
    }
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

  const validationRegister = yup.object().shape({
    email: yup
      .string()
      .email("Insira um e-mail válido")
      .required("Este campo é obrigatório"),
    password: yup
      .string()
      .min(8, "A senha deve ter no mínimo 8 caracteres")
      .required("Este campo é obrigatório"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), undefined], "As senhas não são iguais")
      .required("Este campo é obrigatório"),
  });

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
      <div className="loginImage">
        <div className="loginregister">
          <div className="login">
            <img src="https://i.imgur.com/QaKgyGu.png" alt="gaturinhas" />
          </div>
          <div className="register">
            <img src="https://i.imgur.com/mk87zSp.png" alt="register" />
          </div>
        </div>
        <div className="formsimagems">
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
                    data-testid="login-email"
                  />
                  <ErrorMessage component="span" name="email" className="form-error" />
                </div>
                <div className="login-form-group">
                  <Field
                    type="password"
                    name="password"
                    className="form-field"
                    placeholder="Senha"
                    data-testid="login-password"
                  />
                  <ErrorMessage component="span" name="password" className="form-error" />
                </div>
                <button className="button" type="submit">
                  Logar
                </button>
              </form>
            )}
          </Formik>

          <Formik
            initialValues={{ email: '', password: '', confirmPassword: '' }}
            onSubmit={handleClickRegister}
            validationSchema={validationRegister}
          >
            {({ handleSubmit }: FormikProps<RegisterValues>) => (
              <form onSubmit={handleSubmit} className="login-form">
                <div className="login-form-group">
                  <Field
                    name="email"
                    className="form-field"
                    placeholder="E-mail"
                    data-testid="register-email"
                  />
                  <ErrorMessage component="span" name="email" className="form-error" />
                </div>
                <div className="login-form-group">
                  <Field
                    type="password"
                    name="password"
                    className="form-field"
                    placeholder="Crie uma senha"
                    data-testid="register-password"
                  />
                  <ErrorMessage component="span" name="password" className="form-error" />
                </div>
                <div className="login-form-group">
                  <Field
                    type="password"
                    name="confirmPassword"
                    className="form-field"
                    placeholder="Confirme sua senha"
                    data-testid="register-confirmPassword"
                  />
                  <ErrorMessage
                    component="span"
                    name="confirmPassword"
                    className="form-error"
                  />
                </div>
                <button className="button" type="submit">
                  Registrar
                </button>
              </form>
            )}
          </Formik>
        </div>
      </div>

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
