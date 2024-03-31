import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';
import AddTaskIcon from '@mui/icons-material/AddTask';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import BASE_URL from '../url';
import Header from './Header';

const CreateNote = () => {
    const [expand, setExpand] = useState(false);
    const [allNote, setAllNote] = useState([]);
    const [editIndex, setEditIndex] = useState(-1);
    const [updatedTitle, setUpdatedTitle] = useState("");
    const [updatedContent, setUpdatedContent] = useState("");

    const [note, setNote] = useState({
        title: "",
        content: "",
        status: false
    });

    useEffect(() => {
        axios.get(BASE_URL + "/note")
            .then((res) => {
                setAllNote(res.data.notes);
            });
    }, [setNote]);

    async function doneClicked(id) {
        if (allNote[id].status === true) {
            if (window.confirm("Is your task still ongoing?")) {
                try {
                    const res = await axios.post(BASE_URL + "/note/done/" + id);
                    setAllNote(res.data.notes);
                    alert("Task Status Updated!");
                } catch (error) {
                    alert("Oops! Status Not Updated");
                    console.log(error);
                }
            }
        } else {
            if (window.confirm("Is your task completed?")) {
                try {
                    const res = await axios.post(BASE_URL + "/note/done/" + id);
                    setAllNote(res.data.notes);
                    alert("Task Status Updated!");
                } catch (error) {
                    alert("Oops! Status Not Updated");
                    console.log(error);
                }
            }
        }
    }

    function changeHandler(event) {
        const { name, value } = event.target;
        setNote(oldData => ({
            ...oldData,
            [name]: value,
        }));
    }

    async function addNote() {
        if (!note.content || !note.title) {
            alert('Please fill in all fields');
            return;
        }

        try {
            const res = await axios.post(BASE_URL + "/note", note);
            setAllNote(res.data);
            alert("Task Successfully Added!");
            setNote({
                title: "",
                content: ""
            });
        } catch (error) {
            alert("Oops! Task Not Added");
            console.log(error);
        }
    }

    function expandNote() {
        setExpand(true);
    }

    function hideNote() {
        setExpand(false);
    }

    async function removeNote(id) {
        if (window.confirm("Do you want to delete this note?")) {
            try {
                const res = await axios.delete(BASE_URL + "/note/" + id);
                if (res.data === "deleted") {
                    alert("Task Deleted!");
                } else {
                    alert("Oops! Task Not Deleted");
                }
            } catch (error) {
                console.log(error);
            }

            const temp = allNote.filter((ele, ind) => ind !== id);
            setAllNote(temp);
        }
    }

    async function updateNote(index) {
        if (updatedContent.trim() === "" || updatedTitle.trim() === "") {
            alert("Please enter both title and content");
            return;
        }

        try {
            const res = await axios.patch(BASE_URL + "/note/" + index, { content: updatedContent, title: updatedTitle });
            setAllNote(res.data);
            alert("Task Updated!");
            setEditIndex(-1);
            setUpdatedContent("");
            setUpdatedTitle("");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
        <Header/>
            <div className='main_note'>
                <form action="" onDoubleClick={hideNote}>
                    {expand ?
                        <input
                            type="text"
                            placeholder="Title"
                            autoComplete='off'
                            name='title'
                            value={note.title}
                            onChange={changeHandler}
                        />
                        : null}
                    <textarea
                        cols=""
                        rows=""
                        placeholder='Write a note'
                        name='content'
                        value={note.content}
                        onChange={changeHandler}
                        onClick={expandNote}
                        onDoubleClick={hideNote}
                    />
                    {expand ?
                        <Button className='plus-button' onClick={addNote}>{<AddIcon className='plus_sign' />}</Button>
                        : null}
                </form>
            </div>

            {allNote.map(function (val, index) {
                return (
                    <div className='note' key={index}>
                        {editIndex === index ? (
                            <>
                                <input
                                    type="text"
                                    value={updatedTitle}
                                    placeholder={val.title}
                                    onChange={(e) => setUpdatedTitle(e.target.value)}
                                />
                                <textarea
                                    value={updatedContent}
                                    placeholder={val.content}
                                    onChange={(e) => setUpdatedContent(e.target.value)}
                                />
                                <button className='update-buttons' onClick={() => updateNote(index)}>Update</button>
                                <button className='update-buttons' onClick={() => setEditIndex(-1)}>Cancel</button>
                            </>
                        ) : (
                            <>
                                <h1 className={val.status ? 'noteH1 done' : 'noteH1'}>{val.title}</h1>
                                <br />
                                <p className={val.status ? 'done' : ''} >{val.content}</p>

                                <div className="note-btn-container">
                                    <button className='done-button btn' onClick={() => doneClicked(index)}>
                                        <AddTaskIcon />
                                    </button>


                                    <button className='btn' onClick={() => setEditIndex(index)}>< EditNoteIcon
                                        className='update-icon' /></button>
                                    <button
                                        className='btn'
                                        onClick={() => removeNote(index)}
                                    >
                                        <DeleteIcon />
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                );
            })}
        </>
    );
}

export default CreateNote