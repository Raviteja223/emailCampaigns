import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
// import qs from "querystring";

import DataTable from "../components/dataTable";
import { axiosGetConfig } from "../util";

const viewCampaign = async (req, res) => {
  //   const [campaigns, setCampaigns] = useState([]);
  axios(axiosGetConfig("getCampaigns", ""))
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });

  return (
    <>
      <h1>View your campaigns</h1>
      <h1>Hi</h1>

      {/* <DataTable /> */}
    </>
  );
};

export default viewCampaign;
