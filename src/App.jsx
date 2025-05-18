import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LandingPage from './Components/LandingPage';
import Contact from './Components/Contact';
import Services from './Components/Services';
import Role from './Components/Role';
import UserSignUp from './Components/UserSignUp';
import DoctorSignUp from './Components/DoctorSignUp';
import DoctorLogin from './Components/doctorLogin';
import UserLogin from './Components/userLogin';
import AdminLogin from './Components/AdminLogin';
import UserLanding from './Components/UserLanding';
import DoctorCardPage from './Components/DoctorCardPage';
import Doctors from './Components/Doctors';
import AppointmentPage from './Components/AppointmentPage';
import DoctorLanding from './Components/DoctorLnading';
import AdminLanding from './Components/AdminLanding';
import Patients from './Components/Patients';
import DoctorUpdate from './Components/DoctorUpdate';
import AdminSeeAppointment from './Components/AdminSeeAppointments'
import UserAppointmentPage from './Components/UserAppointmentPage';
import DoctorLandingPage from './Components/DoctorLandingPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/services' element={<Services />} />
        <Route path='/role' element={<Role />} />
        <Route path='/userSignUp' element={<UserSignUp />} />
        <Route path='/doctorSignUp' element={<DoctorSignUp />} />
        <Route path='/userLogin' element={<UserLogin />} />
        <Route path='/doctorLogin' element={<DoctorLogin />} />
        <Route path='/adminLogin' element={<AdminLogin />} />
        <Route path='/userLanding' element={<UserLanding />} />
        <Route path='/doctors' element={<DoctorCardPage/>}/>
        <Route path='/doctors1' element={<Doctors/>}/>
        <Route path='/appointment' element={<AppointmentPage/>}/>
        <Route path='/doctorsLanding' element={<DoctorLanding/>}/>
        <Route path='/adminLanding' element={<AdminLanding/>}/>
        <Route path='/patients' element={<Patients/>}/>
        <Route path='/doctorUpdate' element={<DoctorUpdate/>}/>
        <Route path='/appointments' element={<AdminSeeAppointment/>}/>
        <Route path='/userAppointment' element={<UserAppointmentPage/>}/>
        <Route path='/doctorLandingPage' element={<DoctorLandingPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
