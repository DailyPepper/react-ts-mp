import React, { useState } from "react";
import { styled } from "styled-components";

const RegisterStyle = styled.div`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;

  .modal.show {
  display: flex;
  }

  .modal-dialog {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  }

  .modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  }

  .modal-title {
  margin: 0;
  }

  .modal-body {
  margin-top: 20px;
  }

  .form-group {
  margin-bottom: 15px;
  }

  .form-group label {
  display: block;
  margin-bottom: 5px;
  }

  .form-group input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  }

  button {
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
  }

  button:hover {
  background-color: #0056b3;
  }

  .close {
  cursor: pointer;
  }
`;

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RegistrationModal: React.FC<RegistrationModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Обработка отправки формы
  };

  return (
    <RegisterStyle>
      { /* вот здесь добавлен возвращаемый JSX-код */ }
      <div className={`modal ${isOpen ? "show" : ""}`}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Регистрация</h5>
              <button type="button" className="close" onClick={onClose}>
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="username">Имя пользователя:</label>
                  <input
                    data-testid={"input-username"}
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Пароль:</label>
                  <input
                    data-testid={"input-password"}
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <button type="submit" >Зарегистрироваться</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </RegisterStyle>
  );
};

export default RegistrationModal;
