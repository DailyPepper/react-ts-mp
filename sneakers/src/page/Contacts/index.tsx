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
    }::placeholder{
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
    
`

interface IMyForm { 
    name: string; 
    age: number; 
    number: number;
  } 
   
   
  export const Contact = () => { 
    const [tasks, setTasks] = useState<IMyForm[]>([]) 
    const saveElement: SubmitHandler<IMyForm> = data => { 
      // здесь мы передаём новый массив, который содержит все старые элементы и новый 
      // ...prev - мы получаем все элементы текущего стэйте (с помощью spread оператора) 
          setTasks((prev) => [...prev, data]) 
          reset(); 
      } 
    const { 
      register, // метод для регистрации вашего инпута, для дальнейшей работы с ним 
      handleSubmit, // метод для получения данных формы, если валидация прошла успешна 
      formState: {errors, isValid}, // errors - список ошибок валидации для всех полей формы 
      reset // метод для очистки полей формы 
    } = useForm<IMyForm>({ 
        mode: "onBlur", // парметр onBlur - отвечает за запуск валидации при не активном состоянии поля 
    }) 

    return ( 
        <>
            <FormStyle>
                <h1>
                    Заполните форму
                </h1>
                <form onSubmit={handleSubmit(saveElement)} className="form__style"> 
                    <input 
                        className="input__style"
                        placeholder=" Имя"
                        {...register('name', { 
                                required: "Поле обязательно для заполнения", 
                                minLength: { 
                                    value: 2, 
                                    message: "Нужно больше символов Данил, нужно более 5 символов" 
                                },
                                maxLength: {
                                    value: 15,
                                    message: "Много текста"
                                } 
                            } 
                        )} 
                    /> 
                    <div>{errors.name?.message}</div> 
                    <input  
                        className="input__style"
                        placeholder=" Возраст"
                        {...register('age', { 
                                required: "Поле обязательно для заполнения", 
                                minLength: { 
                                    value: 1, 
                                    message: "Нужно больше символов Данил, нужно более 10 символов" 
                                },
                                maxLength: {
                                    value: 3,
                                    message: "Много текста"
                                } 
                            } 
                        )} 
                    /> 
                    <div>{errors.age?.message}</div> 
                    <input  
                        className="input__style"
                        placeholder=" Номер телефона"
                        {...register('number', { 
                                required: "Поле обязательно для заполнения", 
                                minLength: { 
                                    value: 5, 
                                    message: "Нужно больше символов Данил, нужно более 10 символов" 
                                },
                                maxLength: {
                                    value: 20,
                                    message: "Много текста"
                                } 
                            } 
                        )} 
                    /> 
                    <div>{errors.age?.message}</div> 
                    <button type="submit" disabled={!isValid} className="button__style">Сохранить</button> 
                    { 
                        tasks.map((task) => 
                            <p> 
                                Вывод : {task.name} - {task.age} - {task.number}
                            </p> 
                        ) 
                    } 
                </form> 
            </FormStyle>
        </>
    ); 
  };
 
export default Contact;
