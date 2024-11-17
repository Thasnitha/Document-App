

import React, { useEffect, useState } from "react";
import { Button, Typography, Container, Card, CardContent, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Home = () => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "documents"));
        const docs = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDocuments(docs);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    fetchDocuments();
  }, []);

  const handleDelete = async (docId) => {
    try {
      await deleteDoc(doc(db, "documents", docId));
      setDocuments(documents.filter((doc) => doc.id !== docId));
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  return (
    <Container >
      <Typography variant="h3" sx={{ my: 4, textAlign:'center' }}>
        DOCUMENT APP
      </Typography>
      <Button 
        variant="contained"
        component={Link}
        to="/createDoc"
        sx={{marginLeft:'490px', my: 2, backgroundColor: 'black',      
          color: 'white',                 
          '&:hover': {
            backgroundColor: '#333',     
          },
          '&:active': {
            backgroundColor: '#444',      
          },
          '&:focus': {
            backgroundColor: '#333',      
          },}}
      >
        + New Document
      </Button>

      <Typography variant="h5" sx={{ my: 4 }}>
        Your Documents
      </Typography>

      <Grid container spacing={3}>
        {documents.length > 0 ? (
          documents.map((doc) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={doc.id}>
              <Card sx={{ height: "150px",background:'#D4B895',color:'black' }}>
                <CardContent>
                  <Typography variant="h6" noWrap> <b>{doc.title}</b>
                    
                  </Typography>

                  <Button
                    component={Link}
                    to={`/viewDoc/${doc.id}`}
                    size="small"
                    sx={{ mt: 1 ,color:'black',background:'white' }}
                  >
                    View
                  </Button>

                  <Button
                    component={Link}
                    to={`/editDoc/${doc.id}`}
                    // variant="outlined"
                    size="small"
                    sx={{ mt: 1, ml: 1,color:'black' }}
                  >
                    <EditIcon />
                  </Button>

                  <Button
                    // variant="outlined"
                    color="error"
                    size="small"
                    sx={{ mt: 1, ml: 1 ,color:'red' }}
                    onClick={() => handleDelete(doc.id)}
                  >
                    <DeleteIcon />
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography>No documents found. Start by creating one!</Typography>
        )}
      </Grid>
    </Container>
  );
};

export default Home;




