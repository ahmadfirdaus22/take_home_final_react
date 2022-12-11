import React, { useEffect, useState } from "react";
import Layout from "antd/es/layout/layout";
import { Button, Table, Tag, Space, Modal, Form, Input } from "antd";
import axios from "axios";
import { deleteAuthor, addAuthor } from "../components/services";
import TextArea from "antd/es/input/TextArea";
const { confirm } = Modal;

const AuthorPage = () => {
  const [authors, setAuthors] = useState([]);
  const [num, setNum] = useState(0);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [ok, setOK] = useState(false);
  let number = 1;

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setOK(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const getAuthor = async () => {
    const res = await axios.get("http://localhost:3004/author");
    setAuthors(res.data);
  };

  const colums = [
    {
      title: "#",
      width: "5%",
      render: () => number++,
    },
    {
      title: "Name",
      dataIndex: "value",
      key: "value",
      width: "20%",
    },
    {
      title: "Biography",
      dataIndex: "biography",
      width: "70%",
    },
    {
      title: "Action",
      key: "x",
      render: (_, authors) => (
        <Space size="small">
          <Button
            onClick={() => {
              confirmDelete(authors.id);
            }}
            size="large"
            type="primary"
            danger
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const confirmDelete = (id) => {
    confirm({
      title: "Delete Book",
      content: "Do you want to delete this book ?",
      onOk() {
        deleteAuthor(id);
        setNum(num + 1);
      },
      onCancel() {
        console.log("no");
      },
    });
  };

  useEffect(() => {
    getAuthor();
  }, [num]);

  return (
    <Layout className="layout">
      <div className="card-b">
        <div className="top">
          <h1>Author Data</h1>
          <Button onClick={showModal} type="primary">
            Add
          </Button>
          <Modal
            title="Add Author"
            open={open}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
          >
            <Form
              name="add-form"
              onSubmitCapture={(e) => {
                addAuthor(e);
              }}
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
            >
              <Form.Item
                label="Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "please input the Name",
                  },
                ]}
              >
                {" "}
                <Input />
              </Form.Item>
              <Form.Item
                label="Biography"
                name="bio"
                rules={[
                  {
                    required: true,
                    message: "please input the biography",
                  },
                ]}
              >
                <TextArea style={{ resize: "none" }} />
              </Form.Item>
              <Button
                id="submit"
                htmlType="submit"
                type="primary"
                block
              >
                Submit
              </Button>
            </Form>
          </Modal>
        </div>
        <div>
          <Table columns={colums} dataSource={authors}></Table>
        </div>
      </div>
    </Layout>
  );
};

export default AuthorPage;
