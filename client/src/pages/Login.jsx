// src/pages/Login.jsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useUser } from '../context/UserContext';
import { socket } from '../socket/socket';

const Login = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const { setUsername } = useUser();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    setUsername(name);
    socket.connect();
    socket.emit('user_join', name);
    navigate('/chat');
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Login to Chat</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <Input
              placeholder="Enter your username"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Button type="submit" className="w-full">
              Enter Chat
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
