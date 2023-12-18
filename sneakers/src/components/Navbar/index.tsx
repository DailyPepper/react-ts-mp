import styled from 'styled-components';
import { CONTACT_ROUTE, NEWS_ROUTE, ACCOUNT_ROUTE, SNEAKERS_ROUTE } from '../../app/routing/config';
import '../../styles/style.css';
import { Link } from 'react-router-dom';
import { createContext, useEffect, useState, useContext, ReactNode } from 'react';
import sun from '../../img/sun.svg' 
import moon from '../../img/moon.svg'

// Стили

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

const ButtonOnOffStyled = styled.button`
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

function ButtonOnOff(){
    const [button, setButton] = useState('light')
    const [backgroundImage, setBackgroundImage] = useState(sun);

    const handleClick = () => {
        setButton(button === 'light' ? 'dark' : 'light');
        setBackgroundImage((prevImage) => prevImage === sun ? moon : sun);
    }

    useEffect(() => {
        if (button === 'light') {
          document.body.style.backgroundColor = 'white';
          document.body.style.color = '#171819f2'
        } else {
          document.body.style.backgroundColor = '#171819f2';
          document.body.style.color = 'white'
        }
    }, [button]);

    return (
        <ButtonOnOffStyled onClick={handleClick} style={{ backgroundImage: `url(${backgroundImage})` }}>
            {button === 'light'}
        </ButtonOnOffStyled>
    );
}

const navbar = () => {
    return ( 
        <AuthProvider>
            <NavbarWrapper height='65px'>
                    <Link to={SNEAKERS_ROUTE} className='routeLink'>Каталог товаров</Link>
                    <Link to={NEWS_ROUTE} className='routeLink'>Новости</Link>
                    <Link to={CONTACT_ROUTE} className='routeLink'>Контакты</Link>
                    <Link to={ACCOUNT_ROUTE} className='routeLink'>Аккаунт</Link>
                    <div className='blockStyle'>
                        <AuthButton/> 
                        <ButtonOnOff/>     
                    </div>                
            </NavbarWrapper>
        </AuthProvider>
     );
}
export default navbar;