import axios from 'axios';
import React from 'react'
import { Form, Pagination } from 'react-bootstrap'

export const MyPagination = ({ data,setDataRaw }) => {
    console.log(data);
    
    

    if (!data) {
        return (
            <div>
                <Pagination size='sm'>
                    <Pagination.First disabled />
                    <Pagination.Prev disabled />
                    <Pagination.Item disabled>{0}</Pagination.Item>
                    <Pagination.Next disabled />
                    <Pagination.Last disabled />
                </Pagination>
            </div>
        )
    }


    const handleNext = async (e) => {
        let response = await axios.get(data.pagination.next_page_url);
        setDataRaw(response.data.data);
    }

    const handlePrev = async (e) => {
        let response = await axios.get(data.pagination.prev_page_url);
        setDataRaw(response.data.data);
    }

    const handleFirst = async (e) => {
        let response = await axios.get(data.pagination.first_page_url);
        setDataRaw(response.data.data);
    }

    const handleLast = async (e) => {
        let response = await axios.get(data.pagination.last_page_url);
        setDataRaw(response.data.data);
    }

    const handleItem = async (index) => {
        let params=new URL(data.pagination.first_page_url);
        console.log(params.toString());
        params.searchParams.set("page",index);
        let response = await axios.get(params.toString());
        setDataRaw(response.data.data);
    }


    const paginationsItems = [];
    for (let index = 0; index < Math.ceil(data.pagination.total/data.pagination.per_page); index++) {
        paginationsItems.push(<Pagination.Item 
            key={index} 
            active={data.pagination.current_page===(index+1) && true}
            onClick={()=>handleItem(index+1)}
            >
                {index + 1}
            </Pagination.Item>);
    }

    return (
        <div>
            <Pagination size='sm'>
                {/*<Pagination.First disabled={data.pagination.current_page===1 && true} onClick={handleFirst} />*/}
                <Pagination.Prev disabled={!data.pagination.prev_page_url ? true : false} onClick={handlePrev} />
                <Form.Control type="text" name='cedula' value={
                    <span style={{fontSize:"12px"}}>`${data.pagination.current_page} de ${data.pagination.total}`</span>
                } />
                
                <Pagination.Next disabled={!data.pagination.next_page_url ? true : false} onClick={handleNext} />
                {/*<Pagination.Last disabled={data.pagination.current_page===data.pagination.last_page && true} onClick={handleLast} />*/}
            </Pagination>
        </div>
    )
}
