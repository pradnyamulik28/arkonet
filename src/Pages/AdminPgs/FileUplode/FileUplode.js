import React from 'react';
import styles from './FileUploade.module.css'

const FileUplode = () => {
  return (
    <div>
      <div class="container">
        <div class="row mt-4">
          <div class="col">
            <h2 className={`font-weight-bold ${styles.text}`}>Income Tax</h2>
            <div>
              A.Y 2023-24
            </div>
          </div>
          <div className="col">

            <label class={`${styles.switch}`}>
              <input type="checkbox" />
              <span class={`${styles.slider} ${styles.round}`}></span>
            </label>
          </div>
        </div>
        <div class="row">
          <div class="col">
            uploade file
          </div>
          <div class="col">
            select button
          </div>
          <div class="col">
            delete button
          </div>
          <div class="col">
            share button
          </div>
        </div>
        <div class="row">
          <div className="col-6">1<div>ONE</div></div>
          <div className="col-6">2 <div>TWO</div></div>
          <div className="col-6">3 <div>THREE</div></div>
          <div className="col-6">4 <div>FOUR</div></div>
          <div className="col-6">5 <div>FIVE</div></div>
          <div className="col-6">6 <div>SIX</div></div>
          <div className="col-6">7 <div>SEVEN</div></div>
          <div className="col-6">8 <div>EIGHT</div></div>


        </div>
      </div>
    </div >
  );
}

export default FileUplode;
