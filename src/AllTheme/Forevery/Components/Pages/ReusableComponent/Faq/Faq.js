import React, { useState } from "react";
import "./Faq.scss";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

const Faq = () => {
  const [expandedAccordion, setExpandedAccordion] = useState(null);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpandedAccordion(isExpanded ? panel : null);
  };
  return (
    <div className="for_faq">
        <div className="heading">
            <h1>FAQ ABOUT DIAMOND RINGS</h1>
        </div>
      <div className="faq_section">
        {Array.from({ length: 5 }).map((val, index) => {
          return (
            <Accordion
              key={index}
              expanded={expandedAccordion === `panel-${index}`}
              onChange={handleChange(`panel-${index}`)}
            >
              <AccordionSummary
                expandIcon={
                  expandedAccordion === `panel-${index}` ? (
                    <RemoveCircleOutlineIcon size={16} />
                  ) : (
                    <AddCircleOutlineIcon size={16} />
                  )
                }
                aria-controls={`panel-${index}-content`}
                id={`panel-${index}-header`}
              >
                <span>How many carats should diamond rings be?</span>
              </AccordionSummary>
              <AccordionDetails>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </AccordionDetails>
            </Accordion>
          );
        })}
      </div>
    </div>
  );
};

export default Faq;
