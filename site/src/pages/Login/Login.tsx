import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import Axios from "axios";
import { useNavigate } from 'react-router-dom';
import './Style.css';

export function Login() {
  const navigate = useNavigate();
  
  const handleClickLogin = (values: { email: string; password: string }) => {
    Axios.post('http://localhost:3030/login', {
      email: values.email,
      password: values.password,
    }).then((response) => {
      console.log(response);
      if (response.data.result === true) {
        localStorage.setItem('email', response.data.email);
        localStorage.setItem('userId', response.data.userId);
        localStorage.setItem('invId', response.data.invId);
        alert('Logado');
        navigate('/home');
        window.location.reload();
      } else if (response.data.error === 'Usuário não encontrado') {
        alert('Usuário não encontrado');
      } else {
        alert('Senha incorreta');
      }
    });
  };

  const validationLogin = yup.object().shape({
    email: yup.string().email("Insira um e-mail válido").required("Este campo é obrigatório"),
    password: yup.string().min(8, "A senha deve ter 8 caracteres").required("Este campo é obrigatório"),
  });

  return (
    <Formik initialValues={{}} onSubmit={handleClickLogin} validationSchema={validationLogin}>
      <Form className="login-form">
        <div className="login-form-group">
          <Field name="email" className="form-field" placeholder="E-mail" />
          <ErrorMessage component="span" name="email" className="form-error" />
        </div>
        <div className="login-form-group">
          <Field type="password" name="password" className="form-field" placeholder="Senha" />
          <ErrorMessage component="span" name="password" className="form-error" />
        </div>
        <button className="button" type="submit">
          Logar
        </button>
      </Form>
    </Formik>
  );
}

export default Login;
