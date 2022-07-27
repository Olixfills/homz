/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";

const Category = () => {
  const [listings, setlistings] = useState(null);
  const [loading, setLoading] = useState(true);

  const params = useParams();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const listingsRef = collection(db, "listings");
        const q = query(
          listingsRef,
          where("type", "==", params.categoryName),
          orderBy("timestamp", "desc"),
          limit(10)
        );

        const querySnap = await getDocs(q);

        let listings = [];

        querySnap.forEach((doc) => {
          listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setlistings(listings);
        setLoading(false);
      } catch (error) {
        toast.error("could not fetch listings");
      }
    };

    fetchListings();
  }, [params.categoryName]);

  return (
    <div className="category">
      <header>
        <p className="pageHeader">
          {params.categoryName === "rent"
            ? "Places for Rent"
            : "Places for Sale"}
        </p>
      </header>

      {loading ? (
        <Spinner />
      ) : listings && listings.length > 0 ? (
        <>
          <main>
            <ul className="categoryListings">
              {listings.map((listing) => {
                
                const {
                  name,
                  bedrooms,
                  bathrooms,
                  regularPrice,
                  discountedPrice,
                  furnished,
                  geolocation,
                  imageURLs,
                  location,
                  offer,
                  parking,
                  type,
                } = listing.data;
                return <h3 key={name}>{name}</h3>;
              })}
            </ul>
          </main>
        </>
      ) : (
        <h4>No Listings for {params.categoryName}</h4>
      )}
    </div>
  );
};

export default Category;
