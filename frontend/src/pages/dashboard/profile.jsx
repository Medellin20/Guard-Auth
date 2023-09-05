import React, {useState, useEffect} from 'react';
import {
  Card,
  CardBody,
  Avatar,
  Typography,
  Tooltip,
} from "@material-tailwind/react";
import {
  PencilIcon,
} from "@heroicons/react/24/solid";
import { ProfileInfoCard } from "@/widgets/cards";
import Edit from '../auth/edit';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

export function Profile() {

  const [divVisible, setDivVisible] = useState(false);
  const [user, setUser] = useState({})
  //const [userId, setUserId] = useState(null)

  const token = localStorage.getItem('token');
  // const decodedToken = jwtDecode(token);
  // const userId = decodedToken.userId;

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const decodedToken = jwtDecode(token);
    //setUserId(decodedToken.userId)
    const userId = decodedToken.userId;
    //console.log(userId)

    try {

      const response = await axios.get("http://localhost:4000/api/auth/"+userId, 
      {
        headers: {'Access-Control-Allow-Origin':true, 'Authorization': 'Bearer ' +token,},
      })
      setUser(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des informations: ", error)
    }
  };

  const Display = () => {
    setDivVisible(!divVisible);
  }

  return (
    <>
      <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url(https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80)] bg-cover	bg-center">
        <div className="absolute inset-0 h-full w-full bg-blue-500/50" />
      </div>
      <Card className="mx-3 -mt-16 mb-6 lg:mx-4">
        <CardBody className="p-4">
          <div className="mb-10 flex items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <Avatar
                src="/img/bruce-mars.jpeg"
                alt="bruce-mars"
                size="xl"
                className="rounded-lg shadow-lg shadow-blue-gray-500/40"
              />
              <div>
                <Typography variant="h5" color="blue-gray" className="mb-1">
                  {user.userStatus}
                </Typography>
              </div>
            </div>
          </div>
          <div className="gird-cols-1 mb-12 grid gap-12 px-4 lg:grid-cols-2 xl:grid-cols-3">
           
            <ProfileInfoCard
              title="Information Profil"
              details={{
                "Nom et Prenom": user.lastname + " " + user.name,
                "email": user.email,
              }}
              action={
                <Tooltip content="Edit Profile">
                  <PencilIcon className="h-4 w-4 cursor-pointer text-blue-gray-500" onClick={Display} />
                </Tooltip>
              }
            /> 
          </div>
        </CardBody>
      </Card>

      <div className={divVisible ? 'visible' : 'hidden'}>
        <Edit></Edit>
      </div>
    </>
  );
}

export default Profile;
