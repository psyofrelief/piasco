"use client";

import { useEffect } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-json";
import "prismjs/components/prism-bash";

interface CodeBlockProps {
  code: string;
  language: "json" | "bash" | "typescript";
}

export default function CodeBlock({ code, language }: CodeBlockProps) {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <pre className={`language-${language} p-md rounded text-xs`}>
      <code>{code.trim()}</code>
    </pre>
  );
}
