import React, { useEffect, useState } from "react";
import { storImagePath } from "../../../../../../utils/Glob_Functions/GlobalFunction";
import { Link } from "react-router-dom";
export default function QualityCertification() {
  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    fetch(`${storImagePath()}/html/quality-certification.html`)
      .then((response) => response.text())
      .then((html) => {
        setHtmlContent(html);
        console.log(html);
      })
      .catch((error) => {
        console.error("Error fetching the HTML file:", error);
      });
  }, []);
  useEffect(()=>{
    window.scrollTo({
      behavior  :"smooth",
      top : 0
    })
  },[])
  return (
    <div className="hoq_privacyPolicy">
      <div
        className="privacy-policy"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
      <div className="back-to-home">
        <Link to={"/"}>Back to Home</Link>
      </div>
    </div>
  );
}
