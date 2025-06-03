// src/App.jsx
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

  const logout = () => auth.signOut().then(() => setUser(null));

  return (
    <div>
      <h1>Firebase Auth Demo</h1>
      {user ? (
        <>
          <p>Logged in as: {user.displayName}</p>
          <button onClick={logout}>Log out</button>
        </>
      ) : (
        <button onClick={login}>Log in with Google</button>
      )}
    </div>
  );
}
