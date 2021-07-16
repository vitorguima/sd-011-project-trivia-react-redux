import React, { useEffect } from 'react';

export default function Feedback() {
  useEffect(() => {
    console.log('teste');
  }, []);

  return (
    <div data-testid="feedback-text">
      FEEDBACK PAGE
    </div>
  );
}
