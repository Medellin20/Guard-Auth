import { useState } from 'react'
import axios from 'axios';
import jwtDecode from 'jwt-decode';


const Add = () => {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [sector, setSector] = useState("");
  const [budget, setBudget] = useState("");
  const [duration, setDuration] = useState("");
  //const [userId, setUserId] = useState(null)

  const token = localStorage.getItem('token');


  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    //const userTypes = userType.title;
    const decodedToken = jwtDecode(token)
    //setUserId(decodedToken.userId)

    /* Checking */

    // traitement //
    axios
    .post("http://localhost:4000/api/project/submit",
    {
      title, 
      description, 
      sector, 
      budget,
      duration,
      //userId
    },
    {
      headers : {
        "Authorization": 'Bearer '+token,
      },
    })
    .then((result) => {
        console.log(result.data);
        //console.log(userTypes);

        window.location= "/dashboard/home";
    }).catch((err) => {
        console.log(err);
        //console.log(userTypes);
    });
  }

  return (
    <>
      <div className="rounded-xl border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="w-full border-stroke dark:border-strokedark m-auto">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <h2 className="mb-9 mt-9 text-4xl font-bold text-black text-center dark:text-white sm:text-title-xl2">
                Ajouter un nouveau projet
              </h2>

              <form method='POST' onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Titre
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Enter your title"
                      value={title}  
                      onChange={(e) => {setTitle(e.target.value)}} 
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Description
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Enter your description"
                      value={description}  
                      onChange={(e) => {setDescription(e.target.value)}} 
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className="mb-4 flex flex-row justify-between">
                  <div>
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Secteur
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Enter your secteur"
                        value={sector}  
                        onChange={(e) => {setSector(e.target.value)}} 
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Budget
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Enter your budget"
                        value={budget}  
                        onChange={(e) => {setBudget(e.target.value)}} 
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      duration
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Enter your duration"
                        value={duration}  
                        onChange={(e) => {setDuration(e.target.value)}} 
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-5 text-2xl">
                  <input
                    type="submit"
                    value="Ajouter un nouveau projet"
                    className="w-full cursor-pointer rounded-lg bg-blue-600 p-4 text-white transition hover:bg-opacity-90"
                  />
                </div>
              </form>
            </div>
          </div>
      </div>
    </>
  );
};

export default Add;