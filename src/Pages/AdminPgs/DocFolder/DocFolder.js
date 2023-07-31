import React from 'react';
import styles from './DocFolder.module.css';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const DocFolder = () => {

  const { id } = useParams();


  function getLastFiveYears() {
    const currentYear = new Date().getFullYear();
    const lastFiveYears = [];

    for (let i = 0; i < 7; i++) {
      lastFiveYears.push(currentYear - i);
    }

    return lastFiveYears;
  }

  const lastFiveYearsArray = getLastFiveYears();

  console.log(lastFiveYearsArray)
  console.log(`${lastFiveYearsArray[5]}-${lastFiveYearsArray[4]}`)
  console.log(id)









  return (
    <div className="container">
      <div className="row">
        <div className="col-9 col-sm-9 col-md-9 col-lg-9 col-xl-9 mt-5" id={styles.maindiv}>
          <h1><b>Income Tax</b></h1>
          <div className="row">


            <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
              <Link to={`/fileupload/${id}/${`${lastFiveYearsArray[1]}-${lastFiveYearsArray[0]}`}`}>
                <div className={styles.card} id={styles.card1}>
                  <div className={styles.icon}>
                    <p className={styles.icons}>
                      <i className="bi bi-folder-fill  text-primary" id={styles.icon_left} ></i>
                      <i className="fa-solid fa-ellipsis-vertical text-primary" id={styles.icon_right} ></i>
                    </p>
                  </div>
                  <div className={`text-primary h6 ${styles.cont}`}>
                    <h5>A.Y {lastFiveYearsArray[1]}-{lastFiveYearsArray[0]}</h5>
                    <p>Financial Year {lastFiveYearsArray[1]}-{lastFiveYearsArray[0]}</p>
                  </div>
                </div>
              </Link>

            </div>

            <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
              <Link to={`/fileupload/${id}/${`${lastFiveYearsArray[2]}-${lastFiveYearsArray[1]}`}`}>
                <div className={styles.card} id={styles.card2} >
                  <div className={styles.icon}>
                    <p className={styles.icons}>
                      <i className="bi bi-folder-fill text-danger" id={styles.icon_left} ></i>
                      <i className="fa-solid fa-ellipsis-vertical text-danger" id={styles.icon_right} ></i>
                    </p>
                  </div>
                  <div className={`text-danger ${styles.cont} h6`}>
                    <h5>A.Y {lastFiveYearsArray[2]}-{lastFiveYearsArray[1]}</h5>
                    <p>Financial Year {lastFiveYearsArray[2]}-{lastFiveYearsArray[1]}</p>
                  </div>
                </div>
              </Link>
            </div>

            <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
              <Link to={`/fileupload/${id}/${`${lastFiveYearsArray[3]}-${lastFiveYearsArray[2]}`}`}>
                <div className={styles.card} id={styles.card3}>
                  <div className={styles.icon}>
                    <p className={styles.icons}>
                      <i className="bi bi-folder-fill text-warning" id={styles.icon_left} ></i>
                      <i className="fa-solid fa-ellipsis-vertical text-warning" id={styles.icon_right} ></i>
                    </p>
                  </div>
                  <div className={`text-warning ${styles.cont} h6`}>
                    <h5>A.Y {lastFiveYearsArray[3]}-{lastFiveYearsArray[2]}</h5>
                    <p>Financial Year {lastFiveYearsArray[3]}-{lastFiveYearsArray[2]}</p>
                  </div>
                </div>
              </Link>
            </div>

            <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
              <Link to={`/fileupload/${id}/${`${lastFiveYearsArray[4]}-${lastFiveYearsArray[3]}`}`}>
                <div className={styles.card} id={styles.card4}>
                  <div className={styles.icon}>
                    <p className={styles.icons}>
                      <i className="bi bi-folder-fill text-success" id={styles.icon_left} ></i>
                      <i className="fa-solid fa-ellipsis-vertical text-success" id={styles.icon_right} ></i>
                    </p>
                  </div>
                  <div className={`text-success ${styles.cont} h6`}>
                    <h5>A.Y {lastFiveYearsArray[4]}-{lastFiveYearsArray[3]}</h5>
                    <p>Financial Year {lastFiveYearsArray[4]}-{lastFiveYearsArray[3]}</p>
                  </div>
                </div>
              </Link>
            </div>

            <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
              <Link to={`/fileupload/${id}/${`${lastFiveYearsArray[5]}-${lastFiveYearsArray[4]}`}`}>
                <div className={styles.card} id={styles.card5}>
                  <div className={styles.icon}>
                    <p className={styles.icons}>
                      <i className="bi bi-folder-fill text-secondary" id={styles.icon_left} ></i>
                      <i className="fa-solid fa-ellipsis-vertical text-secondary" id={styles.icon_right} ></i>
                    </p>
                  </div>
                  <div className={`text-secondary ${styles.cont} h6`}>
                    <h5>A.Y {lastFiveYearsArray[5]}-{lastFiveYearsArray[4]}</h5>
                    <p>Financial Year {lastFiveYearsArray[5]}-{lastFiveYearsArray[4]}</p>
                  </div>
                </div>
              </Link>
            </div>

            <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
              <Link to={`/fileupload/${id}/${`${lastFiveYearsArray[6]}-${lastFiveYearsArray[5]}`}`}>
                <div className={styles.card} id={styles.card6}>
                  <div className={styles.icon}>
                    <p className={styles.icons}>
                      <i className="bi bi-folder-fill text-info" id={styles.icon_left} ></i>
                      <i className="fa-solid fa-ellipsis-vertical text-info" id={styles.icon_right} ></i>
                    </p>
                  </div>
                  <div className={`text-info ${styles.cont} h6`}>
                    <h5>A.Y {lastFiveYearsArray[6]}-{lastFiveYearsArray[5]}</h5>
                    <p>Financial Year {lastFiveYearsArray[6]}-{lastFiveYearsArray[5]}</p>
                  </div>
                </div>
              </Link>
            </div>


          </div>
        </div>
      </div>
    </div>
  );
}

export default DocFolder;
