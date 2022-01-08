import axios from 'axios'
import React from 'react'
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai'
import { MdOutlineFirstPage, MdOutlineLastPage } from 'react-icons/md'
import '../css/Pagination.css'
export const MyCustomPagination = ({ data, setData }) => {

    const handleNext = async (e) => {
        if (data.next_page_url) {
            let response = await axios.get(data.next_page_url);
            console.log(response.data.data);
            setData(response.data.data);
        }
    }


    const handlePrev = async (e) => {
        if(data.prev_page_url){
            let response = await axios.get(data.prev_page_url);
            setData(response.data.data);
        }
    }

    const handleFirst = async (e) => {
        let response = await axios.get(data.first_page_url);
        setData(response.data.data);
    }

    const handleLast = async (e) => {
        let response = await axios.get(data.last_page_url);
        setData(response.data.data);
    }

    const handleItem = async (index) => {
        let params = new URL(data.first_page_url);
        console.log(params.toString());
        params.searchParams.set("page", index);
        let response = await axios.get(params.toString());
        setData(response.data.data);
    }

    return (
        <div className=''>
            <ul className='custom-pagination'>
                {/*<li className='pagination-item list-none' onClick={handleFirst}>
                    <MdOutlineFirstPage/>
                </li>*/}
                <li className='list-none me-5 text-secondary'>
                    <span>{`${data?.current_page} - ${Math.ceil(data?.total/data?.per_page)} de ${data?.total}`}</span>
                </li>
                <li className='list-none me-4 pagination-item' onClick={handlePrev}>
                    <AiFillCaretLeft />
                </li>

                <li className='list-none pagination-item' onClick={handleNext}>
                    <AiFillCaretRight />
                </li>
                {/*<li className='pagination-item list-none' onClick={handleLast}>
                    <MdOutlineLastPage/>
                </li>*/}
            </ul>
        </div>
    )
}
