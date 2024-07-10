import React, { useEffect } from 'react'
import { RangeSlider, Row, Col, InputGroup, InputNumber } from 'rsuite';
import 'rsuite/RangeSlider/styles/index.css';
import { DiamondRangeArr } from '../../../Recoil/atom';
import { useSetRecoilState } from 'recoil';

const RangeFilter = ({DiaMin,DiaMax,FilterValueWithCheckedOnly,obj,prodListType,cookie,sortBySelect,handleRangeFilterApi}) => {

  const [value, setValue] = React.useState([DiaMin, DiaMax+1]);

//   let setDiaRangeFilter = useSetRecoilState(DiamondRangeArr)

//   useEffect(()=>{

//     setDiaRangeFilter(value)

//   },[value])

  

  const handleInputChange1 = (event) => {
        const nextValue = parseInt(event.target.value, 10);
        const [start, end] = value;
        let fianlval;
        // && nextValue >= 0 && nextValue <= end
        if (!isNaN(nextValue) && nextValue <= end ) {
            setValue([nextValue, end]);
            fianlval = [nextValue, end]
        } else if (isNaN(nextValue)) {
            setValue([0, end]); 
            fianlval = [0, end]
        }
      console.log("value",fianlval)
   } 

  const handleInputChange2 = (event) => {
    const nextValue = parseInt(event.target.value, 10);
    const [start, end] = value;
    let fianlval;
    //   && nextValue >= start && nextValue <= (DiaMax+1)
    if (!isNaN(nextValue) && nextValue >= start) {
      setValue([start, nextValue])
      fianlval = [nextValue, end]
     } else if (isNaN(nextValue)) {
      setValue([0, end])
      fianlval = [0, end]
     }
    }

    // useEffect(()=>{
    //     // console.log("value",value);
    // },[value])

    
  return (
    <>
    <div style={{display:'flex',flexDirection:'column',gap:'5px'}}>
      <div>
        <RangeSlider
          progress
          style={{ marginTop: 30 }}
          value={value}
          onChange={value => {
            setValue(value)
          }}
          min={DiaMin}
          max={DiaMax+1}
        />
      </div>
      <div style={{display:'flex',gap:'5px',flexDirection:'row'}}>
        <input 
        type='number' 
        style={{width:'50%',caretColor:'transparent'}}
        value={value[0]} 
        onChange={handleInputChange1}
        min={DiaMin}
        max={DiaMax+1}
        />
        <input 
        type='number'
        style={{width:'50%',caretColor:'transparent'}} 
        value={value[1]} 
        onChange={handleInputChange2}
        min={DiaMin}
        max={DiaMax+1}
        />
      </div>
    </div>
    </>
  )
}

export default RangeFilter