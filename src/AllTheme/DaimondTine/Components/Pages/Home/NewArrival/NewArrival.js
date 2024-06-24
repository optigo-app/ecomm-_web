import React, { useEffect, useState } from 'react'
import './NewArrival.modul.scss'
import { Get_Tren_BestS_NewAr_DesigSet_Album } from '../../../../../../utils/API/Home/Get_Tren_BestS_NewAr_DesigSet_Album/Get_Tren_BestS_NewAr_DesigSet_Album';
import { Grid } from '@mui/material';

const NewArrival = () => {
    

    const [newArrivalData, setNewArrivalData] = useState([]);
    const [imageUrl, setImageUrl] = useState();

    useEffect(() => {
        let data = JSON.parse(localStorage.getItem('storeInit'))
        setImageUrl(data?.DesignImageFol);

        Get_Tren_BestS_NewAr_DesigSet_Album("GETNewArrival").then((response) => {
            if (response?.Data?.rd) {
                setNewArrivalData(response?.Data?.rd);
            }
        }).catch((err) => console.log(err))
    }, [])
console.log('aaaaaaaaa',newArrivalData);

  return (
    <div className='dt_newArrivalMain'>
            <h1 className='dt_titleNewArrival' style={{ textAlign: 'center', padding: '20px 0px 20px 0px' }}>NEW ARRIVAL</h1>
            <Grid container spacing={2} justifyContent="center" style={{paddingInline: '20px'}}>
                    {newArrivalData?.slice(0 , 8).map((product, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index} className='NewArrivalProductMain'>
                            <div style={{ paddingBottom: '20px'}}>
                                <img
                                    style={{ height: "100%", width: "100%" }}
                                    src={`${imageUrl}/${product?.designno}_1.${product.ImageExtension}`}
                                    // src={product.image}
                                    alt={product.title}
                                    loading='lazy'
                                />
                                <div>
                                    <p className='dt_newArrivalPdTitle' style={{ margin: "8px 0", fontSize: "16px", fontWeight: "500" }}>
                                        {product.TitleLine}
                                    </p>
                                    <p className='dt_newArrivalPdPrice' style={{ margin: "0", fontSize: '15px', color: "#666" }}>
                                        ₹ {product.UnitCost}
                                    </p>
                                </div>
                            </div>
                        </Grid>
                    ))}
                </Grid>

    </div>
  )
}

export default NewArrival