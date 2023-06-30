/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useSelector } from "react-redux";
import ReactQuill from "react-quill";

import axios from "axios";
import qs from "querystring";
import FileUploadSingle from "../components/fileUpload";
import DataTable from "../components/dataTable";

import { Button } from "@mui/material";
import { axiosConfig } from "../util";

import "./create_campaign.css";
import "react-quill/dist/quill.snow.css";

function createCampaign() {
  const contactData = useSelector((store) => store.contacts);
  const [campaignName, setCampaignName] = useState("");
  const [value, setValue] = useState("");

  console.log(value);
  console.log(campaignName);

  const uploadCampaign = async (
    name,
    createdBy,
    noOfContacts,
    isEmailCampaign
  ) => {
    console.log(typeof noOfContacts);
    console.log(
      `name= ${name}, createdBy= ${createdBy}, noOfContacts= ${noOfContacts}`
    );
    let insertId = null;
    axios(
      axiosConfig(
        "addCampaign",
        qs.stringify({
          name: campaignName,
          createdBy,
          noOfContacts,
          isEmailCampaign,
        }),
        ""
      )
    )
      .then((response) => {
        console.log(response.data);
        insertId = response.data.details[0].id; // id of the inserted row
        console.log(insertId);
        axios(
          axiosConfig(
            "addCampaignEmails",
            qs.stringify({
              campaignId: insertId,
              // customerId: "",
              // name: contactData.map((data) => data.name),
              emails: contactData.map((data) => data.email),
            }),
            ""
          )
        )
          .then((res) => {
            console.log(res);
            axios(
              axiosConfig(
                "addContext",
                qs.stringify({ campaignId: insertId, context: name }),
                ""
              )
            )
              .then((res) => {
                console.log(res);

                axios(
                  axiosConfig(
                    "startEmailCampaign",
                    qs.stringify({
                      text: "open in a different browser",
                      html: value,
                      campaignId: insertId,
                    }),
                    ""
                  )
                )
                  .then((res) => {
                    console.log(res);
                  })

                  .catch((err) => console.log(err));
              })

              .catch((err) => console.log(err));
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const toolbar = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  return (
    <div>
      <h1>Create a campaign</h1>

      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <span id="name-span">
          <p id="campaign-name">Subject</p>
          <TextField
            id="capmaign-name"
            label="campaign-name"
            variant="standard"
            onChange={(e) => setCampaignName(e.target.value)}
          />
        </span>

        <span id="text-span">
          <p id="add-text">Add body text</p>
          <ReactQuill
            modules={toolbar}
            formats={formats}
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </span>

        <span id="upload-contacts-span">
          <FileUploadSingle />
        </span>
        <DataTable
          cols={[
            { name: "name", width: 150 },
            { name: "email", width: 300 },
          ]}
          rows={contactData}
          width={"40%"}
          margin={"0, 0, 0, 30%"}
        />
        <Button
          onClick={() =>
            uploadCampaign(campaignName, "", contactData.length, true)
          }
        >
          Upload
        </Button>
      </Box>
    </div>
  );
}

export default createCampaign;
