import { Route, Routes } from 'react-router-dom';
import NavBar from "./components/NavBar";
import UploadForm from './components/UploadForm';
import DownloadForm from './components/DownloadForm';

import './App.css'

const App = () => {
  return (
    <div className="px-3">
      <div className="row alto">
        <div className="col-2">
          <NavBar className="px-3 py-2"/>
        </div>
        <div className="col-10 forms">
          <Routes>
            <Route path='/' element={<UploadForm />} />
            <Route path='/desencript' element={<DownloadForm />} />
            <Route path='*' element={<UploadForm />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;