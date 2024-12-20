"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import Link from "next/link";

export default function MarkdownToPDF() {
  const [markdown, setMarkdown] = useState(`# Welcome to MD2PDF

## Document Example

This is a paragraph with **bold text** and *italic text*. The PDF output will maintain proper formatting and spacing.

### Lists Example

Ordered list:
1. First item
2. Second item
3. Third item with longer text that might wrap to the next line to demonstrate proper text wrapping in lists

Unordered list:
- Apple
- Banana
- Cherry

### Code Example

\`\`\`javascript
function greet(name) {
  console.log('Hello, ' + name + '!');
  return true;
}
\`\`\`

### Blockquote Example

> This is a blockquote example
> It can span multiple lines
> And maintains proper formatting

Happy document writing!`);
  const [error, setError] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = () => {
    try {
      const doc = new jsPDF({
        orientation: "p",
        unit: "pt",
        format: "a4",
      });

      const content = document.getElementById("markdown-preview");
      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 40;
      const contentWidth = pageWidth - margin * 2;
      let currentY = margin;

      const addNewPage = () => {
        doc.addPage();
        currentY = margin;
      };

      const processNode = (node) => {
        const remainingSpace =
          doc.internal.pageSize.getHeight() - currentY - margin;

        // Check if we need a new page
        if (remainingSpace < 50) {
          addNewPage();
        }

        switch (node.tagName.toLowerCase()) {
          case "h1":
            doc.setFontSize(24);
            doc.setFont("helvetica", "bold");
            const h1Text = doc.splitTextToSize(node.textContent, contentWidth);
            doc.text(h1Text, margin, currentY + 24);
            currentY += h1Text.length * 30 + 20;
            break;

          case "h2":
            doc.setFontSize(20);
            doc.setFont("helvetica", "bold");
            const h2Text = doc.splitTextToSize(node.textContent, contentWidth);
            doc.text(h2Text, margin, currentY + 20);
            currentY += h2Text.length * 25 + 15;
            break;

          case "h3":
            doc.setFontSize(16);
            doc.setFont("helvetica", "bold");
            const h3Text = doc.splitTextToSize(node.textContent, contentWidth);
            doc.text(h3Text, margin, currentY + 16);
            currentY += h3Text.length * 20 + 10;
            break;

          case "p":
            doc.setFontSize(12);
            doc.setFont("helvetica", "normal");
            const pText = doc.splitTextToSize(node.textContent, contentWidth);
            doc.text(pText, margin, currentY + 12);
            currentY += pText.length * 15 + 15;
            break;

          case "ul":
          case "ol":
            doc.setFontSize(12);
            doc.setFont("helvetica", "normal");
            Array.from(node.children).forEach((li, index) => {
              const bullet =
                node.tagName.toLowerCase() === "ol" ? `${index + 1}.` : "•";
              const liText = doc.splitTextToSize(
                li.textContent,
                contentWidth - 20
              );

              if (
                currentY + liText.length * 15 >
                doc.internal.pageSize.getHeight() - margin
              ) {
                addNewPage();
              }

              doc.text(bullet, margin, currentY + 12);
              doc.text(liText, margin + 15, currentY + 12);
              currentY += liText.length * 15 + 8;
            });
            currentY += 10;
            break;

          case "pre":
            doc.setFontSize(11);
            doc.setFont("courier", "normal");
            const code = node.textContent.trim();
            const codeLines = code.split("\n");

            // Calculate if we need a new page for the code block
            const codeBlockHeight = codeLines.length * 15 + 20;
            if (
              currentY + codeBlockHeight >
              doc.internal.pageSize.getHeight() - margin
            ) {
              addNewPage();
            }

            // Draw code block background
            doc.setFillColor(245, 245, 245);
            doc.rect(
              margin - 5,
              currentY,
              contentWidth + 10,
              codeBlockHeight,
              "F"
            );

            currentY += 10; // Padding top
            codeLines.forEach((line) => {
              doc.text(line, margin, currentY + 11);
              currentY += 15;
            });
            currentY += 10; // Padding bottom
            break;

          case "blockquote":
            doc.setFontSize(12);
            doc.setFont("helvetica", "italic");
            const quoteText = doc.splitTextToSize(
              node.textContent,
              contentWidth - 20
            );

            // Draw quote decoration
            doc.setDrawColor(200, 200, 200);
            doc.setLineWidth(2);
            doc.line(
              margin - 10,
              currentY,
              margin - 10,
              currentY + quoteText.length * 15
            );

            // Add quote text with indent
            doc.text(quoteText, margin + 10, currentY + 12);
            currentY += quoteText.length * 15 + 15;
            break;
        }
      };

      // Process all nodes
      Array.from(content.children).forEach((node) => {
        processNode(node);
      });

      doc.save("markdown-document.pdf");
      setError(null);
    } catch (error) {
      setError("Failed to generate PDF. Please try again.");
      console.error("PDF generation error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md">
        <div className="max-w-[2000px] mx-auto px-4">
          <div className="flex flex-col py-4">
            {/* Logo and Title Row */}
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center space-x-2 group">
                <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 group-hover:opacity-90 transition-opacity">
                  MD2PDF
                </span>
              </Link>
              <h1 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                Markdown to PDF Converter
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[2000px] mx-auto px-4 py-4">
        {/* Editor and Preview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Editor Section */}
          <div className="h-[calc(100vh-200px)] flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 flex items-center">
                <span className="mr-2">✍️</span> Markdown Input
              </h2>
              <button
                onClick={() => setMarkdown("")}
                className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
              >
                Clear
              </button>
            </div>
            <textarea
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              className="flex-1 w-full p-4 border rounded-xl shadow-sm bg-white dark:bg-gray-800 
                text-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-700
                focus:ring-2 focus:ring-blue-500 focus:border-transparent
                transition-all duration-200 resize-none"
              placeholder="Enter your markdown here..."
            />
          </div>

          {/* Preview Section */}
          <div className="h-[calc(100vh-200px)] flex flex-col">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2 flex items-center">
              <span className="mr-2">👁️</span> Live Preview
            </h2>
            <div
              id="markdown-preview"
              className="flex-1 w-full p-6 border rounded-xl shadow-sm bg-white 
                overflow-y-auto prose prose-headings:mb-4 prose-h1:text-4xl 
                prose-h2:text-3xl prose-h3:text-2xl prose-p:mb-4 
                prose-pre:bg-gray-50 prose-pre:text-gray-800 
                prose-pre:p-4 prose-pre:rounded-lg prose-li:my-1 
                prose-code:text-gray-800 prose-code:bg-gray-50
                prose-img:rounded-lg prose-a:text-blue-600 hover:prose-a:text-blue-500
                max-w-none border-gray-200"
            >
              <ReactMarkdown
                components={{
                  img: ({ node, ...props }) => (
                    <img
                      {...props}
                      className="max-w-full h-auto my-4 rounded-lg"
                      loading="lazy"
                      crossOrigin="anonymous"
                    />
                  ),
                  a: ({ node, ...props }) => (
                    <a
                      {...props}
                      className="text-blue-600 hover:text-blue-500 underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    />
                  ),
                  code: ({ node, inline, className, children, ...props }) => {
                    return (
                      <code
                        className={`${
                          inline ? "bg-gray-50 text-gray-800 px-1 rounded" : ""
                        }`}
                        {...props}
                      >
                        {children}
                      </code>
                    );
                  },
                }}
              >
                {markdown}
              </ReactMarkdown>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-center">
            {error}
          </div>
        )}

        {/* Download Button */}
        <div className="flex justify-center">
          <button
            onClick={generatePDF}
            disabled={isGenerating}
            className={`
              px-8 py-4 text-lg font-semibold text-white rounded-full
              transition-all duration-200 transform
              ${
                isGenerating
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
              }
            `}
          >
            {isGenerating ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Generating PDF...
              </span>
            ) : (
              <span className="flex items-center">
                Download PDF
                <svg
                  className="ml-2 w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
