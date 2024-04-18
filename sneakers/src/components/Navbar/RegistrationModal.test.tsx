import { fireEvent, render, screen } from '@testing-library/react';
import RegistrationModal from './RegistrationModal';
import 'intersection-observer';

describe('DynamicPagination component', () => {
  it('renders loading text initially', () => {
    render(<RegistrationModal isOpen={false} onClose={function (): void {
        throw new Error('Function not implemented.');
    } } />);
    expect(screen.getByText('Регистрация')).toBeTruthy();
  });
  it('renders loading text initially', () => {
    render(<RegistrationModal isOpen={false} onClose={function (): void {
        throw new Error('Function not implemented.');
    } } />);
    expect(screen.getByText('Имя пользователя:')).toBeTruthy();
  });
  it('renders loading text initially', () => {
    render(<RegistrationModal isOpen={false} onClose={function (): void {
        throw new Error('Function not implemented.');
    } } />);
    expect(screen.getByText('Пароль:')).toBeTruthy();
  });
  it('renders loading text initially', () => {
    render(<RegistrationModal isOpen={false} onClose={function (): void {
        throw new Error('Function not implemented.');
    } } />);
    expect(screen.getByText('Зарегистрироваться')).toBeTruthy();
  });

  it("обновляет значения input", () => {
    render(<RegistrationModal isOpen={false} onClose={function (): void {
        throw new Error('Function not implemented.');
    } } />);
    const inputUsername = screen.getByTestId("input-username") as HTMLInputElement;
    const inputPassword = screen.getByTestId("input-password") as HTMLInputElement;
    const registrationButton = screen.getByText("Зарегистрироваться");

    fireEvent.change(inputUsername, { target: { value: "новое имя пользователя" } });
    fireEvent.change(inputPassword, { target: { value: "Пароль:" } });
    fireEvent.click(registrationButton)

    expect(inputUsername.value).toBe("новое имя пользователя");
    expect(inputPassword.value).toBe("Пароль:");
    expect(registrationButton).toBeTruthy();
});

});
