'use client';
import { useState } from 'react';
export default function TestClientComponent({ getTest }: { getTest: () => Promise<string>; }) {
  const [message, setMessage] = useState('');
  const handleClick = async () => {
    const response = await getTest();
    console.log({ response });
    setMessage(response);
  };
  return <button onClick={handleClick}>Test Client Component {message}</button>;
}