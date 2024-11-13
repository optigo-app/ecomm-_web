import React, { useEffect, useState } from 'react';
import './TaxStructure.scss';
import { IoChevronDown } from "react-icons/io5";
import UseLocalstorage from '../../../hooks/UseLocalstorage';

const TaxStructure = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedTax, setSelectedTax] = useState('EXCL. VAT (NON-EU COUNTRIES)');
    const [tax, settax] = UseLocalstorage('tax', selectedTax); 

    const taxOptions = [
        'EXCL. VAT (NON-EU COUNTRIES)',
        'INCL. 17% VAT',
        'INCL. 18% VAT',
        'INCL. 19% VAT',
        'INCL. 20% VAT',
        'INCL. 21% VAT',
        'INCL. 22% VAT',
        'INCL. 23% VAT',
        'INCL. 24% VAT',
        'INCL. 25% VAT',
        'INCL. 27% VAT',
    ];

    const handleSelect = (option) => {
        setSelectedTax(option);
        settax(option)
        setIsOpen(false); 
        window.location.reload();
    };

    useEffect(()=>{
        if(tax){
            setSelectedTax(tax)
        }else return ;
    },[])


    return (
        <div className="TaxStructure_for">
            <button
                className="tax-dropdown__trigger"
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                onClick={() => setIsOpen(!isOpen)} // Toggle on click
                onMouseEnter={() => setIsOpen(true)} // Open on hover
                onMouseLeave={() => setIsOpen(false)} // Close when mouse leaves
            >
                <span style={{
                    fontSize:"14px",
                    fontWeight:"600"
                }}>{selectedTax}</span>
                <IoChevronDown/>
            </button>
            {isOpen && (
                <ul
                    className="tax-dropdown__menu"
                    role="listbox"
                    aria-label="Tax options"
                    onMouseEnter={() => setIsOpen(true)} // Keep open when hovering the menu
                    onMouseLeave={() => setIsOpen(false)} // Close when mouse leaves the menu
                >
                    {taxOptions.map((option) => (
                        <li
                            key={option}
                            className={`tax-dropdown__item ${selectedTax === option ? 'selected' : ''}`}
                            onClick={() => handleSelect(option)}
                            role="option"
                            aria-selected={selectedTax === option}
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TaxStructure;
