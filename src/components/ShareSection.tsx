import { List } from "antd";
import "../styles/ShareSection.css";
import ShareButton from "./ShareButton";
import { useGetAllTasklistUsers } from "../services/queries";
import { useEffect } from "react";

interface Props {
  isVisible?: boolean;
  onInputChange: any;
  onClickSendEmail: (event: React.MouseEvent<HTMLElement>) => void;
  tasklistId: number;
}

function ShareSection({
  isVisible = true,
  onInputChange,
  onClickSendEmail,
  tasklistId,
}: Props) {
  const { data, refetch } = useGetAllTasklistUsers(tasklistId);

  const listData = data?.map((item: any) => ({
    title: item.email
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
            placeholder="Email.."
          />
          <ShareButton onClickEvent={onClickSendEmail}></ShareButton>
        </div>

        <h2>Personer med adgang</h2>
        <div style={{ maxHeight: "200px", overflowY: "auto" }}>
          <List dataSource={listData} renderItem={(item:any, index)=>{
            return <List.Item key={index}>{item.title}</List.Item>
          }} className="share-list" />
        </div>
      </div>
    </div>
  );
}

export default ShareSection;
