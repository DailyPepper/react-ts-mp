import { FC, useEffect, useState } from "react";
import { IUniversity } from "./university.interface";
import CardUniversity from "../CardUniversity";
import axios from "axios";
import { useInView } from "react-intersection-observer";
import { styled } from "styled-components";

const LIMIT_UNIVERSITIES = 20

const BlockOnserver = styled.div`
    height: 40px;
    background-color: black;
`
const SectionList = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const DinamicPagination: FC = () => {
    const [univer, setUnivers] = useState<Array<IUniversity>>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [loading, setLoading] = useState(true)

    
    const fetchUniversities = async () => {
        try {
            const offset = (currentPage - 1) * LIMIT_UNIVERSITIES
            const response = await axios.get(`http://universities.hipolabs.com/search?offset=${offset}&limit=${LIMIT_UNIVERSITIES}`)
            setUnivers((prev) => [...prev, ...response.data])
        } catch (error) {
            console.log('Error fetching univer...', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUniversities();
    }, [currentPage]);
    
    
    const { ref, inView} = useInView({ 
        threshold: 1.0, 
    });
    useEffect ( () => {
        if(inView) { 
            setLoading(true)
            setCurrentPage((prev: number) => prev+1)
        }
    }, [inView])
    return ( 
        <SectionList> 
            <h1>
                List Univers
            </h1>
            {
                univer.map((univer) => (
                    <CardUniversity data={univer} key={univer.name}></CardUniversity>
                ))
            }
            {loading && <div>Loading...</div>}
            {!loading && <BlockOnserver ref={ref}></BlockOnserver>}
        </SectionList>
     );
}
 
export default DinamicPagination;