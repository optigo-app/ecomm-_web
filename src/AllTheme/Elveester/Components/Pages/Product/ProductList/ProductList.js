import React, { useEffect, useState } from 'react'
import './ProductList.modul.scss'
import { styled } from '@mui/material/styles';
import MuiAccordion from '@mui/material/Accordion';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import FilterListIcon from '@mui/icons-material/FilterList';
import WindowIcon from '@mui/icons-material/Window';
import SortIcon from '@mui/icons-material/Sort';
import Popover from '@mui/material/Popover';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AppsIcon from '@mui/icons-material/Apps';
import Modal from '@mui/material/Modal';
import ViewCompactIcon from '@mui/icons-material/ViewCompact';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, FormControlLabel } from '@mui/material';

const ProductList = () => {

  // Designing States
  const [showFilter,setShowFilter] = useState(false);
  const [trend, setTrend] = useState('Recommendate');
  const [carat, setCarat] = useState('');
  const [clarity, setClarity] = useState('VS#GH');
  const [activeIcon, setActiveIcon] = useState('apps');
  const [filter, setFilter] = useState();
  const [openDrawer, setOpenDrawer] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [openGridModal, setOpenGridModal] = useState(false);
  const [gridToggle, setGridToggle] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);


  // API's States
  const [menuParams, setMenuParams] = useState({})
  const [metalType,setMetaltype] = useState([]);
  const [diamondType, setDiamondType] = useState([]);
  const [allFilter, setAllFilter] = useState([]);
  const [filterChecked, setFilterChecked] = useState({})
  console.log('allFilter: ', allFilter);

  const [checkedStates, setCheckedStates] = useState({
    checkbox1: false,
    checkbox2: false,
    checkbox3: false,
    checkbox4: false,
    checkbox5: false,
    checkbox6: false,
    checkbox7: false,
    checkbox8: false,
  });

  const handleCheckboxChange = (e, listname, val) => {
    const { name, checked } = e.target;

    // console.log("output filterCheckedVal",{checked,type:listname,id:name.replace(/[a-zA-Z]/g, ''),value:val});

    setFilterChecked((prev) => ({
      ...prev,
      [name]: { checked, type: listname, id: name?.replace(/[a-zA-Z]/g, ''), value: val }
    }))
  }

  const handleGridToggles = (event) => {
    setAnchorEl(event.currentTarget); // Open the popover
  };

  const handleClosePopover = () => {
    setAnchorEl(null); // Close the popover
  };

  const handleChecked = (checkbox) => (event) => {
    setCheckedStates({
      ...checkedStates,
      [checkbox]: event.target.checked,
    });
  };

  const handleChangeTrend = (event) => {
    setTrend(event.target.value);
  };
  const handleChangeCarat = (event) => {
    setCarat(event.target.value);
  };
  const handleChangeClarity = (event) => {
    setClarity(event.target.value);
  };

  const handleShowFilter = () => {
    setShowFilter(!showFilter);
  }

  const handleActiveIcons = (icons) => {
    setActiveIcon(icons)
    handleClosePopover();
  }

  const toggleDrawer = (newOpen) => () => {
    setOpenDrawer(newOpen);
  };

  const handleGridToggle = () => {
    setGridToggle(!gridToggle);
  }

  const open = Boolean(anchorEl);
  const id = open ? 'icon-popover' : undefined;

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    borderBottom: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
    '&:last-child': {
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
    '&::before': {
      display: 'none',
    },
  }));

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    const handleResize = () => {
        if (window.innerWidth <= 1400) {
            setFilter(true);
            setShowFilter(true);
        }
        else if(window.innerWidth <= 700){
          setOpenGridModal(true);
        } 
        else {
            setFilter(false);
            setShowFilter(false);
            setOpenGridModal(false);
        }
    };

    handleResize(); 

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
}, []);

  useEffect(() => {
    const handleResize = () => {
        if (window.innerWidth <= 700) {
          setOpenGridModal(true);
        }
        else {
            setOpenGridModal(false);
        }
    };

    handleResize(); 

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
}, []);


// Working With API's

