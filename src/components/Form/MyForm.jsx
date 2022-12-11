import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select } from "antd";
import axios from "axios";
import TextArea from "antd/es/input/TextArea";
import { addBook } from "../services";

const { Option } = Select;

const MyForm = (props) => {
  const [authors, setAuthors] = useState([]);
  const [choseAuthor, setChoseAuthor] = useState('');
  let genre = '';
  let name = '';
  const [data, setData] = useState([]);
  const [num, setNum] = useState(0);

  if (props.click == true) {
    document.getElementById("submit").click();
  }

  const getAuthor = async () => {
    try {
      const res = await axios.get("http://localhost:3004/author");
      if (res.status == 200) {
        setAuthors(res.data);
      }
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const changeData = () => {
    authors.map((a) => {
      if(a.id == choseAuthor){
        name = a.label
      }
    })
    setData({
      'genre' : genre,
      'authorId' : choseAuthor,
      'author' : name
    })
  }

  const allFuction = (e) => {
    genre = e;
    changeData();
  }

  useEffect(() => {
    getAuthor();
  }, [genre, data]);

  return (
    <Form
      name="add-form"
      onSubmitCapture={(e) => {
        props.action(e, data);
      }}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
    >
      <Form.Item
        label="Title"
        name="title"
        rules={[
          {
            required: true,
            message: "please input the title",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Author"
        name="author"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select placeholder="Select an Author" onChange={(e) => {setChoseAuthor(e)}}>
          {authors.map((author) => (
            <Option value={author.id} key={author.id} >{author.label}</Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        label="Cover"
        name="cover"
        rules={[
          {
            required: true,
            message: "please input the cover",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Genre"
        name="genre"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select placeholder="Select a Genre" onChange={(e) => {allFuction(e)}}>
          <Option value="Drama">Drama</Option>
          <Option value="Mystery">Mystery</Option>
          <Option value="Fantasy">Fantasy</Option>
          <Option value="Romance">Romance</Option>
          <Option value="Historical">Historical</Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="Description"
        name="desc"
        rules={[
          {
            required: true,
            message: "please input the description",
          },
        ]}
      >
        <TextArea style={{ resize: "none" }} />
      </Form.Item>
      <Button
        id="submit"
        htmlType="submit"
        type="primary"
        style={{ display: "none" }}
      >
        OK
      </Button>
    </Form>
  );
};

export default MyForm;
