


import React, { useState } from "react";
import { Button, TextField, Container } from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { db } from "../firebase";
import { collection, addDoc,getFirestore } from "firebase/firestore";
import { useNavigate } from "react-router-dom"; 

const CreateDoc = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate(); 

  const handleSave = async () => {
    if (title && content) {
      try {
        await addDoc(collection(db, "documents"), { title, content });
        alert("Document saved successfully!");
        setTitle("");
        setContent("");
        navigate("/"); 
      } catch (error) {
        console.error("Error saving document:", error);
      }
    } else {
      alert("Please fill in both the title and content.");
    }
  };

  return (
    <Container>
      <TextField
        label="Document Title"
        fullWidth
        sx={{ my: 2 }}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <ReactQuill
        theme="snow"
        value={content}
        onChange={setContent}
        style={{ height: "300px", marginBottom: "20px" }}
      />
      <Button  variant="contained" onClick={handleSave} sx={{
    backgroundColor: 'black',       
    color: 'white',                 
    '&:hover': {
      backgroundColor: '#333',    
    },
    '&:active': {
      backgroundColor: '#444',     
    },
    '&:focus': {
      backgroundColor: '#333',      
    },
  }}>
        Save Document
      </Button>
    </Container>
  );
};

export default CreateDoc;


