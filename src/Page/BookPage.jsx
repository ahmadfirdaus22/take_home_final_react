import React, { useEffect, useState, useRef} from "react";
import Layout from "antd/es/layout/layout";
import { Button, Table, Tag, Space, Modal} from "antd";
import "../css/BookPage.style.css"
import axios from "axios";
import { addBook, deleteBook } from "../components/services";
import MyForm from "../components/Form/MyForm";
const { confirm } = Modal;


const BookPage = () => {
    const [books, setBooks]= useState([]);
    const [num, setNum] = useState(0);
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('');
    const [ok, setOK] = useState(false);
    let number = 1 ;


    const showModal = () => {
        setOpen(true);
    }

    const handleOk = () => {
        setModalText("Adding Your Book");
        setConfirmLoading(true);
        setOK(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
          }, 2000)
        
    }

    const handleCancel = () => {
        setOpen(false);
    }

    const columns = 
    [
        {
            title: "#",
            width: "5%",
            render : (() => (number++))
        },
        {
            title: "Title",
            dataIndex: "title",
            key:"title",
        },
        {
            title: "Genre",
            dataIndex: "genre",
            key: "genre"
        },
        {
            title: "Author",
            dataIndex: "author",
            key: "author"
        },
        {
            title: "Description",
            dataIndex:"desc",
            key: "desc",
            ellipsis: true,
            width: '30%'
        },
        {
            title: "Action",
            key: 'x',
            render: (_, books) => (
                <Space size="small">
                    <Button onClick={() =>{confirmDelete(books.id)}} size="large" type="primary" danger>Delete</Button>
                </Space>
            )
        }
    ];

    const confirmDelete = (id) => {
        confirm({
            title: "Delete Book",
            content: "Do you want to delete this book ?",
            onOk(){
                deleteBook(id)
                setNum(num+1);
            },
            onCancel(){
                console.log("no");
            },
        })

    }

    const getData = async () => {
        try{    
            const res = await axios.get("http://localhost:3004/books")
            if(res.status == 200){
                setBooks(res.data)
            }
        }catch(err){
            console.log(err);
        }
    } 

    useEffect (() => { 
        getData();
    }, [num])

    return (
        <Layout className="layout">
            <div className="card-b">
                <div className="top">
                    <h1>Book Data</h1>
                    <Button onClick={showModal} type="primary">Add</Button>
                    <Modal
                    title="Add Book"
                    open={open}
                    onOk={handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={handleCancel}>
                        <MyForm action={addBook} click={ok} />
                    </Modal>
                </div>
                <div>
                    <Table columns={columns} dataSource={books}></Table>
                </div>
            </div>
        </Layout>
    );
}

export default BookPage;