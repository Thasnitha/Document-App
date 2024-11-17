import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Typography, Container } from "@mui/material";

const ViewDoc = () => {
  const { id } = useParams(); 
  const [docData, setDocData] = useState(null);

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const docRef = doc(db, "documents", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setDocData(docSnap.data());
        } else {
          console.error("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };

    fetchDocument();
  }, [id]);

  return (
    <Container>
      {docData ? (
        <>
          <Typography variant="h4" sx={{ my: 2 }}>
            {docData.title}
          </Typography>
          <div dangerouslySetInnerHTML={{ __html: docData.content }} />
        </>
      ) : (
        <Typography>Loading...</Typography>
      )}
    </Container>
  );
};

export default ViewDoc;