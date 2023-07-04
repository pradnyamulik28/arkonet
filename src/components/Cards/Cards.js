import React from 'react';
import { Link } from 'react-router-dom';

const Cards = () => {
  return (
    <div>
      <div class="row">
        <div class="col-sm-6">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Client Registration</h5>
              <p class="card-text"></p>
              <Link to='/creatclient' class="btn btn-success">Register</Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Cards;
