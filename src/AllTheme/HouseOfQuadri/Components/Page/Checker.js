// import React from 'react';
// import './ContactPage.scss';

// const CountryCode = [
//   {
//       "name": "Afghanistan",
//       "code": "AF"
//   },
//   {
//       "name": "Albania",
//       "code": "AL"
//   },
//   {
//       "name": "Algeria",
//       "code": "DZ"
//   },
//   {
//       "name": "American Samoa",
//       "code": "AS"
//   },
//   {
//       "name": "Andorra",
//       "code": "AD"
//   },
//   {
//       "name": "Angola",
//       "code": "AO"
//   },
//   {
//       "name": "Anguilla",
//       "code": "AI"
//   },
//   {
//       "name": "Antarctica",
//       "code": "AQ"
//   },
//   {
//       "name": "Antigua and Barbuda",
//       "code": "AG"
//   },
//   {
//       "name": "Argentina",
//       "code": "AR"
//   },
//   {
//       "name": "Armenia",
//       "code": "AM"
//   },
//   {
//       "name": "Aruba",
//       "code": "AW"
//   },
//   {
//       "name": "Asia/Pacific Region",
//       "code": "AP"
//   },
//   {
//       "name": "Australia",
//       "code": "AU"
//   },
//   {
//       "name": "Austria",
//       "code": "AT"
//   },
//   {
//       "name": "Azerbaijan",
//       "code": "AZ"
//   },
//   {
//       "name": "Bahamas",
//       "code": "BS"
//   },
//   {
//       "name": "Bahrain",
//       "code": "BH"
//   },
//   {
//       "name": "Bangladesh",
//       "code": "BD"
//   },
//   {
//       "name": "Barbados",
//       "code": "BB"
//   },
//   {
//       "name": "Belarus",
//       "code": "BY"
//   },
//   {
//       "name": "Belgium",
//       "code": "BE"
//   },
//   {
//       "name": "Belize",
//       "code": "BZ"
//   },
//   {
//       "name": "Benin",
//       "code": "BJ"
//   },
//   {
//       "name": "Bermuda",
//       "code": "BM"
//   },
//   {
//       "name": "Bhutan",
//       "code": "BT"
//   },
//   {
//       "name": "Bolivia",
//       "code": "BO"
//   },
//   {
//       "name": "Bonaire, Sint Eustatius and Saba",
//       "code": "BQ"
//   },
//   {
//       "name": "Bosnia and Herzegovina",
//       "code": "BA"
//   },
//   {
//       "name": "Botswana",
//       "code": "BW"
//   },
//   {
//       "name": "Bouvet Island",
//       "code": "BV"
//   },
//   {
//       "name": "Brazil",
//       "code": "BR"
//   },
//   {
//       "name": "British Indian Ocean Territory",
//       "code": "IO"
//   },
//   {
//       "name": "Brunei Darussalam",
//       "code": "BN"
//   },
//   {
//       "name": "Bulgaria",
//       "code": "BG"
//   },
//   {
//       "name": "Burkina Faso",
//       "code": "BF"
//   },
//   {
//       "name": "Burundi",
//       "code": "BI"
//   },
//   {
//       "name": "Cambodia",
//       "code": "KH"
//   },
//   {
//       "name": "Cameroon",
//       "code": "CM"
//   },
//   {
//       "name": "Canada",
//       "code": "CA"
//   },
//   {
//       "name": "Cape Verde",
//       "code": "CV"
//   },
//   {
//       "name": "Cayman Islands",
//       "code": "KY"
//   },
//   {
//       "name": "Central African Republic",
//       "code": "CF"
//   },
//   {
//       "name": "Chad",
//       "code": "TD"
//   },
//   {
//       "name": "Chile",
//       "code": "CL"
//   },
//   {
//       "name": "China",
//       "code": "CN"
//   },
//   {
//       "name": "Christmas Island",
//       "code": "CX"
//   },
//   {
//       "name": "Cocos (Keeling) Islands",
//       "code": "CC"
//   },
//   {
//       "name": "Colombia",
//       "code": "CO"
//   },
//   {
//       "name": "Comoros",
//       "code": "KM"
//   },
//   {
//       "name": "Congo",
//       "code": "CG"
//   },
//   {
//       "name": "Congo, The Democratic Republic of the",
//       "code": "CD"
//   },
//   {
//       "name": "Cook Islands",
//       "code": "CK"
//   },
//   {
//       "name": "Costa Rica",
//       "code": "CR"
//   },
//   {
//       "name": "Croatia",
//       "code": "HR"
//   },
//   {
//       "name": "Cuba",
//       "code": "CU"
//   },
//   {
//       "name": "Curaçao",
//       "code": "CW"
//   },
//   {
//       "name": "Cyprus",
//       "code": "CY"
//   },
//   {
//       "name": "Czech Republic",
//       "code": "CZ"
//   },
//   {
//       "name": "Côte d'Ivoire",
//       "code": "CI"
//   },
//   {
//       "name": "Denmark",
//       "code": "DK"
//   },
//   {
//       "name": "Djibouti",
//       "code": "DJ"
//   },
//   {
//       "name": "Dominica",
//       "code": "DM"
//   },
//   {
//       "name": "Dominican Republic",
//       "code": "DO"
//   },
//   {
//       "name": "Ecuador",
//       "code": "EC"
//   },
//   {
//       "name": "Egypt",
//       "code": "EG"
//   },
//   {
//       "name": "El Salvador",
//       "code": "SV"
//   },
//   {
//       "name": "Equatorial Guinea",
//       "code": "GQ"
//   },
//   {
//       "name": "Eritrea",
//       "code": "ER"
//   },
//   {
//       "name": "Estonia",
//       "code": "EE"
//   },
//   {
//       "name": "Ethiopia",
//       "code": "ET"
//   },
//   {
//       "name": "Falkland Islands (Malvinas)",
//       "code": "FK"
//   },
//   {
//       "name": "Faroe Islands",
//       "code": "FO"
//   },
//   {
//       "name": "Fiji",
//       "code": "FJ"
//   },
//   {
//       "name": "Finland",
//       "code": "FI"
//   },
//   {
//       "name": "France",
//       "code": "FR"
//   },
//   {
//       "name": "French Guiana",
//       "code": "GF"
//   },
//   {
//       "name": "French Polynesia",
//       "code": "PF"
//   },
//   {
//       "name": "French Southern Territories",
//       "code": "TF"
//   },
//   {
//       "name": "Gabon",
//       "code": "GA"
//   },
//   {
//       "name": "Gambia",
//       "code": "GM"
//   },
//   {
//       "name": "Georgia",
//       "code": "GE"
//   },
//   {
//       "name": "Germany",
//       "code": "DE"
//   },
//   {
//       "name": "Ghana",
//       "code": "GH"
//   },
//   {
//       "name": "Gibraltar",
//       "code": "GI"
//   },
//   {
//       "name": "Greece",
//       "code": "GR"
//   },
//   {
//       "name": "Greenland",
//       "code": "GL"
//   },
//   {
//       "name": "Grenada",
//       "code": "GD"
//   },
//   {
//       "name": "Guadeloupe",
//       "code": "GP"
//   },
//   {
//       "name": "Guam",
//       "code": "GU"
//   },
//   {
//       "name": "Guatemala",
//       "code": "GT"
//   },
//   {
//       "name": "Guernsey",
//       "code": "GG"
//   },
//   {
//       "name": "Guinea",
//       "code": "GN"
//   },
//   {
//       "name": "Guinea-Bissau",
//       "code": "GW"
//   },
//   {
//       "name": "Guyana",
//       "code": "GY"
//   },
//   {
//       "name": "Haiti",
//       "code": "HT"
//   },
//   {
//       "name": "Heard Island and Mcdonald Islands",
//       "code": "HM"
//   },
//   {
//       "name": "Holy See (Vatican City State)",
//       "code": "VA"
//   },
//   {
//       "name": "Honduras",
//       "code": "HN"
//   },
//   {
//       "name": "Hong Kong",
//       "code": "HK"
//   },
//   {
//       "name": "Hungary",
//       "code": "HU"
//   },
//   {
//       "name": "Iceland",
//       "code": "IS"
//   },
//   {
//       "name": "India",
//       "code": "IN"
//   },
//   {
//       "name": "Indonesia",
//       "code": "ID"
//   },
//   {
//       "name": "Iran, Islamic Republic Of",
//       "code": "IR"
//   },
//   {
//       "name": "Iraq",
//       "code": "IQ"
//   },
//   {
//       "name": "Ireland",
//       "code": "IE"
//   },
//   {
//       "name": "Isle of Man",
//       "code": "IM"
//   },
//   {
//       "name": "Israel",
//       "code": "IL"
//   },
//   {
//       "name": "Italy",
//       "code": "IT"
//   },
//   {
//       "name": "Jamaica",
//       "code": "JM"
//   },
//   {
//       "name": "Japan",
//       "code": "JP"
//   },
//   {
//       "name": "Jersey",
//       "code": "JE"
//   },
//   {
//       "name": "Jordan",
//       "code": "JO"
//   },
//   {
//       "name": "Kazakhstan",
//       "code": "KZ"
//   },
//   {
//       "name": "Kenya",
//       "code": "KE"
//   },
//   {
//       "name": "Kiribati",
//       "code": "KI"
//   },
//   {
//       "name": "Korea, Republic of",
//       "code": "KR"
//   },
//   {
//       "name": "Kuwait",
//       "code": "KW"
//   },
//   {
//       "name": "Kyrgyzstan",
//       "code": "KG"
//   },
//   {
//       "name": "Laos",
//       "code": "LA"
//   },
//   {
//       "name": "Latvia",
//       "code": "LV"
//   },
//   {
//       "name": "Lebanon",
//       "code": "LB"
//   },
//   {
//       "name": "Lesotho",
//       "code": "LS"
//   },
//   {
//       "name": "Liberia",
//       "code": "LR"
//   },
//   {
//       "name": "Libyan Arab Jamahiriya",
//       "code": "LY"
//   },
//   {
//       "name": "Liechtenstein",
//       "code": "LI"
//   },
//   {
//       "name": "Lithuania",
//       "code": "LT"
//   },
//   {
//       "name": "Luxembourg",
//       "code": "LU"
//   },
//   {
//       "name": "Macao",
//       "code": "MO"
//   },
//   {
//       "name": "Madagascar",
//       "code": "MG"
//   },
//   {
//       "name": "Malawi",
//       "code": "MW"
//   },
//   {
//       "name": "Malaysia",
//       "code": "MY"
//   },
//   {
//       "name": "Maldives",
//       "code": "MV"
//   },
//   {
//       "name": "Mali",
//       "code": "ML"
//   },
//   {
//       "name": "Malta",
//       "code": "MT"
//   },
//   {
//       "name": "Marshall Islands",
//       "code": "MH"
//   },
//   {
//       "name": "Martinique",
//       "code": "MQ"
//   },
//   {
//       "name": "Mauritania",
//       "code": "MR"
//   },
//   {
//       "name": "Mauritius",
//       "code": "MU"
//   },
//   {
//       "name": "Mayotte",
//       "code": "YT"
//   },
//   {
//       "name": "Mexico",
//       "code": "MX"
//   },
//   {
//       "name": "Micronesia, Federated States of",
//       "code": "FM"
//   },
//   {
//       "name": "Moldova, Republic of",
//       "code": "MD"
//   },
//   {
//       "name": "Monaco",
//       "code": "MC"
//   },
//   {
//       "name": "Mongolia",
//       "code": "MN"
//   },
//   {
//       "name": "Montenegro",
//       "code": "ME"
//   },
//   {
//       "name": "Montserrat",
//       "code": "MS"
//   },
//   {
//       "name": "Morocco",
//       "code": "MA"
//   },
//   {
//       "name": "Mozambique",
//       "code": "MZ"
//   },
//   {
//       "name": "Myanmar",
//       "code": "MM"
//   },
//   {
//       "name": "Namibia",
//       "code": "NA"
//   },
//   {
//       "name": "Nauru",
//       "code": "NR"
//   },
//   {
//       "name": "Nepal",
//       "code": "NP"
//   },
//   {
//       "name": "Netherlands",
//       "code": "NL"
//   },
//   {
//       "name": "Netherlands Antilles",
//       "code": "AN"
//   },
//   {
//       "name": "New Caledonia",
//       "code": "NC"
//   },
//   {
//       "name": "New Zealand",
//       "code": "NZ"
//   },
//   {
//       "name": "Nicaragua",
//       "code": "NI"
//   },
//   {
//       "name": "Niger",
//       "code": "NE"
//   },
//   {
//       "name": "Nigeria",
//       "code": "NG"
//   },
//   {
//       "name": "Niue",
//       "code": "NU"
//   },
//   {
//       "name": "Norfolk Island",
//       "code": "NF"
//   },
//   {
//       "name": "North Korea",
//       "code": "KP"
//   },
//   {
//       "name": "North Macedonia",
//       "code": "MK"
//   },
//   {
//       "name": "Northern Mariana Islands",
//       "code": "MP"
//   },
//   {
//       "name": "Norway",
//       "code": "NO"
//   },
//   {
//       "name": "Oman",
//       "code": "OM"
//   },
//   {
//       "name": "Pakistan",
//       "code": "PK"
//   },
//   {
//       "name": "Palau",
//       "code": "PW"
//   },
//   {
//       "name": "Palestinian Territory, Occupied",
//       "code": "PS"
//   },
//   {
//       "name": "Panama",
//       "code": "PA"
//   },
//   {
//       "name": "Papua New Guinea",
//       "code": "PG"
//   },
//   {
//       "name": "Paraguay",
//       "code": "PY"
//   },
//   {
//       "name": "Peru",
//       "code": "PE"
//   },
//   {
//       "name": "Philippines",
//       "code": "PH"
//   },
//   {
//       "name": "Pitcairn Islands",
//       "code": "PN"
//   },
//   {
//       "name": "Poland",
//       "code": "PL"
//   },
//   {
//       "name": "Portugal",
//       "code": "PT"
//   },
//   {
//       "name": "Puerto Rico",
//       "code": "PR"
//   },
//   {
//       "name": "Qatar",
//       "code": "QA"
//   },
//   {
//       "name": "Reunion",
//       "code": "RE"
//   },
//   {
//       "name": "Romania",
//       "code": "RO"
//   },
//   {
//       "name": "Russian Federation",
//       "code": "RU"
//   },
//   {
//       "name": "Rwanda",
//       "code": "RW"
//   },
//   {
//       "name": "Saint Barthélemy",
//       "code": "BL"
//   },
//   {
//       "name": "Saint Helena",
//       "code": "SH"
//   },
//   {
//       "name": "Saint Kitts and Nevis",
//       "code": "KN"
//   },
//   {
//       "name": "Saint Lucia",
//       "code": "LC"
//   },
//   {
//       "name": "Saint Martin",
//       "code": "MF"
//   },
//   {
//       "name": "Saint Martin",
//       "code": "MF"
//   },
//   {
//       "name": "Saint Pierre and Miquelon",
//       "code": "PM"
//   },
//   {
//       "name": "Saint Vincent and the Grenadines",
//       "code": "VC"
//   },
//   {
//       "name": "Samoa",
//       "code": "WS"
//   },
//   {
//       "name": "San Marino",
//       "code": "SM"
//   },
//   {
//       "name": "Sao Tome and Principe",
//       "code": "ST"
//   },
//   {
//       "name": "Saudi Arabia",
//       "code": "SA"
//   },
//   {
//       "name": "Senegal",
//       "code": "SN"
//   },
//   {
//       "name": "Serbia",
//       "code": "RS"
//   },
//   {
//       "name": "Serbia and Montenegro",
//       "code": "CS"
//   },
//   {
//       "name": "Seychelles",
//       "code": "SC"
//   },
//   {
//       "name": "Sierra Leone",
//       "code": "SL"
//   },
//   {
//       "name": "Singapore",
//       "code": "SG"
//   },
//   {
//       "name": "Sint Maarten",
//       "code": "SX"
//   },
//   {
//       "name": "Slovakia",
//       "code": "SK"
//   },
//   {
//       "name": "Slovenia",
//       "code": "SI"
//   },
//   {
//       "name": "Solomon Islands",
//       "code": "SB"
//   },
//   {
//       "name": "Somalia",
//       "code": "SO"
//   },
//   {
//       "name": "South Africa",
//       "code": "ZA"
//   },
//   {
//       "name": "South Georgia and the South Sandwich Islands",
//       "code": "GS"
//   },
//   {
//       "name": "South Sudan",
//       "code": "SS"
//   },
//   {
//       "name": "Spain",
//       "code": "ES"
//   },
//   {
//       "name": "Sri Lanka",
//       "code": "LK"
//   },
//   {
//       "name": "Sudan",
//       "code": "SD"
//   },
//   {
//       "name": "Suriname",
//       "code": "SR"
//   },
//   {
//       "name": "Svalbard and Jan Mayen",
//       "code": "SJ"
//   },
//   {
//       "name": "Swaziland",
//       "code": "SZ"
//   },
//   {
//       "name": "Sweden",
//       "code": "SE"
//   },
//   {
//       "name": "Switzerland",
//       "code": "CH"
//   },
//   {
//       "name": "Syrian Arab Republic",
//       "code": "SY"
//   },
//   {
//       "name": "Taiwan",
//       "code": "TW"
//   },
//   {
//       "name": "Tajikistan",
//       "code": "TJ"
//   },
//   {
//       "name": "Tanzania, United Republic of",
//       "code": "TZ"
//   },
//   {
//       "name": "Thailand",
//       "code": "TH"
//   },
//   {
//       "name": "Timor-Leste",
//       "code": "TL"
//   },
//   {
//       "name": "Togo",
//       "code": "TG"
//   },
//   {
//       "name": "Tokelau",
//       "code": "TK"
//   },
//   {
//       "name": "Tonga",
//       "code": "TO"
//   },
//   {
//       "name": "Trinidad and Tobago",
//       "code": "TT"
//   },
//   {
//       "name": "Tunisia",
//       "code": "TN"
//   },
//   {
//       "name": "Turkey",
//       "code": "TR"
//   },
//   {
//       "name": "Turkmenistan",
//       "code": "TM"
//   },
//   {
//       "name": "Turks and Caicos Islands",
//       "code": "TC"
//   },
//   {
//       "name": "Tuvalu",
//       "code": "TV"
//   },
//   {
//       "name": "Uganda",
//       "code": "UG"
//   },
//   {
//       "name": "Ukraine",
//       "code": "UA"
//   },
//   {
//       "name": "United Arab Emirates",
//       "code": "AE"
//   },
//   {
//       "name": "United Kingdom",
//       "code": "GB"
//   },
//   {
//       "name": "United States",
//       "code": "US"
//   },
//   {
//       "name": "United States Minor Outlying Islands",
//       "code": "UM"
//   },
//   {
//       "name": "Uruguay",
//       "code": "UY"
//   },
//   {
//       "name": "Uzbekistan",
//       "code": "UZ"
//   },
//   {
//       "name": "Vanuatu",
//       "code": "VU"
//   },
//   {
//       "name": "Venezuela",
//       "code": "VE"
//   },
//   {
//       "name": "Vietnam",
//       "code": "VN"
//   },
//   {
//       "name": "Virgin Islands, British",
//       "code": "VG"
//   },
//   {
//       "name": "Virgin Islands, U.S.",
//       "code": "VI"
//   },
//   {
//       "name": "Wallis and Futuna",
//       "code": "WF"
//   },
//   {
//       "name": "Western Sahara",
//       "code": "EH"
//   },
//   {
//       "name": "Yemen",
//       "code": "YE"
//   },
//   {
//       "name": "Zambia",
//       "code": "ZM"
//   },
//   {
//       "name": "Zimbabwe",
//       "code": "ZW"
//   },
//   {
//       "name": "Åland Islands",
//       "code": "AX"
//   }
// ]

