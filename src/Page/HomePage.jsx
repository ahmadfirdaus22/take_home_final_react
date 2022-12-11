import React, { useEffect, useState } from "react";
import Layout from "antd/es/layout/layout";
import { Card, Row, Col, Button } from "antd";
import axios from "axios";
import "../css/HomePage.style.css";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [num, setNum] = useState(1); // page number
  const navigate = useNavigate();

  const getBook = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3004/books?_page=" + num + "&_limit=3"
      );
      if (res.status == 200) {
        setBooks(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const navigateToDetail = (id) => {
    navigate("detail/"+id)
  }

  const nextPage = () =>{
    setNum(num + 1);
  }

  const prevPage = () => {
    setNum(num - 1);
  }

  useEffect(() => {
    getBook();
  }, [num]);
  return (
    <>
      <Layout className="layoutHome">
        <div className="title">
          <h1>Books Store</h1>
        </div>
        <Row gutter={8} className="rowHome">
          {books.map((book) => (
            <Col span={5}>
              <Card className="cardHome">
                <img className="imgHome" src={book.cover} />
                <p>
                  <b>{book.title}</b>
                </p>
                <p className="desc">{book.desc}</p>
                <Button onClick={() => { navigateToDetail(book.id) }} type="primary">See More</Button>
              </Card>
            </Col>
          ))}
        </Row>
        <div className="page">
          <Button onClick={prevPage} type="dashed">Prev</Button>
          <Button onClick={nextPage} type="dashed">Next</Button>
        </div>
      </Layout>
    </>
  );
};

export default HomePage;
