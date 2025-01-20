import "./Home.css";
import Img_note from "../images/note1.png";
import IAMService from "../IAMService";
import { useState, useEffect } from 'react';

function Home() {
  //State for displaying all user's notes
  const [userNotes, setUserNotes] = useState([]);
  //State for whether setup is done
  const [dataLoaded, setDataLoaded] = useState(false);
  //State for whether Tide username is checked with database
  const [userSynced, setUserSynced] = useState(false);
  //Storing current authenticated user
  const [userName, setUserName] = useState();

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

  //Setup authenticated user's data on initial render
  useEffect(() => {
    createUser(IAMService.getName());
  }, []);

  //Try to load data once user is checked
  useEffect(() => {
    fetchNotes(userName);
  },[userSynced]);

  return (
    <div>
      <div class = "topBar">
        <header className = "appName">
          NoteTaker
        </header>
        <button class = "logoutBtn" onClick = {() => IAMService.doLogout()}> 
          Logout
        </button>
      </div>
      {
        !dataLoaded || userNotes.length === 0 ? <p>No sticky notes yet.</p> :
        <div class = "categories">
        {
          userNotes.map((category, i) => 
            (<div class = "category" key={i.noteName}>
              <img class = "noteImg" src = {Img_note}/>
              <p class = "category_name">{category.noteName}</p>
            </div>)
          )
        }
        </div>
      }
    </div>
  );
}

export default Home;
