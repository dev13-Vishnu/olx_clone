import "./Create.css";
import Header from "../Header/Header";
import { AuthContext, FirebaseContext } from "../../store/Context";

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { Fragment, useContext, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { db } from "../../firebase/config";

const Create = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  const {storage} = useContext(FirebaseContext);
  const {user} = useContext(AuthContext);

  const history = useHistory();


  const handleSubmit = async() => {
    if(!image) {
      alert("Please select an image to upload.");
      return
    }
    if(!user) {
      alert("You must be logged in to upload a product.");
      return;
    }

    try {
      const storageRef = ref(storage, `/images/${image.name}`);
      const snapshot = await uploadBytes(storageRef, image);
      const downloadURL = await getDownloadURL(snapshot.ref);

      await addDoc(collection (db,"products"),{
        name,
        category,
        price,
        url:downloadURL,
        userId: user.uid,
        createdAt: new Date(),
      });
      alert("Product uploaded successfully!");
      history.push('/')
    } catch (error) {
      console.error("Error uploading product:", error);
    }
  };

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              id="fname"
              name="Name"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
              id="fname"
              name="category"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input 
              className="input" 
              type="number" 
              value={price}
              onChange={(e) => {setPrice(e.target.value)}}
              id="fname" 
              name="Price" 
            />
            <br />
          
          <br />
          <img alt="Posts" width="200px" height="200px" src={image?URL.createObjectURL(image):''}></img>
          
            <br />
            <input onChange={(e)=> {
              setImage(e.target.files[0])
            }} type="file" />
            <br />
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
          
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
