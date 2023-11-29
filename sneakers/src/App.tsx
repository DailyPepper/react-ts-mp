import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Space, Table, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface DataType {
  country: string;
  name: string;
  house: string;

}

const columns: ColumnsType<DataType> = [
  {
    title: 'Страна',
    dataIndex: 'country',
    key: 'country',
  },
  {
    title: 'Название школы',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Название города',
    dataIndex: 'house',
    key: 'house'
  }

  // {
  //   title: 'Name',
  //   dataIndex: 'name',
  //   key: 'name',
  //   render: (text) => <a>{text}</a>,
  // },
  // {
  //   title: 'Age',
  //   dataIndex: 'age',
  //   key: 'age',
  // },
  // {
  //   title: 'Address',
  //   dataIndex: 'address',
  //   key: 'address',
  // },
  // {
  //   title: 'Action',
  //   key: 'action',
  //   render: (_, record) => (
  //     <Space size="middle">
  //       <a>Invite {record.name}</a>
  //     </Space>
  //   ),
  // },
];

// const data: DataType[] = [
//   {
//     key: '1',
//     name: 'John Brown',
//     age: 32,
//     address: 'New York No. 1 Lake Park',
//   },
//   {
//     key: '2',
//     name: 'Jim Green',
//     age: 42,
//     address: 'London No. 1 Lake Park',
//   },
//   {
//     key: '3',
//     name: 'Joe Black',
//     age: 32,
//     address: 'Sydney No. 1 Lake Park',
//   },
  

// ];

const App: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [dataSource, setDataSource] = useState<DataType[]>();

  const getUniversity = async (page: number, limit: number) => {
    const response = await axios.get(`http://universities.hipolabs.com/search?offset=${(page - 1) * limit}&limit=${limit}`);
    setDataSource(response.data);
  };

  useEffect(() => {
    getUniversity(page, 5);
  }, [page]);

  return (
    <>
      <Table dataSource={dataSource} columns={columns} pagination={false} />
      <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
        Назад
      </Button>
      <Button onClick={() => setPage(page + 1)}>Вперед</Button>
    </>
  );
};

export default App;


//Работа на паре 25.11

// const token = 'tgQi%2FhmdDa%2F%2FvFhcobZ%2B5Yf0Ji7%2FRu2YvPeLCce5tFTxMTZgPEFWacFk%2BbO2lmIVpB4FZl3gw4Gl4vqwmhv0ZtFoZkO0%2Bas31qZZekgV5nSJ18YaxP%2FCYJTy163QqUzhKRY2J4CRMCMGe2EvZAdaffe36833ofSfhYdpkANoozk%3D';
// const baseUrl = 'https://e.mospolytech.ru/old/lk_api.php';

// const App = () => {
//   const getStudents = async (page = '1', perPage = '50') => {
//     const data = await axios.get(
//       `${baseUrl}?getStudent7page=${page}&perPage=${perPage}&token=${token}`
//     );
//     return data;
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       const result = await getStudents('1', '50');
//       console.log(result.data);
//     };
//     fetchData();
//   }, []);

//   return <div></div>;
// };

// export default App;