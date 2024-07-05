import React, { useEffect, useState } from 'react'
import './Lookbook.modul.scss'
import { Accordion, AccordionDetails, AccordionSummary, Checkbox, FormControlLabel } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useLocation } from 'react-router-dom';
import ProductListApi from '../../../../../../utils/API/ProductListAPI/ProductListApi';
import { FilterListAPI } from '../../../../../../utils/API/FilterAPI/FilterListAPI';
import { Get_Tren_BestS_NewAr_DesigSet_Album } from '../../../../../../utils/API/Home/Get_Tren_BestS_NewAr_DesigSet_Album/Get_Tren_BestS_NewAr_DesigSet_Album';
import Cookies from 'js-cookie';
import { useRecoilValue } from 'recoil';
import { loginState } from '../../../Recoil/atom';
import imageNotFound from '../../../Assets/image-not-found.jpg';
import { LookBookAPI } from '../../../../../../utils/API/FilterAPI/LookBookAPI';

const Lookbook = () => {

    let location = useLocation();
    const [imageUrl, setImageUrl] = useState();

    const loginUserDetail = JSON.parse(localStorage.getItem("loginUserDetail"));
    const [designSetLstData, setDesignSetListData] = useState();
    const [filterData, setFilterData] = useState([])
    const [filterChecked, setFilterChecked] = useState({})
    const [afterFilterCount, setAfterFilterCount] = useState();
    const [selectedMetalId, setSelectedMetalId] = useState(loginUserDetail?.MetalId ?? "");
    const [selectedDiaId, setSelectedDiaId] = useState(loginUserDetail?.cmboDiaQCid ?? "");
    const [selectedCsId, setSelectedCsId] = useState(loginUserDetail?.cmboCSQCid ?? "");
    const [productListData, setProductListData] = useState([]);
    const [locationKey, setLocationKey] = useState()
    const islogin = useRecoilValue(loginState);

    useEffect(() => {
        let data = JSON.parse(localStorage.getItem('storeInit'));
        setImageUrl(data?.DesignSetImageFol);

        const loginUserDetail = JSON.parse(localStorage.getItem('loginUserDetail'));
        const storeInit = JSON.parse(localStorage.getItem('storeInit'));
        const { IsB2BWebsite } = storeInit;
        const visiterID = Cookies.get('visiterId');
        let finalID;
        if (IsB2BWebsite == 0) {
            finalID = islogin === false ? visiterID : (loginUserDetail?.id || '0');
        } else {
            finalID = loginUserDetail?.id || '0';
        }

        Get_Tren_BestS_NewAr_DesigSet_Album('GETDesignSet_List', finalID)
            .then((response) => {
                if (response?.Data?.rd) {
                    setDesignSetListData(response?.Data?.rd);
                }
            })
            .catch((err) => console.log(err));
    }, []);

    console.log('designSetLstDatadesignSetLstDatadesignSetLstData', designSetLstData);

    useEffect(() => {

        const fetchData = async () => {
            let productlisttype = {
                FilterKey: 'GETDesignSet_List',
                FilterVal: 'GETDesignSet_List'
            }

            await LookBookAPI(productlisttype).then((res) => {
                setFilterData(res)
            }).catch((err) => console.log("err", err))
        }
        fetchData();
    }, [])

    const handelFilterClearAll = () => {
        if (Object.values(filterChecked).filter(ele => ele.checked)?.length > 0) { setFilterChecked({}) }
    }

    const handleCheckboxChange = (e, listname, val) => {
        const { name, checked } = e.target;

        // console.log("output filterCheckedVal",{checked,type:listname,id:name.replace(/[a-zA-Z]/g, ''),value:val});

        setFilterChecked((prev) => ({
            ...prev,
            [name]: { checked, type: listname, id: name?.replace(/[a-zA-Z]/g, ''), value: val }
        }))
    }

    const ProdCardImageFunc = (pd) => {
        let finalprodListimg;
        if (pd?.DefaultImageName) {
            finalprodListimg = imageUrl + pd?.designsetuniqueno + '/' + pd?.DefaultImageName;
        } else {
            finalprodListimg = imageNotFound;
        }
        return finalprodListimg;
    };

    return (
        <div className='smr_LookBookMain'>
            <div className='smr_LookBookSubMainDiv'>

                <div className="smr_filter_portion">
                    {filterData?.length > 0 && <div className="smr_filter_portion_outter">
                        <span className="smr_filter_text">
                            <span>
                                {Object.values(filterChecked).filter(
                                    (ele) => ele.checked
                                )?.length === 0
                                    ? "Filters"
                                    : `Product Found: ${afterFilterCount}`}
                            </span>
                            <span onClick={() => handelFilterClearAll()}>
                                {Object.values(filterChecked).filter(
                                    (ele) => ele.checked
                                )?.length > 0
                                    ? "Clear All"
                                    : ""}
                            </span>
                        </span>
                        <div style={{ marginTop: "12px" }}>
                            {filterData?.map((ele) => (
                                <>
                                    {(!(ele?.id)?.includes("Range") && !(ele?.id)?.includes("Price")) && (
                                        <Accordion
                                            elevation={0}
                                            sx={{
                                                borderBottom: "1px solid #c7c8c9",
                                                borderRadius: 0,
                                                "&.MuiPaper-root.MuiAccordion-root:last-of-type":
                                                {
                                                    borderBottomLeftRadius: "0px",
                                                    borderBottomRightRadius: "0px",
                                                },
                                                "&.MuiPaper-root.MuiAccordion-root:before": {
                                                    background: "none",
                                                },
                                            }}
                                        // expanded={accExpanded}
                                        // defaultExpanded={}
                                        >
                                            <AccordionSummary
                                                expandIcon={
                                                    <ExpandMoreIcon sx={{ width: "20px" }} />
                                                }
                                                aria-controls="panel1-content"
                                                id="panel1-header"
                                                sx={{
                                                    color: "#7f7d85",
                                                    borderRadius: 0,

                                                    "&.MuiAccordionSummary-root": {
                                                        padding: 0,
                                                    },

                                                }}
                                                className="filtercategoryLable"
                                            >
                                                {/* <span> */}
                                                {ele.Name}
                                                {/* </span> */}
                                            </AccordionSummary>
                                            <AccordionDetails
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    gap: "4px",
                                                    minHeight: "fit-content",
                                                    maxHeight: "300px",
                                                    overflow: "auto",
                                                }}
                                            >
                                                {(JSON.parse(ele?.options) ?? []).map((opt) => (
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "space-between",
                                                            gap: "12px",
                                                        }}
                                                        key={opt?.id}
                                                    >
                                                        {/* <small
                                        style={{
                                          fontFamily: "TT Commons, sans-serif",
                                          color: "#7f7d85",
                                        }}
                                      >
                                        {opt.Name}
                                      </small> */}
                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox
                                                                    name={`${ele?.id}${opt?.id}`}
                                                                    // checked={
                                                                    //   filterChecked[`checkbox${index + 1}${i + 1}`]
                                                                    //     ? filterChecked[`checkbox${index + 1}${i + 1}`]?.checked
                                                                    //     : false
                                                                    // }
                                                                    checked={
                                                                        filterChecked[`${ele?.id}${opt?.id}`]?.checked ===
                                                                            undefined
                                                                            ? false
                                                                            : filterChecked[`${ele?.id}${opt?.id}`]?.checked
                                                                    }
                                                                    style={{
                                                                        color: "#7f7d85",
                                                                        padding: 0,
                                                                        width: "10px",
                                                                    }}
                                                                    onClick={(e) =>
                                                                        handleCheckboxChange(
                                                                            e,
                                                                            ele?.id,
                                                                            opt?.Name
                                                                        )
                                                                    }
                                                                    size="small"
                                                                />
                                                            }

                                                            // sx={{
                                                            //   display: "flex",
                                                            //   justifyContent: "space-between", // Adjust spacing between checkbox and label
                                                            //   width: "100%",
                                                            //   flexDirection: "row-reverse", // Align items to the right
                                                            //   fontFamily:'TT Commons Regular'
                                                            // }}
                                                            className="smr_mui_checkbox_label"
                                                            label={opt.Name}
                                                        />

                                                    </div>
                                                ))}
                                            </AccordionDetails>
                                        </Accordion>
                                    )}
                                </>
                            ))}
                        </div>
                    </div>}
                </div>

                <div className='smr_lookBookImgDivMain'>
                    {designSetLstData?.map((slide, index) => (
                        <div className="smr_designSetDiv" key={index}>
                            <img
                                className="smr_lookBookImg"
                                loading="lazy"
                                src={ProdCardImageFunc(slide)}
                                alt={`Slide ${index}`}
                            />
                            <p className="smr_designList_title">{slide?.TitleLine}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <p style={{
                    paddingBlock: '30px',
                    margin: '0px',
                    textAlign: 'center',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: 500,
                    letterSpacing: '1px'
                }} onClick={() => window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                })}>BACK TO TOP</p>
            </div>
        </div>
    )
}

export default Lookbook