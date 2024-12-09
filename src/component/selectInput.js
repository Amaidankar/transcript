import React from 'react';
import { MenuItem, Select } from '@mui/material';
const SelectInput = (props) => {
    const {handelSelectedOption, selectedOption, options} = props;
    return (
        <div className="d-flex mb-2">
            <Select
                onChange={(e) => handelSelectedOption(e)}
                value={selectedOption}
                displayEmpty
                className='custome_dropdown'
                style={{ width: "100%" }}>
                <MenuItem value="">
                    <em>Select an option</em>
                </MenuItem>
                {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        <div className="flex items-center justify-between w-100">
                            <span className="me-1">{option.label}</span>
                        </div>
                    </MenuItem>
                ))}
            </Select>
        </div>
    );
}

export default SelectInput;