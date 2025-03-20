import { Button } from "antd";

interface props{
onClickEvent: (event: React.MouseEvent<HTMLElement>) => void;
}
{/* ---------------------------------------------------------------------
    Component: ShareButton
    Purpose: a button with an onClick event.
    --------------------------------------------------------------------- */}
function ShareButton({
onClickEvent
}:props){

    return (
        <><Button size="large" type="primary" onClick={onClickEvent}>Send</Button></>
    )
}

export default ShareButton;