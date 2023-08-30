import React from 'react';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

const Help = () => {
  const Navigate = useNavigate();
  swal("Success", "Coming Soon....", "success");
  Navigate('dashboard');
  return (
    <div>
      <center>

      </center>
    </div>
  );
}

export default Help;