useEffect(() => {
  let params = JSON.parse(localStorage.getItem('menuparams'));
  setMenuParams(params)

  let metalTypeDrpdown = JSON.parse(localStorage.getItem('metalTypeCombo'));
  setMetaltype(metalTypeDrpdown)
  setCarat(metalTypeDrpdown[1]?.Metalid);

  let diamondTypeDrpdown = JSON.parse(localStorage.getItem('diamondQualityColorCombo'));
  setDiamondType(diamondTypeDrpdown);
  setClarity(diamondTypeDrpdown[0]?.Quality+'#'+diamondTypeDrpdown[0]?.color)

  let getAllFilter = JSON.parse(localStorage.getItem('AllFilter'));
  setAllFilter(getAllFilter)

},[])


  return (
    <>
      <div className='elv_Productlists_Main_div'>
        <div className='elv_Productlists_lists_div'>
          <div className='elv_Productlists_lists_header'>
            <div className='elv_Productlists_lists_header_breadcrumb'>
              <div className='elv_Productslists_lists_name'>
                <div className='elv_Productlists_details'>
                  <span className='elv_Productlists_details_1'>{menuParams?.FilterVal}</span>
                  <span className='elv_Productlists_details_2'>&nbsp;1</span>
                  <span className='elv_Productlists_details_3'>&nbsp;Design</span>
                </div>
                <div role="presentation">
                  <Breadcrumbs separator="›" fontSize='16px' aria-label="breadcrumb">
                    <Typography className='elv_breadcrumbs' color="text.primary">{menuParams?.menuname}</Typography>
                    <Typography className='elv_breadcrumbs' color="text.primary">{menuParams?.FilterVal1}</Typography>
                    <Typography className='elv_breadcrumbs' color="text.primary">{menuParams?.FilterVal2}</Typography>
                  </Breadcrumbs>
                </div>
              </div>
              <div className='elv_Productlists_lists_header_logo'>
                <span>
                  <p className='elv_Productlist_ptitle'>
                    <img className='elv_Productlist_logo' src='https://cdnfs.optigoapps.com/content-global3/estoreWJ3U0B6PVONQHL1TA/estore/images/HomePage/MainBanner/image/featuresImage.png' alt='Logo' />
                  </p>
                </span>
              </div>
            </div>
            <div className='elv_filteration_block_div'>
              <div className='elv_filteration_rows'>
                <div onClick={handleShowFilter} className={`${filter ? 'elv_filteration_rows_1_filter' : 'elv_filteration_rows_1'}`}>
                  {filter ? (
                    <>
                      <span className={`${filter ? 'elv_filter_content_1_filter' : 'elv_filter_content_1'}`} onClick={toggleDrawer(true)}>Filter</span>
                      <span className='elv_filter_icon_1'>&nbsp;<FilterListIcon onClick={toggleDrawer(true)} /></span>
                    </>
                  ) : (
                    <>
                      <span className='elv_filter_content_1'>{showFilter ? 'Show Filter' : 'hide filter'}</span>
                      <span className='elv_filter_icon_1'>&nbsp;<FilterListIcon /></span>
                    </>
                  )}
                </div>
                <div className={`${filter ? 'elv_filteration_rows_2_filter' : 'elv_filteration_rows_2'}`}>
                  <FormControl sx={{ m: 1, width: "95%", display: 'flex', justifyContent: 'center',border: 'none' }}>
                    <Select
                      value={trend}
                      onChange={handleChangeTrend}
                      displayEmpty
                      inputProps={{ 'aria-label': 'Without label' }}
                      className='elv_trend_drp'
                      style={{ backgroundColor: "#F4F4F4", color: '#8E7B8E', fontWeight: "400", cursor: "pointer", textTransform: 'uppercase', letterSpacing: '2px'}}
                    >
                      <MenuItem value="Recommendate">Recommended</MenuItem>
                      <MenuItem value="new">New</MenuItem>
                      <MenuItem value="in-stock">In Stock</MenuItem>
                      <MenuItem value="price-low-to-high">Price Low to High</MenuItem>
                      <MenuItem value="price-high-to-low">Price High to Low</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                {filter ? (
                  <>
                    <div className={`elv_filteration_rows_3_combo`}>
                    <span className={`${filter ? 'elv_filter_content_2_filter' : 'elv_filter_content_2'}`} onClick={handleOpen}>Combo</span>
                    <span className='elv_filter_icon_1'>&nbsp;<SortIcon onClick={handleOpen} /></span>
                      <Modal
                        open={openModal}
                        onClose={handleClose}
                      >
                        <Box sx={modalStyle}>
                          <div className={`elv_filteration_rows_3`}>
                            <FormControl sx={{ m: 1, width: "95%", display: 'flex', justifyContent: 'center', border: 'none' }}>
                              <Select
                                value={carat}
                                onChange={handleChangeCarat}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                                style={{ color: '#8E7B8E', fontSize: "14px", fontWeight: "400", cursor: "pointer", marginBlock: '3px', textTransform: 'uppercase', letterSpacing: '2px' }}
                              >
                                {metalType?.map((item, index) => (
                                  <MenuItem key={index} value={item.Metalid}>
                                    {item.metaltype}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </div>
                          <div className='elv_filteration_rows_4'>
                            <FormControl sx={{ m: 1, width: "95%", display: 'flex', justifyContent: 'center', border: 'none' }}>
                              <Select
                                value={clarity}
                                onChange={handleChangeClarity}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                                style={{ color: '#8E7B8E', fontSize: "14px", fontWeight: "400",marginBlock: '3px', cursor: "pointer", textTransform: 'uppercase', letterSpacing: '2px' }}
                              >
                                {diamondType?.map((item, index) => {
                                  return (
                                    <MenuItem key={index} value={`${item.Quality}#${item?.color}`}>
                                      {`${item.Quality}#${item?.color}`}
                                    </MenuItem>
                                  )
                                })}
                              </Select>
                            </FormControl>
                          </div>
                        </Box>
                      </Modal>
                    </div>
                  </>
                ) : (
                  <>
                      <div className={`elv_filteration_rows_3`}>
                        <FormControl sx={{ m: 1, width: "95%", display: 'flex', justifyContent: 'center', border: 'none' }}>
                          <Select
                            value={carat} 
                            onChange={handleChangeCarat}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                            style={{ backgroundColor: "#F4F4F4", color: '#8E7B8E', fontSize: "14px", fontWeight: "400", cursor: "pointer", textTransform: 'uppercase', letterSpacing: '2px' }}
                          >
                            {metalType?.map((item, index) => (
                              <MenuItem key={index} value={item.Metalid}>
                                {item.metaltype}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </div>
                      <div className='elv_filteration_rows_4'>
                        <FormControl sx={{ m: 1, width: "95%", display: 'flex', justifyContent: 'center', border: 'none' }}>
                          <Select
                            value={clarity}
                            onChange={handleChangeClarity}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                            style={{ backgroundColor: "#F4F4F4", color: '#8E7B8E', fontSize: "14px", fontWeight: "400", cursor: "pointer", textTransform: 'uppercase', letterSpacing: '2px' }}
                          >
                            {diamondType?.map((item,index) => {
                              return(
                                <MenuItem key={index} value={`${item.Quality}#${item?.color}`}>
                                  {`${item.Quality}#${item?.color}`}
                                </MenuItem>
                              )
                            })}
                          </Select>
                        </FormControl>
                      </div>
                  </>
                )}
               
               {filter ? (
                <>
                    <div className={openGridModal ? `${filter ? 'elv_filteration_rows_5_filter_dots' : 'elv_filteration_rows_5'}` : `${filter ? 'elv_filteration_rows_5_filter' : 'elv_filteration_rows_5'}`}>
                      <div className='elv_grid_view'>
                        {openGridModal ? (
                          <>
                          <MoreVertIcon onClick={handleGridToggles} style={{ fontSize: '2rem', cursor: 'pointer' }} />
                          <Popover
                            id={id}
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleClosePopover}
                            anchorOrigin={{
                              vertical: 'bottom',
                              horizontal: 'left',
                            }}
                            transformOrigin={{
                              vertical: 'top',
                              horizontal: 'left',
                            }}
                          >
                            <div style={{ padding: '10px'}}>
                                <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', gap: '5px' }}>
                                  <span
                                    onClick={() => handleActiveIcons('window')}
                                    style={{ paddingRight: '8px', fontSize: '14px', color: activeIcon === 'window' ? '#000' : '#A2A2A2', cursor: 'pointer' }}
                                  >
                                    Single View
                                    </span>
                                  <span
                                    onClick={() => handleActiveIcons('apps')}
                                    style={{ paddingRight: '8px', fontSize: '14px', color: activeIcon === 'apps' ? '#000' : '#A2A2A2', cursor: 'pointer' }}
                                  >
                                    Double View
                                  </span>
                                </div>
                            </div>
                          </Popover>
                          </>
                        ) : (
                          <>
                            <WindowIcon
                              onClick={() => handleActiveIcons('window')}
                              sx={{ paddingRight: '8px', fontSize: '1.8rem', color: activeIcon === 'window' ? '#000' : '#A2A2A2', cursor: 'pointer' }}
                            />
                            <AppsIcon
                              onClick={() => handleActiveIcons('apps')}
                              sx={{ paddingRight: '8px', fontSize: '1.8rem', color: activeIcon === 'apps' ? '#000' : '#A2A2A2', cursor: 'pointer' }}
                            />
                          </>
                        )}
                      </div>
                    </div>
                </>
               ) : (
                <>
                  <div className={`${filter ? 'elv_filteration_rows_5_filter' : 'elv_filteration_rows_5'}`}>
                  <div className='elv_grid_view'>
                    <WindowIcon onClick={() => handleActiveIcons('window')} sx={{ paddingRight: '8px', fontSize: '1.8rem' , color: activeIcon === 'window' ? '#000' : '#A2A2A2', cursor: 'pointer'}} />
                    <AppsIcon onClick={() => handleActiveIcons('apps')}  sx={{ paddingRight: '8px', fontSize: '1.8rem', color: activeIcon === 'apps' ? '#000' : '#A2A2A2', cursor: 'pointer'}}/>
                    <ViewCompactIcon onClick={() => handleActiveIcons('view_grid')}  sx={{ paddingRight: '2px',  fontSize: '1.9rem', color: activeIcon === 'view_grid' ? '#000' : '#A2A2A2', cursor: 'pointer'}}/>
                  </div>
                </div>
                </>
               )}
              </div>
            </div>
            <div className='elv_filtered_data'>
              <div className='elv_filtered_data_div'>
                  {showFilter === false && filter === false ? (
                    <>
                     <div className='elv_filtered_data_category'>
                      <div className='elv_filtered_category_div'>
                        <span className='elv_filtered_data_span'>Filter</span>
                        {allFilter?.map((item,index) => {
                          return(
                            <>
                              <Accordion key={index}>
                                <AccordionSummary
                                  expandIcon={<ExpandMoreIcon />}
                                  aria-controls="panel1-content"
                                  id="panel1-header"
                                  className='elv_category_names'
                                >
                                  {item?.Name}
                                </AccordionSummary>
                                <AccordionDetails>
                                    {(JSON.parse(item?.options) ?? []).map((opt) => {
                                        return(
                                          <>
                                            <div className='elv_subCategory_name' key={opt?.id}>
                                              <div>
                                                {opt.Name}
                                              </div>
                                              <div>
                                              <Checkbox
                                                name={`${item?.id}${opt?.id}`}
                                                checked={
                                                  filterChecked[`${item?.id}${opt?.id}`]?.checked ===
                                                    undefined
                                                    ? false
                                                    : filterChecked[`${item?.id}${opt?.id}`]?.checked
                                                }
                                                style={{
                                                  color: "#7f7d85",
                                                  padding: 0,
                                                  width: "10px",
                                                }}
                                                onClick={(e) =>
                                                  handleCheckboxChange(
                                                    e,
                                                    item?.id,
                                                    opt?.Name
                                                  )
                                                }
                                                size="small"
                                              />
                                            </div>
                                            </div>    
                                          </>
                                        )
                                     })}
                                </AccordionDetails>
                              </Accordion>
                            </>
                          )
                        })}
                      </div>
                      </div>
                    </>
                  ) : (
                    <>
                     <div className='elv_filtered_data_category_other'>
                        <div className='elv_filtered_category_div'>
                          <span className='elv_filtered_data_span'>Filter</span>
                          <Box sx={{ width: 350 }} role="presentation">
                          <Drawer  open={openDrawer} onClose={toggleDrawer(false)}>
                              {/* {allFilter?.map((item, index) => (
                                <Accordion key={index} sx={{ border: 'none' }}>
                                  <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls={`panel${index + 1}-content`}
                                    id={`panel${index + 1}-header`}
                                    className='elv_category_names'
                                  >
                                    {item?.Name}
                                  </AccordionSummary>
                                  <AccordionDetails>
                                    {(JSON.parse(item?.options) ?? []).map((opt) => (
                                      <div className='elv_subCategory_name' key={opt?.id}>
                                        <Checkbox
                                          name={`${item?.id}${opt?.id}`}
                                          checked={
                                            filterChecked[`${item?.id}${opt?.id}`]?.checked === undefined
                                              ? false
                                              : filterChecked[`${item?.id}${opt?.id}`]?.checked
                                          }
                                          style={{
                                            color: "#7f7d85",
                                            padding: 0,
                                            width: "10px",
                                          }}
                                          onClick={(e) =>
                                            handleCheckboxChange(
                                              e,
                                              item?.id,
                                              opt?.Name
                                            )
                                          }
                                          size="small"
                                        />
                                        <div>
                                          {opt.Name}
                                        </div>
                                      </div>
                                    ))}
                                  </AccordionDetails>
                                </Accordion>
                              ))} */}
                          <Accordion sx={{ border: 'none' }}>
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel2-content"
                              id="panel2-header"
                              className='elv_category_names'
                            >
                              Product type
                            </AccordionSummary>
                            <AccordionDetails>
                              <div className='elv_subCategory_name'>
                                <Checkbox
                                  checked={checkedStates?.checkbox2}
                                  onChange={handleChecked('checkbox2')}
                                />
                                <span style={{ fontSize: '14px'}}>
                                  Diamond Jewellery
                                </span>
                              </div>
                            </AccordionDetails>
                          </Accordion>
                          <Accordion sx={{ border: 'none' }}>
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel3-content"
                              id="panel3-header"
                              className='elv_category_names'
                            >
                              Gender
                            </AccordionSummary>
                            <AccordionDetails>
                              <div className='elv_subCategory_name'>
                                <Checkbox
                                  checked={checkedStates?.checkbox3}
                                  onChange={handleChecked('checkbox3')}
                                />
                                <span style={{ fontSize: '14px'}}>
                                  Women
                                </span>
                              </div>
                            </AccordionDetails>
                          </Accordion>
                          <Accordion sx={{ border: 'none' }}>
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel4-content"
                              id="panel4-header"
                              className='elv_category_names'
                            >
                              Collection
                            </AccordionSummary>
                            <AccordionDetails>
                              <div className='elv_subCategory_name'>
                                <Checkbox
                                  checked={checkedStates?.checkbox4}
                                  onChange={handleChecked('checkbox4')}
                                />
                                <span style={{ fontSize: '14px'}}>
                                  EarWear
                                </span>
                              </div>
                            </AccordionDetails>
                          </Accordion>
                          <Accordion sx={{ border: 'none' }}>
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel5-content"
                              id="panel5-header"
                              className='elv_category_names'
                            >
                              Brand
                            </AccordionSummary>
                            <AccordionDetails>
                              <div className='elv_subCategory_name'>
                                <Checkbox
                                  checked={checkedStates?.checkbox5}
                                  onChange={handleChecked('checkbox5')}
                                />
                                <span style={{ fontSize: '14px'}}>
                                  Amber
                                </span>
                              </div>
                            </AccordionDetails>
                          </Accordion>
                          <Accordion sx={{ border: 'none' }}>
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel6-content"
                              id="panel6-header"
                              className='elv_category_names'
                            >
                              Occasion
                            </AccordionSummary>
                            <AccordionDetails>
                              <div className='elv_subCategory_name'>
                                <Checkbox
                                  checked={checkedStates?.checkbox6}
                                  onChange={handleChecked('checkbox6')}
                                />
                                <span style={{ fontSize: '14px'}}>
                                  Party Wear
                                </span>
                              </div>
                            </AccordionDetails>
                          </Accordion>
                          <Accordion sx={{ border: 'none' }}>
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel7-content"
                              id="panel7-header"
                              className='elv_category_names'
                            >
                              theme
                            </AccordionSummary>
                            <AccordionDetails>
                              <div className='elv_subCategory_name'>
                                <Checkbox
                                  checked={checkedStates?.checkbox7}
                                  onChange={handleChecked('checkbox7')}
                                />
                                <span style={{ fontSize: '14px'}}>
                                  Casual
                                </span>
                              </div>
                            </AccordionDetails>
                          </Accordion>
                          <Accordion sx={{ border: 'none' }}>
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel8-content"
                              id="panel8-header"
                              className='elv_category_names'
                            >
                              subcategory
                            </AccordionSummary>
                            <AccordionDetails>
                              <div className='elv_subCategory_name'>
                                <Checkbox
                                  checked={checkedStates?.checkbox8}
                                  onChange={handleChecked('checkbox8')}
                                />
                                <span style={{ fontSize: '14px'}}>
                                  Ring
                                </span>
                              </div>
                            </AccordionDetails>
                          </Accordion>
                          </Drawer>
                          </Box>
                        </div>
                        </div>
                    </>
                  )}
              
                {showFilter === true ? (
                  <>
                    <div className='elv_filtered_data_by_grid_other'>
                  <div className='elv_filtered_data_grid_div'>
                    {activeIcon === 'window' && (
                      <>
                        <div className='elv_filtered_prodlists_1' style={{ maxWidth: "calc(100% / 2)"}}>
                        <div className='elv_filtered_prods'>
                          <div className='elv_filtered_icons'>
                            <div>
                              <LocalMallOutlinedIcon border='#CBC7C7' />
                            </div>
                            <div>
                              <FavoriteBorderIcon border='#CBC7C7' />
                            </div>
                          </div>
                          <div style={{ display: "flex", justifyContent: 'center', alignItems: 'center'}}>
                            <div style={{ display: 'flex' , justifyContent: 'space-between',flexDirection: 'column', alignItems: 'center'}}>
                            <img className='elv_filtered_image_1' src='https://cdnfs.optigoapps.com/content-global3/estoreWJ3U0B6PVONQHL1TA/Design_Image/CF6EC34EF5MDAzMjQyNA==/Red_Medium/0032424_29042024100241935.jpg' />
                           <span style={{ fontFamily: '"PT Sans" sans-serif',color: '#B2B0B0' ,fontSize: '12px',}}>Rose/White Gold - GOLD 18K</span>
                            </div>
                          </div>
                          <div className='elv_filtered_prod_details'>
                            <div className='elv_filtered_prod_weights'>
                              <div style={{ display: 'flex'}}>
                                <span className='elv_prod_weight_span_1'>NWT&nbsp;: </span>
                                <span className='elv_prod_weight_span_2'>&nbsp;0.000</span>
                              </div>
                              <div style={{ display: 'flex'}}>
                              <span className='elv_prod_weight_span_1'>DWT&nbsp;: </span>
                              <span className='elv_prod_weight_span_2'>&nbsp;0/0</span>
                              </div>
                              <div style={{ display: 'flex'}}>
                              <span className='elv_prod_weight_span_1'>GWT&nbsp;: </span>
                              <span className='elv_prod_weight_span_2'>&nbsp;0.000</span>
                              </div>
                            </div>
                            <div className='elv_filtered_prod_price'>
                              <span className='elv_prod_weight_span_1'>A13345</span>
                              <span style={{ fontWeight: 'bold', textAlign: 'left', fontSize: '17px'}}>₹0</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='elv_filtered_prodlists_1' style={{ maxWidth: "calc(100% / 2)"}}>
                        <div className='elv_filtered_prods'>
                          <div className='elv_filtered_icons'>
                            <div>
                              <LocalMallOutlinedIcon border='#CBC7C7' />
                            </div>
                            <div>
                              <FavoriteBorderIcon border='#CBC7C7' />
                            </div>
                          </div>
                          <div style={{ display: "flex", justifyContent: 'center', alignItems: 'center'}}>
                            <div style={{ display: 'flex' , justifyContent: 'space-between',flexDirection: 'column', alignItems: 'center'}}>
                            <img className='elv_filtered_image_1' src='https://cdnfs.optigoapps.com/content-global3/estoreWJ3U0B6PVONQHL1TA/Design_Image/CF6EC34EF5MDAzMjQyNA==/Red_Medium/0032424_29042024100241935.jpg' />
                           <span style={{ fontFamily: '"PT Sans" sans-serif',color: '#B2B0B0' ,fontSize: '12px',}}>Rose/White Gold - GOLD 18K</span>
                            </div>
                          </div>
                          <div className='elv_filtered_prod_details' style={{ marginTop: 'auto' }}>
                            <div className='elv_filtered_prod_weights'>
                              <div style={{ display: 'flex'}}>
                                <span className='elv_prod_weight_span_1'>NWT&nbsp;: </span>
                                <span className='elv_prod_weight_span_2'>&nbsp;0.000</span>
                              </div>
                              <div style={{ display: 'flex'}}>
                              <span className='elv_prod_weight_span_1'>DWT&nbsp;: </span>
                              <span className='elv_prod_weight_span_2'>&nbsp;0/0</span>
                              </div>
                              <div style={{ display: 'flex'}}>
                              <span className='elv_prod_weight_span_1'>GWT&nbsp;: </span>
                              <span className='elv_prod_weight_span_2'>&nbsp;0.000</span>
                              </div>
                            </div>
                            <div className='elv_filtered_prod_price'>
                              <span className='elv_prod_weight_span_1'>A13345</span>
                              <span style={{ fontWeight: 'bold', textAlign: 'left', fontSize: '17px'}}>₹0</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='elv_filtered_prodlists_1' style={{ maxWidth: "calc(100% / 2)"}}>
                        <div className='elv_filtered_prods'>
                          <div className='elv_filtered_icons'>
                            <div>
                              <LocalMallOutlinedIcon border='#CBC7C7' />
                            </div>
                            <div>
                              <FavoriteBorderIcon border='#CBC7C7' />
                            </div>
                          </div>
                          <div style={{ display: "flex", justifyContent: 'center', alignItems: 'center'}}>
                            <div style={{ display: 'flex' , justifyContent: 'space-between',flexDirection: 'column', alignItems: 'center'}}>
                            <img className='elv_filtered_image_1' src='https://cdnfs.optigoapps.com/content-global3/estoreWJ3U0B6PVONQHL1TA/Design_Image/CF6EC34EF5MDAzMjQyNA==/Red_Medium/0032424_29042024100241935.jpg' />
                           <span style={{ fontFamily: '"PT Sans" sans-serif',color: '#B2B0B0' ,fontSize: '12px',}}>Rose/White Gold - GOLD 18K</span>
                            </div>
                          </div>
                          <div className='elv_filtered_prod_details'>
                            <div className='elv_filtered_prod_weights'>
                              <div style={{ display: 'flex'}}>
                                <span className='elv_prod_weight_span_1'>NWT&nbsp;: </span>
                                <span className='elv_prod_weight_span_2'>&nbsp;0.000</span>
                              </div>
                              <div style={{ display: 'flex'}}>
                              <span className='elv_prod_weight_span_1'>DWT&nbsp;: </span>
                              <span className='elv_prod_weight_span_2'>&nbsp;0/0</span>
                              </div>
                              <div style={{ display: 'flex'}}>
                              <span className='elv_prod_weight_span_1'>GWT&nbsp;: </span>
                              <span className='elv_prod_weight_span_2'>&nbsp;0.000</span>
                              </div>
                            </div>
                            <div className='elv_filtered_prod_price'>
                              <span className='elv_prod_weight_span_1'>A13345</span>
                              <span style={{ fontWeight: 'bold', textAlign: 'left', fontSize: '17px'}}>₹0</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='elv_filtered_prodlists_1' style={{ maxWidth: "calc(100% / 2)"}}>
                        <div className='elv_filtered_prods'>
                          <div className='elv_filtered_icons'>
                            <div>
                              <LocalMallOutlinedIcon border='#CBC7C7' />
                            </div>
                            <div>
                              <FavoriteBorderIcon border='#CBC7C7' />
                            </div>
                          </div>
                          <div style={{ display: "flex", justifyContent: 'center', alignItems: 'center'}}>
                            <div style={{ display: 'flex' , justifyContent: 'space-between',flexDirection: 'column', alignItems: 'center'}}>
                            <img className='elv_filtered_image_1' src='https://cdnfs.optigoapps.com/content-global3/estoreWJ3U0B6PVONQHL1TA/Design_Image/CF6EC34EF5MDAzMjQyNA==/Red_Medium/0032424_29042024100241935.jpg' />
                           <span style={{ fontFamily: '"PT Sans" sans-serif',color: '#B2B0B0' ,fontSize: '12px',}}>Rose/White Gold - GOLD 18K</span>
                            </div>
                          </div>
                          <div className='elv_filtered_prod_details'>
                            <div className='elv_filtered_prod_weights'>
                              <div style={{ display: 'flex'}}>
                                <span className='elv_prod_weight_span_1'>NWT&nbsp;: </span>
                                <span className='elv_prod_weight_span_2'>&nbsp;0.000</span>
                              </div>
                              <div style={{ display: 'flex'}}>
                              <span className='elv_prod_weight_span_1'>DWT&nbsp;: </span>
                              <span className='elv_prod_weight_span_2'>&nbsp;0/0</span>
                              </div>
                              <div style={{ display: 'flex'}}>
                              <span className='elv_prod_weight_span_1'>GWT&nbsp;: </span>
                              <span className='elv_prod_weight_span_2'>&nbsp;0.000</span>
                              </div>
                            </div>
                            <div className='elv_filtered_prod_price'>
                              <span className='elv_prod_weight_span_1'>A13345</span>
                              <span style={{ fontWeight: 'bold', textAlign: 'left', fontSize: '17px'}}>₹0</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      </>
                    )}
                    {activeIcon === 'apps' && (
                      <>
                        <div className='elv_filtered_prodlists_2' style={{ maxWidth: "calc(100% / 3)"}}>
                        <div className='elv_filtered_prods'>
                          <div className='elv_filtered_icons'>
                            <div>
                              <LocalMallOutlinedIcon border='#CBC7C7' />
                            </div>
                            <div>
                              <FavoriteBorderIcon border='#CBC7C7' />
                            </div>
                          </div>
                          <div style={{ display: "flex", justifyContent: 'center', alignItems: 'center'}}>
                            <div style={{ display: 'flex' , justifyContent: 'space-between',flexDirection: 'column', alignItems: 'center'}}>
                            <img className='elv_filtered_image_2' src='https://cdnfs.optigoapps.com/content-global3/estoreWJ3U0B6PVONQHL1TA/Design_Image/CF6EC34EF5MDAzMjQyNA==/Red_Medium/0032424_29042024100241935.jpg' />
                           <span style={{ fontFamily: '"PT Sans" sans-serif',color: '#B2B0B0' ,fontSize: '12px',}}>Rose/White Gold - GOLD 18K</span>
                            </div>
                          </div>
                          <div className='elv_filtered_prod_details'>
                            <div className='elv_filtered_prod_weights'>
                              <div style={{ display: 'flex'}}>
                                <span className='elv_prod_weight_span_1'>NWT&nbsp;: </span>
                                <span className='elv_prod_weight_span_2'>&nbsp;0.000</span>
                              </div>
                              <div style={{ display: 'flex'}}>
                              <span className='elv_prod_weight_span_1'>DWT&nbsp;: </span>
                              <span className='elv_prod_weight_span_2'>&nbsp;0/0</span>
                              </div>
                              <div style={{ display: 'flex'}}>
                              <span className='elv_prod_weight_span_1'>GWT&nbsp;: </span>
                              <span className='elv_prod_weight_span_2'>&nbsp;0.000</span>
                              </div>
                            </div>
                            <div className='elv_filtered_prod_price'>
                              <span className='elv_prod_weight_span_1'>A13345</span>
                              <span style={{ fontWeight: 'bold', textAlign: 'left', fontSize: '17px'}}>₹0</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='elv_filtered_prodlists_2' style={{ maxWidth: "calc(100% / 3)"}}>
                        <div className='elv_filtered_prods'>
                          <div className='elv_filtered_icons'>
                            <div>
                              <LocalMallOutlinedIcon border='#CBC7C7' />
                            </div>
                            <div>
                              <FavoriteBorderIcon border='#CBC7C7' />
                            </div>
                          </div>
                         <div style={{ display: "flex", justifyContent: 'center', alignItems: 'center'}}>
                            <div style={{ display: 'flex' , justifyContent: 'space-between',flexDirection: 'column', alignItems: 'center'}}>
                            <img className='elv_filtered_image_2' src='https://cdnfs.optigoapps.com/content-global3/estoreWJ3U0B6PVONQHL1TA/Design_Image/CF6EC34EF5MDAzMjQyNA==/Red_Medium/0032424_29042024100241935.jpg' />
                           <span style={{ fontFamily: '"PT Sans" sans-serif',color: '#B2B0B0' ,fontSize: '12px',}}>Rose/White Gold - GOLD 18K</span>
                            </div>
                          </div>
                          <div className='elv_filtered_prod_details'>
                            <div className='elv_filtered_prod_weights'>
                              <div style={{ display: 'flex'}}>
                                <span className='elv_prod_weight_span_1'>NWT&nbsp;: </span>
                                <span className='elv_prod_weight_span_2'>&nbsp;0.000</span>
                              </div>
                              <div style={{ display: 'flex'}}>
                              <span className='elv_prod_weight_span_1'>DWT&nbsp;: </span>
                              <span className='elv_prod_weight_span_2'>&nbsp;0/0</span>
                              </div>
                              <div style={{ display: 'flex'}}>
                              <span className='elv_prod_weight_span_1'>GWT&nbsp;: </span>
                              <span className='elv_prod_weight_span_2'>&nbsp;0.000</span>
                              </div>
                            </div>
                            <div className='elv_filtered_prod_price'>
                              <span className='elv_prod_weight_span_1'>A13345</span>
                              <span style={{ fontWeight: 'bold', textAlign: 'left', fontSize: '17px'}}>₹0</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='elv_filtered_prodlists_2' style={{ maxWidth: "calc(100% / 3)"}}>
                        <div className='elv_filtered_prods'>
                          <div className='elv_filtered_icons'>
                            <div>
                              <LocalMallOutlinedIcon border='#CBC7C7' />
                            </div>
                            <div>
                              <FavoriteBorderIcon border='#CBC7C7' />
                            </div>
                          </div>
                         <div style={{ display: "flex", justifyContent: 'center', alignItems: 'center'}}>
                            <div style={{ display: 'flex' , justifyContent: 'space-between',flexDirection: 'column', alignItems: 'center'}}>
                            <img className='elv_filtered_image_2' src='https://cdnfs.optigoapps.com/content-global3/estoreWJ3U0B6PVONQHL1TA/Design_Image/CF6EC34EF5MDAzMjQyNA==/Red_Medium/0032424_29042024100241935.jpg' />
                           <span style={{ fontFamily: '"PT Sans" sans-serif',color: '#B2B0B0' ,fontSize: '12px',}}>Rose/White Gold - GOLD 18K</span>
                            </div>
                          </div>
                          <div className='elv_filtered_prod_details'>
                            <div className='elv_filtered_prod_weights'>
                              <div style={{ display: 'flex'}}>
                                <span className='elv_prod_weight_span_1'>NWT&nbsp;: </span>
                                <span className='elv_prod_weight_span_2'>&nbsp;0.000</span>
                              </div>
                              <div style={{ display: 'flex'}}>
                              <span className='elv_prod_weight_span_1'>DWT&nbsp;: </span>
                              <span className='elv_prod_weight_span_2'>&nbsp;0/0</span>
                              </div>
                              <div style={{ display: 'flex'}}>
                              <span className='elv_prod_weight_span_1'>GWT&nbsp;: </span>
                              <span className='elv_prod_weight_span_2'>&nbsp;0.000</span>
                              </div>
                            </div>
                            <div className='elv_filtered_prod_price'>
                              <span className='elv_prod_weight_span_1'>A13345</span>
                              <span style={{ fontWeight: 'bold', textAlign: 'left', fontSize: '17px'}}>₹0</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='elv_filtered_prodlists_2' style={{ maxWidth: "calc(100% / 3)"}}>
                        <div className='elv_filtered_prods'>
                          <div className='elv_filtered_icons'>
                            <div>
                              <LocalMallOutlinedIcon border='#CBC7C7' />
                            </div>
                            <div>
                              <FavoriteBorderIcon border='#CBC7C7' />
                            </div>
                          </div>
                         <div style={{ display: "flex", justifyContent: 'center', alignItems: 'center'}}>
                            <div style={{ display: 'flex' , justifyContent: 'space-between',flexDirection: 'column', alignItems: 'center'}}>
                            <img className='elv_filtered_image_2' src='https://cdnfs.optigoapps.com/content-global3/estoreWJ3U0B6PVONQHL1TA/Design_Image/CF6EC34EF5MDAzMjQyNA==/Red_Medium/0032424_29042024100241935.jpg' />
                           <span style={{ fontFamily: '"PT Sans" sans-serif',color: '#B2B0B0' ,fontSize: '12px',}}>Rose/White Gold - GOLD 18K</span>
                            </div>
                          </div>
                          <div className='elv_filtered_prod_details'>
                            <div className='elv_filtered_prod_weights'>
                              <div style={{ display: 'flex'}}>
                                <span className='elv_prod_weight_span_1'>NWT&nbsp;: </span>
                                <span className='elv_prod_weight_span_2'>&nbsp;0.000</span>
                              </div>
                              <div style={{ display: 'flex'}}>
                              <span className='elv_prod_weight_span_1'>DWT&nbsp;: </span>
                              <span className='elv_prod_weight_span_2'>&nbsp;0/0</span>
                              </div>
                              <div style={{ display: 'flex'}}>
                              <span className='elv_prod_weight_span_1'>GWT&nbsp;: </span>
                              <span className='elv_prod_weight_span_2'>&nbsp;0.000</span>
                              </div>
                            </div>
                            <div className='elv_filtered_prod_price'>
                              <span className='elv_prod_weight_span_1'>A13345</span>
                              <span style={{ fontWeight: 'bold', textAlign: 'left', fontSize: '17px'}}>₹0</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      </>
                    )}
                    {activeIcon === 'view_grid' && (
                      <>
                        <div className='elv_filtered_prodlists_3' style={{ maxWidth: "calc(100% / 4)"}}>
                        <div className='elv_filtered_prods'>
                          <div className='elv_filtered_icons'>
                            <div>
                              <LocalMallOutlinedIcon border='#CBC7C7' />
                            </div>
                            <div>
                              <FavoriteBorderIcon border='#CBC7C7' />
                            </div>
                          </div>
                          <div style={{ display: "flex", justifyContent: 'center', alignItems: 'center'}}>
                            <div style={{ display: 'flex' , justifyContent: 'space-between',flexDirection: 'column', alignItems: 'center'}}>
                            <img className='elv_filtered_image_3' src='https://cdnfs.optigoapps.com/content-global3/estoreWJ3U0B6PVONQHL1TA/Design_Image/CF6EC34EF5MDAzMjQyNA==/Red_Medium/0032424_29042024100241935.jpg' />
                           <span style={{ fontFamily: '"PT Sans" sans-serif',color: '#B2B0B0' ,fontSize: '12px',}}>Rose/White Gold - GOLD 18K</span>
                            </div>
                          </div>
                          <div className='elv_filtered_prod_details'>
                            <div className='elv_filtered_prod_weights'>
                              <div style={{ display: 'flex'}}>
                                <span className='elv_prod_weight_span_1'>NWT&nbsp;: </span>
                                <span className='elv_prod_weight_span_2'>&nbsp;0.000</span>
                              </div>
                              <div style={{ display: 'flex'}}>
                              <span className='elv_prod_weight_span_1'>DWT&nbsp;: </span>
                              <span className='elv_prod_weight_span_2'>&nbsp;0/0</span>
                              </div>
                              <div style={{ display: 'flex'}}>
                              <span className='elv_prod_weight_span_1'>GWT&nbsp;: </span>
                              <span className='elv_prod_weight_span_2'>&nbsp;0.000</span>
                              </div>
                            </div>
                            <div className='elv_filtered_prod_price'>
                              <span className='elv_prod_weight_span_1'>A13345</span>
                              <span style={{ fontWeight: 'bold', textAlign: 'left', fontSize: '17px'}}>₹0</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='elv_filtered_prodlists_3' style={{ maxWidth: "calc(100% / 4)"}}>
                        <div className='elv_filtered_prods'>
                          <div className='elv_filtered_icons'>
                            <div>
                              <LocalMallOutlinedIcon border='#CBC7C7' />
                            </div>
                            <div>
                              <FavoriteBorderIcon border='#CBC7C7' />
                            </div>
                          </div>
                          <div style={{ display: "flex", justifyContent: 'center', alignItems: 'center'}}>
                            <div style={{ display: 'flex' , justifyContent: 'space-between',flexDirection: 'column', alignItems: 'center'}}>
                            <img className='elv_filtered_image_3' src='https://cdnfs.optigoapps.com/content-global3/estoreWJ3U0B6PVONQHL1TA/Design_Image/CF6EC34EF5MDAzMjQyNA==/Red_Medium/0032424_29042024100241935.jpg' />
                           <span style={{ fontFamily: '"PT Sans" sans-serif',color: '#B2B0B0' ,fontSize: '12px',}}>Rose/White Gold - GOLD 18K</span>
                            </div>
                          </div>
                          <div className='elv_filtered_prod_details'>
                            <div className='elv_filtered_prod_weights'>
                              <div style={{ display: 'flex'}}>
                                <span className='elv_prod_weight_span_1'>NWT&nbsp;: </span>
                                <span className='elv_prod_weight_span_2'>&nbsp;0.000</span>
                              </div>
                              <div style={{ display: 'flex'}}>
                              <span className='elv_prod_weight_span_1'>DWT&nbsp;: </span>
                              <span className='elv_prod_weight_span_2'>&nbsp;0/0</span>
                              </div>
                              <div style={{ display: 'flex'}}>
                              <span className='elv_prod_weight_span_1'>GWT&nbsp;: </span>
                              <span className='elv_prod_weight_span_2'>&nbsp;0.000</span>
                              </div>
                            </div>
                            <div className='elv_filtered_prod_price'>
                              <span className='elv_prod_weight_span_1'>A13345</span>
                              <span style={{ fontWeight: 'bold', textAlign: 'left', fontSize: '17px'}}>₹0</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='elv_filtered_prodlists_3' style={{ maxWidth: "calc(100% / 4)"}}>
                        <div className='elv_filtered_prods'>
                          <div className='elv_filtered_icons'>
                            <div>
                              <LocalMallOutlinedIcon border='#CBC7C7' />
                            </div>
                            <div>
                              <FavoriteBorderIcon border='#CBC7C7' />
                            </div>
                          </div>
                          <div style={{ display: "flex", justifyContent: 'center', alignItems: 'center'}}>
                            <div style={{ display: 'flex' , justifyContent: 'space-between',flexDirection: 'column', alignItems: 'center'}}>
                            <img className='elv_filtered_image_3' src='https://cdnfs.optigoapps.com/content-global3/estoreWJ3U0B6PVONQHL1TA/Design_Image/CF6EC34EF5MDAzMjQyNA==/Red_Medium/0032424_29042024100241935.jpg' />
                           <span style={{ fontFamily: '"PT Sans" sans-serif',color: '#B2B0B0' ,fontSize: '12px',}}>Rose/White Gold - GOLD 18K</span>
                            </div>
                          </div>
                          <div className='elv_filtered_prod_details'>
                            <div className='elv_filtered_prod_weights'>
                              <div style={{ display: 'flex'}}>
                                <span className='elv_prod_weight_span_1'>NWT&nbsp;: </span>
                                <span className='elv_prod_weight_span_2'>&nbsp;0.000</span>
                              </div>
                              <div style={{ display: 'flex'}}>
                              <span className='elv_prod_weight_span_1'>DWT&nbsp;: </span>
                              <span className='elv_prod_weight_span_2'>&nbsp;0/0</span>
                              </div>
                              <div style={{ display: 'flex'}}>
                              <span className='elv_prod_weight_span_1'>GWT&nbsp;: </span>
                              <span className='elv_prod_weight_span_2'>&nbsp;0.000</span>
                              </div>
                            </div>
                            <div className='elv_filtered_prod_price'>
                              <span className='elv_prod_weight_span_1'>A13345</span>
                              <span style={{ fontWeight: 'bold', textAlign: 'left', fontSize: '17px'}}>₹0</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='elv_filtered_prodlists_3' style={{ maxWidth: "calc(100% / 4)"}}>
                        <div className='elv_filtered_prods'>
                          <div className='elv_filtered_icons'>
                            <div>
                              <LocalMallOutlinedIcon border='#CBC7C7' />
                            </div>
                            <div>
                              <FavoriteBorderIcon border='#CBC7C7' />
                            </div>
                          </div>
                          <div style={{ display: "flex", justifyContent: 'center', alignItems: 'center'}}>
                            <div style={{ display: 'flex' , justifyContent: 'space-between',flexDirection: 'column', alignItems: 'center'}}>
                            <img className='elv_filtered_image_3' src='https://cdnfs.optigoapps.com/content-global3/estoreWJ3U0B6PVONQHL1TA/Design_Image/CF6EC34EF5MDAzMjQyNA==/Red_Medium/0032424_29042024100241935.jpg' />
                           <span style={{ fontFamily: '"PT Sans" sans-serif',color: '#B2B0B0' ,fontSize: '12px',}}>Rose/White Gold - GOLD 18K</span>
                            </div>
                          </div>
                          <div className='elv_filtered_prod_details'>
                            <div className='elv_filtered_prod_weights'>
                              <div style={{ display: 'flex'}}>
                                <span className='elv_prod_weight_span_1'>NWT&nbsp;: </span>
                                <span className='elv_prod_weight_span_2'>&nbsp;0.000</span>
                              </div>
                              <div style={{ display: 'flex'}}>
                              <span className='elv_prod_weight_span_1'>DWT&nbsp;: </span>
                              <span className='elv_prod_weight_span_2'>&nbsp;0/0</span>
                              </div>
                              <div style={{ display: 'flex'}}>
                              <span className='elv_prod_weight_span_1'>GWT&nbsp;: </span>
                              <span className='elv_prod_weight_span_2'>&nbsp;0.000</span>
                              </div>
                            </div>
                            <div className='elv_filtered_prod_price'>
                              <span className='elv_prod_weight_span_1'>A13345</span>
                              <span style={{ fontWeight: 'bold', textAlign: 'left', fontSize: '17px'}}>₹0</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      </>
                    )}
                  </div>
                    </div>
                  </>
                ) : (
                  <>
                <div className='elv_filtered_data_by_grid'>
                  <div className='elv_filtered_data_grid_div'>
                    {activeIcon === 'window' && (
                      <>
                        <div className='elv_filtered_prodlists_1' style={{ maxWidth: "calc(100% / 2)"}}>
                        <div className='elv_filtered_prods'>
                          <div className='elv_filtered_icons'>
                            <div>
                              <LocalMallOutlinedIcon border='#CBC7C7' />
                            </div>
                            <div>
                              <FavoriteBorderIcon border='#CBC7C7' />
                            </div>
                          </div>
                          <div style={{ display: "flex", justifyContent: 'center', alignItems: 'center'}}>
                            <div style={{ display: 'flex' , justifyContent: 'space-between',flexDirection: 'column', alignItems: 'center'}}>
                            <img className='elv_filtered_image_1' src='https://cdnfs.optigoapps.com/content-global3/estoreWJ3U0B6PVONQHL1TA/Design_Image/CF6EC34EF5MDAzMjQyNA==/Red_Medium/0032424_29042024100241935.jpg' />
                           <span style={{ fontFamily: '"PT Sans" sans-serif',color: '#B2B0B0' ,fontSize: '12px',}}>Rose/White Gold - GOLD 18K</span>
                            </div>
                          </div>
                          <div className='elv_filtered_prod_details'>
                            <div className='elv_filtered_prod_weights'>
                              <div style={{ display: 'flex'}}>
                                <span className='elv_prod_weight_span_1'>NWT&nbsp;: </span>
                                <span className='elv_prod_weight_span_2'>&nbsp;0.000</span>
                              </div>
                              <div style={{ display: 'flex'}}>
                              <span className='elv_prod_weight_span_1'>DWT&nbsp;: </span>
                              <span className='elv_prod_weight_span_2'>&nbsp;0/0</span>
                              </div>
                              <div style={{ display: 'flex'}}>
                              <span className='elv_prod_weight_span_1'>GWT&nbsp;: </span>
                              <span className='elv_prod_weight_span_2'>&nbsp;0.000</span>
                              </div>
                            </div>
                            <div className='elv_filtered_prod_price'>
                              <span className='elv_prod_weight_span_1'>A13345</span>
                              <span style={{ fontWeight: 'bold', textAlign: 'left', fontSize: '17px'}}>₹0</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='elv_filtered_prodlists_1' style={{ maxWidth: "calc(100% / 2)"}}>
                        <div className='elv_filtered_prods'>
                          <div className='elv_filtered_icons'>
                            <div>
                              <LocalMallOutlinedIcon border='#CBC7C7' />
                            </div>
                            <div>
                              <FavoriteBorderIcon border='#CBC7C7' />
                            </div>
                          </div>
                          <div style={{ display: "flex", justifyContent: 'center', alignItems: 'center'}}>
                            <div style={{ display: 'flex' , justifyContent: 'space-between',flexDirection: 'column', alignItems: 'center'}}>
                            <img className='elv_filtered_image_1' src='https://cdnfs.optigoapps.com/content-global3/estoreWJ3U0B6PVONQHL1TA/Design_Image/CF6EC34EF5MDAzMjQyNA==/Red_Medium/0032424_29042024100241935.jpg' />
                           <span style={{ fontFamily: '"PT Sans" sans-serif',color: '#B2B0B0' ,fontSize: '12px',}}>Rose/White Gold - GOLD 18K</span>
                            </div>
                          </div>
                          <div className='elv_filtered_prod_details'>
                            <div className='elv_filtered_prod_weights'>
                              <div style={{ display: 'flex'}}>
                                <span className='elv_prod_weight_span_1'>NWT&nbsp;: </span>
                                <span className='elv_prod_weight_span_2'>&nbsp;0.000</span>
                              </div>
                              <div style={{ display: 'flex'}}>
                              <span className='elv_prod_weight_span_1'>DWT&nbsp;: </span>
                              <span className='elv_prod_weight_span_2'>&nbsp;0/0</span>
                              </div>
                              <div style={{ display: 'flex'}}>
                              <span className='elv_prod_weight_span_1'>GWT&nbsp;: </span>
                              <span className='elv_prod_weight_span_2'>&nbsp;0.000</span>
                              </div>
                            </div>
                            <div className='elv_filtered_prod_price'>
                              <span className='elv_prod_weight_span_1'>A13345</span>
                              <span style={{ fontWeight: 'bold', textAlign: 'left', fontSize: '17px'}}>₹0</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='elv_filtered_prodlists_1' style={{ maxWidth: "calc(100% / 2)"}}>
                        <div className='elv_filtered_prods'>
                          <div className='elv_filtered_icons'>
                            <div>
                              <LocalMallOutlinedIcon border='#CBC7C7' />
                            </div>
                            <div>
                              <FavoriteBorderIcon border='#CBC7C7' />
                            </div>
                          </div>
                          <div style={{ display: "flex", justifyContent: 'center', alignItems: 'center'}}>
                            <div style={{ display: 'flex' , justifyContent: 'space-between',flexDirection: 'column', alignItems: 'center'}}>
                            <img className='elv_filtered_image_1' src='https://cdnfs.optigoapps.com/content-global3/estoreWJ3U0B6PVONQHL1TA/Design_Image/CF6EC34EF5MDAzMjQyNA==/Red_Medium/0032424_29042024100241935.jpg' />
                           <span style={{ fontFamily: '"PT Sans" sans-serif',color: '#B2B0B0' ,fontSize: '12px',}}>Rose/White Gold - GOLD 18K</span>
                            </div>
                          </div>
                          <div className='elv_filtered_prod_details'>
                            <div className='elv_filtered_prod_weights'>
                              <div style={{ display: 'flex'}}>
                                <span className='elv_prod_weight_span_1'>NWT&nbsp;: </span>
                                <span className='elv_prod_weight_span_2'>&nbsp;0.000</span>
                              </div>
                              <div style={{ display: 'flex'}}>
                              <span className='elv_prod_weight_span_1'>DWT&nbsp;: </span>
                              <span className='elv_prod_weight_span_2'>&nbsp;0/0</span>
                              </div>
                              <div style={{ display: 'flex'}}>
                              <span className='elv_prod_weight_span_1'>GWT&nbsp;: </span>
                              <span className='elv_prod_weight_span_2'>&nbsp;0.000</span>
                              </div>
                            </div>
                            <div className='elv_filtered_prod_price'>
                              <span className='elv_prod_weight_span_1'>A13345</span>
                              <span style={{ fontWeight: 'bold', textAlign: 'left', fontSize: '17px'}}>₹0</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='elv_filtered_prodlists_1' style={{ maxWidth: "calc(100% / 2)"}}>
                        <div className='elv_filtered_prods'>
                          <div className='elv_filtered_icons'>
                            <div>
                              <LocalMallOutlinedIcon border='#CBC7C7' />
                            </div>
                            <div>
                              <FavoriteBorderIcon border='#CBC7C7' />
                            </div>
                          </div>
                          <div style={{ display: "flex", justifyContent: 'center', alignItems: 'center'}}>
                            <div style={{ display: 'flex' , justifyContent: 'space-between',flexDirection: 'column', alignItems: 'center'}}>
                            <img className='elv_filtered_image_1' src='https://cdnfs.optigoapps.com/content-global3/estoreWJ3U0B6PVONQHL1TA/Design_Image/CF6EC34EF5MDAzMjQyNA==/Red_Medium/0032424_29042024100241935.jpg' />
                           <span style={{ fontFamily: '"PT Sans" sans-serif',color: '#B2B0B0' ,fontSize: '12px',}}>Rose/White Gold - GOLD 18K</span>
                            </div>
                          </div>
                          <div className='elv_filtered_prod_details'>
                            <div className='elv_filtered_prod_weights'>
                              <div style={{ display: 'flex'}}>
                                <span className='elv_prod_weight_span_1'>NWT&nbsp;: </span>
                                <span className='elv_prod_weight_span_2'>&nbsp;0.000</span>
                              </div>
                              <div style={{ display: 'flex'}}>
                              <span className='elv_prod_weight_span_1'>DWT&nbsp;: </span>
                              <span className='elv_prod_weight_span_2'>&nbsp;0/0</span>
                              </div>
                              <div style={{ display: 'flex'}}>
                              <span className='elv_prod_weight_span_1'>GWT&nbsp;: </span>
                              <span className='elv_prod_weight_span_2'>&nbsp;0.000</span>
                              </div>
                            </div>
                            <div className='elv_filtered_prod_price'>
                              <span className='elv_prod_weight_span_1'>A13345</span>
                              <span style={{ fontWeight: 'bold', textAlign: 'left', fontSize: '17px'}}>₹0</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      </>
                    )}
                    {activeIcon === 'apps' && (
                      <>
                        <div className='elv_filtered_prodlists_2' style={{ maxWidth: "calc(100% / 3)"}}>
                        <div className='elv_filtered_prods'>
                          <div className='elv_filtered_icons'>
                            <div>
                              <LocalMallOutlinedIcon border='#CBC7C7' />
                            </div>
                            <div>
                              <FavoriteBorderIcon border='#CBC7C7' />
                            </div>
                          </div>
                         <div style={{ display: "flex", justifyContent: 'center', alignItems: 'center'}}>
                            <div style={{ display: 'flex' , justifyContent: 'space-between',flexDirection: 'column', alignItems: 'center'}}>
                            <img className='elv_filtered_image_2' src='https://cdnfs.optigoapps.com/content-global3/estoreWJ3U0B6PVONQHL1TA/Design_Image/CF6EC34EF5MDAzMjQyNA==/Red_Medium/0032424_29042024100241935.jpg' />
                           <span style={{ fontFamily: '"PT Sans" sans-serif',color: '#B2B0B0' ,fontSize: '12px',}}>Rose/White Gold - GOLD 18K</span>
                            </div>
                          </div>
                          <div className='elv_filtered_prod_details'>
                            <div className='elv_filtered_prod_weights'>
                              <div style={{ display: 'flex'}}>
                                <span className='elv_prod_weight_span_1'>NWT&nbsp;: </span>
                                <span className='elv_prod_weight_span_2'>&nbsp;0.000</span>
                              </div>
                              <div style={{ display: 'flex'}}>
                              <span className='elv_prod_weight_span_1'>DWT&nbsp;: </span>
                              <span className='elv_prod_weight_span_2'>&nbsp;0/0</span>
                              </div>
                              <div style={{ display: 'flex'}}>
                              <span className='elv_prod_weight_span_1'>GWT&nbsp;: </span>
                              <span className='elv_prod_weight_span_2'>&nbsp;0.000</span>
                              </div>
                            </div>
                            <div className='elv_filtered_prod_price'>
                              <span className='elv_prod_weight_span_1'>A13345</span>
                              <span style={{ fontWeight: 'bold', textAlign: 'left', fontSize: '17px'}}>₹0</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='elv_filtered_prodlists_2' style={{ maxWidth: "calc(100% / 3)"}}>
                        <div className='elv_filtered_prods'>
                          <div className='elv_filtered_icons'>
                            <div>
                              <LocalMallOutlinedIcon border='#CBC7C7' />
                            </div>
                            <div>
                              <FavoriteBorderIcon border='#CBC7C7' />
                            </div>
                          </div>
                         <div style={{ display: "flex", justifyContent: 'center', alignItems: 'center'}}>
                            <div style={{ display: 'flex' , justifyContent: 'space-between',flexDirection: 'column', alignItems: 'center'}}>
                            <img className='elv_filtered_image_2' src='https://cdnfs.optigoapps.com/content-global3/estoreWJ3U0B6PVONQHL1TA/Design_Image/CF6EC34EF5MDAzMjQyNA==/Red_Medium/0032424_29042024100241935.jpg' />
                           <span style={{ fontFamily: '"PT Sans" sans-serif',color: '#B2B0B0' ,fontSize: '12px',}}>Rose/White Gold - GOLD 18K</span>
                            </div>
                          </div>
                          <div className='elv_filtered_prod_details'>
                            <div className='elv_filtered_prod_weights'>
                              <div style={{ display: 'flex'}}>
                                <span className='elv_prod_weight_span_1'>NWT&nbsp;: </span>
                                <span className='elv_prod_weight_span_2'>&nbsp;0.000</span>
                              </div>
                              <div style={{ display: 'flex'}}>
                              <span className='elv_prod_weight_span_1'>DWT&nbsp;: </span>
                              <span className='elv_prod_weight_span_2'>&nbsp;0/0</span>
                              </div>
                              <div style={{ display: 'flex'}}>
                              <span className='elv_prod_weight_span_1'>GWT&nbsp;: </span>
                              <span className='elv_prod_weight_span_2'>&nbsp;0.000</span>
                              </div>
                            </div>
                            <div className='elv_filtered_prod_price'>
                              <span className='elv_prod_weight_span_1'>A13345</span>
                              <span style={{ fontWeight: 'bold', textAlign: 'left', fontSize: '17px'}}>₹0</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='elv_filtered_prodlists_2' style={{ maxWidth: "calc(100% / 3)"}}>
                        <div className='elv_filtered_prods'>
                          <div className='elv_filtered_icons'>
                            <div>
                              <LocalMallOutlinedIcon border='#CBC7C7' />
                            </div>
                            <div>
                              <FavoriteBorderIcon border='#CBC7C7' />
                            </div>
                          </div>
                         <div style={{ display: "flex", justifyContent: 'center', alignItems: 'center'}}>
                            <div style={{ display: 'flex' , justifyContent: 'space-between',flexDirection: 'column', alignItems: 'center'}}>
                            <img className='elv_filtered_image_2' src='https://cdnfs.optigoapps.com/content-global3/estoreWJ3U0B6PVONQHL1TA/Design_Image/CF6EC34EF5MDAzMjQyNA==/Red_Medium/0032424_29042024100241935.jpg' />
                           <span style={{ fontFamily: '"PT Sans" sans-serif',color: '#B2B0B0' ,fontSize: '12px',}}>Rose/White Gold - GOLD 18K</span>
                            </div>
                          </div>
                          <div className='elv_filtered_prod_details'>
                            <div className='elv_filtered_prod_weights'>
                              <div style={{ display: 'flex'}}>
                                <span className='elv_prod_weight_span_1'>NWT&nbsp;: </span>
                                <span className='elv_prod_weight_span_2'>&nbsp;0.000</span>
                              </div>
                              <div style={{ display: 'flex'}}>
                              <span className='elv_prod_weight_span_1'>DWT&nbsp;: </span>
                              <span className='elv_prod_weight_span_2'>&nbsp;0/0</span>
                              </div>
                              <div style={{ display: 'flex'}}>
                              <span className='elv_prod_weight_span_1'>GWT&nbsp;: </span>
                              <span className='elv_prod_weight_span_2'>&nbsp;0.000</span>
                              </div>
                            </div>
                            <div className='elv_filtered_prod_price'>
                              <span className='elv_prod_weight_span_1'>A13345</span>
                              <span style={{ fontWeight: 'bold', textAlign: 'left', fontSize: '17px'}}>₹0</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='elv_filtered_prodlists_2' style={{ maxWidth: "calc(100% / 3)"}}>
                        <div className='elv_filtered_prods'>
                          <div className='elv_filtered_icons'>
                            <div>
                              <LocalMallOutlinedIcon border='#CBC7C7' />
                            </div>
                            <div>
                              <FavoriteBorderIcon border='#CBC7C7' />
                            </div>
                          </div>
                         <div style={{ display: "flex", justifyContent: 'center', alignItems: 'center'}}>
                            <div style={{ display: 'flex' , justifyContent: 'space-between',flexDirection: 'column', alignItems: 'center'}}>
                            <img className='elv_filtered_image_2' src='https://cdnfs.optigoapps.com/content-global3/estoreWJ3U0B6PVONQHL1TA/Design_Image/CF6EC34EF5MDAzMjQyNA==/Red_Medium/0032424_29042024100241935.jpg' />
                           <span style={{ fontFamily: '"PT Sans" sans-serif',color: '#B2B0B0' ,fontSize: '12px',}}>Rose/White Gold - GOLD 18K</span>
                            </div>
                          </div>
                          <div className='elv_filtered_prod_details'>
                            <div className='elv_filtered_prod_weights'>
                              <div style={{ display: 'flex'}}>
                                <span className='elv_prod_weight_span_1'>NWT&nbsp;: </span>
                                <span className='elv_prod_weight_span_2'>&nbsp;0.000</span>
                              </div>
                              <div style={{ display: 'flex'}}>
                              <span className='elv_prod_weight_span_1'>DWT&nbsp;: </span>
                              <span className='elv_prod_weight_span_2'>&nbsp;0/0</span>
                              </div>
                              <div style={{ display: 'flex'}}>
                              <span className='elv_prod_weight_span_1'>GWT&nbsp;: </span>
                              <span className='elv_prod_weight_span_2'>&nbsp;0.000</span>
                              </div>
                            </div>
                            <div className='elv_filtered_prod_price'>
                              <span className='elv_prod_weight_span_1'>A13345</span>
                              <span style={{ fontWeight: 'bold', textAlign: 'left', fontSize: '17px'}}>₹0</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      </>
                    )}
                    {activeIcon === 'view_grid' && (
                      <>
                        <div className='elv_filtered_prodlists_3' style={{ maxWidth: "calc(100% / 4)"}}>
                        <div className='elv_filtered_prods'>
                          <div className='elv_filtered_icons'>
                            <div>
                              <LocalMallOutlinedIcon border='#CBC7C7' />
                            </div>
                            <div>
                              <FavoriteBorderIcon border='#CBC7C7' />
                            </div>
                          </div>
                          <div style={{ display: "flex", justifyContent: 'center', alignItems: 'center'}}>
                            <div style={{ display: 'flex' , justifyContent: 'space-between',flexDirection: 'column', alignItems: 'center'}}>
                            <img className='elv_filtered_image_3' src='https://cdnfs.optigoapps.com/content-global3/estoreWJ3U0B6PVONQHL1TA/Design_Image/CF6EC34EF5MDAzMjQyNA==/Red_Medium/0032424_29042024100241935.jpg' />
                           <span style={{ fontFamily: '"PT Sans" sans-serif',color: '#B2B0B0' ,fontSize: '12px',}}>Rose/White Gold - GOLD 18K</span>
                            </div>
                          </div>
                          <div className='elv_filtered_prod_details'>
                            <div className='elv_filtered_prod_weights'>
                              <div style={{ display: 'flex'}}>
                                <span className='elv_prod_weight_span_1'>NWT&nbsp;: </span>
                                <span className='elv_prod_weight_span_2'>&nbsp;0.000</span>
                              </div>
                              <div style={{ display: 'flex'}}>
                              <span className='elv_prod_weight_span_1'>DWT&nbsp;: </span>
                              <span className='elv_prod_weight_span_2'>&nbsp;0/0</span>
                              </div>
                              <div style={{ display: 'flex'}}>
                              <span className='elv_prod_weight_span_1'>GWT&nbsp;: </span>
                              <span className='elv_prod_weight_span_2'>&nbsp;0.000</span>
                              </div>
                            </div>
                            <div className='elv_filtered_prod_price'>
                              <span className='elv_prod_weight_span_1'>A13345</span>
                              <span style={{ fontWeight: 'bold', textAlign: 'left', fontSize: '17px'}}>₹0</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='elv_filtered_prodlists_3' style={{ maxWidth: "calc(100% / 4)"}}>
                        <div className='elv_filtered_prods'>
                          <div className='elv_filtered_icons'>
                            <div>
                              <LocalMallOutlinedIcon border='#CBC7C7' />
                            </div>
                            <div>
                              <FavoriteBorderIcon border='#CBC7C7' />
                            </div>
                          </div>
                          <div style={{ display: "flex", justifyContent: 'center', alignItems: 'center'}}>
                            <div style={{ display: 'flex' , justifyContent: 'space-between',flexDirection: 'column', alignItems: 'center'}}>
                            <img className='elv_filtered_image_3' src='https://cdnfs.optigoapps.com/content-global3/estoreWJ3U0B6PVONQHL1TA/Design_Image/CF6EC34EF5MDAzMjQyNA==/Red_Medium/0032424_29042024100241935.jpg' />
                           <span style={{ fontFamily: '"PT Sans" sans-serif',color: '#B2B0B0' ,fontSize: '12px',}}>Rose/White Gold - GOLD 18K</span>
                            </div>
                          </div>
                          <div className='elv_filtered_prod_details'>
                            <div className='elv_filtered_prod_weights'>
                              <div style={{ display: 'flex'}}>
                                <span className='elv_prod_weight_span_1'>NWT&nbsp;: </span>
                                <span className='elv_prod_weight_span_2'>&nbsp;0.000</span>
                              </div>
                              <div style={{ display: 'flex'}}>
                              <span className='elv_prod_weight_span_1'>DWT&nbsp;: </span>
                              <span className='elv_prod_weight_span_2'>&nbsp;0/0</span>
                              </div>
                              <div style={{ display: 'flex'}}>
                              <span className='elv_prod_weight_span_1'>GWT&nbsp;: </span>
                              <span className='elv_prod_weight_span_2'>&nbsp;0.000</span>
                              </div>
                            </div>
                            <div className='elv_filtered_prod_price'>
                              <span className='elv_prod_weight_span_1'>A13345</span>
                              <span style={{ fontWeight: 'bold', textAlign: 'left', fontSize: '17px'}}>₹0</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='elv_filtered_prodlists_3' style={{ maxWidth: "calc(100% / 4)"}}>
                        <div className='elv_filtered_prods'>
                          <div className='elv_filtered_icons'>
                            <div>
                              <LocalMallOutlinedIcon border='#CBC7C7' />
                            </div>
                            <div>
                              <FavoriteBorderIcon border='#CBC7C7' />
                            </div>
                          </div>
                          <div style={{ display: "flex", justifyContent: 'center', alignItems: 'center'}}>
                            <div style={{ display: 'flex' , justifyContent: 'space-between',flexDirection: 'column', alignItems: 'center'}}>
                            <img className='elv_filtered_image_3' src='https://cdnfs.optigoapps.com/content-global3/estoreWJ3U0B6PVONQHL1TA/Design_Image/CF6EC34EF5MDAzMjQyNA==/Red_Medium/0032424_29042024100241935.jpg' />
                           <span style={{ fontFamily: '"PT Sans" sans-serif',color: '#B2B0B0' ,fontSize: '12px',}}>Rose/White Gold - GOLD 18K</span>
                            </div>
                          </div>
                          <div className='elv_filtered_prod_details'>
                            <div className='elv_filtered_prod_weights'>
                              <div style={{ display: 'flex'}}>
                                <span className='elv_prod_weight_span_1'>NWT&nbsp;: </span>
                                <span className='elv_prod_weight_span_2'>&nbsp;0.000</span>
                              </div>
                              <div style={{ display: 'flex'}}>
                              <span className='elv_prod_weight_span_1'>DWT&nbsp;: </span>
                              <span className='elv_prod_weight_span_2'>&nbsp;0/0</span>
                              </div>
                              <div style={{ display: 'flex'}}>
                              <span className='elv_prod_weight_span_1'>GWT&nbsp;: </span>
                              <span className='elv_prod_weight_span_2'>&nbsp;0.000</span>
                              </div>
                            </div>
                            <div className='elv_filtered_prod_price'>
                              <span className='elv_prod_weight_span_1'>A13345</span>
                              <span style={{ fontWeight: 'bold', textAlign: 'left', fontSize: '17px'}}>₹0</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='elv_filtered_prodlists_3' style={{ maxWidth: "calc(100% / 4)"}}>
                        <div className='elv_filtered_prods'>
                          <div className='elv_filtered_icons'>
                            <div>
                              <LocalMallOutlinedIcon border='#CBC7C7' />
                            </div>
                            <div>
                              <FavoriteBorderIcon border='#CBC7C7' />
                            </div>
                          </div>
                          <div style={{ display: "flex", justifyContent: 'center', alignItems: 'center'}}>
                            <div style={{ display: 'flex' , justifyContent: 'space-between',flexDirection: 'column', alignItems: 'center'}}>
                            <img className='elv_filtered_image_3' src='https://cdnfs.optigoapps.com/content-global3/estoreWJ3U0B6PVONQHL1TA/Design_Image/CF6EC34EF5MDAzMjQyNA==/Red_Medium/0032424_29042024100241935.jpg' />
                           <span style={{ fontFamily: '"PT Sans" sans-serif',color: '#B2B0B0' ,fontSize: '12px',}}>Rose/White Gold - GOLD 18K</span>
                            </div>
                          </div>
                          <div className='elv_filtered_prod_details'>
                            <div className='elv_filtered_prod_weights'>
                              <div style={{ display: 'flex'}}>
                                <span className='elv_prod_weight_span_1'>NWT&nbsp;: </span>
                                <span className='elv_prod_weight_span_2'>&nbsp;0.000</span>
                              </div>
                              <div style={{ display: 'flex'}}>
                              <span className='elv_prod_weight_span_1'>DWT&nbsp;: </span>
                              <span className='elv_prod_weight_span_2'>&nbsp;0/0</span>
                              </div>
                              <div style={{ display: 'flex'}}>
                              <span className='elv_prod_weight_span_1'>GWT&nbsp;: </span>
                              <span className='elv_prod_weight_span_2'>&nbsp;0.000</span>
                              </div>
                            </div>
                            <div className='elv_filtered_prod_price'>
                              <span className='elv_prod_weight_span_1'>A13345</span>
                              <span style={{ fontWeight: 'bold', textAlign: 'left', fontSize: '17px'}}>₹0</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      </>
                    )}
                  </div>
                </div>
                  </>
                )}
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductList