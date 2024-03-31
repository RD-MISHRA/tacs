import React from 'react'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const Note = ({ key, title, content, id, delNote }) => {

    function removeNote() {
        delNote(id);
    }


    return (
        <div className='note'>
            <h1 className='noteH1' >{title}</h1>
            <br />

            <p>{content}</p>
            <button
                className='btn'
                onClick={removeNote}
            >
                <DeleteOutlineIcon className='deleteIcon' />
            </button>
        </div>
    )
}

export default Note