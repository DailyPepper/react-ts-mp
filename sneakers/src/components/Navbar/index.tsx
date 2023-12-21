import styled from 'styled-components';
import { CONTACT_ROUTE, NEWS_ROUTE, ACCOUNT_ROUTE, SNEAKERS_ROUTE } from '../../app/routing/config';
import '../../styles/style.css';
import { Link } from 'react-router-dom';
import { createContext, useEffect, useState, useContext, ReactNode } from 'react';
import sun from '../../img/sun.svg' 
import moon from '../../img/moon.svg'
import { GlobalStyles } from '../../styles/global-styled';

interface StyleProps {
    height?: string
}


const NavbarWrapper = styled.div<StyleProps>`
    border: 1.5px solid #d49415;
    height: ${({height}) => height ? height:'300px'};
    display: flex;
    gap: 60px;
    justify-content: space-around;
    padding-top: 30px;
    margin: 20px 10px 10px 10px;
    border-radius: 25px;
`

const SwitchThemeStyled = styled.button`
    width: 100px;
    height: 40px;
    border-radius: 20px;
    background: none;
    color: #fff;
    border-style: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: url(${sun});
    background-size: contain; /* Настройки размера изображения */
    background-repeat: no-repeat;
    background-position: center;
`
const AuthButtonStyle = styled.button`
    width: 100px;
    height: 40px;
    border-radius: 20px;
    background: #d49415;
    color: #fff;
    border-style: none;
    cursor: pointer;
`

// Функция войти/выйти

type AuthContextType = {
    isAuthenticated: boolean;
    toggleAuth: () => void;
  };
  
  export const AuthContext = createContext<AuthContextType | null>(null);
  
  export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
  
    const toggleAuth = () => {
      setIsAuthenticated(prevState => !prevState);
    };
  
    return (
      <AuthContext.Provider value={{ isAuthenticated, toggleAuth }}>
        {children}
      </AuthContext.Provider>
    );
  };
  
  export const AuthButton: React.FC = () => {
    const auth = useContext(AuthContext);
  
    return (
      <AuthButtonStyle onClick={auth?.toggleAuth}>
        {auth?.isAuthenticated ? "Выйти" : "Войти"}
      </AuthButtonStyle>
    );
  };


// Функция темы светлая/темная

function SwitchTheme() {
  const [theme, setTheme] = useState<"light" | "dark">('light');
  const [backgroundImage, setBackgroundImage] = useState(sun);

  const handleClick = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    const newBackgroundImage = newTheme === 'light' ? sun : moon;

    document.documentElement.setAttribute('data-theme', newTheme);
    setTheme(newTheme);
    setBackgroundImage(newBackgroundImage);
  }

  return (
    <SwitchThemeStyled onClick={handleClick} style={{ backgroundImage: `url(${backgroundImage})` }}>
      {theme === 'light'}
    </SwitchThemeStyled>
  );
}


const navbar = () => {
    return ( 
      <>
        <GlobalStyles />
        <AuthProvider>
            <NavbarWrapper height='65px'>
                    <Link to={SNEAKERS_ROUTE} className='routeLink'>Каталог товаров</Link>
                    <Link to={NEWS_ROUTE} className='routeLink'>Новости</Link>
                    <Link to={CONTACT_ROUTE} className='routeLink'>Контакты</Link>
                    <Link to={ACCOUNT_ROUTE} className='routeLink'>Аккаунт</Link>
                    <div className='blockStyle'>
                        <AuthButton/> 
                        <SwitchTheme/>     
                    </div>                
            </NavbarWrapper>
        </AuthProvider>
      </> 
     );
}
export default navbar;