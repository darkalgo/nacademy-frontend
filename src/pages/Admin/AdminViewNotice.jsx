import React, { useEffect, useState } from "react";
import { Card, Col, Input, Row, Spin, Typography } from "antd";
import { useHistory } from "react-router-dom";
import FuzzySearch from "fuzzy-search";

import { BaseAPI } from "../../utils/Api";
import ViewNoticesTable from "../../components/Admin/ViewNoticesTable";
import Notification from "../../components/controls/Notification";
import ErrorHandler from "../../components/controls/ErrorHandler";

const { Title } = Typography;
const { Search } = Input;

const AdminViewNotice = () => {
  const history = useHistory();

  // states
  const [loading, setLoading] = useState(false);
  const [noticeList, setNoticeList] = useState([]);
  const [searchList, setSearchList] = useState([]);

  useEffect(() => {
    (async () => {
      setLoading(true);

      await BaseAPI.post(
        "/admins/get-notices",
        {},
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
          },
        }
      )
        .then((res) => {
          const data = res.data.data.map((el) => ({
            ...el,
            key: el.id,
          }));
          console.log(data);
          setNoticeList(data);
          setSearchList(data);
        })
        .catch((err) => {
          if (err?.response?.data?.message) {
            ErrorHandler(err?.response?.data?.message, history);
          } else {
            Notification("Something went wrong", "Please check your internet connection and try again or communicate with the admin", "error");
          }
        })
        .finally(() => setLoading(false));
    })();
    return () => {
      setNoticeList([]);
    };
  }, [history]);

  // function
  const deleteNotice = async (value) => {
    await BaseAPI.delete(`/admins/notices/${value}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
      },
    })
      .then((res) => {
        const newList = noticeList.filter((el) => el.id !== value);
        setNoticeList(newList);
      })
      .catch((err) => {
        if (err?.response?.data?.message) {
          ErrorHandler(err?.response?.data?.message, history);
        } else {
          Notification("Something went wrong", "Please check your internet connection and try again or communicate with the admin", "error");
        }
      });
  };

  // search functionality
  const searcher = new FuzzySearch(searchList, ["header", "sent_date", "type"], { sort: true });

  const handleSearch = (value) => {
    if (value) {
      const result = searcher.search(value);
      setNoticeList([...result]);
    } else {
      setNoticeList(searchList);
    }
  };
  const handleChange = (e) => {
    if (e.target.value) {
      const result = searcher.search(e.target.value);
      setNoticeList([...result]);
    } else {
      setNoticeList(searchList);
    }
  };

  return (
    <Spin spinning={loading}>
      <div className="center">
        <Title level={2}>All Notices</Title>
      </div>

      <Row justify="end" className="mb-1">
        <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
          <Search placeholder="input search text" enterButton onSearch={handleSearch} onChange={handleChange} />
        </Col>
      </Row>

      <Card className="card">
        <ViewNoticesTable noticeList={noticeList} deleteNotice={deleteNotice} />
      </Card>
    </Spin>
  );
};

export default AdminViewNotice;
