import { Button, List } from "antd";
import "../styles/ShareSection.css";
import ShareButton from "./ShareButton";
import { useGetAllTasklistUsers } from "../services/queries";
import { AlignRightOutlined, UserOutlined } from "@ant-design/icons";
import { useState } from "react";

interface Props {
  isVisible?: boolean;
  setIsVisible?: any;
  onInputChange: any;
  onClickSendEmail: (event: React.MouseEvent<HTMLElement>) => void;
  tasklistId: number;
}

function ShareSection({
  isVisible,
  setIsVisible,
  onInputChange,
  onClickSendEmail,
  tasklistId,
}: Props) {
  const { data, refetch } = useGetAllTasklistUsers(tasklistId);

  const listData = data?.map((item: any) => ({
    title: (
      <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <UserOutlined />
        {item.email}
      </span>
    ),
  }));

  if (!isVisible) return null;

  return (
    <div className="share-overlay">
      <div className="share-container">
        <h2 className="share-title">Del liste med bruger</h2>
        <div style={{ display: "flex" }}>
          <input
            className="share-input"
            onChange={(e) => onInputChange(e)}
            type="text"
            placeholder="Indtast email.."
          />
          <ShareButton onClickEvent={onClickSendEmail}></ShareButton>
        </div>

        <h2>Personer med adgang</h2>
        <div style={{ maxHeight: "200px", overflowY: "auto" }}>
          <List
            dataSource={listData}
            renderItem={(item: any, index) => {
              return <List.Item key={index}>{item.title}</List.Item>;
            }}
            className="share-list"
          />
        </div>
        <div className="button-wrapper">
          <Button
            onClick={() => setIsVisible(false)}
            type="primary"
            danger
            ghost
          >
            Luk
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ShareSection;
