import React from 'react';
import QuantitySelector from './QuantitySelector';

const ExampleComponent = ({ dummyData, CartCardImageFunc, noImageFound }) => {
  return (
    <table className="smr_B2C-table smr_B2C-table-xs">
      <tbody>
        {dummyData.map((item) => (
          <tr key={item.id} className="smr_B2C-item-row">
            <td>
              <img
                className='smr_b2ccartImage'
                src={item?.ImageCount !== 0 ? CartCardImageFunc(item) : noImageFound}
                alt={`Item images`}
              />
            </td>
            <td className='smr_b2ccartContentTd'>
              <p className='smr_b2ccartContentTitle'>{item.title}</p>
              <p className='smr_b2ccartContentMtDT'>{item.description}</p>
              <QuantitySelector />
            </td>
            <td className="smr_B2C-text-right" title="Shipping Info">{item.shippingInfo}</td>
            <td className="smr_B2C-text-right" title="Total">{item.total}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ExampleComponent;
