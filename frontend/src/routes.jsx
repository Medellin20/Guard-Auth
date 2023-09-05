import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  BellIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,UserIcon
} from "@heroicons/react/24/solid";
import { Home, Profile,TablesSoumetteur, Notifications, TablesFinanceur } from "@/pages/dashboard";
import { Logout } from "@/pages/auth";
import jwtDecode from "jwt-decode";


const token = localStorage.getItem('token');
//const [user, setUser] = useState({})
const decodedToken = jwtDecode(token);
//setUserId(decodedToken.userId)
const userId = decodedToken.userId;
//console.log(userId)


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

//const status = user.userStatus;
//console.log('message',status);

const icon = {
  className: "w-5 h-5 text-inherit",
};




export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "profile",
        path: "/profile",
        element: <Profile />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "financeur",
        path: "/financeur",
        element: <TablesFinanceur />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "soumetteur",
        path: "/soumetteur",
        element: <TablesSoumetteur />,
      }
    ],
  },
  {
    layout: "auth",
    pages: [
      {
        icon: <ArrowRightOnRectangleIcon {...icon} />,
        name: "logout",
        path: "/signin",
        element: <Logout />,
      },
    ],
  },
];

export default routes;
