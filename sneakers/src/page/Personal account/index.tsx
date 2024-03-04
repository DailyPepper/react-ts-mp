import React, { useState } from "react";
import "../../styles/style.css"
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink , Image} from '@react-pdf/renderer';
import { PDFViewer } from '@react-pdf/renderer';
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";

const FormStyle = styled.form`
    display: flex;
    justify-content: center;
    padding: 30px;
    gap: 15px;
`


interface IMyForm {
  picture: FileList;
  name: string;
}

interface IMyDocumentProps { 
  name: string;
  picture: File;
}

const MyDocument: React.FC<IMyDocumentProps> = ({ name, picture }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>{name}</Text>
        </View>
        <View style={styles.section}>
          <Text>Section #2</Text>
        </View>
        <View style={styles.img}>
          {picture && <Image source={picture}/>}
        </View>
      </Page>
    </Document>
  );
};


const styles = StyleSheet.create({
   page: {
     flexDirection: 'row',
     backgroundColor: '#E4E4E4'
   },
   section: {
     margin: 10,
     padding: 10,
     flexGrow: 1
   },
   img:{
    margin: 30,
   }
 });



const Account = () => {
   // function handleSubmit(saveElement: any): React.FormEventHandler<HTMLFormElement> | undefined {
   //    throw new Error("Function not implemented.");
   // }
   const [task, setTasks] = useState<IMyForm>()
   
   const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<IMyForm>({
      mode: "onBlur",
    })
  
    const saveElement = (data: IMyForm) => {
      setTasks(data)
    }

    return ( 
      <>
        <FormStyle onSubmit={handleSubmit(saveElement)}>
          <input
            {...register('name', {
              required: "Поле обязательно для заполнения",
              minLength: {
                value: 5,
                message: "Нужно больше символов"
              }
            }
            )}
            placeholder="Введите имя"
          />
          <input 
            type="file" 
            accept="image/*"
            {...register('picture', {
              required: "Изображение",
            }
            )}
          />
          {/* <div>{errors.name?.message}</div> */}
          <button type="submit" >Сохранить</button>
        </FormStyle>

        {
          task?.name && task?.picture &&
          <PDFDownloadLink document={<MyDocument name={task.name} picture={task.picture[0]}/>} fileName="lab_pdf.pdf">
            {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
          </PDFDownloadLink>
        }
      </>  
     );
}

export default Account;