import React, { useEffect, useState, useContext } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config"; // Import Firestore database
import { AuthContext } from "../../store/Context";
import Heart from "../../assets/Heart";
import "./Post.css";

function Posts() {
  const [products, setProducts] = useState([]);
  const { user } = useContext(AuthContext); // Get logged-in user

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(db, "products");
        const snapshot = await getDocs(productsCollection);

        const productList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProducts(productList);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>

        <div className="cards">
          {products.length > 0 ? (
            products.map((product) => (
              <div className="card" key={product.id}>
                <div className="favorite">
                  <Heart />
                </div>
                <div className="image">
                  <img src={product.url} alt={product.name} />
                </div>
                <div className="content">
                  <p className="rate">&#x20B9; {product.price}</p>
                  <span className="kilometer">{product.category}</span>
                  <p className="name">{product.name}</p>
                </div>
                <div className="date">
                <span>{product.createdAt.toDate().toDateString()}</span>

                </div>
              </div>
            ))
          ) : (
            <p>No products available</p>
          )}
        </div>
      </div>

      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>

        <div className="cards">
          {products.length > 0 ? (
            products.map((product) => (
              <div className="card" key={product.id}>
                <div className="favorite">
                  <Heart />
                </div>
                <div className="image">
                  <img src={product.url} alt={product.name} />
                </div>
                <div className="content">
                  <p className="rate">&#x20B9; {product.price}</p>
                  <span className="kilometer">{product.category}</span>
                  <p className="name">{product.name}</p>
                </div>
                <div className="date">
                <span>{product.createdAt.toDate().toDateString()}</span>

                </div>
              </div>
            ))
          ) : (
            <p>No products available</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Posts;
