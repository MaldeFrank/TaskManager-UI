import { Button, Popover } from "antd";
import { useState } from "react";

function Friendlist() {
  const text = <span>Friends</span>;
  const [email, setEmail] = useState("");

   const onValueChange = (e:any) => {
    setEmail(e.target.value)
  }

  const sendEmail=() =>{
    console.log("Email tilføjes: ",email)
  }

  const content = (
    <div style={{ border: '1px solid black', padding: '8px' }}>
      <input onChange={(e)=>onValueChange(e)} placeholder="Email.." ></input>
      <Button onClick={()=>sendEmail()}>Send anmodning</Button>
    </div>
  );

  return (
    <Popover placement="rightTop" title={text} content={content}>
      Friendlist
    </Popover>
  );
}

export default Friendlist;
