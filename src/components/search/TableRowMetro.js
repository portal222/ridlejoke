import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import Box from '@mui/material/Box';


import GlobalContext from "../GlobalContext";
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import MetropolitanCollapsable from "./MetropolitanCollapsable";

import { useNavigate } from "react-router-dom";







// import BackToTop from "./BackToTop";


const TableRowMetro = (props) => {
    const [error, setError] = useState(null);
    const [countries, setCountries] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [open, setOpen] = useState(false);


    const [prikaz, setPrikaz] = useState([]);

    const navigate = useNavigate();




    const globalCtx = useContext(GlobalContext);
    const searchStringValue = globalCtx.searchStringValue;




const handleId = (metroId) => {
    console.log("Id metropolitan klik", metroId);
    const linkTo = `/metroId/${metroId}`;
    navigate(linkTo);
}




    return (
        <>
            <tr>
                <td className="colorName" >
               
                    <IconButton
                        aria-label='expand row'
                        size='small'
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
               
                    { "  " + props.metropolitan}</td>
             
             
            </tr>
           
                    <Collapse in={open} timeout='auto' unmountOnExit>
                        <Box sx={{ margin: 0 }}>
                            <MetropolitanCollapsable
                                metropolitan={props?.metropolitan}
                            />
                        
                        </Box>
                    </Collapse>
         









            {/* <div><BackToTop /></div> */}

        </>

    );
};
export default TableRowMetro;