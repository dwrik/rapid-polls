import ReactDOM from 'react-dom/client'
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'

import App from './App'
import Error from './components/Error'

import Home from './routes/home'
import View from './routes/view'
import Vote from './routes/vote'
import Create from './routes/create'
import Manage from './routes/manage'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'react-toastify/dist/ReactToastify.css'
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root')
)

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App/>}>
        <Route index element={<Home/>}/>
        <Route path="create" element={<Create/>}/>
        <Route path="manage/:id" element={<Manage/>}/>
        <Route path="view/:id" element={<View/>}/>
        <Route path="vote/:id" element={<Vote/>}/>
        <Route path="*" element={<Error/>}/>
      </Route>
    </Routes>
  </BrowserRouter>
);
