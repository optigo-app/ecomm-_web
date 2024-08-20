import { FormControl, MenuItem, Select } from '@mui/material'
import React from 'react'

const ShippingDrp = ({
    value,
    onChange,
    data,
    className,
}) => {
    return (
        <FormControl variant="standard" sx={{ m: 1, marginLeft: '8px', minWidth: 120, margin: 0, padding: 0, background: 'transparent' }}>
            <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={value}
                onChange={onChange}
                className={className}
            >
                {data?.map((item, index) => (
                    <MenuItem key={index} value={item?.value}>{item?.title}</MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

export default ShippingDrp