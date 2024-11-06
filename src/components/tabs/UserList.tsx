import React, { useState } from "react";
import { Avatar, Button, List } from "antd";
import { Profile } from "../../model/Profile";
import { createProfile } from "../../services/apiProfile";

interface props {
  setProfiles: React.Dispatch<React.SetStateAction<Profile[]>>;
  profiles: Profile[];
}

function UsersList({ setProfiles, profiles }: props) {
  const [newUserName, setNewUserName] = useState("")

  function addUser() {
    const newProfile: Profile = {
      id: 0,
      name: "",
      points: 0,
    };

    setProfiles([...profiles, newProfile]);
  }

  return (
    <List
      itemLayout="horizontal"
      dataSource={profiles}
      renderItem={(item, index) => (
        <List.Item>
          <List.Item.Meta

            avatar={
              <Avatar
                src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
              />
            }
            // If profile has name it shows the name, else it will show an input field which has an onchange, and it sets the title on enter
            title={
                item.name || (
                  <input
                    type="text"
                    onChange={(event)=>{
                       setNewUserName(event.target.value) 
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        event.preventDefault();
                        const newItems = [...profiles]; 
                        newItems[index].name = newUserName;
                        setProfiles(newItems);
                        createProfile(newItems[index])
                      }
                    }}
                  />
                )
              }

            description={"Points: " + item.points}
          />
        </List.Item>
      )}
    >
      <Button onClick={addUser}>Tilføj bruger</Button>
    </List>
  );
}

export default UsersList;
