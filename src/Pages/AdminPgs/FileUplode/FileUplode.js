import React from 'react';
import styles from './FileUploade.module.css'
import { Link } from 'react-router-dom';

const FileUplode = () => {
  return (
    <div>
      <div class="container m-5">
        <div class="row ">
          <div class="col-4">
            <h1 className={`font-weight-bold ${styles.text}`}>Income Tax</h1>
            <div>
              <Link>A.Y. 2023-24</Link>
            </div>
          </div>
          <div className="col-8 d-flex align-items-center">
            <label class={`${styles.switch}`}>
              <input type="checkbox" />
              <span class={`${styles.slider} ${styles.round}`}></span>
            </label>
          </div>
        </div>
        <div class="row mt-4 ">
          <div class="col-6 text-danger">
            <div className="col-sm-6">
              <span for="file" className={`font-weight-bold`}>Uploade file</span>
              <input type="file" name="file" className={`${styles.inputf}`} id='file' />
            </div>

          </div>
          <div class="col">
            select button
          </div>
          <div class="col">
            delete button
          </div>
          <div class="col-2">
            share button
          </div>
        </div>
        <div class="row mt-4">
          <div className="col-6 align-self-center">1<div>ONE</div></div>
          <div className="col-6 align-self-center">2 <div>TWO</div></div>
          <div className="col-6 align-self-center">3 <div>THREE</div></div>
          <div className="col-6 align-self-center">4 <div>FOUR</div></div>
          <div className="col-6 align-self-center">5 <div>FIVE</div></div>
          <div className="col-6 align-self-center">6 <div>SIX</div></div>
          <div className="col-6 align-self-center">7 <div>SEVEN</div></div>
          <div className="col-6 align-self-center">8 <div>EIGHT</div></div>


        </div>
      </div>
    </div >
  );
}

export default FileUplode;
