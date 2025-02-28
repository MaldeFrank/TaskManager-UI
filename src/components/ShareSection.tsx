import { List } from "antd";
import "../styles/ShareSection.css";
import ShareButton from "./ShareButton";


interface Props {
  isVisible?: boolean;
  onInputChange: any;
  onClickSendEmail: (event: React.MouseEvent<HTMLElement>) => void;
}

function ShareSection({ isVisible = true, onInputChange, onClickSendEmail }: Props) {
  if (!isVisible) return null;

  return (
    <div className="share-overlay">
      <div className="share-container">
        <h2 className="share-title">Del liste med bruger</h2>
        <div style={{display: "flex"}}> 
         <input
          className="share-input"
          onChange={(e) => onInputChange(e)}
          type="text"
          placeholder="Email.."
        />
        <ShareButton onClickEvent={onClickSendEmail}></ShareButton>
        </div>
      
        <h2>Personer med adgang</h2>
        <List className="share-list" />
      </div>
    </div>
  );
}

export default ShareSection;