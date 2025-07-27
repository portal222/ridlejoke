import React, { useRef, useContext } from "react";
import { Paper, InputBase, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import GlobalContext from "../GlobalContext";
import { TranslationOutlined } from "@ant-design/icons";

const Dictionary = (props) => {

    const globalCtx = useContext(GlobalContext);

    const navigate = useNavigate();
    const searchString = useRef();

    const handleClickSearch = () => {
    const rawInput = searchString.current.value.trim();
    if (rawInput.length === 0) {
        return false;
    }

    const lowercaseInput = rawInput.toLowerCase();

        globalCtx.setSearchStringFn(lowercaseInput);
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
            component='form'

        >
            <InputBase className="base"
                placeholder={props.placeholder}

                inputRef={searchString}
                onKeyDown={handleKeyDown}
            />
            <IconButton
                type='button'
                onClick={handleClickSearch}

                aria-label='search'
            >
                <TranslationOutlined />
            </IconButton>
        </Paper>
    );
};
export default Dictionary;
