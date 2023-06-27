import './App.css';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { Menu } from './components/Menu';
import { CarServiceList } from './pages/carService/CarServiceList';
import { CreateCarService } from './pages/carService/CreateCarService';
import { ViewCarService } from './pages/carService/ViewCarService';
import { EditCarService } from './pages/carService/EditCarService';
import {EmployeesList} from './pages/employee/EmployeesList';
import {CreateEmployee} from './pages/employee/CreateEmployee';
import {EmployeeView} from './pages/employee/EmployeeView';
import {EditEmployee} from './pages/employee/EditEmployee';

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Menu/>
        <Routes>
            <Route path='/services' element={<CarServiceList/>}></Route>
            <Route path='/services/create' element={<CreateCarService />}></Route>
            <Route path='/services/view/:id' element={<ViewCarService />}></Route>
            <Route path='/services/edit/:id' element={<EditCarService />}></Route>

            <Route path='/employees' element={<EmployeesList/>}></Route>
            <Route path='/employees/create' element={<CreateEmployee />}></Route>
            <Route path='/employees/view/:id' element={<EmployeeView />}></Route>
            <Route path='/employees/edit/:id' element={<EditEmployee />}></Route>
          </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
