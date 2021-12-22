import React, { useEffect, useState } from "react";
import { Card, Spin, Typography } from "antd";
import { useHistory } from "react-router-dom";

import { BaseAPI } from "../../utils/Api";
import ViewNoticesTable from "../../components/Admin/ViewNoticesTable";
import Notification from "../../components/controls/Notification";
import ErrorHandler from "../../components/controls/ErrorHandler";

const { Title } = Typography;

const AdminViewNotice = () => {
  const history = useHistory();

  // states
  const [loading, setLoading] = useState(false);
  const [noticeList, setNoticeList] = useState([]);

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
          setNoticeList(data);
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

  return (
    <Spin spinning={loading}>
      <div className="center">
        <Title level={2}>All Notices</Title>
      </div>

      <Card className="card">
        <ViewNoticesTable noticeList={noticeList} deleteNotice={deleteNotice} />
      </Card>
    </Spin>
  );
};

export default AdminViewNotice;
