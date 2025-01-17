import "./Home.css";
import Img_note from "../images/note1.png";
import IAMService from "../IAMService";

const note_categories = ["Ray", "sasha", "tide", "test", "gasgasgmksgmaskgmkamgka", "more"];

function Home() {
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
        note_categories.length === 0 ? <p>No sticky notes yet.</p> : 
        <div class = "categories">
        {
          note_categories.map((category) => 
            <div class = "category">
              <img class = "noteImg" src = {Img_note}/>
              <p class = "category_name">{category}</p>
            </div>
          )
        }
        </div>
      }
    </div>
  );
}

export default Home;
