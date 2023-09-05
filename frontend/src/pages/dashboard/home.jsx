import React, {useState, useEffect} from "react";
import axios from "axios";
import {
  Typography,
  Card,
  CardHeader,
  CardFooter,
  CardBody,
  Tooltip,
} from "@material-tailwind/react";
import {
  PencilIcon,
  TrashIcon
} from "@heroicons/react/24/solid";
import jwtDecode from "jwt-decode";
import image from "../../../public/img/home-decor-1.jpeg"
import image_ from "../../../public/img/home-decor-2.jpeg"

export function Home() {


  const [myprojectData, setMyProjectsData] = useState([]);
  const [projectData, setProjectsData] = useState([]);
  const [projectId, setProjectId] = useState(null);
  //const [userId, setUserId] = useState(null)
  const [divVisible, setDivVisible] = useState(false)

  const token = localStorage.getItem('token');
  //const decodedToken = jwtDecode(token);
  //setUserId(decodedToken.userId);

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


  useEffect(() => {
      fetchProjects();
  }, []);

  const fetchProjects = async () => {
  try {
      const response = await axios
      .get("http://localhost:4000/api/project/all-projects", 
      {
          headers: {'Access-Control-Allow-Origin':true, 'Authorization': 'Bearer ' +token,},
      })
      setProjectsData(response.data);
  } catch (error) {
      console.error("Erreur lors de la récupération des informations: ", error)
  }
  };


  const showConfirmation = (projectId) => {
    //console.log(projectId)
    setDivVisible(true);
    setProjectId(projectId)
  } 

  const confirmActionFalse = () => {

    setDivVisible(false);
    setProjectId(null);
    //const decodedToken = jwtDecode(token);
    //console.log(decodedToken)
  }

  const confirmActionTrue = () => {
  
    axios
    .delete("http://localhost:4000/api/project/delete/"+projectId, 
    {
      headers: {'Authorization': 'Bearer ' +token,},
    })
    .then((result) => {
        //fetchActualites();
        setDivVisible(false);
        setProjectId(null)
        window.location.reload();
    }).catch((err) => {

        console.log(err);
        //window.location.reload();

    });
  }

  return (
    <div className="App">
      <div className="px-4 pb-4 soumetteur mt-10">
        <Typography variant="h6" color="blue-gray" className="mb-2">
          Mes projets
        </Typography>

        <div className="mt-6 grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-4">
          {myprojectData.map((project) => (
              <Card key={project.title} color="transparent" shadow={false}>
                <CardHeader
                  floated={false}
                  color="gray"
                  className="mx-0 mt-0 mb-4 h-64 xl:h-40"
                >
                  <img
                    src={image}
                    alt={project.title}
                    className="h-full w-full object-cover"
                  />
                </CardHeader>
                <CardBody className="py-0 px-1">
                  <Typography
                    variant="h5"
                    color="blue-gray"
                    className="mt-1 mb-2"
                  >
                    {project.title}
                  </Typography>
                  <Typography
                    variant="small"
                    className="font-normal text-blue-gray-500"
                  >
                    {project.description}
                  </Typography>
                </CardBody>
                <CardFooter className="mt-6 flex items-center justify-between py-0 px-1">
                  <Tooltip content="Edit Project">
                    <PencilIcon className="h-6 w-6 cursor-pointer text-blue-500" />
                  </Tooltip>
                  
                  <Tooltip content="Delete Project">
                    <TrashIcon className="h-6 w-6 cursor-pointer text-red-500" onClick={()=>showConfirmation(project._id)}/>
                  </Tooltip>
                </CardFooter>
              </Card>
            )
          )}
        </div>
      </div>

      <div className="px-4 pb-4 financeur mt-10">
        <Typography variant="h6" color="blue-gray" className="mb-2">
          Tous les projets
        </Typography>
        
        <div className="mt-6 grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-4">
          {projectData.map((project) => (
              <Card key={project.title} color="transparent" shadow={false}>
                <CardHeader
                  floated={false}
                  color="gray"
                  className="mx-0 mt-0 mb-4 h-64 xl:h-40"
                >
                  <img
                    src={image_}
                    alt={project.title}
                    className="h-full w-full object-cover"
                  />
                </CardHeader>
                <CardBody className="py-0 px-1">
                  <Typography
                    variant="h5"
                    color="blue-gray"
                    className="mt-1 mb-2"
                  >
                    {project.title}
                  </Typography>
                  <Typography
                    variant="small"
                    className="font-normal text-blue-gray-500"
                  >
                    {project.description}
                  </Typography>
                </CardBody>
              </Card>

              
            )
          )}
        </div>
      </div>

      <div className={divVisible ? 'visible' : 'hidden'}>
        <div id="custom-confirm" className="modal fixed z-[1] w-full h-full bg-[rgba(0,0,0,0.4)] left-0 top-0">
          <div className="modal-content bg-[white] w-[300px] text-center flex flex-col justify-between items-center mx-auto my-[15%] p-[4%] rounded-[10px]">
              <h4 className="text-xl pb-[10%]">Etes-vous sûr de vouloir supprimer cette actualité ?</h4>
              <div className="modal-content-button w-[85%] flex flex-row justify-between">
                  <button onClick={confirmActionFalse} className="bg-[white] w-[48%] text-[#0F54A1] text-base font-[bold] cursor-pointer p-[2%] rounded-[10px] border-[#0F54A1] border-[solid]">Non</button>
                  <button onClick={confirmActionTrue} className="active bg-[#0F54A1] text-[white] w-[48%] text-base font-[bold] cursor-pointer p-[2%] rounded-[10px] border-[#0F54A1] border-[solid]">Oui</button>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
