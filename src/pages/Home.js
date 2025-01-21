import "./Home.css";
import Img_note from "../images/note1.png";
import IAMService from "../IAMService";
import { useState, useEffect } from "react";

function Home() {
  //State for displaying all user's notes
  const [userNotes, setUserNotes] = useState([]);
  //State for whether setup is done
  const [dataLoaded, setDataLoaded] = useState(false);
  //State for whether Tide username is checked with database
  const [userSynced, setUserSynced] = useState(false);
  //Storing current authenticated user
  const [userName, setUserName] = useState();

  // //Modal status, initially closed
  // const [isOpen, setIsOpen] = useState(false);

  //Manage user input states for creating a note
  const [noteName, setNoteName] = useState('');
  const [note, setNote] = useState('');

  //Sync authenticated user from TideCloak to database, must be done before fetching user's notes
  async function createUser() {
    const userName = IAMService.getName();
    console.log('checking user');
    await fetch('http://localhost:8000/notes/createUser', {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        "userName": userName
      })
    });
    setUserName(IAMService.getName());
    setUserSynced(true);
  }

  //Get users notes after verifying the logged in user is synced with IAM and database
  async function fetchNotes() {
    console.log('fetching notes');
    if (userSynced) {
      const response = await fetch(`http://localhost:8000/notes/all/${userName}`);
      const resJSON = await response.json();
      setUserNotes(resJSON.recordset);
      setDataLoaded(true); 
    }
  }

  async function createNote() {
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

  async function deleteNote(id) {
    await fetch(`http://localhost:8000/notes/deleteNote/${id}`, {
      method: 'delete',
      headers: {'Content-Type':'application/json'},
  });
  }

  //Setup authenticated user's data on initial render
  useEffect(() => {
    createUser(IAMService.getName());
  }, []);

  //Try to load data once user is checked
  useEffect(() => {
    fetchNotes();
  },[userSynced]);

  // const handleModal = () => {
  //   setOpen(!open);
  // }

  return (
    <div class>
      <div class = "topBar">
        <header className = "appName">
          NoteTaker
        </header>
        {/* <button class = "createBtn" onClick = {() => setIsOpen(true)}>Create</button> */}
        <button class = "logoutBtn" onClick = {() => IAMService.doLogout()}> 
          Logout
        </button>
      </div>
      <div>
      {
        !dataLoaded || userNotes.length === 0 
        ? <p>No sticky notes yet.</p> 
        :
        <div class = "notes">
        {
          userNotes.map((note, i) => 
            (<div class = "note" key={i.noteName}>
              <img class = "noteImg" src = {Img_note}/>
              <p class = "noteName">{note.noteName}</p>
              <button onClick = {() => deleteNote(note.id)}>Del</button>
            </div>)
          )
        }
        {/* { isOpen
        ? <Modal class="noteEditor" setIsOpen={setIsOpen} userName = {userName}/>
        : null
        } */}
        
        </div>
      }
      </div>
      <div class="inputs">
            <p>Note Name:</p>
            <input name="noteName" value={noteName} onChange={e => setNoteName(e.target.value)}/>
            <p>Note:</p><input name="note" value={note} onChange={e => setNote(e.target.value)}/>
            <button onClick={() => createNote()}>Save</button>
        </div>
    </div>
  );
}

export default Home;
