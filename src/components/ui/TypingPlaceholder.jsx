"use client";

import { useEffect, useState } from "react";

const PLACEHOLDERS = [
  "Search for Women Perfume",
  "Search for Men Perfume",
  "Search for Oud Perfume",
  "Search for Luxury Fragrance",
];

export default function TypingPlaceholder() {
  const [placeholder, setPlaceholder] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = PLACEHOLDERS[wordIndex];
    let timeout;

    if (!isDeleting && charIndex < currentWord.length) {
      timeout = setTimeout(() => {
        setPlaceholder(currentWord.slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, 80);
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setPlaceholder(currentWord.slice(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      }, 50);
    } else if (!isDeleting && charIndex === currentWord.length) {
      timeout = setTimeout(() => setIsDeleting(true), 1500);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % PLACEHOLDERS.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, wordIndex]);

  return placeholder;
}
