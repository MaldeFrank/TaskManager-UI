import "../styles/LoginScreen.css";
import Pligtlisten from "../assets/frontpage/Pligtlisten_logo.png";
interface props{

}

function LoginScreen({

}:props){


    return(
    <>
    <div className="loginScreen">
    <img src={Pligtlisten} alt="Pligtlisten logo" className="logo_1" />
    <div id="signInDiv"></div>
    </div>
    </>)
}

export default LoginScreen;