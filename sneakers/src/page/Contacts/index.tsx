import axios from "axios";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";

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

export const Contact = () => { 
    const [tasks, setTasks] = useState<IMyForm[]>([]);
    const [userName, setUserName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const { register, handleSubmit, formState: { errors, isValid }, reset, setError } = useForm<IMyForm>({ 
        mode: "onBlur",
    });

    const saveElement: SubmitHandler<IMyForm> = (data) => { 
        setTasks((prev) => [...prev, data]);
        reset();
    };

    // const checkAccount = async () => {
    //     try {
    //         const apiUrl = "http://0.0.0.0:8000";
    //         const tokenEndpoint = "/swagger/auth/token";
    //         const url = `${apiUrl}${tokenEndpoint}`;
    //         const response = await axios.post(url, {
    //             userName,
    //             password,
                
    //         });
    //         console.log(response.data);
    //         const data: IMyForm = response.data;
    //         if (data.token) {
    //             localStorage.setItem('accessToken', data.token);
    //             window.location.href = '/main-page'; // Редирект на главную страницу
    //         } else {
    //             setError('auth', {
    //                 type: 'manual',
    //                 message: 'Пользователь не существует',
    //             }); // Отобразить ошибку на форме
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    return ( 
        <>
            <FormStyle>
                <h1>
                    Заполните форму
                </h1>
                <form onSubmit={handleSubmit(saveElement)} className="form__style" > 
                    <input 
                        type="name"
                        className="input__style"
                        placeholder="Имя"
                        onChange={(e)=>setUserName(e.target.value)}
                    /> 
                    <div>{errors.name?.message}</div> 
                    <input  
                        type="pass"
                        className="input__style"
                        placeholder="Пароль"
                        onChange={(e)=> setPassword(e.target.value)}
                    /> 
                    <div>{errors.pass?.message}</div> 
                    <button type="submit" disabled={!isValid} className="button__style" >
                        Сохранить
                    </button> 
                    { 
                        tasks.map((task, index) => 
                            <p key={index}> 
                                Вывод : {task.name} - {task.pass} 
                            </p> 
                        ) 
                    } 
                </form> 
            </FormStyle>
        </>
    ); 
};

export default Contact;
