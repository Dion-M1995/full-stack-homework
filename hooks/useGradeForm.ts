'use client';

import { useState } from 'react';

export function useGradeForm() {
  const [grade, setGrade] = useState('');
  const [error, setError] = useState('');

  const handleGradeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setGrade(value);

    if (value === '') {
      setError('');
      return;
    }

    const numericValue = Number(value);
    if (isNaN(numericValue) || numericValue < 0 || numericValue > 100) {
      setError('Grade must be a number between 0 and 100.');
    } else {
      setError('');
    }
  };

  return {
    grade,
    error,
    handleGradeChange,
  };
} 