// export default function ContactPage() {
//   return (
//     <div className="elvee_container">
//       <img src="https://i.ibb.co/WtPpQfH/Contact-us.jpg" alt="Contact icons" className="elvee_contact-img" />

//       <h1 className="elvee_heading-main">CONTACT US</h1>

//       <div className="elvee_grid-container">
//         <div className="elvee_grid-item">
//           <h2>Hours of Operation</h2>
//           <p>INDIA - 9:00am to 6:00pm (IST)</p>
//           <p>Mon-Sat (Excluding Holidays)</p>
//         </div>
//         <div className="elvee_grid-item">
//           <h2>Phone</h2>
//           <p>INDIA - (0261) 610-5100</p>
//         </div>
//         <div className="elvee_grid-item">
//           <h2>General Inquiries</h2>
//           <p>INDIA - info@elvee.in</p>
//         </div>
//       </div>

//       <div className="elvee_contact-form">
//         <h2>Contact Form</h2>
//         <p>Our Customer service team is waiting to assist you,<br />Please Fill out all fields</p>
//         <form>
//           <input type="text" placeholder="First Name :" className="elvee_input" />
//           <input type="text" placeholder="Last Name :" className="elvee_input" />
//           <input type="tel" placeholder="Phone :" className="elvee_input" />
//           <input type="email" placeholder="Email I'D :" className="elvee_input" />
//           <input type="text" placeholder="Location :" className="elvee_input" />
//           <select className="elvee_input">
//             <option value="IN"  defaultValue={'IN'} selected>India</option>
//            {CountryCode?.map((val,i)=>{
//             return <option  value={val?.code}>{val?.name}</option>
//            })}
//           </select>
//           <textarea placeholder="Message :" className={`elvee_input elvee_textarea`}></textarea>
//           <button type="submit" className="elvee_button">Send</button>
//         </form>
//       </div>
//     </div>
//   );
// }

