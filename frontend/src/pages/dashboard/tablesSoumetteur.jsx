import React, {useState, useEffect} from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import Add from "./add";

export function TablesSoumetteur() {

  const [myprojectData, setMyProjectsData] = useState([]);

  const token = localStorage.getItem('token');
  // const decodedToken = jwtDecode(token);
  // const userId = decodedToken.userId;

  useEffect(() => {
    fetchMyProjects();
}, []);

const fetchMyProjects = async () => {
try {
    const response = await axios
    .get("http://localhost:4000/api/project/my-projects", 
    {
        headers: {'Access-Control-Allow-Origin':true, 'Authorization': 'Bearer ' +token,},
    })
    setMyProjectsData(response.data);
} catch (error) {
    console.error("Erreur lors de la récupération des informations: ", error)
}
};


  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Mes projets
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["titre", "description", "secteur", "budget", "durée", ""].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {myprojectData.map(
                (projectData, key) => {
                  const className = `py-3 px-5 ${
                    key === myprojectData.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={projectData.title}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <div>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-semibold"
                            >
                              {projectData.title}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {projectData.description}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {projectData.sector}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {projectData.budget}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {projectData.duration}
                        </Typography>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>

      <div>
        <Add />
      </div>

    </div>
  );
}

export default TablesSoumetteur;
  