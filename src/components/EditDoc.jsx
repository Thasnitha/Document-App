import React, { useEffect, useState } from "react";
import { Button, TextField, Container, Typography } from "@mui/material";
import { db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useParams, useNavigate } from "react-router-dom";

const EditDoc = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [docData, setDocData] = useState({ title: "", content: "" });

  // Fetch the document from Firestore
  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const docRef = doc(db, "documents", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setDocData(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };
    fetchDocument();
  }, [id]);

  const handleUpdate = async () => {
    try {
      const docRef = doc(db, "documents", id);
      await updateDoc(docRef, {
        title: docData.title,
        content: docData.content,
      });
      navigate("/"); 
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ my: 4 }}>
        Edit Document
      </Typography>

      <TextField
        label="Title"
        value={docData.title}
        onChange={(e) => setDocData({ ...docData, title: e.target.value })}
        fullWidth
        sx={{ my: 2 }}
      />
      <TextField
        label="Content"
        value={docData.content}
        onChange={(e) => setDocData({ ...docData, content: e.target.value })}
        fullWidth
        multiline
        rows={4}
        sx={{ my: 2 }}
      />
      <Button sx={{
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
  }} variant="contained" onClick={handleUpdate}>
        Update Document
      </Button>
    </Container>
  );
};

export default EditDoc;
