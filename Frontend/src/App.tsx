// import { useEffect } from 'react';
// import axios from 'axios';

import React from "react";
import Routing from "./Routes/Routing";


function App() {
  // useEffect(() => {
  //   axios.post('/api/deploy', { repoURL: 'https://github.com/suraj-9849/foodForward.git' })
  //     .then((res) => {
  //       console.log(res.data);
  //     })
  //     .catch((err) => {
  //       console.error('Error:', err);
  //     });
  // }, []);

  return (
    <>
    
    <Routing/>
    </>
  );
}

export default App;
