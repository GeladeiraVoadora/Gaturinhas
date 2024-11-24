// src/pages/Authentication/Login.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from './Register';
import Axios from 'axios';

jest.mock('axios'); // Mock do Axios para evitar chamadas reais à API

describe('Autenticação de Usuário', () => {
  beforeAll(() => {
    // Mock do window.alert
    jest.spyOn(window, 'alert').mockImplementation(() => {});
  });

  afterAll(() => {
    jest.restoreAllMocks(); // Restaura o window.alert após os testes
  });

  describe('Cadastro de Usuário', () => {
    it('deve cadastrar um novo usuário com sucesso', async () => {
      // Mock da resposta de sucesso do Axios para o cadastro
      (Axios.post as jest.Mock).mockResolvedValueOnce({
        data: { success: true },
      });

      render(
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      );

      // Simula o preenchimento do formulário de cadastro usando `data-testid`
      fireEvent.change(screen.getByTestId('register-email'), { target: { value: 'novo@usuario.com' } });
      fireEvent.change(screen.getByTestId('register-password'), { target: { value: 'senhaSegura123' } });
      fireEvent.change(screen.getByTestId('register-confirmPassword'), { target: { value: 'senhaSegura123' } });

      // Simula o clique no botão de registrar
      fireEvent.click(screen.getByText('Registrar'));

      // Verifica se o alerta de sucesso foi exibido
      await waitFor(() => {
        expect(window.alert).toHaveBeenCalledWith('Cadastrado!');
      });
    });

    it('deve exibir uma mensagem de erro se o usuário já existir', async () => {
      // Mock da resposta de erro do Axios para o cadastro
      (Axios.post as jest.Mock).mockResolvedValueOnce({
        data: { error: 'já existe usuário com essas credenciais' },
      });

      render(
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      );

      // Simula o preenchimento do formulário de cadastro
      fireEvent.change(screen.getByTestId('register-email'), { target: { value: 'existente@usuario.com' } });
      fireEvent.change(screen.getByTestId('register-password'), { target: { value: 'senhaSegura123' } });
      fireEvent.change(screen.getByTestId('register-confirmPassword'), { target: { value: 'senhaSegura123' } });

      // Simula o clique no botão de registrar
      fireEvent.click(screen.getByText('Registrar'));

      // Verifica se o alerta de erro foi exibido
      await waitFor(() => {
        expect(window.alert).toHaveBeenCalledWith('Usuário já existe');
      });
    });
  });

  describe('Login de Usuário', () => {
    it('deve realizar login com sucesso', async () => {
      // Mock da resposta de sucesso do Axios para o login
      (Axios.post as jest.Mock).mockResolvedValueOnce({
        data: { result: true, email: 'user@domain.com', userId: '123', invId: '456' },
      });

      render(
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      );

      // Simula o preenchimento do formulário de login usando `data-testid`
      fireEvent.change(screen.getByTestId('login-email'), { target: { value: 'user@domain.com' } });
      fireEvent.change(screen.getByTestId('login-password'), { target: { value: 'senhaSegura123' } });

      // Simula o clique no botão de login
      fireEvent.click(screen.getByText('Logar'));

      // Verifica se o alerta de sucesso foi exibido
      await waitFor(() => {
        expect(window.alert).toHaveBeenCalledWith('Logado');
      });
    });

    it('deve exibir uma mensagem de erro se o usuário não for encontrado', async () => {
      // Mock da resposta de erro do Axios para usuário não encontrado
      (Axios.post as jest.Mock).mockResolvedValueOnce({
        data: { error: 'Usuário não encontrado' },
      });

      render(
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      );

      // Simula o preenchimento do formulário de login
      fireEvent.change(screen.getByTestId('login-email'), { target: { value: 'naoexiste@usuario.com' } });
      fireEvent.change(screen.getByTestId('login-password'), { target: { value: 'senhaErrada123' } });

      // Simula o clique no botão de login
      fireEvent.click(screen.getByText('Logar'));

      // Verifica se o alerta de erro foi exibido
      await waitFor(() => {
        expect(window.alert).toHaveBeenCalledWith('Usuário não encontrado');
      });
    });

    it('deve exibir uma mensagem de erro para senha incorreta', async () => {
      // Mock da resposta de erro do Axios para senha incorreta
      (Axios.post as jest.Mock).mockResolvedValueOnce({
        data: { error: 'Senha incorreta' },
      });

      render(
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      );

      // Simula o preenchimento do formulário de login
      fireEvent.change(screen.getByTestId('login-email'), { target: { value: 'user@domain.com' } });
      fireEvent.change(screen.getByTestId('login-password'), { target: { value: 'senhaErrada123' } });

      // Simula o clique no botão de login
      fireEvent.click(screen.getByText('Logar'));

      // Verifica se o alerta de erro foi exibido
      await waitFor(() => {
        expect(window.alert).toHaveBeenCalledWith('Senha incorreta');
      });
    });
  });
});
