'use client';
import { useEffect, useState } from 'react';

export default function IP() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const res = await fetch('/api/userData');
      const data = await res.json();
      setUserData(data);
    };
    
    fetchUserData();
  }, []);

  return (
    <div>
      <h1>User Data:</h1>
      {userData ? (
        <pre>{JSON.stringify(userData, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
