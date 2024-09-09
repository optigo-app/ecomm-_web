import { Box, Tab, Tabs, Typography } from '@mui/material';
import React, { useState } from 'react';
import OrderHistory from '../AccountOrderHistory/OrderHisoty';
import OrderHistory2 from '../OrderHistory2/OrderHistory2';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
            className='w-100'
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

const OrderHistoryGroup = () => {
    const [activeTab, setActiveTab] = useState(0); // State to track the active tab
    const [value, setValue] = useState(0);
    const loginUSerDeatil = JSON.parse(sessionStorage.getItem('loginUserDetail'))

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const tabIndicator = {
        '& .MuiTab-textColorPrimary.Mui-selected': {
            color: "#3b3c3d",
        },
        '& .MuiTabs-indicator': {
            backgroundColor: "#3b3c3d"
        }
    };
    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }
    
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'flex-start',marginTop:'1rem', borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" sx={{...tabIndicator}} >
                    <Tab label="Order History 1" {...a11yProps(0)}  sx={{ ...tabIndicator }} />
                    <Tab label="ORDER HISTORY 2" {...a11yProps(1)}  sx={{ ...tabIndicator }} />
                </Tabs>
            </Box>
            <div className='d-flex'>
                <CustomTabPanel value={activeTab} index={0}>
                    <OrderHistory />
                </CustomTabPanel>
                <CustomTabPanel value={activeTab} index={1}>
                    <OrderHistory2 />
                </CustomTabPanel>
            </div>
        </>
    );
}

export default OrderHistoryGroup;
