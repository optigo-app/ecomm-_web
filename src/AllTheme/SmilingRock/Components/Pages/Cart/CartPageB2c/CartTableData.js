import React, { useEffect, useState } from 'react';
import QuantitySelector from './QuantitySelector';
import { GetCountAPI } from '../../../../../../utils/API/GetCount/GetCountAPI';
import { CartCount } from '../../../Recoil/atom';
import { useSetRecoilState } from 'recoil';

const ExampleComponent = ({
    cartData,
    CurrencyData,
    qtyCount,
    CartCardImageFunc,
    noImageFound,
    decodeEntities,
    handleDecrement,
    handleIncrement,
    onRemove

}) => {
    const setCartCountVal = useSetRecoilState(CartCount)
    const [storeInitData, setStoreInitData] = useState();
    const [countstatus, setCountStatus] = useState();

    useEffect(() => {
        const storeinitData = JSON.parse(localStorage.getItem('storeInit'));
        setStoreInitData(storeinitData)
        const isCartUpdateStatus = localStorage.getItem('cartUpdation');
        setCountStatus(isCartUpdateStatus)
    }, [onRemove])

    const handleRemoveItem = (item) => {
        onRemove(item)
        setTimeout(() => {
          if (countstatus) {
            GetCountAPI().then((res) => {
              console.log('responseCount', res);
              setCartCountVal(res?.cartcount);
            })
          }
        }, 500)
      }

    return (
        <table className="smr_B2C-table smr_B2C-table-xs">
            <tbody>
                {cartData.map((item) => (
                    <tr key={item.id} className="smr_B2C-item-row">
                        <td>
                            <img
                                className='smr_b2ccartImage'
                                src={item?.ImageCount !== 0 ? CartCardImageFunc(item) : noImageFound}
                                alt={`Item images`}
                            />
                        </td>
                        <td className='smr_b2ccartContentTd'>
                            <p className='smr_b2ccartContentTitle'>{item?.TitleLine}</p>
                            {/* <p className='smr_b2ccartContentMtDT'>{item?.metalcolorname} | {item?.MetalWeight} | {item?.totalGrossweight} | {item?.totalDiaWt} / {item?.totaldiamondpcs} | {item?.totalCSWt}  / {item?.totalcolorstonepcs}</p> */}
                            <p className='smr_b2ccartContentMtDT'>
                                <span className='smr_b2ccartContentItem'>{item?.metalcolorname}</span> |
                                <span className='smr_b2ccartContentItem'>{item?.MetalWeight}</span> |
                                <span className='smr_b2ccartContentItem'>{item?.totalGrossweight}</span> |
                                <span className='smr_b2ccartContentItem'>{item?.totalDiaWt} / {item?.totaldiamondpcs}</span> |
                                <span className='smr_b2ccartContentItem'>{item?.totalCSWt} / {item?.totalcolorstonepcs}</span>
                            </p>

                            <div className='smr_b2cCartQTRm'>

                                <QuantitySelector
                                    cartData={item}
                                    qtyCount={qtyCount}
                                    handleIncrement={handleIncrement}
                                    handleDecrement={handleDecrement}
                                />
                                <p className='smr_b2cCartRmBtn' onClick={() => handleRemoveItem(item)}>Remove</p>
                            </div>
                        </td>
                        <td className="smr_B2C-text-right" title="Shipping Info">{item.shippingInfo}</td>
                        <td className="smr_B2C-text-right" title="Total">
                            {storeInitData?.IsPriceShow == 1 &&
                                <span>
                                    <span
                                        className="smr_currencyFont"
                                        dangerouslySetInnerHTML={{
                                            __html: decodeEntities(
                                                CurrencyData?.Currencysymbol
                                            ),
                                        }}
                                    />
                                    {(item?.UnitCostWithmarkup)}
                                </span>
                            }</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ExampleComponent;
