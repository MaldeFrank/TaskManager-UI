import { useState } from "react";
import "../styles/ExpandableListItem.css";

interface props {
  video?: any;
  image?: any;
  size?:any;
  description:any;
}

{/* ---------------------------------------------------------------------
    Component: ExpandableListItem
    Purpose: Description and expanse functionality to show more.
    --------------------------------------------------------------------- */}
function ExpandableListItem({ video, image, description, size}: props) {
const [isExpanded, setExpanded] = useState(false)

  function videoDiv() {
    return (
      <div className="videoDiv">
        <video>
          <source src={video} type="video/mp4" />
        </video>
      </div>
    );
  }

  function imageDiv() {
    return (
      <div className="imageDiv">
        <img src={image} alt="description"></img>
      </div>
    );
  }

  function DescriptionTekst(){
    const buttonText = isExpanded ? '▼' : '▲'; 

    const toggleExpand = () => {
        setExpanded(!isExpanded);
      };

    return(
        <>
        <div className={size===undefined?"description_box":"description_box_"+size}>
        <li className="description_text">{description}</li>
        <button className="expand_button" onClick={toggleExpand}>
         {buttonText}
        </button>
        </div>
        </>
    )
  }

  return(<>
  <div>
  <DescriptionTekst/>
  </div>
   

  </>)
}

export default ExpandableListItem;