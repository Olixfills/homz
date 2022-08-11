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
import ListngItem from "../components/ListngItem";

const Category = () => {
  const [listings, setlistings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastFetchedListing, setLastFetchedListing] = useState(null)

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

        const lastVisible = querySnap.docs[querySnap.docs.length - 1]

        setLastFetchedListing(lastVisible)

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

// For Pagination

const onFetchMoreListings = async () => {
  try {
    const listingsRef = collection(db, "listings");
    const q = query(
      listingsRef,
      where("type", "==", params.categoryName),
      orderBy("timestamp", "desc"),
      startAfter(lastFetchedListing),
      limit(10)
    );

    const querySnap = await getDocs(q);

    const lastVisible = querySnap.docs[querySnap.docs.length - 1]

    setLastFetchedListing(lastVisible)

    let listings = [];

    querySnap.forEach((doc) => {
      listings.push({
        id: doc.id,
        data: doc.data(),
      });
    });
    setlistings(prev => [...prev, listings]);
    setLoading(false);
  } catch (error) {
    toast.error("could not fetch listings");
  }
};






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
              {listings.map((listing) => (
                <ListngItem listing={listing.data} id={listing.id} key={listing.id}/>
              ))}
            </ul>
          </main>
          <br />
          <br />

          {lastFetchedListing && (
            <p className="loadMore" onClick={onFetchMoreListings}>
              Load More
            </p>
          )}
        </>
      ) : (
        <h4>No Listings for {params.categoryName}</h4>
      )}
    </div>
  );
};

export default Category;
