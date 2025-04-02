import { Dropdown, MenuProps } from "antd";

interface props{
tasklists:any[];
className?:any;
}
{/* ---------------------------------------------------------------------
    Component: AddSchema
    Purpose: To show tasklists in dropdown and assign the schema to a tasklist
    --------------------------------------------------------------------- */}
function AddSchema({tasklists, className}:props){
  const items: MenuProps["items"] = tasklists.map((tasklist) => ({
    key: tasklist.taskId,
    label: tasklist.listName,
  }));

  return(<>
   <Dropdown.Button className={className}
      menu={{
        items,
        onClick: (e) => console.log(e),
      }}
      placement="bottom"
    >
      tilføj til liste
    </Dropdown.Button>
  </>)
}

export default AddSchema;