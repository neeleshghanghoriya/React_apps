import React, {useState} from 'react';
import AddUser from './components/Users/AddUser';
import UserList from './components/Users/UsersList';

function App() {
  const[usersList, setUsersList] = useState([]);
  
  const onAddUserHandler = (uname,uage) =>{
    setUsersList((prevUserList)=>{
      return [ ...prevUserList, {name:uname,age:uage, id:Math.random().toString()}];
    })
  }
  return (
    <>
      <AddUser onAddUser={onAddUserHandler}/>
      <UserList users={usersList}/>
    </>
  );
}

export default App;
