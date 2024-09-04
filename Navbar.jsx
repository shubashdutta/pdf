import React, { useState, useRef } from "react";
import { pdfjs, Document, Page } from "react-pdf";
import HTMLFlipBook from "react-pageflip";
import data from "/test.pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const Pages = React.forwardRef((props, ref) => {
  return (
    <div className="demoPage" ref={ref}>
      {props.children}
    </div>
  );
});
Pages.displayName = "Pages";

const Navbar = () => {
  const [numPages, setNumPages] = useState(1);
  const flipBookRef = useRef();

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const nextPage = () => {
    if (flipBookRef.current) {
      flipBookRef.current.pageFlip().flipNext();
    }
  };

  const prevPage = () => {
    if (flipBookRef.current) {
      flipBookRef.current.pageFlip().flipPrev();
    }
  };

  return (
    <div className="flipbook-container">
      <button className="nav-arrow left-arrow" onClick={prevPage}>
        &lt;
      </button>
      <HTMLFlipBook
        width={900} // Width of the flipbook
        height={600} // Height of the flipbook, match this with CSS
        ref={flipBookRef}
        className="flipbook"
      >
        {Array.from({ length: numPages }, (_, pg) => (
          <Pages key={pg}>
            <Document file={data} onLoadSuccess={onDocumentLoadSuccess}>
              <Page pageNumber={pg + 1} scale={1.45} />{" "}
              {/* Adjust scale if needed */}
            </Document>
          </Pages>
        ))}
      </HTMLFlipBook>
      <button className="nav-arrow right-arrow" onClick={nextPage}>
        &gt;
      </button>
    </div>
  );
};

export default Navbar;
