import { useEffect, useRef, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

import { useUser } from '../context/UserContext';
import { useSocket } from '../socket/socket';

const Chat = () => {
  const { username } = useUser();
  const {
    messages,
    users,
    typingUsers,
    sendMessage,
    setTyping,
  } = useSocket();

  const [newMessage, setNewMessage] = useState('');
  const chatEndRef = useRef(null);

  // Scroll to bottom on new message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle message input typing
  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
    setTyping(e.target.value.length > 0);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    sendMessage(newMessage.trim());
    setNewMessage('');
    setTyping(false);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="p-4 bg-white shadow flex justify-between items-center">
        <h1 className="text-xl font-semibold">Welcome, {username}</h1>
        <p className="text-sm text-gray-500">Online: {users.length}</p>
      </header>

      <main className="flex-1 overflow-hidden p-4">
        <Card className="h-full flex flex-col">
          <CardHeader>
            <CardTitle>Global Chat Room</CardTitle>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col overflow-hidden">
            <ScrollArea className="flex-1 pr-2 space-y-2 overflow-y-auto">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`rounded-lg p-2 max-w-lg ${
                    msg.system
                      ? 'bg-yellow-100 text-gray-700 text-sm font-medium'
                      : msg.sender === username
                      ? 'bg-blue-100 self-end'
                      : 'bg-gray-200 self-start'
                  }`}
                >
                  {!msg.system && (
                    <div className="text-xs text-gray-500 mb-1">
                      {msg.sender} • {new Date(msg.timestamp).toLocaleTimeString()}
                    </div>
                  )}
                  <div>{msg.message}</div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </ScrollArea>

            {typingUsers.length > 0 && (
              <p className="text-sm text-muted-foreground mt-2">
                {typingUsers.join(', ')} {typingUsers.length > 1 ? 'are' : 'is'} typing...
              </p>
            )}

            <form
              onSubmit={handleSend}
              className="mt-4 flex items-center gap-2"
            >
              <Input
                placeholder="Type your message..."
                value={newMessage}
                onChange={handleInputChange}
                className="flex-1"
              />
              <Button type="submit">Send</Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Chat;
