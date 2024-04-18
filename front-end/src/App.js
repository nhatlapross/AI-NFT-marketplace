import './App.css';
import {Navbar,Footer} from './components'
import {Home,Profile,Item, Create,Login,Register,Mint,ItemOwner,DetailItemOwner, BidItem} from './pages'
import { Routes, Route } from "react-router-dom";

function App() {

  return (
    <div>
      <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/item/:id/:price/:owner/:type" element={<Item />} />
            <Route path="/BidItem/:id/:price/:owner/:auctionID" element={<BidItem />} />
            <Route path="/DetailItemOwner/:id" element={<DetailItemOwner />} />
            <Route path="/create" element={<Create /> } />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/login" element={ <Login />} />
            <Route path="/register" element={ <Register />} />
            <Route path="/Mint" element={ <Mint />} />
            <Route path="/ItemOwner" element={ <ItemOwner />} />
          </Routes>
      <Footer />
    </div>
  );
}

export default App;
