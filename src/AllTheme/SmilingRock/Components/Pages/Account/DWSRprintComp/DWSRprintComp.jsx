import React, { useEffect, useState } from 'react';
import "./DWSRprintComp.scss";
import { useLocation } from 'react-router-dom';
import { handleOrderImageError } from '../../../../../../utils/API/AccountTabs/OrderHistory';

const DWSRprintComp = () => {
    // console.log(JSON.parse(sessionStorage.getItem('dwsrdata')));;
    // const location = useLocation();
    // const bigData = location.state?.bigData;

    const [bigData, setBigData] = useState([]);

    // Retrieve bigData from sessionStorage
    useEffect(() => {
        const storedData = JSON.parse(sessionStorage.getItem('dwsrdata'));
        if (storedData) {
            setBigData(storedData);
        }
    }, []);

  return (
    <>
    <div className='dsr_container'>
        <div className='print_btn_none_dsr' style={{display:'flex', justifyContent:'flex-end', paddingBottom:'10px'}}><button className='printBtnDSR'  onClick={() => window.print()}>Print</button></div>
        <div className='dsr_headtitle'>DESIGN WISE SALES PRINT</div>
        <div>
            <div style={{fontSize:'16px', fontWeight:'bold'}} className='header_content_dsr2'>Optigo</div>
            <div className='header_content_dsr'>57 Bansant lok, opposite to dmart-mall</div>
            <div className='header_content_dsr'>Vasant vihar12 , Near park , main ring road</div>
            <div className='header_content_dsr'>New Delhi - 605001 , GUJARAT(India)</div>
            <div className='header_content_dsr'>T 9510213589</div>
            <div className='header_content_dsr'>darren@orail.co.in | www.optigoapps.com</div>
        </div>
        <div className='card_loop_dsr'>
            {
                bigData?.map((e, i) => {
                    return (
                        <React.Fragment key={i}>
                            <div className='card_section_dsr'>
                                <div><img src={e?.imgsrc} alt='#designImg' className='viewImage_dsr' onError={handleOrderImageError} /></div>
                                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                                    <div className='card_content_dsr2'>{e?.designno}</div>
                                    <div className='card_content_dsr3'>Netwt: {e?.DesignNetWt?.toFixed(3)}</div>
                                </div>
                                <div className='card_content_dsr w_100_dsr_page'>Dia/cs wt:{e?.diamondwt?.toFixed(3)}/{e?.colorstonewt?.toFixed(3)}</div>
                                <div className='card_content_dsr w_100_dsr_page'>Purchase Count:{e?.salescount}</div>
                            </div>
                        </React.Fragment>
                    )
                })
            }
        </div>
    </div>
    </>
  )
}

export default DWSRprintComp