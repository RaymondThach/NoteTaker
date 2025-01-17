import './App.css';
import Img_note from './images/note1.png';

const note_categories = ["science", "games", "food", "coding", "anime", "secrets", "Ray", "5kgkasdmgldasgmlasgmlw3imli23gasgasgasgasgasgagsagagsagsgsagasgasgasggasgasgasgasgsgagasgasgasgasasagagsagasgssgasm"];

function App() {
  return (
    <div className="App">
      <header className="App-header">
        NoteTaker
      </header>
      {
        note_categories.length === 0 ? <p>No sticky notes yet.</p> : 
        <div class = 'categories'>
        {
          note_categories.map((category) => 
            <div class = 'category'>
              <img class = 'noteImg' src = {Img_note}/>
              <p class = 'category_name'>{category}</p>
            </div>
          )
        }
        </div>
      }
    </div>
  );
}

export default App;
