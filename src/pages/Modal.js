import {useState, useEffect } from 'react';

const Modal = ({setIsOpen, userName}) => {

    const [noteName, setNoteName] = useState('');
    const [note, setNote] = useState('');

    async function createUser() {
        
        await fetch('http://localhost:8000/notes/createNote', {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
            "userName": userName,
            "noteName": noteName,
            "note": note
            })
        });
    }

    return (
        <div class>
            <div class = "editor">
                <p>Note Editor</p>
                <div class="inputs">
                    <p>Note Name:</p><input name="noteName"></input>
                    <p>Note:</p><input name="note"></input>
                </div>
                <button onClick={() => setIsOpen(false)}>Save</button>
                <button onClick={() => setIsOpen(false)}>close</button>
            </div>
        </div>
    );
}

export default Modal;