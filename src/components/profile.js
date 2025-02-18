import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

function Profile() {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        
        if (!userDoc.exists()) {
          console.log("User document does not exist in Firestore.");
          setUserDetails({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photo: user.photoURL,
            firstName: user.displayName ? user.displayName.split(" ")[0] : "User",
          });
          return;
        }

        setUserDetails({
          uid: user.uid,
          email: user.email,
          displayName: userDoc.data().fullname,
          photo: userDoc.data().photo || user.photoURL,
          firstName: userDoc.data().fullname.split(" ")[0],
        });
      } else {
        setUserDetails(null);
      }
    });

    return () => unsubscribe();
  }, []);

  async function handleLogout() {
    try {
      await auth.signOut();
      window.location.href = "/login";
      console.log("User logged out successfully!");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  }

  return (
    <div>
      {userDetails ? (
        <>
          <div style={{ display: "flex", justifyContent: "center" }}>
            {/* <img
              src={userDetails.photo || "https://via.placeholder.com/150"}
              width={"40%"}
              style={{ borderRadius: "50%" }}
            /> */}
            <img src={userDetails.photo} alt="Profile"   style={{ borderRadius: "50%" }}  referrerPolicy="no-referrer"/>
          </div>
          <h3>Welcome {userDetails.firstName}</h3>
          <div>
            <p>Email: {userDetails.email}</p>
            <p>First Name: {userDetails.firstName}</p>
          </div>
          <button className="btn btn-primary" onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Profile;
