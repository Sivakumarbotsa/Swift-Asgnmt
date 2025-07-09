import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Navbar from '../components/Navbar';
import '../styles/profile.css';

const Profile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((res) => res.json())
      .then(setUser);
  }, [id]);

  if (!user) return <p>Loading...</p>;

  return (
    <>
    <Navbar userName={user?.name || 'User'} />
    <div className="profile-page">
      <BackButton />
      <div className="profile-card">
        <div className="profile-header">
          <div className="icon-circle">{user.name[0]}</div>
          <div className="profile-info">
            <div className="profile-line"><strong>{user.name}</strong></div>
            <div className="profile-line">{user.email}</div>
          </div>
        </div>

        <div className="profile-field">
          <label>User ID:</label>
          <input value={user.id} disabled />
        </div>
        <div className="profile-field">
          <label>Email:</label>
          <input value={user.email} disabled />
        </div>
        <div className="profile-field">
          <label>Phone:</label>
          <input value={user.phone} disabled />
        </div>
        <div className="profile-field">
          <label>Name:</label>
          <input value={user.name} disabled />
        </div>
        <div className="profile-field">
          <label>Address:</label>
          <input value={`${user.address.street}, ${user.address.city}`} disabled />
        </div>
      </div>
    </div>
    </>
  );
};

export default Profile;