// careers page

// import React, { useState } from "react";
// import "./ContactPage.scss";
// import { IoMdArrowDropdown } from "react-icons/io";

// const Checker = () => {
//   const [showfrom, setfromshow] = useState(false);
//   return (
//     <div className="elev_career_page">
//       <div className="elvee_banner_i">
//         <img src="https://i.ibb.co/sHkHQNb/Career.jpg" alt="" />
//       </div>
//       <div className="elev_career_content">
//         <h1>CAREER</h1>
//         <p>A LARGE RANGE OF POSITIONS AND OPPORTUNITIES</p>
//         <section className="about-section">
//           <p>
//             We recruit talented professionals who share our values and vision.
//             We offer a dynamic work environment that encourages personal growth
//             and development opportunities. Join us to be part of an innovative
//             team that values creativity and excellence.
//           </p>
//         </section>
//       </div>
//       <div className="elvee_join_team_section">
//         <img
//           src="https://i.ibb.co/7Cw2sc2/Joint-Team.jpg"
//           alt="Team meeting"
//           className="team-meeting-photo"
//         />
//         <div className="join-team-content">
//           <h2>JOIN OUR TEAM</h2>
//           <p>
//             Becoming a team member means becoming part of a diverse and dynamic
//             team. We value and nurture talent, entrepreneurship and creativity.
//             We're looking for individuals who can contribute to our growth and
//             success. <br />
//             As a human-sized luxury Maison, we hire talented people with
//             strategic business minds and vision who still remain close tothe
//             ground and <br /> result-oriented. We consider our employees as a
//             key resource and strongly believe in the importance of individual
//             performance to achieve <br /> collective performance. We provide our
//             diversified talents with professional development, contributing to
//             the growth of the Maison.
//           </p>
//         </div>
//       </div>
//       <div className="bar_elvee_sec">
//         <p>
//           view all of our job Offers , internship and apprenticeships on the
//           Elvee Website in the "Talenets" Section.
//         </p>
//         <button
//           onClick={() => setfromshow(!showfrom)}
//           className="elvee_cta_button"
//         >
//           Discover Our Job Offers{" "}
//           <IoMdArrowDropdown color="darkblue" style={showfrom && {
//             rotate  :"180deg"
//           }} size={26} />
//         </button>
//       </div>
//       <hr
//         style={{
//           width: "95%",
//           margin: "0 auto",
//           marginBottom: "15px",
//         }}
//       />
//       <div className="form_det_grid">
//         {showfrom && (
//           <form>
//             <input
//               type="text"
//               placeholder="First Name :"
//               className="elvee_input"
//             />
//             <input
//               type="text"
//               placeholder="Last Name :"
//               className="elvee_input"
//             />
//             <input
//               type="email"
//               placeholder="Email I'D :"
//               className="elvee_input"
//             />
//             <input type="tel" placeholder="Phone :" className="elvee_input" />
//             <input
//               type="text"
//               placeholder="Location :"
//               className="elvee_input"
//             />
//             <div className="input_box_elvee">
//               <input type="text" placeholder="Upload Resume : *" disabled />
//               <label htmlFor="resume" className="elev_resume">
//                 Choose a File
//                 <input type="file" name="resume" id="resume" hidden />
//               </label>
//             </div>
//             <select className="elvee_input">
//               <option value="IN" defaultValue={"IN"} disabled selected>
//                 Select designation
//               </option>
//               <option value="IN">Account</option>
//               <option value="IN">Merchandise</option>
//               <option value="IN">Sales</option>
//               <option value="IN">Designer</option>
//               <option value="IN">Digital Marketing</option>
//               <option value="IN">IT</option>
//             </select>
//             <select className="elvee_input">
//               <option value="IN" defaultValue={"IN"} disabled selected>
//                 APPLY FOR COUNTRY
//               </option>
//               <option value="IN">INDIA</option>
//               <option value="IN">USA</option>
//               <option value="IN">UAE</option>
//             </select>
//             {/* <textarea placeholder="Message :" className={`elvee_input elvee_textarea`}></textarea> */}
//             <button type="submit" className="elvee_button">
//               Send
//             </button>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Checker;

