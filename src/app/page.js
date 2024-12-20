"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

export default function MarkdownToPDF() {
  const [markdown, setMarkdown] = useState(`# Welcome to Markdown Preview

## Features

This markdown editor supports:

- **Bold text** and *italic text*
- Lists and sublists
  - Like this one
  - And this one
- [Links](https://example.com)
- Images:

![Example Image](https://images.unsplash.com/photo-1706018133210-fe7c78d35e5f)

- Code blocks:

\`\`\`javascript
function hello() {
  console.log('Hello, World!');
}
\`\`\`

> Blockquotes are also supported
> With multiple lines

Happy markdown writing!`);
  const [error, setError] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = () => {
    const doc = new jsPDF({
      orientation: "p",
      unit: "pt",
      format: "a4",
      lineHeight: 1.5,
    });

    const content = document.getElementById("markdown-preview");
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    const margin = 50;
    const usableWidth = pageWidth - 2 * margin;

    const parseContent = (element, yPos = margin) => {
      let currentY = yPos;

      Array.from(element.children).forEach((node) => {
        // Add page if needed
        if (currentY > pageHeight - margin) {
          doc.addPage();
          currentY = margin;
        }

        switch (node.tagName.toLowerCase()) {
          case "h1":
            doc.setFontSize(24);
            doc.setFont("helvetica", "bold");
            const h1Lines = doc.splitTextToSize(node.textContent, usableWidth);
            doc.text(h1Lines, margin, currentY);
            currentY += h1Lines.length * 30 + 20;
            break;

          case "h2":
            doc.setFontSize(20);
            doc.setFont("helvetica", "bold");
            const h2Lines = doc.splitTextToSize(node.textContent, usableWidth);
            doc.text(h2Lines, margin, currentY);
            currentY += h2Lines.length * 25 + 15;
            break;

          case "h3":
            doc.setFontSize(16);
            doc.setFont("helvetica", "bold");
            const h3Lines = doc.splitTextToSize(node.textContent, usableWidth);
            doc.text(h3Lines, margin, currentY);
            currentY += h3Lines.length * 20 + 10;
            break;

          case "p":
            doc.setFontSize(12);
            doc.setFont("helvetica", "normal");
            const pLines = doc.splitTextToSize(node.textContent, usableWidth);
            doc.text(pLines, margin, currentY);
            currentY += pLines.length * 15 + 15;
            break;

          case "ul":
          case "ol":
            doc.setFontSize(12);
            doc.setFont("helvetica", "normal");
            Array.from(node.children).forEach((li) => {
              if (currentY > pageHeight - margin) {
                doc.addPage();
                currentY = margin;
              }
              const bulletPoint = "•";
              const liLines = doc.splitTextToSize(
                li.textContent,
                usableWidth - 20
              );
              doc.text(bulletPoint, margin, currentY);
              doc.text(liLines, margin + 15, currentY);
              currentY += liLines.length * 15 + 10;
            });
            currentY += 10;
            break;

          case "pre":
            doc.setFontSize(11);
            doc.setFont("courier", "normal");
            const code = node.textContent.trim();
            const codeLines = code.split("\n");

            // Draw code block background
            const codeBlockHeight = codeLines.length * 15 + 20;
            doc.setFillColor(245, 245, 245);
            doc.rect(
              margin - 10,
              currentY - 10,
              usableWidth + 20,
              codeBlockHeight,
              "F"
            );

            // Add code lines
            codeLines.forEach((line) => {
              if (currentY > pageHeight - margin) {
                doc.addPage();
                currentY = margin;
              }
              doc.text(line, margin, currentY);
              currentY += 15;
            });
            currentY += 15;
            doc.setFont("helvetica", "normal");
            doc.setFontSize(12);
            break;

          case "blockquote":
            doc.setFontSize(12);
            doc.setFont("helvetica", "italic");
            const quoteLines = doc.splitTextToSize(
              node.textContent,
              usableWidth - 20
            );

            // Draw quote line
            doc.setDrawColor(200, 200, 200);
            doc.setLineWidth(2);
            doc.line(
              margin - 10,
              currentY - 5,
              margin - 10,
              currentY + quoteLines.length * 15
            );

            doc.text(quoteLines, margin + 10, currentY);
            currentY += quoteLines.length * 15 + 15;
            doc.setFont("helvetica", "normal");
            break;

          case "hr":
            doc.setDrawColor(200, 200, 200);
            doc.setLineWidth(1);
            doc.line(margin, currentY, pageWidth - margin, currentY);
            currentY += 20;
            break;
        }
      });
    };

    parseContent(content);
    doc.save("markdown-document.pdf");
  };

  return (
    <div className="min-h-screen p-8 bg-white dark:bg-gray-900">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
        Markdown to PDF Converter
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            Markdown Input
          </h2>
          <textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            className="w-full h-[600px] p-4 border rounded-lg shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-700"
            placeholder="Enter your markdown here..."
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            Preview
          </h2>
          <div
            id="markdown-preview"
            className="w-full h-[600px] p-8 border rounded-lg shadow-sm bg-white dark:bg-gray-800 
            overflow-y-auto prose dark:prose-invert prose-headings:mb-4 prose-h1:text-4xl 
            prose-h2:text-3xl prose-h3:text-2xl prose-p:mb-4 prose-pre:bg-gray-100 
            dark:prose-pre:bg-gray-900 prose-pre:p-4 prose-pre:rounded-lg prose-li:my-1 
            prose-img:rounded-lg prose-a:text-blue-600 hover:prose-a:text-blue-500
            max-w-none border-gray-200 dark:border-gray-700"
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
              }}
            >
              {markdown}
            </ReactMarkdown>
          </div>
        </div>
      </div>

      {error && <div className="mt-4 text-red-600 text-center">{error}</div>}

      <div className="mt-8 flex justify-center">
        <button
          onClick={generatePDF}
          disabled={isGenerating}
          className={`px-6 py-3 bg-blue-600 text-white rounded-lg transition-colors
            ${
              isGenerating
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            }`}
        >
          {isGenerating ? "Generating PDF..." : "Download PDF"}
        </button>
      </div>
    </div>
  );
}
