import React from 'react';

const ClientTestPages = () => {
  const UpdateLocalStorage1 = () => {
    localStorage.setItem("DEMOVALUE", 22)
  }
  const UpdateLocalStorage2 = () => {
    localStorage.setItem("DEMOVALUE", 28)
  }
  return (
    <div>
      <button onClick={UpdateLocalStorage1}>Save LOCAL STORAGE1</button>
      <button onClick={UpdateLocalStorage2}>Save LOCAL STORAGE2</button>
    </div>
  );
}

export default ClientTestPages;
