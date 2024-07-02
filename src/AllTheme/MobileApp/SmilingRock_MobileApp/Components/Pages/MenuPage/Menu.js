import React, { useEffect, useState } from 'react'
import './Menu.modul.scss'
import { IoClose } from 'react-icons/io5';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick'
import { Box, ButtonBase, List, ListItem, ListItemText, Tab, Tabs, Typography } from '@mui/material';
import { TabContext, TabPanel } from '@mui/lab';
import SwipeableViews from 'react-swipeable-views';
import { toast } from 'react-toastify';
import { smrMA_loginState } from '../../Recoil/atom';
import { GetMenuAPI } from '../../../../../../utils/API/GetMenuAPI/GetMenuAPI';

const Menu = () => {

    const navigation = useNavigate();
    const [islogin, setislogin] = useRecoilState(smrMA_loginState);
    const [isB2bFlag, setIsB2BFlaf] = useState('');
    const [menuData, setMenuData] = useState([]);
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        let storeinit = JSON.parse(localStorage.getItem("storeInit"));
        let isUserLogin = JSON.parse(localStorage.getItem("LoginUser"));
        if (storeinit?.IsB2BWebsite === 0) {
            getMenuApi();
            return;
        } else if (storeinit?.IsB2BWebsite === 1 && isUserLogin === true) {
            getMenuApi();
            return;
        } else {
            return;
        }
    }, [islogin]);

    const getMenuApi = async () => {
        await GetMenuAPI().then((response) => {
            setMenuData(response?.Data?.rd)
        }).catch((err) => console.log(err))
    }


    useEffect(() => {
        const uniqueMenuIds = [...new Set(menuData?.map(item => item?.menuid))];
        const uniqueMenuItems = uniqueMenuIds.map(menuid => {
            const item = menuData?.find(data => data?.menuid === menuid);
            const param1DataIds = [...new Set(menuData?.filter(data => data?.menuid === menuid)?.map(item => item?.param1dataid))];

            const param1Items = param1DataIds.map(param1dataid => {
                const param1Item = menuData?.find(data => data?.menuid === menuid && data?.param1dataid === param1dataid);
                const param2Items = menuData?.filter(data => data?.menuid === menuid && data?.param1dataid === param1dataid)?.map(item => ({
                    param2dataid: item?.param2dataid,
                    param2dataname: item?.param2dataname,
                    param2id: item?.param2id,
                    param2name: item?.param2name
                }));
                return {
                    menuname: param1Item?.menuname,
                    param1dataid: param1Item?.param1dataid,
                    param1dataname: param1Item?.param1dataname,
                    param1id: param1Item?.param1id,
                    param1name: param1Item?.param1name,
                    param2: param2Items
                };
            });

            return {
                menuid: item?.menuid,
                menuname: item?.menuname,
                param0dataid: item?.param0dataid,
                param0dataname: item?.param0dataname,
                param0id: item?.param0id,
                param0name: item?.param0name,
                param1: param1Items
            };
        });

        setMenuItems(uniqueMenuItems);
    }, [menuData]);



    const [selectedMenu, setSelectedMenu] = useState(menuItems[0]?.menuname);
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
        handleLoginMenuClickSwipe(menuItems[index].menuname, null, "iconclicked")
    };

    const handleLoginMenuClickSwipe = (menuName, menuItem, iconclicked) => {

        if (iconclicked == 'iconclicked') {
            setSelectedMenu(prevMenu => (prevMenu === menuName ? menuName : menuName));
            return;
        }
        const { param1, ...menuItemWithoutParam1 } = menuItem;
        handleMenuClick(menuItemWithoutParam1)
    };

    const handleLoginMenuClickMainMenu = (menuName, menuItem, iconclicked) => {

        if (iconclicked == 'iconclicked') {
            setSelectedMenu(prevMenu => (prevMenu === menuName ? menuName : menuName));
            return;
        }
        const { param1, ...menuItemWithoutParam1 } = menuItem;
        handleMenuClick(menuItemWithoutParam1)
    };

    const handleLoginMenuClick = (menuName, menuItem, iconclicked) => {

        if (iconclicked == 'iconclicked') {
            navigation('/productpage');
            setSelectedMenu(prevMenu => (prevMenu === menuName ? menuName : menuName));
            return;
        }
        const { param1, ...menuItemWithoutParam1 } = menuItem;
        handleMenuClick(menuItemWithoutParam1)
    };

    const handleSubMenuClick = (menuItem, subMenuName, subMenuItem, iconclicked) => {
        navigation('/productpage');
        const { param1, ...menuItemWithoutParam1 } = menuItem;
        const { param2, ...subMenuItemWithoutParam2 } = subMenuItem;
        handleMenuClick({ ...menuItemWithoutParam1, ...subMenuItemWithoutParam2 });
    };

    const handleSubSubMenuClick = (menuItem, subMenuItem, subSubMenuName, subSubMenuItem) => {
        navigation('/productpage');
        const { param1, ...menuItemWithoutParam1 } = menuItem;
        const { param2, ...subMenuItemWithoutParam2 } = subMenuItem;
        handleMenuClick({ ...menuItemWithoutParam1, ...subMenuItemWithoutParam2, ...subSubMenuItem })
    };


    const handleMenuClick = async (menuItem, param1Item = null, param2Item = null) => {
        const { param1, param2, ...cleanedMenuItem } = menuItem;
        let menuDataObj = { ...cleanedMenuItem };

        if (param1Item) {
            const { param1, param2, ...cleanedParam1Item } = param1Item;
            menuDataObj = { ...menuDataObj, ...cleanedParam1Item };
            if (param2Item) {
                menuDataObj = { ...menuDataObj, ...param2Item };
            }
        } else {
            console.log('Menu Item:', cleanedMenuItem);
        }
        let finalData = {
            menuname: menuDataObj?.menuname ?? "",
            FilterKey: menuDataObj.param0name ?? "",
            FilterVal: menuDataObj.param0dataname ?? "",
            FilterKey1: menuDataObj?.param1name ?? "",
            FilterVal1: menuDataObj?.param1dataname ?? "",
            FilterKey2: menuDataObj?.param2name ?? "",
            FilterVal2: menuDataObj?.param2dataname ?? ""
        }
        navigation(`/productpage`, { state: { menuFlag: finalData?.menuname, filtervalue: finalData } })
        localStorage.setItem('menuparams', JSON.stringify(finalData));
    };

    console.log('menuItemsmenuItems',menuItems);
    return (
        <div className='smrMA_menuPageMain'>
            <TabContext value={value}>
                {/* {islogin === true && */}
                 <div className='tabMainMenu'>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        textColor="primary"
                        indicatorColor="primary"
                        centered
                        variant='scrollable'
                        className='tabMainSmilingMobile'
                    >
                        {menuItems.map((item, index) => (
                            <Tab label={item.menuname} onClick={() => handleLoginMenuClickMainMenu(item.menuname, null, "iconclicked")} />
                        ))}
                    </Tabs>
                </div>
                {/* } */}



                <SwipeableViews
                    index={value}
                    onChangeIndex={handleChangeIndex}
                    enableMouseEvents
                    animateTransitions
                    style={{ minHeight: '600px' }}
                >
                    {menuItems.map(menuItem => (
                        <TabPanel value={value} index={0} style={{ marginInline: '15%', padding: '0px', marginBottom: '100px' }}>
                            {selectedMenu === menuItem.menuname && (
                                <>
                                    <ButtonBase
                                        component="div"
                                        onClick={() => handleLoginMenuClick(menuItem.menuname, menuItem)}
                                        style={{ width: '100%', display: 'flex', justifyContent: 'start' }}
                                    >
                                        <div style={{ paddingLeft: '10px', fontSize: '15px', marginTop: '5px' }}>
                                            <button class="smrMA_menuVieAllLink">view all</button>
                                        </div>
                                    </ButtonBase>
                                    <List>
                                        {menuItem.param1.map(subMenuItem => (
                                            <div key={subMenuItem.param1dataid}>
                                                <ButtonBase
                                                    component="div"
                                                    onClick={() => handleSubMenuClick(menuItem, subMenuItem.param1dataname, subMenuItem)}
                                                    style={{ width: '100%' }}
                                                >
                                                    <p style={{ margin: '0px 0px 0px 15px', width: '100%', fontWeight: 500, height: '38px', display: 'flex', alignItems: 'center' }}>{subMenuItem.param1dataname}</p>
                                                </ButtonBase>
                                                {selectedMenu === menuItem.menuname && (
                                                    <>
                                                        <List style={{ paddingTop: '0px', paddingBottom: '0px' }}>
                                                            {subMenuItem.param2.map(subSubMenuItem => (
                                                                <ButtonBase
                                                                    component="div"
                                                                    onClick={() => handleSubSubMenuClick(menuItem, subMenuItem, subSubMenuItem.param2dataname, subSubMenuItem)}
                                                                    style={{ width: '100%', height: '30px' }}
                                                                >
                                                                    <ListItem key={subSubMenuItem.param2dataid} style={{ paddingTop: '0px', paddingBottom: '0px' }}>
                                                                        <ListItemText primary={subSubMenuItem.param2dataname} className="muilist2ndSubMenutext" style={{ height: '38px', display: 'flex', alignItems: 'center' }} />
                                                                    </ListItem>
                                                                </ButtonBase>
                                                            ))}
                                                        </List>
                                                    </>
                                                )}
                                            </div>
                                        ))}
                                    </List>
                                </>
                            )}
                        </TabPanel>
                    ))}
                    {/* <TabPanel value={value} index={1} style={{ marginInline: '15%', padding: '0px' }}>


                    </TabPanel>
                    <TabPanel value={value} index={2} style={{ marginInline: '15%', padding: '0px' }}>


                    </TabPanel> */}
                </SwipeableViews>
            </TabContext>

        </div>
    )
}

export default Menu