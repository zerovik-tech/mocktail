import React from 'react';
import { BrowserRouter as Router, Routes, Route, Switch, Link, useHistory } from 'react-router-dom';
import NewIphones from './NewIphones';
import OldIphones from './OldIphones' ;


function App() {
  return (
   
      <Router>
      <Routes>
      <Route path="/old-iphones" element={<OldIphones />} />
        <Route path="/" element={<NewIphones />} />
      </Routes>
    </Router>

   
    
    
  );
}

export default App;