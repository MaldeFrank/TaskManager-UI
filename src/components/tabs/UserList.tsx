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
    const newProfile: any = {
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
                       setNewUserName(event.target.value) //On event sets the input name
                    }}

                    onKeyDown={async (event) => { //The event 
                      if (event.key === "Enter") {
                        event.preventDefault();
                        const newItems = [...profiles]; //Sets a list on the new event with all the profiles including the added empty profile

                        const newProfile: Profile = {
                          id: 0,
                          name: newUserName,
                          points: 0,
                          pointScores: undefined,
                          googleAccounts: undefined,
                          assignedTasks: undefined
                        };

                        newItems[index] = newProfile; //Sets the empty profile to be the new one with added name.
                        const response = await createProfile(newItems[index]) //Creates the profile in the database.
                        newItems[index].id = response.id; //Sets the id on the profile to allow dropdown select.
                        setProfiles(newItems); //Sets the dropdown profile list.
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
