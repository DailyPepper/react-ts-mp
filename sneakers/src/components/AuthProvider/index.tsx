import { createContext, useEffect, useState } from "react";
import { AuthProviderProps } from "./auth.interface";

interface IContext {
  isAuth: boolean;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthContext = createContext<IContext>({} as IContext);



const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);

  useEffect(() => {
    const handleStorageChange = () => {
      if (localStorage.getItem("access_token")) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    };
    window.addEventListener('auth_storage', handleStorageChange);

    handleStorageChange();

    return () => {
      // Отписываемся от события при размонтировании компонента
      window.removeEventListener('auth_storage', handleStorageChange);
    };
  }, []);

  const value = { isAuth, setIsAuth };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export default AuthProvider;
