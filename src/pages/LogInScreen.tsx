import "../styles/LoginScreen.css";
import Pligtlisten from "../assets/frontpage/Pligtlisten_logo.png";
import ExpandableListItem from "../components/ExpandableListItem";
interface props{

}

function LoginScreen({

}:props){

    return(
    <>
    <div className="loginScreen">
    <img src={Pligtlisten} alt="Pligtlisten logo" className="logo_1" />
    <div className="signInDiv" id="signInDiv"></div>
    </div>
    </>)
}

export default LoginScreen;