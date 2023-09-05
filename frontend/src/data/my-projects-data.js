
const ProjectsData = () => {

    const [projectData, setProjectsData] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchProjects();
    }, []);
    
    const fetchProjects = async () => {
    try {
        const response = await axios
        .get("http://localhost:4000/api/project/my-projects", 
        {
            headers: {'Access-Control-Allow-Origin':true, 'Authorization': 'Bearer ' +token,},
        })
        setProjectsData(response.data);
    } catch (error) {
        console.error("Erreur lors de la récupération des informations: ", error)
    }
    };

    return (projectData);

    /*{
      img: "/img/home-decor-1.jpeg",
      title: "Modern",
      description:
        "As Uber works through a huge amount of internal management turmoil.",
      route: "/dashboard/profile"
    },*/
};
  
export default myProjectsData;