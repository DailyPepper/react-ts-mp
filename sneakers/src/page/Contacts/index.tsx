import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import { AuthContext } from "../../components/Navbar";

const FormStyle = styled.div`
    padding: 20px 50px 50px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .form__style{
        display: flex;
        gap: 5px;
        flex-direction: column;
    }
    .input__style{
        display: flex;
        gap: 20px;
        width: 450px;
        height: 35px;
        background-color: #ffaa00c7;
        border-style: none;
        color: white;
        border-radius: 5px;
        font-size: 15px;
        outline: none;
    }
    ::placeholder{
        color: white;
        font-size: 15px;
    }
    .button__style{
        cursor: pointer;
        border-style: none;
        height: 45px;
        border-radius: 5px;
        background-color: #e9be70;
        color: white;
        margin: 5px 65px;
        width: 310px;
    }
    .button__style:hover{
        transition: background-color 0.5s;        
        background-color: #ffa600;
    }
`;

interface IMyForm {
    token: any;
    exists: boolean; 
    name: string; 
    pass: string; 
} 

const Contact = () => {
    const [tasks, setTasks] = useState<IMyForm[]>([]);
    const { isAuth, setIsAuth } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm<IMyForm>({
      mode: "onBlur",
    });
  
    const saveElement: SubmitHandler<IMyForm> = (data) => {
      setTasks((prev) => [...prev, data]);
      reset();
    };
  
    const checkAccount: SubmitHandler<IMyForm> = async (data) => {
      try {
        const url = 'http://0.0.0.0:8000/auth/token/';
        const { name, pass } = data;
        const response = await axios.post(url, {
          userName: name,
          password: pass,
        });
        console.log(response.data);
        const responseData: IMyForm = response.data;
        if (responseData.token) {
          localStorage.setItem('accessToken', responseData.token);
          setIsAuth(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    const getUsers = async () => {
      try {
        const response = await axios.get('http://0.0.0.0:8000/users/');
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
  
    useEffect(() => {
      if (isAuth) {
        getUsers();
      }
    }, [isAuth]);
  
    return (
      <>
        <FormStyle onSubmit={handleSubmit(checkAccount)}>
          <h1>Заполните форму</h1>
          <form className="form__style">
            <input
              type="name"
              className="input__style"
              placeholder="Имя"
              {...register('name')}
            />
            <div>{errors.name?.message}</div>
            <input
              type="pass"
              className="input__style"
              placeholder="Пароль"
              {...register('pass')}
            />
            <div>{errors.pass?.message}</div>
            <button type="submit" disabled={!isValid} className="button__style">
              Сохранить
            </button>
          </form>
          {tasks.map((task, index) => (
            <p key={index}>Вывод : {task.name} - {task.pass}</p>
          ))}
        </FormStyle>
      </>
    );
  };
  
  export default Contact;