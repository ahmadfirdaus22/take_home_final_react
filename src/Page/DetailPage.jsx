import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Layout, Card } from "antd";
import "../css/DetailPage.style.css";

const DetailPage = () => {
  const param = useParams();
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const res = await axios.get("http://localhost:3004/books/" + param.id);
      if (res.status == 200) {
        setData(res.data);
      }
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <Layout className="layout">
        <div className="card-d">
          <img className="imgDetail" src={data.cover} />
          <div className="des">
            <h1>{data.title}</h1><br />
            <p>{data.desc}</p><br />
            <p><b>Author: </b>{data.author}</p><br />
            <p><b>Genre: </b>{data.genre}</p>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default DetailPage;
