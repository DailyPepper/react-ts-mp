import styled from "styled-components";
import { CONTACT_ROUTE, NEWS_ROUTE, ACCOUNT_ROUTE, SNEAKERS_ROUTE } from "../../app/routing/config";
import "../../styles/style.css";
import { Link } from "react-router-dom";
import React, { createContext, useState, useContext } from "react";
import sun from "../../img/sun.svg";
import moon from "../../img/moon.svg";
import { GlobalStyles } from "../../styles/global-styled";
import RegistrationModal from "./RegistrationModal";

interface StyleProps {
  height?: string;
}

const NavbarWrapper = styled.div<StyleProps>`
  display: flex;
  flex-direction: column;
  align-items: center; 
  padding: 30px 10px 10px 10px;
  border-radius: 25px;
  background-color: transparent; 
  border: none; 
  gap: 20px;

  @media screen and (min-width: 768px) {
    flex-direction: row;
    align-items: baseline;
    height: 65px;
    border: 1.5px solid #d49415;
    justify-content: space-evenly;
    margin-top: 20px;
    max-width: 1200px; 
    width: 90%; 
    margin: 20px auto; 
  }
`;


const SwitchThemeStyled = styled.button`
  width: 100px;
  height: 40px;
  border-radius: 20px;
  background: none;
  border-style: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(${sun});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  transition: background-color 0.5s;
  &:hover {
    filter: grayscale(80%) sepia(20%);
  }
`;
const AuthButtonStyle = styled.button`
  width: 100px;
  height: 40px;
  border-radius: 20px;
  background: #d49415;
  color: #fff;
  border-style: none;
  cursor: pointer;
  transition: background-color 0.4s;
  &:hover {
    background-color: #595555;
  }
`;

// Функция войти/выйти

type AuthContextType = {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };
  return <AuthContext.Provider value={{ isAuthenticated, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthButton: React.FC = () => {
  const auth = useContext(AuthContext);

  return (
    <AuthButtonStyle onClick={auth?.isAuthenticated ? auth?.logout : auth?.login}>
      {auth?.isAuthenticated ? "Выйти" : "Войти"}
    </AuthButtonStyle>
  );
};

// Функция темы светлая/темная

function SwitchTheme() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [backgroundImage, setBackgroundImage] = useState(sun);

  const handleClick = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    const newBackgroundImage = newTheme === "light" ? sun : moon;

    document.documentElement.setAttribute("data-theme", newTheme);
    setTheme(newTheme);
    setBackgroundImage(newBackgroundImage);
  };

  return (
    <SwitchThemeStyled onClick={handleClick} style={{ backgroundImage: `url(${backgroundImage})` }}>
      {theme === "light"}
    </SwitchThemeStyled>
  );
}

const navbar = () => {
  return (
    <>
      <GlobalStyles />
      <AuthProvider>
        <NavbarWrapper height="65px">
          <Link to={SNEAKERS_ROUTE} className="routeLink">
            Каталог товаров
          </Link>
          <Link to={NEWS_ROUTE} className="routeLink">
            Новости
          </Link>
          <Link to={CONTACT_ROUTE} className="routeLink">
            Контакты
          </Link>
          <Link to={ACCOUNT_ROUTE} className="routeLink">
            Аккаунт
          </Link>
          <div className="blockStyle">
            <AuthButton />
            <SwitchTheme />
          </div>
        </NavbarWrapper>
      </AuthProvider>
    </>
  );
};
export default navbar;
