import React, { useEffect, useState } from "react";
import { storImagePath } from "../../../../../../utils/Glob_Functions/GlobalFunction";
import "./TermsConditions.scss";
import { Link } from "react-router-dom";
export default function TermsConditionPage() {
  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    fetch(`${storImagePath()}/images/staticHtml/terms.html`)
      .then((response) => response.text())
      .then((html) => {
        setHtmlContent(html);
        console.log(html);
      })
      .catch((error) => {
        console.error("Error fetching the HTML file:", error);
      });
  }, []);

  return (
    <div className="hoq_terms">
      <div>
        <div
          className="terms"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div>
      <div className="back-to-home">
        <Link to={"/"}>Back to Home</Link>
      </div>
    </div>
  );
}
