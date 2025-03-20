import { useState } from 'react';
import { message } from 'antd';
import { addGoogleAccByEmail, getProfileByGoogleEmail } from '../../../services/apiProfile';
import { addAccToTasklist } from '../../../services/apiTasklist';


export const useShareTasklist = (tasklistId: number) => {
  const [email, setEmail] = useState('');
  const [shareVisible, setShareVisible] = useState(false);

  const addProfiles = async () => {
    await addGoogleAccByEmail(localStorage.getItem('profile_id'), email);
    const response = await getProfileByGoogleEmail(email);
    await addGoogleAccByEmail(response.id, localStorage.getItem('Email'));
  };

  const addUserToTasklist = async () => {
    const response = await addAccToTasklist(email, tasklistId);

    if (response === false || response === undefined) {
      message.error('Bruger med mail ikke fundet');
    } else {
      message.success('Bruger tilføjet til tasklist');
      addProfiles();
    }
  };

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  return {
    email,
    setEmail,
    shareVisible,
    setShareVisible,
    addUserToTasklist,
    handleEmailChange,
  };
};