import React, { useState } from "react";
import "./ContactPage.scss";
import { MdDateRange } from "react-icons/md";
import { ImClock2 } from "react-icons/im";

const appointment = [
  {
    src: "https://i.ibb.co/LkwcDtj/Collection.jpg",
    alt: "Collection",
  },
  {
    src: "https://i.ibb.co/1JD9wpH/Engagement-Ring.jpg",
    alt: "Engagement-Ring",
  },
  {
    src: "https://i.ibb.co/dMv93Gb/Fine-Jewellery.jpg",
    alt: "Fine-Jewellery",
  },
  {
    src: "https://i.ibb.co/Z2sFYZj/Gold-Jewellery.jpg",
    alt: "Gold-Jewellery",
  },
  {
    src: "https://i.ibb.co/mH6fHBF/High-Jewellery.jpg",
    alt: "High-Jewellery",
  },
  {
    src: "https://i.ibb.co/fk5jS7X/Men-s-Jewellery.jpg",
    alt: "Men-s-Jewellery",
  },
  {
    src: "https://i.ibb.co/Yt3mK52/Others.jpg",
    alt: "Others",
  },
  {
    src: "https://i.ibb.co/W59vXrJ/Wedding-Ring.jpg",
    alt: "Wedding-Ring",
  },
];
const Checker = () => {
  const [selectedbox, setselectedbox] = useState(null);
  return (
    <div className="eleev_appointment_page">
      <div className="elvee_banner_app">
        <div className="content">
          <p>
            Visit our Jewelery stores schedule a personalized Jewelery
            consultation at one of our stores to discover the perfect ethically
            sourced fine jewlery piece for your milestone moments .
          </p>
        </div>
        <div className="image">
          <img src="https://i.ibb.co/kGTGwWJ/Book-Aporinment.jpg" alt="aa" />
        </div>
      </div>
      <div className="grid_col_2_elvee">
        <div className="grid_content_banner">
          <h1> Book & appointment</h1>
          <p>
            Our commitment is to provide you with the highest level of jewelry
            care services. Our experts will be delighted to offer you advice and
            services to personalize your jewels, restore them, or simply
            preserve their beauty and longevity.
          </p>
        </div>
        <div className="grid_layout_card">
          <div className="service_bar">
            <span>selecte A service</span>
          </div>
          <div className="layout_elvee_grid">
            {appointment?.map((val, i) => {
              return (
                <div
                  onClick={() => setselectedbox(i)}
                  style={
                    selectedbox === i
                      ? {
                          border: " 2px solid  rgb(0, 0, 34)",
                        }
                      : {}
                  }
                  className="elvee_card_app"
                >
                  <div className="image_card_elevee">
                    <img src={val?.src} alt="" />
                  </div>
                  <div className="det_elvee_card">{val?.alt}</div>
                </div>
              );
            })}
          </div>
          <div className="from_elvee_appointmnet">
            <div className="service_bar">
              <span>your appointment</span>
            </div>
            <div className="time_grid_elvee">
              <label htmlFor="">
                <input type="text" placeholder="Date : dd/mm/yy" />
                <MdDateRange size={26} />
              </label>
              <label htmlFor="">
                <input type="text" placeholder="Time : hh:mm" />
                <ImClock2 size={26} />
              </label>
            </div>
            <div className="service_bar">
              <span>your details</span>
            </div>
            <form className="form_grid_elvee">
            <input type="text" placeholder="Title :" className="elvee_input_from" />
            <input type="text" placeholder="First Name :" className="elvee_input_from" />
           <input type="text" placeholder="Last Name :" className="elvee_input_from" />
           <input type="tel" placeholder="Phone :" className="elvee_input_from" />
           <input type="email" placeholder="Email I'D :" className="elvee_input_from" />
           <input type="text" placeholder="Location :" className="elvee_input_from" />
           <div className="btn_el_vee">
            <button type="submit">Book Appointment</button>
           </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checker;
