import React, { useState } from "react";
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AnimalsCollapsable from './AnimalsCollapsable'

const TableRowAnimals = (props) => {
  
    const [open, setOpen] = useState(false);

    return (
        <>
            <tr>
                <td className="celebrity">{props.animalId.name}</td>
                <td className="location" style={{fontStyle: "italic"}}                >
                    {props.animalId.taxonomy.scientific_name}</td>
                <td className="location">
                    {props.animalId.taxonomy.class}
                </td>
            </tr>
            <tr>
            <td className="navod" colSpan={3}>
                    more
                    <IconButton
                        aria-label='expand row'
                        size='small'
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </td>
            </tr>
            <tr>
                <td colSpan={3}>
                    <Collapse in={open} timeout='auto' unmountOnExit>
                        <Box sx={{ margin: 0 }}>
                            <AnimalsCollapsable
                                animalId={props.animalId.name}
                            />
                        </Box>
                    </Collapse>
                </td>
            </tr>
            <tr>
                <td colSpan={3}>
                    <hr></hr>
                </td>
            </tr>
        </>
    );
};
export default TableRowAnimals;