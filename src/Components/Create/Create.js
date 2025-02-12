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
  const [error, setError] = useState("");

  const { storage } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);

  const history = useHistory();

  // Validation function
  const validateForm = () => {
    if (!name || !category || !price || !image) {
      setError("All fields are required!");
      return false;
    }

    if (price <= 0) {
      setError("Price must be a positive number!");
      return false;
    }

    const allowedFileTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif"];
    if (!allowedFileTypes.includes(image.type)) {
      setError("Only JPG, PNG, and GIF files are allowed!");
      return false;
    }

    setError(""); // Clear errors if everything is valid
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      const storageRef = ref(storage, `/images/${image.name}`);
      const snapshot = await uploadBytes(storageRef, image);
      const downloadURL = await getDownloadURL(snapshot.ref);

      await addDoc(collection(db, "products"), {
        name,
        category,
        price,
        url: downloadURL,
        userId: user.uid,
        createdAt: new Date(),
      });

      // alert("Product uploaded successfully!");
      history.push("/");
    } catch (error) {
      console.error("Error uploading product:", error);
      setError("Error uploading product. Please try again.");
    }
  };

  return (
    <Fragment>
      <Header />
      <div className="centerDiv">
        <h2>Create Product</h2>

        {error && <p className="errorMsg">{error}</p>}

        <label htmlFor="name">Name</label>
        <input
          className="input"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          id="name"
        />

        <label htmlFor="category">Category</label>
        <input
          className="input"
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          id="category"
        />

        <label htmlFor="price">Price</label>
        <input
          className="input"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          id="price"
        />

        <label>Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />

        {image && <img alt="Preview" width="200px" height="200px" src={URL.createObjectURL(image)} />}

        <button onClick={handleSubmit} className="uploadBtn">Upload and Submit</button>
      </div>
    </Fragment>
  );
};

export default Create;
