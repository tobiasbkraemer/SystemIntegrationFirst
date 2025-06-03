Auth Integration – Assignment 11a
=================================

Purpose
-------
This project demonstrates how to integrate authentication using an external identity provider. 
Instead of building custom login functionality, we integrate with Google Sign-In using Firebase Authentication.

Technologies Used
-----------------
- React (Vite)
- Firebase Authentication (Google Sign-In)
- npm

Features
--------
- Google Sign-In (via Firebase)
- Display of logged-in user's name
- Logout button
- Fully frontend-based — no custom backend required

Setup Instructions
------------------

1. Firebase Project Setup
-------------------------
- Go to https://console.firebase.google.com/
- Create a new project (e.g., "auth-integration-demo")
- Disable Google Analytics (optional)

2. Enable Google Sign-In
------------------------
- Go to Authentication > Sign-in method
- Enable Google
- Fill in project name and support email
- (Optional) Paste in Web Client ID from OAuth credentials
- Click Save

3. Create a Web App
-------------------
- Go to Project Settings > General > Your Apps
- Click </> to create a Web app
- Register it and copy the firebaseConfig it gives you

4. Clone and Run This Project
-----------------------------
- Run the following:

    git clone <your-repo-url>
    cd auth-integration
    npm install
    npm run dev

5. Configure Firebase (firebase.js)
-----------------------------------
Paste your config like this:

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: '...',
  authDomain: '...',
  projectId: '...',
  storageBucket: '...',
  messagingSenderId: '...',
  appId: '...'
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

6. Login Component
------------------
In App.jsx:

import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from './firebase';
import { useState } from 'react';

export default function App() {
  const [user, setUser] = useState(null);

  const login = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <h1>Firebase Auth Demo</h1>
      {user ? (
        <>
          <p>Logged in as: {user.displayName}</p>
          <button onClick={() => auth.signOut().then(() => setUser(null))}>Log out</button>
        </>
      ) : (
        <button onClick={login}>Log in with Google</button>
      )}
    </>
  );
}

Why This Satisfies the Assignment
---------------------------------
Requirement                                 | Covered
--------------------------------------------|---------
Integrate with external authentication      | Yes (Google Sign-In)
No self-made auth system                    | Yes (Uses Firebase)
Documentation of setup                      | Yes (This README)
Reproducible setup guide                    | Yes (Step-by-step with screenshots)

Provider Research Summary
-------------------------
Provider    | Pros                                         | Cons
------------|----------------------------------------------|-------------------------------
Firebase    | Easy to set up, good docs, free tier         | Google-owned, basic UI
Auth0       | Full-featured, supports SSO and enterprise   | Complex pricing model
Clerk       | Beautiful UI, full user management           | Still a new platform
Supabase    | Open source, Postgres auth built-in          | Requires backend setup

Chosen: Firebase – because it's fast, secure and easy to use for frontend-only projects.

