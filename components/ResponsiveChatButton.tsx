'use client';

import { useState, useEffect } from 'react';
import ChatButton from './ChatButton';
import CompactChatButton from './CompactChatButton';

const ResponsiveChatButton: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) {
    return <CompactChatButton />;
  }

  return <ChatButton />;
};

export default ResponsiveChatButton; 