import { useEffect, useState } from "react";
import { Avatar, Button, List } from "antd";
import { Profile } from "../../model/Profile";
import {
  addGoogleAcc,
  createProfile,
  deleteProfile,
} from "../../services/apiProfile";
import { UserDeleteOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../hooks/app/storeHook";
import {
  addProfile,
  removeProfile,
  setProfiles,
} from "../../redux/slicers/profilelistSlicer";
import { getAllAccProfiles } from "../../services/apiGoogleAccount";
interface props {}

function UsersList({}: props) {
  const userId = localStorage.getItem("user_id");
  const profilelistState = useAppSelector((state) => state.profilelist.list);
  const dispatch = useAppDispatch();
  const [showAddUser, setShowAddUser] = useState(false);
  const newProfile = { //Profile object used as template to create new user
    id: 0,
    name: "",
    points: 0,
    pointScores: undefined,
    googleAccounts: undefined,
    assignedTasks: undefined,
  };

  useEffect(() => {
    const fetchProfiles = async () => {
      const data: Profile[] = await getAllAccProfiles(userId);
      dispatch(setProfiles(data));
    };
    fetchProfiles();
  }, []);

  //Sets the state to show the input field for adding a new user
  async function addUser() {
    setShowAddUser(!showAddUser);
  }

  function deleteUser(id: number) {
    dispatch(removeProfile({ id }));
    deleteProfile(id);
  }

  function title(item: any) {
    if (showAddUser === false || item.name !== "") {
      return <>{item.name}</>;
    } else {
      return (
        <input
          type="text"
          onKeyDown={async (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const response = await createProfile({...newProfile, name: event.currentTarget.value});
              dispatch(addProfile(response));
              addGoogleAcc(response.id, localStorage.getItem("user_id"));
              setShowAddUser(!showAddUser);
            }
          }}
        />
      );
    }
  }

  return (
    <List
      itemLayout="horizontal"
      dataSource={
        showAddUser ? [...profilelistState, newProfile] : profilelistState //Adds a template user to the list if showAddUser is true
      }
      renderItem={(item, index) => (
        <List.Item>
          <Button
            danger
            icon={<UserDeleteOutlined />}
            onClick={() => deleteUser(item.id)}
          />
          <List.Item.Meta
            avatar={
              <Avatar
                src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
              />
            }
            title={title(item)}
            description={"Point i alt: " + item.points}
          />
        </List.Item>
      )}
    >
      <Button type="primary" onClick={addUser}>
        Tilføj bruger
      </Button>
    </List>
  );
}

export default UsersList;
