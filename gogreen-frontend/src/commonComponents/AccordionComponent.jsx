import React, { useState } from "react";
//MUI Components
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
//MUI ICONS
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const AccordionComponent = ({
    panelId,
    heading,
    headingClassname,
    content,
    className,
}) => {
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    return (
        <MuiAccordion
            expanded={expanded === panelId}
            onChange={handleChange(panelId)}
            className={className}
        >
            <MuiAccordionSummary
                expandIcon={<KeyboardArrowDownIcon />}
                aria-controls={`${panelId}-content`}
                id={`${panelId}-header`}
            >
                <Typography className={headingClassname}>{heading}</Typography>
            </MuiAccordionSummary>
            <MuiAccordionDetails>
                <Typography>{content}</Typography>
            </MuiAccordionDetails>
        </MuiAccordion>
    );
};

AccordionComponent.propTypes = {
    panelId: PropTypes.string.isRequired,
    heading: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    className: PropTypes.string,
};

AccordionComponent.defaultProps = {
    className: "",
};

export default AccordionComponent;
