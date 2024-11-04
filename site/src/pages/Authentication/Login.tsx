import './Style.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React from 'react';

interface LoginValues {
  email: string;
  password: string;
}

interface RegisterValues extends LoginValues {
  confirmPassword: string;
}

export const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleClickRegister = (values: RegisterValues) => {
    Axios.post("http://localhost:3030/api/usuario", {
      email: values.email,
      password: values.password,
    }).then((response) => {
      console.log(response);
      if (response.data.error === "já existe usuário com essas credenciais") {
        alert("Usuário já existe");
      } else {
        alert("Cadastrado!");
      }
    });
  };

  const handleClickLogin = (values: LoginValues) => {
    Axios.post("http://localhost:3030/api/login", {
      email: values.email,
      password: values.password,
    }).then((response) => {
      console.log(response);
      if (response.data.result === true) {
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("invId", response.data.invId);
        alert("Logado");
        navigate("/home");
        window.location.reload();
      } else if (response.data.error === "Usuário não encontrado") {
        alert("Usuário não encontrado");
      } else {
        alert("Senha incorreta");
      }
    });
  };

  const validationRegister = yup.object().shape({
    email: yup
      .string()
      .email("Insira um e-mail válido")
      .required("Este campo é obrigatório"),
    password: yup
      .string()
      .min(8, "A senha deve ter 8 caracteres")
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
      .min(8, "A senha deve ter 8 caracteres")
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
            <Form className="login-form">
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
            </Form>
          </Formik>

          <Formik
            initialValues={{ email: '', password: '', confirmPassword: '' }}
            onSubmit={handleClickRegister}
            validationSchema={validationRegister}
          >
            <Form className="login-form">
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
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;
