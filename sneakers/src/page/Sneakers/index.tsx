import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button } from 'antd';
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
    key: 'house',
  },
];

const Sneakers = () => {
  const [page, setPage] = useState<number>(1);
  const [dataSource, setDataSource] = useState<DataType[]>([]);

  const getUniversity = async (page: number, limit: number) => {
    try {
      const response = await axios.get(`http://universities.hipolabs.com/search?offset=${(page - 1) * limit}&limit=${limit}`);
      setDataSource(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
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
}

export default Sneakers;
