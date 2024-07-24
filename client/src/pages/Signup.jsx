import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../graphql/mutations';

function Signup() {
  const [addUser] = useMutation(ADD_USER);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    try {
      const { data } = await addUser({ variables: { username, email, password } });
      localStorage.setItem('token', data.addUser.token);
      window.location.reload();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <h1>Signup</h1>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
}

export default Signup;
