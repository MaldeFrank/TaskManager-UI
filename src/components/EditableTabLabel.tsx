import Input from "rc-input";
import { useState } from "react";

function EditableTabLabel({ 
  initialName, 
  taskId, 
  onNameChange 
}: { 
  initialName: string, 
  taskId: string, 
  onNameChange?: (taskId: string, newName: string) => void 
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(initialName);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setIsEditing(false);
      if (onNameChange) {
        onNameChange(taskId, name);
        console.log("List name has been changed")
      }
    }
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (onNameChange) {
      onNameChange(taskId, name);
    }
  };

  return isEditing ? (
    <Input
      value={name}
      onChange={handleChange}
      onKeyDown={handleKeyDown} 
      onBlur={handleBlur}
      autoFocus 
    />
  ) : (
    <span onDoubleClick={handleDoubleClick}>{name}</span>
  );
}

export default EditableTabLabel;