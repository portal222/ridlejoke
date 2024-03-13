import React, { useRef, useContext } from "react";
import { Paper,InputBase,IconButton } from "@mui/material";


import { useNavigate } from "react-router-dom";
import GlobalContext from "../GlobalContext";
import { BgColorsOutlined  } from "@ant-design/icons";

const SearchColors = (props) => {

    const globalCtx = useContext(GlobalContext);

    const navigate = useNavigate();
    const searchString = useRef();

    const handleClickSearch = () => {
        if (searchString.current.value.trim().length === 0) {
            return false;
        }

        globalCtx.setSearchStringFn(searchString.current.value.trim());
        navigate(props.linkTo);
        
        console.log("pretraga boja", searchString)
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleClickSearch();
        }
    };

    return (
        <Paper className="paper"
        component = 'form'
 
        >
            <InputBase className="base"
        
            autoFocus
            placeholder={props.placeholder}
          
            inputRef={searchString}
            onKeyDown={handleKeyDown}
            />
            <IconButton 
            type='button'
            onClick={handleClickSearch}
         
            aria-label='search'
            >
            <BgColorsOutlined />
       
            </IconButton>
        </Paper>
    );
};
export default SearchColors;
