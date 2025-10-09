import React, { useEffect, useState } from 'react'
import '../styles/profile.css'
import { IoLockClosedOutline } from "react-icons/io5";
import { RxAvatar } from "react-icons/rx";
import { TbMovie } from "react-icons/tb";
import { CiSettings } from "react-icons/ci";
import { api } from '../api/Api';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

function Profile() {
    const navigate = useNavigate();
    const [user,setUser] = useState({});
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [showGenreSelectBoxes, setGenres] = useState(false);
    const [userInterest, setUserInterest] = useState([]);
    const [passwords, setPasswords] = useState({
        current: "",
        newPass: "",
        confirmPass: ""
    });
    const token = localStorage.getItem('token');
    const genreSet = {
      '28'  : "Action",
      "12" : "Adventure",
      "16" : "Animation",
      "35" : "Comedy",
      '80' : "Crime",
      '99' : "Documentary",
      '18' : "Drama",
      '10751' : "Family",
      '14' : "Fantasy",
      '36' : "History",
      '27' : "Horror",
      '10402' : "Music",
      '9648' : "Mystery",
      '10749' : "Romance",
      '878' : "Science Fiction",
      '10770' : "TV Movie ",
      '53' : "Thriller",
      '10752' : "War",
      '37' : "Western"
    }
    //console.log(token)
    useEffect(()=>{
        async function getUserData() {
        try{
            const user = await api.get('/profile',{
                headers:{
                 Authorization:`Bearer ${token}`
                }
            });
            setUser(user.data);
            //console.log(user.data.genres)
        }
        catch(err){
            console.error("Failed to fetch user data:", err);
        }};
        getUserData();
    },[]) ;
    if(user){
        //console.log(user)
    }


    const handleUserInterest = (e) => {
      const { value } = e.target;
      setUserInterest(prev =>
        prev.includes(value)
          ? prev.filter(item => item !== value)
          : [...prev, value]
    );
    console.log(userInterest);
    };

    const handleLogout = () => {
        localStorage.removeItem('token'); 
        setUser({}); 
        setTimeout(()=>{
            toast.success("succesfully Logout.")
        },500);
        navigate('/login'); 
    };
    const handleDeleteAccount = async () => {
        const confirmed = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
        if (!confirmed) return;

        try {
            const response = await api.delete('/delete-account', {
            headers: { Authorization: `Bearer ${token}` }
            });
            
            if (response.status === 200) {
            localStorage.removeItem('token');
            setTimeout(()=>{
            toast.success("succesfully deleted account.");
        },500);
            navigate('/signup');
            }
        } catch (err) {
            //console.error("Failed to delete account:", err);
            navigate('/register')
        }
        };
        const handleResetPwd = async () => {
        try {
            const response = await api.delete('/delete-account', {
            headers: { Authorization: `Bearer ${token}` }
            });
            
            if (response.status === 200) {
            localStorage.removeItem('token');
            navigate('/signup');
            }
        } catch (err) {
            console.error("Failed to delete account:", err);
            alert("Error deleting account. Please try again.");
        }
        };
  const handlePasswordUpdate = async () => {
    if (!passwords.newPass || !passwords.confirmPass) {
      alert("Please fill all password fields.");
      return;
    }

    if (passwords.newPass !== passwords.confirmPass) {
      alert("New password and confirmation do not match.");
      return;
    }

    try {
      const response = await api.post(
        '/profile/updateprofile',
        { password: passwords.newPass },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        alert("Password updated successfully!");
        setPasswords({ current: "", newPass: "", confirmPass: "" });
      }
    } catch (err) {
      console.error("Failed to update password:", err);
      alert("Error updating password. Please try again.");
    }
};
const handleSaveInterests = async () => {
  if (!userInterest.length) {
    toast.warn("Please select at least one genre before saving.");
    return;
  }

  try {
    const response = await api.post(
      "/profile/updateprofile",
      { genres: userInterest },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (response.status === 200) {
      toast.success("Movie preferences updated successfully!");
      setUser((prev) => ({
        ...prev,
        genres: response.data.user.genres || userInterest,
      }));
      setGenres(false); // Hide checkboxes
    }
  } catch (err) {
    console.error("Failed to update user interests:", err);
    toast.error("Error updating preferences. Please try again.");
  }
};
const handleAddGenre =async ()=>{
  try{
  const response = await api.post('/profile/updateprofile', {
      headers: { Authorization: `Bearer ${token}` },
      genres : userInterest
  });
  console.log(response.data);
  }catch(err){
    return {error: err}
  }
      toast.success("Successfully updated");


}

    return (
        <>
         <div className="profileContainer">
            <div className="avatrSection">
                <div><RxAvatar style={{color:'#7E22CE', margin:'25px'}} size={100} /></div>
            </div>
            <div className="userData">
                <h1>{user.name}</h1>
                <h5>{user.email}</h5>
                <div className="accountSettings">
                <div className="accountSettings">
                  <div className="passwordReset">
                    <div className="topic">
                      <IoLockClosedOutline style={{color:'#7E22CE'}}/>
                      <h3>Account Settings</h3>
                    </div>

                    <button className="button" onClick={() => setShowPasswordForm(prev => !prev)}>
                      {showPasswordForm ? "Cancel" : "Change Password"}
                    </button>

                      {showPasswordForm && (
                        <div className="passwordResetForm">
                          <label>Current password</label>
                          <input
                            type='password'
                            name='current'
                            value={passwords.current}
                            onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                          />

                          <label>New password</label>
                          <input
                            type='password'
                            name='newPass'
                            value={passwords.newPass}
                            onChange={(e) => setPasswords({ ...passwords, newPass: e.target.value })}
                          />

                            <label>Confirm new password</label>
                          <input
                            type='password'
                            name='confirmPass'
                            value={passwords.confirmPass}
                            onChange={(e) => setPasswords({ ...passwords, confirmPass: e.target.value })}
                          />

                          <button
                            className='button'
                            onClick={handlePasswordUpdate}
                          >
                            Reset Password
                          </button>
                        </div>
                       )}
                      </div>
                  </div>

                </div>
                <div className="moviePreferences">
                    <div className='topic'><TbMovie style={{color:'#7E22CE'}} size={25}/>
                        <h3>Movie preferences</h3></div>   
                        <h5>Favorite genres</h5> 
                        <div className="genreContainer">
                        {user.genres?.map((genre) => {
                            return <div key={genre}> {genreSet[genre] || "Unknown"}</div>;
                        })}
                        
                        <button onClick={()=>setGenres(!showGenreSelectBoxes)} >+ Add Genre</button>
                        
                    </div>
                    {showGenreSelectBoxes && (
                        <div className="checkboxField">
                          <input type='checkbox' name='action' value={28} onChange={handleUserInterest} className="checkbox"/> <p>Action</p>
                          <input type='checkbox' value={12} onChange={handleUserInterest} className="checkbox"/><p>Adventure</p>
                          <input type='checkbox' value={16} onChange={handleUserInterest} className="checkbox"/><p>Animation</p>
                          <input type='checkbox' value={35} onChange={handleUserInterest} className="checkbox"/><p>Comedy</p><br></br>
                          <input type='checkbox' value={80} onChange={handleUserInterest} className="checkbox"/><p>Crime</p>
                          <input type='checkbox' value={99} onChange={handleUserInterest} className="checkbox"/><p>Documentary</p>
                          <input type='checkbox' value={27} onChange={handleUserInterest} className="checkbox"/><p>Horror</p>
                          <input type='checkbox' value={14} onChange={handleUserInterest} className="checkbox"/><p>Fantasy</p>
                          <input type='checkbox' value={36} onChange={handleUserInterest} className="checkbox"/><p>History</p><br/>        
                        </div>
                        )}
                    <button className='button' onClick={handleAddGenre}>Save preferences</button>

                </div>
                <div className="accountActions">
                    <div className="topic"><CiSettings style={{color:'#9746deff'}} size={20}/><h3>Account Actions</h3></div>
                    <button onClick={handleLogout} style={{backgroundColor:'red'}}>Sign out</button>
                    <button onClick={handleDeleteAccount} style={{backgroundColor:'transparent'}}>Delete account</button>
                </div>
            </div>
         </div>
        </>
    )
}

export default Profile
