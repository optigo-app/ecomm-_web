import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import './smr_cartPageB2c.scss';
import QuantitySelector from './QuantitySelector';

const Cart = ({ isOpen, toggleDrawer }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div className="smr_B2cCart">
      <Drawer
        anchor="right"
        open={isOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          style: {
            width: isMobile ? '100%' : '40%',
          },
        }}
      >
        <div className="smr_B2C-container">
          <table className="smr_B2C-table smr_B2C-table-xs">
            <tbody>
              <tr className="smr_B2C-item-row">
                <td><img src="http://placehold.it/150x150" alt="Item 1" /></td>
                <td className='smr_b2ccartContentTd'>
                  <p className='smr_b2ccartContentTitle'>Drizzle 0.08ct Lab Grown Diamond Pendant P-00233WHT</p>
                  <p className='smr_b2ccartContentMtDT'>Rose Gold / 18 Inches / 0.8</p>
                  <QuantitySelector/>
                </td>
                <td className="smr_B2C-text-right" title="Amount">Ships in 14 days</td>
                <td className="smr_B2C-text-right" title="Total">6.00</td>
              </tr>
              <tr className="smr_B2C-item-row smr_B2C-item-row-last">
                <td><img src="http://placehold.it/150x150" alt="Item 2" /></td>
                <td className='smr_b2ccartContentTd'>
                  <p className='smr_b2ccartContentTitle'>Drizzle 0.08ct Lab Grown Diamond Pendant P-00233WHT</p>
                  <p className='smr_b2ccartContentMtDT'>Rose Gold / 18 Inches / 0.8</p>
                  <QuantitySelector/>
                </td>
                <td className="smr_B2C-text-right" title="Amount">Ships in 14 days</td>
                <td className="smr_B2C-text-right" title="Total">12.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Drawer>
    </div>
  );
};

export default Cart;
