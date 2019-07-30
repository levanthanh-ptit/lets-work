import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './TextInput.scss';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

function TextInput(props) {
    const { onAdd, holderText, variant, style, theme, holderStyle, inputPlaceHolderText } = props;

    const [state, setState] = useState({
        open: false,
        title: "",
    });

    const handleOpenAdd = () => {
        setState({
            ...state,
            open: !state.open,
            title: ''
        })
    }

    const handleClickAway = () =>{
        if(state.open) handleOpenAdd();
    }

    return (

        <ClickAwayListener onClickAway={handleClickAway}>
            <div className={`add-container-wrap ${variant}`} style={style}>
                <div
                    style={holderStyle}
                    className={`add-container ${state.open ? "" : "hidden"} ${theme}`}
                >
                    <input
                        placeholder={inputPlaceHolderText}
                        value={state.title}
                        onChange={e => setState({ ...state, title: e.target.value })}
                    />
                    <Button
                        className="btn-add"
                        size="small"
                        onClick={async () => {
                            if (state.title !== "") {
                                await onAdd(state.title);
                                await handleOpenAdd();
                            }
                        }}
                    >add</Button>
                    <button className="btn-cancel" onClick={handleOpenAdd}>X</button>
                </div>

                <div
                    className={`add-holder ${state.open ? "hidden" : ""} ${theme}`}
                    onClick={() => handleOpenAdd()}
                >
                    {holderText}
                </div>
            </div>
        </ClickAwayListener >


    )
}
TextInput.propTypes = {
    onAdd: PropTypes.func,
    holderText: PropTypes.string,
    inputPlaceHolderText: PropTypes.string,
    style: PropTypes.object,
    holderStyle: PropTypes.object,
    variant: PropTypes.oneOf(["vertical", "horizontal"]),
    theme: PropTypes.oneOf(['normal', 'light'])
}

export default TextInput