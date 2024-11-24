import './Style.css';
import { Formik, FormikProps, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import Axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface RegisterValues {
  email: string;
  password: string;
  confirmPassword: string;
}

export const Register: React.FC = () => {
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

  return (
    <div className="container">
      <div className="login-logo">
        <img src="https://i.imgur.com/Uk3iJSv.png" alt="Register App" />
      </div>
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
              />
              <ErrorMessage component="span" name="email" className="form-error" />
            </div>
            <div className="login-form-group">
              <Field
                type="password"
                name="password"
                className="form-field"
                placeholder="Crie uma senha"
              />
              <ErrorMessage component="span" name="password" className="form-error" />
            </div>
            <div className="login-form-group">
              <Field
                type="password"
                name="confirmPassword"
                className="form-field"
                placeholder="Confirme sua senha"
              />
              <ErrorMessage component="span" name="confirmPassword" className="form-error" />
            </div>
            <button className="button" type="submit">
              Registrar
            </button>
            <Link to="/" className="switch-link">
              Já tenho conta
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

export default Register;
