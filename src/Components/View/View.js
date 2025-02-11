import React, { useContext, useEffect, useState } from "react";
import "./View.css";
import { PostContext } from "../../store/PostContext"; // ✅ Correct import
import { FirebaseContext } from "../../store/Context";
import { db } from "../../firebase/config"; // ✅ Import Firestore
import { collection, query, where, getDocs } from "firebase/firestore";

function View() {
  const [userDetails, setUserDetails] = useState(null);
  const { postDetails } = useContext(PostContext);
  const { auth } = useContext(FirebaseContext); // ✅ Use auth if needed

  useEffect(() => {
    if (!postDetails?.userId) return; // ✅ Prevents errors if postDetails is null

    const fetchUserDetails = async () => {
      try {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("uid", "==", postDetails.userId));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            setUserDetails(doc.data());
          });
        } else {
          console.log("No user found");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img src={postDetails?.url || "/placeholder.jpg"} alt="Product" />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails?.price || "N/A"}</p>
          <span>{postDetails?.name || "Unknown Product"}</span>
          <p>{postDetails?.category || "No Category"}</p>
          <span>
            {postDetails?.createdAt
              ? new Date(postDetails.createdAt.seconds * 1000).toDateString()
              : "No Date"}
          </span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails?.username || "No name"}</p>
          <p>{userDetails?.phone || "No contact"}</p>
        </div>
      </div>
    </div>
  );
}

export default View;
