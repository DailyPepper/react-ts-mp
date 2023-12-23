import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import "../../styles/style.css"


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

// const isFormValid = Object.keys(errors).length === 0;
   
    return ( 
        <>
        
        <h1>
            Страница Контактов
        </h1>
        <form onSubmit={handleSubmit(saveElement)}> 
          <input  
              {...register('name', { 
                      required: "Поле обязательно для заполнения", 
                      minLength: { 
                          value: 5, 
                          message: "Нужно больше символов Данил, нужно более 5 символов" 
                      } 
                  } 
            )} 
          /> 
          <div>{errors.name?.message}</div> 
          <input  
              {...register('age', { 
                      required: "Поле обязательно для заполнения", 
                      minLength: { 
                          value: 10, 
                          message: "Нужно больше символов Данил, нужно более 10 символов" 
                      } 
                  } 
              )} 
          /> 
          <div>{errors.age?.message}</div> 
           
          <input  
              {...register('number', { 
                      required: "Поле обязательно для заполнения", 
                      minLength: { 
                          value: 10, 
                          message: "Нужно больше символов Данил, нужно более 10 символов" 
                      } 
                  } 
              )} 
          /> 
          <div>{errors.age?.message}</div> 

          <button type="submit" disabled={!isValid}>Сохранить</button> 
          { 
            tasks.map((task) =>  
                <p> 
                    {task.name} - {task.age} - {task.number}
                </p> 
            ) 
          } 
        </form> 
        </>
    ); 
  };
 
export default Contact;
