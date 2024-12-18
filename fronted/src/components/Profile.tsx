import React, { useEffect, useState } from 'react';
import {signOut} from "aws-amplify/auth";
import { useNavigate } from 'react-router-dom';
import { currentAuthenticatedUser } from '../utils/util';
  
function Profile() {
  const [user,setUser] = useState<any>({});
  const navigate = useNavigate();

  const getUser = async ()=>{
    try{
    const user= await currentAuthenticatedUser();
    setUser(user);
    }
    catch(err){
      navigate('/');
    }
    
  }

  async function handleSignOut() {
    try {
      await signOut();
    } catch (error) {
      console.log("error signing out: ", error);
    }
  }

  useEffect(()=>{
    getUser();
  },[navigate]);


  return (
    <div>
      <p>username : {user.username}</p>
      {/* <p>ID:{user.userId}</p> */}
      <p>Email-Id:{user.signInDetails?.loginId}</p>
      <button onClick={handleSignOut}>
            Sign Out
      </button>
    </div>
  )
}

export default Profile;