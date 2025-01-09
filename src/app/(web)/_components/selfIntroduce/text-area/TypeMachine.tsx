'use client';
import { Text } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
interface TypewriterTextProps {
  text: string;
  delay?: number;
  fontSize?: string;
  fontWeight?: string;
  mt?: number;
  mb?: number;
  startrDelayTime?: number;
}
const TypewriterText = ({
  text,
  delay = 50, // 50ms per character
  fontSize = 'lg',
  fontWeight,
  mt,
  mb,
  startrDelayTime = 0 }
  : TypewriterTextProps) => {
  const [displayText, setDisplayText] = useState('');
  const [started, setStarted] = useState(false);
  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    if (!started) return;

    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    return () => clearInterval(cursorTimer);
  }, [started]); // 依賴於 started

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setStarted(true);
    }, startrDelayTime);
    return () => clearTimeout(startTimer);
  }, [startrDelayTime]);

  useEffect(() => {
    if (!started) return;
    let currentIndex = 0;
    setDisplayText('');
    const timer = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayText(text.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        setStarted(false);
        clearInterval(timer);
      }
    }, delay);
    return () => clearInterval(timer);
  }, [text, delay, started]);
  return (
    <Text fontSize={fontSize} fontWeight={fontWeight} mt={mt} mb={mb}>
      {displayText}
      {started && ( // 只在 started 為 true 時才渲染光標
       <span style={{ 
         opacity: showCursor ? 1 : 0,
         borderRight: '4px solid',
         marginLeft: '2px',
         animation: 'blink 1s step-end infinite'
       }}></span>
     )}
    </Text>
  );
};
export default TypewriterText;