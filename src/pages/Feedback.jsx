import React, { useEffect } from 'react';

export default function Feedbac() {
  useEffect(() => {
    console.log('teste');
  }, []);

  return (
    <div>
      FEEDBACK PAGE
    </div>
  );
}
