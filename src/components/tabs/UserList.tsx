import React, { useEffect, useState } from "react";
import { Avatar, Button, List } from "antd";
import { Profile } from "../../model/Profile";
import { addGoogleAcc, createProfile, deleteProfile } from "../../services/apiProfile";
import { UserDeleteOutlined } from "@ant-design/icons";
import { useGetAllAccProfiles } from "../../services/queries";
interface props {
  setProfiles: React.Dispatch<React.SetStateAction<Profile[]>>;
  profiles: Profile[];
}

function UsersList({ setProfiles, profiles }: props) {
  const [newUserName, setNewUserName] = useState("")
  const userId = localStorage.getItem("user_id"); 
  const {data} = useGetAllAccProfiles(userId)

  useEffect(() => {
    if(data){
      setProfiles(data)
    }
  }, [data,setProfiles])

  function addUser() {
    const newProfile: Profile = {
      id: 0,
      name: "",
      points: 0,
    };

    setProfiles([...profiles, newProfile]);
  }

  function deleteUser(id:number){
    setProfiles(prev=>prev.filter(profile=>profile.id!==id))
    console.log("This is id",id)
    deleteProfile(id)
  }

  return (
    <List
      itemLayout="horizontal"
      dataSource={profiles}
      renderItem={(item, index) => (
        <List.Item>
          <Button danger icon={<UserDeleteOutlined/>} onClick={()=>deleteUser(item.id)}/>
          <List.Item.Meta
            avatar={
              <Avatar
                src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
              />
            }
            // If profile has a name it shows the name, else it will show an input field which has an onchange, and it sets the title on enter
            title={
                item.name || (
                  <input
                    type="text"
                    onChange={(event)=>{
                       setNewUserName(event.target.value) 
                    }}
                    onKeyDown={async (event) => {
                      if (event.key === "Enter") {
                        event.preventDefault();
                        const newItems = [...profiles]; 
                        newItems[index].name = newUserName;
                        setProfiles(newItems);
                        const response = await createProfile(newItems[index])
                        addGoogleAcc(response.id,localStorage.getItem("user_id")) //Sets the current google account as the owner of the profile
                      }
                    }}
                  />
                )
              }

            description={"Point i alt: " + item.points}
          />
        </List.Item>
      )}
    >
      <Button type="primary" onClick={addUser}>Tilføj bruger</Button>
    </List>
  );
}

export default UsersList;
