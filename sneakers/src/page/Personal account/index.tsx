import React, { useState } from "react";
import "../../styles/style.css"
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
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
   picture: File;
   name: string;
}

interface Props { 
   name: string;
   picture: File;
}

const MyDocument: React.FC<Props> = ({name, picture}) => {
   return (
            <Document>
               <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text>{name}</Text>
                </View>
                <View style={styles.section}>
                    <Text>Section #2</Text>
                </View>
                <View style={styles.section}>
                  {/* {picture && <Image src={picture}/>} */}
                </View>
               </Page>
            </Document> 
   )

}

const styles = StyleSheet.create({
   page: {
     flexDirection: 'row',
     backgroundColor: '#E4E4E4'
   },
   section: {
     margin: 10,
     padding: 10,
     flexGrow: 1
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
      reset
    } = useForm<IMyForm>({
      mode: "onBlur",
    })
  
    const saveElement = (data: IMyForm) => {
      setTasks(data)
      reset();
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
          !!task?.name && 
          <PDFDownloadLink document={<MyDocument name={task.name} picture={task.picture}/>} fileName="lab_pdf.pdf">
            {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
          </PDFDownloadLink>
        }
      </>  
     );
}

export default Account;