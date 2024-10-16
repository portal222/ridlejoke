import React, { useRef, useContext } from "react";
import { Paper,InputBase,IconButton } from "@mui/material";


import { useNavigate } from "react-router-dom";
import GlobalContext from "../GlobalContext";
import { PictureOutlined } from "@ant-design/icons";

const SearchMetro = (props) => {

    const globalCtx = useContext(GlobalContext);

    const navigate = useNavigate();
    const searchString = useRef();

    const handleClickSearch = () => {
        if (searchString.current.value.trim().length === 0) {
            return false;
        }

        globalCtx.setSearchStringFn(searchString.current.value.trim());
        navigate(props.linkTo);
        
        console.log("pretraga metropolitan", searchString)
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
        se={{
            p: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            width: '40rem',
            fontSize: '28px',
            backgroundColor: 'red',
        }}
        >
            <InputBase className="base"
            // sx={{ ml:1, flex: 1 }}
            autoFocus
            placeholder={props.placeholder}
            // inputProps={{ 'ariel-label': 'search' }}
            inputRef={searchString}
            onKeyDown={handleKeyDown}
            />
            <IconButton 
            type='button'
            onClick={handleClickSearch}
            sx={{ p: '10px'}}
            aria-label='search'
            >
           <PictureOutlined /> 
            </IconButton>
        </Paper>
    );
};
export default SearchMetro;
