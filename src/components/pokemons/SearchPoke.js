import React, { useRef, useContext } from "react";
import { Paper,InputBase,IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import GlobalContext from "../GlobalContext";
import CatchingPokemonTwoToneIcon from '@mui/icons-material/CatchingPokemonTwoTone';

const SearchPoke = (props) => {

    const globalCtx = useContext(GlobalContext);

    const navigate = useNavigate();
    const searchString = useRef();

    const handleClickSearch = () => {
        if (searchString.current.value.trim().length === 0) {
            return false;
        }

        globalCtx.setSearchStringFn(searchString.current.value.trim());
        navigate(props.linkTo);
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
            width: '10rem',
            backgroundColor: 'red',
        }}
        >
            <InputBase className="base"
            placeholder={props.placeholder}
            inputRef={searchString}
            onKeyDown={handleKeyDown}
            />
            <IconButton 
            type='button'
            onClick={handleClickSearch}
            sx={{ p: '10px'}}
            aria-label='search'
            >
            <CatchingPokemonTwoToneIcon />
            </IconButton>
        </Paper>
    );
};
export default SearchPoke;
