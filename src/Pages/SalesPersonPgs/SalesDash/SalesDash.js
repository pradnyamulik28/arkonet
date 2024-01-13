import style from "./SalesDash.module.css";

import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { url_ } from "../../../Config";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SalesDash() {
  const Navigate = useNavigate();
  const location = useLocation();
  const [viewer, setViewer] = useState();

  const salesmanager_id = window.location.pathname.includes(
    "/sales/salesmgm_dash"
  )
    ? localStorage.getItem("salesmanager_id")
    : window.location.pathname.includes("/masteradmin") &&
      location.state.saleid;
  const sale_mgm_pan = window.location.pathname.includes("/sales/salesmgm_dash")
    ? localStorage.getItem("pan")
    : window.location.pathname.includes("/masteradmin") &&
      location.state.salepan;

  const sale_mgm_name =
    window.location.pathname.includes("/masteradmin") &&
    location.state.salename;

  const storedToken = window.localStorage.getItem("jwtToken");
  const salemgmName = localStorage.getItem("salesmanager_name");
  useEffect(() => {
    Getadmindata();
    setViewer(
      window.location.pathname.includes("/sales/salesmgm_dash")
        ? "SaleManager"
        : window.location.pathname.includes("/masteradmin") && "MasterAdmin"
    );
  }, []);

  const options = { day: "numeric", month: "long", year: "numeric" };
  const todate = new Date().toLocaleDateString("en-GB", options);

  const [admincounts, setadmincounts] = useState();
  const [distributorsCounts, setdistributorsCounts] = useState();
  const [admincountscategory, setadmincountscategory] = useState([]);
  const [adminClients, setadminClients] = useState([]);

  const [salesData, setsalesData] = useState({
    totalsale: 0,
    groupsale: 0,
    individualsale: 0,
  });
  const [adminRenewal, setadminRenewal] = useState([]);
  const [earnings, setEarnings] = useState({
    totalearnings: 0,
    yearly: 0,
    unpaid: 0,
  });
  const [halfYearearnings, sethalfYearEarnings] = useState({
    halfY01: 0,
    halfY02: 0,
  });

  const Getadmindata = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${storedToken}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    await fetch(
      `${url_}/forsalesmanager/combined-lists-CA?pan=${sale_mgm_pan}&id=${salesmanager_id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        // console.log((result.salesmanager_personal_ca.length)+(result.Salesmanager_distributor_ca.length))

        setadmincounts(
          result.salesmanager_personal_ca.length +
            result.Salesmanager_distributor_ca.length
        );
      })
      .catch((error) => {
        console.log(error);
      });

    await fetch(
      `${url_}/salesmanager/user/countbyprofession/${sale_mgm_pan}/${salesmanager_id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        // console.log(result)
        setadmincountscategory(result);
      })
      .catch((error) => {
        console.log(error);
      });
    await fetch(
      `${url_}/distrubutorby/salespersonid/${salesmanager_id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        // console.log(result.length)

        setdistributorsCounts(result.length);
      })
      .catch((error) => {
        console.log(error);
      });
    await fetch(`${url_}/allclient/client-count`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        // console.log(result)
        setadminClients(result);
      })
      .catch((error) => {
        console.log(error);
      });

    await fetch(
      `${url_}/salesmanager/countreneval/${sale_mgm_pan}/${salesmanager_id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        const singleObjectRenewal = result.reduce((acc, curr) => {
          if (curr.subscriptionCount === "3 Month") {
            acc["threeMonth"] = curr.count;
          } else if (curr.subscriptionCount === "6 Month") {
            acc["sixMonth"] = curr.count;
          } else {
            acc[curr.subscriptionCount] = curr.count;
          }
          return acc;
        }, {});
        setadminRenewal(singleObjectRenewal);
        // console.log(singleObjectRenewal);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const GOTO = (category) => {
    Navigate("viewca", {
      state: {
        userProfession: "category",
        userCategory: category,
      },
    });
  };
  const GOTOuserList = (category) => {
    Navigate("viewca", {
      state: {
        userProfession: category,
      },
    });
  };
  const GOTOClients = (category) => {
    Navigate("clientview", {
      state: {
        ClientCategory: category,
      },
    });
  };

  //====================    Sale Data     ====================================================

  function monthDiff(startDate, endDate) {
    const startYear = startDate.getFullYear();
    const startMonth = startDate.getMonth();

    const endYear = endDate.getFullYear();
    const endMonth = endDate.getMonth();

    return (endYear - startYear) * 12 + (endMonth - startMonth);
  }

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  function calQuarters(month) {
    switch (month) {
      case 1:
        return {
          q1: "Jan-Mar",
          q2: "Apr-Jun",
          q3: "Jul-Sep",
          q4: "Oct-Dec",
        };
      case 2:
        return {
          q1: "Feb-Apr",
          q2: "May-Jul",
          q3: "Aug-Oct",
          q4: "Nov-Jan",
        };
      case 3:
        return {
          q1: "Mar-May",
          q2: "Jun-Aug",
          q3: "Sep-Nov",
          q4: "Dec-Feb",
        };
      case 4:
        return {
          q1: "Apr-Jun",
          q2: "Jul-Sep",
          q3: "Oct-Dec",
          q4: "Jan-Mar",
        };
      case 5:
        return {
          q1: "May-Jul",
          q2: "Aug-Oct",
          q3: "Nov-Jan",
          q4: "Feb-Apr",
        };
      case 6:
        return {
          q1: "Jun-Aug",
          q2: "Sep-Nov",
          q3: "Dec-Feb",
          q4: "Mar-May",
        };
      case 7:
        return {
          q1: "Jul-Sep",
          q2: "Oct-Dec",
          q3: "Jan-Mar",
          q4: "Apr-Jun",
        };
      case 8:
        return {
          q1: "Aug-Oct",
          q2: "Nov-Jan",
          q3: "Feb-Apr",
          q4: "May-Jul",
        };
      case 9:
        return {
          q1: "Sep-Nov",
          q2: "Dec-Feb",
          q3: "Mar-May",
          q4: "Jun-Aug",
        };
      case 10:
        return {
          q1: "Oct-Dec",
          q2: "Jan-Mar",
          q3: "Apr-Jun",
          q4: "Jul-Sep",
        };
      case 11:
        return {
          q1: "Nov-Jan",
          q2: "Feb-Apr",
          q3: "May-Jul",
          q4: "Aug-Oct",
        };
      case 12:
        return {
          q1: "Dec-Feb",
          q2: "Mar-May",
          q3: "Jun-Aug",
          q4: "Sep-Nov",
        };

      default:
        return "Invalid date";
    }
  }

  function quarterIncentiveCal(target, actual, fixedpercent) {
    if (actual >= target) {
      const diff = Math.abs(actual - target);
      const percentdiff = (diff / target) * 100;
      let incentive = 0;
      let perapplicable = 0;
      switch (true) {
        case percentdiff >= 0 && percentdiff < 10:
          incentive = (actual * (fixedpercent + 0)) / 100;
          perapplicable = fixedpercent + 0;
          break;
        case percentdiff >= 10 && percentdiff < 20:
          incentive = (actual * (fixedpercent + 1)) / 100;
          perapplicable = fixedpercent + 1;
          break;
        case percentdiff >= 20 && percentdiff < 30:
          incentive = (actual * (fixedpercent + 2)) / 100;
          perapplicable = fixedpercent + 2;
          break;
        case percentdiff >= 30 && percentdiff < 40:
          incentive = (actual * (fixedpercent + 3)) / 100;
          perapplicable = fixedpercent + 3;
          break;
        case percentdiff >= 40 && percentdiff < 50:
          incentive = (actual * (fixedpercent + 4)) / 100;
          perapplicable = fixedpercent + 4;
          break;
        case percentdiff >= 50 && percentdiff < 60:
          incentive = (actual * (fixedpercent + 5)) / 100;
          perapplicable = fixedpercent + 5;
          break;
        case percentdiff >= 60 && percentdiff < 70:
          incentive = (actual * (fixedpercent + 6)) / 100;
          perapplicable = fixedpercent + 6;
          break;
        case percentdiff >= 70 && percentdiff < 80:
          incentive = (actual * (fixedpercent + 7)) / 100;
          perapplicable = fixedpercent + 7;
          break;
        case percentdiff >= 80 && percentdiff < 90:
          incentive = (actual * (fixedpercent + 8)) / 100;
          perapplicable = fixedpercent + 8;
          break;
        case percentdiff >= 90 && percentdiff < 100:
          incentive = (actual * (fixedpercent + 9)) / 100;
          perapplicable = fixedpercent + 9;
          break;

        case percentdiff >= 100 && percentdiff < 110:
          incentive = (actual * (fixedpercent + 10)) / 100;
          perapplicable = fixedpercent + 10;
          break;
        case percentdiff >= 110 && percentdiff < 120:
          incentive = (actual * (fixedpercent + 11)) / 100;
          perapplicable = fixedpercent + 11;
          break;
        case percentdiff >= 120 && percentdiff < 130:
          incentive = (actual * (fixedpercent + 12)) / 100;
          perapplicable = fixedpercent + 12;
          break;
        case percentdiff >= 130 && percentdiff < 140:
          incentive = (actual * (fixedpercent + 13)) / 100;
          perapplicable = fixedpercent + 13;
          break;
        case percentdiff >= 140 && percentdiff < 150:
          incentive = (actual * (fixedpercent + 14)) / 100;
          perapplicable = fixedpercent + 14;
          break;
        case percentdiff >= 150 && percentdiff < 160:
          incentive = (actual * (fixedpercent + 15)) / 100;
          perapplicable = fixedpercent + 15;
          break;
        case percentdiff >= 160 && percentdiff < 170:
          incentive = (actual * (fixedpercent + 16)) / 100;
          perapplicable = fixedpercent + 16;
          break;

        default:
          break;
      }
      // console.log({diff,percentdiff,perapplicable,incentive})
      return incentive;
    } else {
      return 0;
    }
  }

  let [saleTargetDate,setsaleTargetDate]=useState(null);

  let lastYearStartDate;
  let nextYearStartDate;
  let currentYearStartDate;
  let currentFY;
  let month;


  
  const [yearlyData, setYearlyData] = useState({});
  const [quarterlyData, setQuarterlyData] = useState({});
  const [monthlyData, setMonthlyData] = useState({});
  const [weeklyData, setWeeklyData] = useState({});
  const [dailyData, setDailyData] = useState({});
  const [currentQuarter, setCurrentQuarter] = useState();

  const [quarters, setQurters] = useState({
    q1: { name: "", amount: 0, percent: 0 },
    q2: { name: "", amount: 0, percent: 0 },
    q3: { name: "", amount: 0, percent: 0 },
    q4: { name: "", amount: 0, percent: 0 },
  });

  const fisrtLastdate = (month, year) => {
    return {
      firstday: new Date(year, month, 1),
      lastday: new Date(year, month + 1, 0),
    };
  };

  function quarterMonths(lastYearStartDate, currentYearStartDate, quarter) {
    const months = [
      "jan",
      "feb",
      "mar",
      "apr",
      "may",
      "jun",
      "jul",
      "aug",
      "sep",
      "oct",
      "nov",
      "dec",
    ];

    let FYYear;
    if (new Date().getMonth() < currentYearStartDate.getMonth()) {
      FYYear = lastYearStartDate.getFullYear();
    } else {
      FYYear = currentYearStartDate.getFullYear();
    }
    // console.log(FYYear)

    // console.log(lastYearStartDate,currentYearStartDate,quarter)

    const q1sMonth = String(
      months.indexOf(quarter.q1.split("-")[0].toLowerCase()) + 1
    ).padStart(2, "0");
    const q1endMonth = String(
      months.indexOf(quarter.q1.split("-")[1].toLowerCase()) + 1
    ).padStart(2, "0");

    const q2sMonth = String(
      months.indexOf(quarter.q2.split("-")[0].toLowerCase()) + 1
    ).padStart(2, "0");
    const q2endMonth = String(
      months.indexOf(quarter.q2.split("-")[1].toLowerCase()) + 1
    ).padStart(2, "0");

    const q3sMonth = String(
      months.indexOf(quarter.q3.split("-")[0].toLowerCase()) + 1
    ).padStart(2, "0");
    const q3endMonth = String(
      months.indexOf(quarter.q3.split("-")[1].toLowerCase()) + 1
    ).padStart(2, "0");

    const q4sMonth = String(
      months.indexOf(quarter.q4.split("-")[0].toLowerCase()) + 1
    ).padStart(2, "0");
    const q4endMonth = String(
      months.indexOf(quarter.q4.split("-")[1].toLowerCase()) + 1
    ).padStart(2, "0");

    const alldates = {
      q1: {
        startMonth: {
          day: "",
          month: q1sMonth,
          year:
            q1sMonth < currentYearStartDate.getMonth() + 1
              ? FYYear + 1
              : FYYear,
        },
        endMonth: {
          day: "",
          month: q1endMonth,
          year:
            q1endMonth < currentYearStartDate.getMonth() + 1
              ? FYYear + 1
              : FYYear,
        },
      },
      q2: {
        startMonth: {
          day: "",
          month: q2sMonth,
          year:
            q2sMonth < currentYearStartDate.getMonth() + 1
              ? FYYear + 1
              : FYYear,
        },
        endMonth: {
          day: "",
          month: q2endMonth,
          year:
            q2endMonth < currentYearStartDate.getMonth() + 1
              ? FYYear + 1
              : FYYear,
        },
      },
      q3: {
        startMonth: {
          day: "",
          month: q3sMonth,
          year:
            q3sMonth < currentYearStartDate.getMonth() + 1
              ? FYYear + 1
              : FYYear,
        },
        endMonth: {
          day: "",
          month: q3endMonth,
          year:
            q3endMonth < currentYearStartDate.getMonth() + 1
              ? FYYear + 1
              : FYYear,
        },
      },
      q4: {
        startMonth: {
          day: "",
          month: q4sMonth,
          year:
            q4sMonth < currentYearStartDate.getMonth() + 1
              ? FYYear + 1
              : FYYear,
        },
        endMonth: {
          day: "",
          month: q4endMonth,
          year:
            q4endMonth < currentYearStartDate.getMonth() + 1
              ? FYYear + 1
              : FYYear,
        },
      },
    };

    Object.entries(alldates).forEach(function ([key, value]) {
      value.startMonth.day = String(
        new Date(
          fisrtLastdate(
            value.startMonth.month - 1,
            value.startMonth.year
          ).firstday
        ).getDate()
      ).padStart(2, "0");
      value.endMonth.day = String(
        new Date(
          fisrtLastdate(value.endMonth.month - 1, value.endMonth.year).lastday
        ).getDate()
      ).padStart(2, "0");
    });

    return alldates;
  }

  async function getGroupSale() {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${storedToken}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    //================    Group Sale    =============================================
    await fetch(
      `${url_}/salesmanager/group/personal/earning/${sale_mgm_pan}/${salesmanager_id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setsalesData({
          totalsale: result["Total Earning"],
          groupsale: result.group,
          individualsale: result.individual,
        });
      })
      .catch((error) => {
        console.log(error);
      });

    //================    Group Sale END   =============================================
  }

  //==========    Get Year target   ===================================================================
  let yearlyTarget=0;
  async function getYearTarget() {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${storedToken}`);

    
    try {
      const response = await fetch(
        `${url_}/get/target/getBySalesmanIdAndYear?salesmanId=${salesmanager_id}`,
        {
          method: "GET",
          headers: myHeaders,
          redirect: "follow",
        }
      );
      if (response.status === 200) {
        const targetlist = await response.json();

        const recordWithHighestyear = targetlist.reduce((acc, value) => {
          return (acc = acc > value.year ? acc : value.year);
        }, null);
        const result1 = targetlist.filter((item) => {
          return item.year === recordWithHighestyear;
        })[0];
        
        yearlyTarget=result1.amount;
        
        setsaleTargetDate(new Date(result1.fixdate))
        // console.log(yearlyTarget,saleTargetDate)

        const fixeddate=result1.fixdate;     

        const cysd = new Date(fixeddate);
        cysd.setFullYear(new Date().getFullYear());
        currentYearStartDate=cysd;

        const nysd = new Date(fixeddate);
        nysd.setFullYear(new Date().getFullYear() + 1);
        nextYearStartDate=nysd;

        const lysd = new Date(fixeddate);
        lysd.setFullYear(new Date().getFullYear() - 1);
        lastYearStartDate=lysd;


        const cfy =
          new Date().getMonth() < cysd.getMonth()
            ? cysd.getFullYear() - 1
            : cysd.getFullYear();
        currentFY=cfy;

        month=cysd.getMonth();


        // console.log(currentYearStartDate,nextYearStartDate,lastYearStartDate,currentFY)
      } 
      else{
        // saleTargetDate=null
        const fixeddate=new Date();     

        const cysd = new Date(fixeddate);
        cysd.setFullYear(new Date().getFullYear());
        currentYearStartDate=cysd;

        const nysd = new Date(fixeddate);
        nysd.setFullYear(new Date().getFullYear() + 1);
        nextYearStartDate=nysd;

        const lysd = new Date(fixeddate);
        lysd.setFullYear(new Date().getFullYear() - 1);
        lastYearStartDate=lysd;


        const cfy =
          new Date().getMonth() < cysd.getMonth()
            ? cysd.getFullYear() - 1
            : cysd.getFullYear();
        currentFY=cfy;

        month=cysd.getMonth();
      }    
      
    } catch (error) {
      console.log(error);
    }
    
  }

  //==========    Get Year target END  ===================================================================

  

  async function monthWeekDailyData() {

    let periodSaledata = {
      yearSale: 0,
      quarterSale: 0,
      monthSale: 0,
      weekSale: 0,
      dailySale: 0,
    };
    //API Get Sale between range of dates   `${url_}/quarter-earning/SSSSS2222S/3?monthstartdate=2023-12-31&monthcurrentdate=2023-01-31`

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${storedToken}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    const today = new Date();
    // ✅ Get the first day of the current week (Sunday)
    const weekfirstDay = new Date(
      today.setDate(today.getDate() - today.getDay())
    )
      .toISOString()
      .split("T")[0];

    // ✅ Get the last day of the current week (Saturday)
    const weeklastDay = new Date(
      today.setDate(today.getDate() - today.getDay() + 6)
    )
      .toISOString()
      .split("T")[0];

    await fetch(
      `${url_}/slaemanager/earnig/table/${sale_mgm_pan}/${salesmanager_id}?weekstartdate=${
        today.toISOString().split("T")[0]
      }&weekcurrentdate=${weekfirstDay}&monthstartdate=2024-01-01&monthcurrentdate=2023-11-01`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        
        periodSaledata.dailySale = result.find(
          (item) => item.subscriptionCount === "Today"
        ).count;
        periodSaledata.weekSale = result.find(
          (item) => item.subscriptionCount === "Weak"
        ).count;
        periodSaledata.monthSale = result.find(
          (item) => item.subscriptionCount === "Month"
        ).count;
        // saledata.quarterSale = result.find(
        //   (item) => item.subscriptionCount === "Quarter"
        // ).count;
      })
      .catch((error) => {
        console.log(error);
      });

    //Current month
    setMonthlyData({
      title: `${numberToMonth(new Date().getMonth() + 1)}`,
      saletarget: Math.floor(yearlyTarget / 12),
      totalsale: periodSaledata.monthSale,
      salepercent: Math.trunc(
        (periodSaledata.monthSale / Math.floor(yearlyTarget / 12)) * 100
      ),
      incentive: 0,
      difference: Math.floor(yearlyTarget / 12) - periodSaledata.monthSale,
    });

    //current week
    setWeeklyData({
      title: `Week`,
      saletarget: Math.floor(yearlyTarget / 52),
      totalsale: periodSaledata.weekSale,
      salepercent: Math.trunc(
        (periodSaledata.weekSale / Math.floor(yearlyTarget / 52)) * 100
      ),
      incentive: 0,
      difference: Math.floor(yearlyTarget / 52) - periodSaledata.weekSale,
    });

    setDailyData({
      title: `Today`,
      saletarget: Math.floor(yearlyTarget / 365),
      totalsale: periodSaledata.dailySale,
      salepercent: Math.trunc(
        (periodSaledata.dailySale / Math.floor(yearlyTarget / 365)) * 100
      ),
      incentive: 0,
      difference: Math.floor(yearlyTarget / 365) - periodSaledata.dailySale,
    });
  }
  async function getYearSaleData() {
    // console.log(currentYearStartDate,yearlyTarget,saleTargetDate)
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${storedToken}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    // ===============    YEAR SALE DATA    ==================================================================

    const FYStartDate =
      new Date().getMonth() < currentYearStartDate.getMonth()
        ? lastYearStartDate
        : currentYearStartDate;

    const FYEndDate =
      new Date().getMonth() < currentYearStartDate.getMonth()
        ? currentYearStartDate
        : nextYearStartDate;

    const url = `${url_}/quarter-earning/${sale_mgm_pan}/${salesmanager_id}?monthstartdate=${
      fisrtLastdate(FYEndDate.getMonth() - 1, FYEndDate.getFullYear())
        .lastday.toISOString()
        .split("T")[0]
    }&monthcurrentdate=${
      fisrtLastdate(FYStartDate.getMonth(), FYStartDate.getFullYear())
        .firstday.toISOString()
        .split("T")[0]
    }`;
    try {
      const response = await fetch(url, requestOptions);
      const yearSaledata = await response.json();
      console.log(yearlyTarget)
      setYearlyData({
        title:
          month === 0
            ? `Year ${currentFY}`
            : `${currentFY}-${(currentFY + 1).toString().slice(-2)}`,
        saletarget: yearlyTarget,
        totalsale: yearSaledata,
        salepercent: Math.trunc((yearSaledata / yearlyTarget) * 100),
        incentive: 0,
        difference: yearlyTarget - yearSaledata,
      });

      setEarnings({
        yearly: yearSaledata >= yearlyTarget ? (yearSaledata * 1) / 100 : 0, //If yearly target achieved 1% on yearly sale
        totalearnings: 0,
        unpaid: 90,
      });
    } catch (error) {
      console.log(error);
    }

    // ===================    Get Year sale end   ==============================================================
  }

  async function getQuarterData() {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${storedToken}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    //Current quarter
    const quarter = calQuarters(currentYearStartDate.getMonth() + 1);
    const monthDif =
      new Date().getMonth() < currentYearStartDate.getMonth()
        ? monthDiff(lastYearStartDate, new Date())
        : monthDiff(currentYearStartDate, new Date());

    // ==============   TODAY, WEEK, MONTH SALE   ========================================================

    // ===============================================================================================
    const qmonths = quarterMonths(
      lastYearStartDate,
      currentYearStartDate,
      quarter
    );
    // console.log(qmonths);

    const quarterDateUrls = [
      // `${url_}/quarter-earning/${sale_mgm_pan}/${salesmanager_id}?monthstartdate=${qmonths.q1.startMonth.year}-${qmonths.q1.startMonth.month}-${qmonths.q1.startMonth.day}&monthcurrentdate=${qmonths.q1.endMonth.year}-${qmonths.q1.endMonth.month}-${qmonths.q1.endMonth.day}`,
      // `${url_}/quarter-earning/${sale_mgm_pan}/${salesmanager_id}?monthstartdate=${qmonths.q2.startMonth.year}-${qmonths.q2.startMonth.month}-${qmonths.q2.startMonth.day}&monthcurrentdate=${qmonths.q2.endMonth.year}-${qmonths.q2.endMonth.month}-${qmonths.q2.endMonth.day}`,
      // `${url_}/quarter-earning/${sale_mgm_pan}/${salesmanager_id}?monthstartdate=${qmonths.q3.startMonth.year}-${qmonths.q3.startMonth.month}-${qmonths.q3.startMonth.day}&monthcurrentdate=${qmonths.q3.endMonth.year}-${qmonths.q3.endMonth.month}-${qmonths.q3.endMonth.day}`,
      // `${url_}/quarter-earning/${sale_mgm_pan}/${salesmanager_id}?monthstartdate=${qmonths.q4.startMonth.year}-${qmonths.q4.startMonth.month}-${qmonths.q4.startMonth.day}&monthcurrentdate=${qmonths.q4.endMonth.year}-${qmonths.q4.endMonth.month}-${qmonths.q4.endMonth.day}`,

      `${url_}/quarter-earning/${sale_mgm_pan}/${salesmanager_id}?monthstartdate=${qmonths.q1.endMonth.year}-${qmonths.q1.endMonth.month}-${qmonths.q1.endMonth.day}&monthcurrentdate=${qmonths.q1.startMonth.year}-${qmonths.q1.startMonth.month}-${qmonths.q1.startMonth.day}`,
      `${url_}/quarter-earning/${sale_mgm_pan}/${salesmanager_id}?monthstartdate=${qmonths.q2.endMonth.year}-${qmonths.q2.endMonth.month}-${qmonths.q2.endMonth.day}&monthcurrentdate=${qmonths.q2.startMonth.year}-${qmonths.q2.startMonth.month}-${qmonths.q2.startMonth.day}`,
      `${url_}/quarter-earning/${sale_mgm_pan}/${salesmanager_id}?monthstartdate=${qmonths.q3.endMonth.year}-${qmonths.q3.endMonth.month}-${qmonths.q3.endMonth.day}&monthcurrentdate=${qmonths.q3.startMonth.year}-${qmonths.q3.startMonth.month}-${qmonths.q3.startMonth.day}`,
      `${url_}/quarter-earning/${sale_mgm_pan}/${salesmanager_id}?monthstartdate=${qmonths.q4.endMonth.year}-${qmonths.q4.endMonth.month}-${qmonths.q4.endMonth.day}&monthcurrentdate=${qmonths.q4.startMonth.year}-${qmonths.q4.startMonth.month}-${qmonths.q4.startMonth.day}`,
    ];
    // console.log(quarterDateUrls)

    const fetchData = async (url) => {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      return data;
    };

    let currentquartersale;
    try {
      const results = await Promise.all(
        quarterDateUrls.map((url) => fetchData(url))
      );

      setQurters({
        q1: {
          name: quarter.q1,
          amount: results[0],
          percent: Math.trunc(
            (results[0] / Math.floor(yearlyTarget / 4)) * 100
          ),
          incentive: quarterIncentiveCal(
            Math.floor(yearlyTarget / 4),
            results[0],
            5
          ),
        },
        q2: {
          name: quarter.q2,
          amount: results[1],
          percent: Math.trunc(
            (results[1] / Math.floor(yearlyTarget / 4)) * 100
          ),
          incentive: quarterIncentiveCal(
            Math.floor(yearlyTarget / 4),
            results[1],
            5
          ),
        },
        q3: {
          name: quarter.q3,
          amount: results[2],
          percent: Math.trunc(
            (results[2] / Math.floor(yearlyTarget / 4)) * 100
          ),
          incentive: quarterIncentiveCal(
            Math.floor(yearlyTarget / 4),
            results[2],
            5
          ),
        },
        q4: {
          name: quarter.q4,
          amount: results[3],
          percent: Math.trunc(
            (results[3] / Math.floor(yearlyTarget / 4)) * 100
          ),
          incentive: quarterIncentiveCal(
            Math.floor(yearlyTarget / 4),
            results[3],
            5
          ),
        },
      });

      //This actually displays Sale amount calculable for incentive
      const q1q2amount = results[0] + results[1];
      let q3q4amount = results[2] + results[3];

      // Half yearly incentive : if (q1-Q2, Q3-Q4) half year target achived 2% on total half year sale
      sethalfYearEarnings({
        halfY01Amount: q1q2amount,
        halfY01:
          q1q2amount >= Math.floor(yearlyTarget / 2)
            ? (q1q2amount * 2) / 100
            : 0,

        halfY02Amount: q3q4amount,
        halfY02:
          q3q4amount >= Math.floor(yearlyTarget / 2)
            ? (q3q4amount * 2) / 100
            : 0,
      });

      currentquartersale =
        monthDif >= 0 && monthDif <= 2
          ? results[0]
          : monthDif >= 3 && monthDif <= 5
          ? results[1]
          : monthDif >= 6 && monthDif <= 8
          ? results[2]
          : monthDif >= 9 && monthDif <= 11 && results[3];
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    setQuarterlyData({
      title: `${
        monthDif >= 0 && monthDif <= 2
          ? `${quarter.q1} (Q1)`
          : monthDif >= 3 && monthDif <= 5
          ? `${quarter.q2} (Q2)`
          : monthDif >= 6 && monthDif <= 8
          ? `${quarter.q3} (Q3)`
          : monthDif >= 9 && monthDif <= 11 && `${quarter.q4} (Q4)`
      }`,
      saletarget: Math.floor(yearlyTarget / 4),
      totalsale: currentquartersale,
      salepercent: Math.trunc(
        (currentquartersale / Math.floor(yearlyTarget / 4)) * 100
      ),
      incentive: 0,
      difference: Math.floor(yearlyTarget / 4) - currentquartersale,
    });
    setCurrentQuarter(
      `${
        monthDif >= 0 && monthDif <= 2
          ? `Q1`
          : monthDif >= 3 && monthDif <= 5
          ? `Q2`
          : monthDif >= 6 && monthDif <= 8
          ? `Q3`
          : monthDif >= 9 && monthDif <= 11 && `Q4`
      }`
    );

    // ===========================================================================================================
  }
 

  async function getSaleData() {
    await getYearTarget();
    await getGroupSale();
    await getYearSaleData();
    await monthWeekDailyData();
    await getQuarterData();
  }

  function numberToMonth(number) {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    if (number >= 1 && number <= 12) {
      return months[number - 1];
    } else {
      return "Invalid month number";
    }
  }

  useEffect(() => {
    getSaleData();
  }, []);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

{/* Performs similarly to componentDidMount in classes */}
useEffect(() => {
    window.addEventListener("resize", () => {
        const ismobile = window.innerWidth < 770;
        if (ismobile !== isMobile) setIsMobile(ismobile);
    }, false);
}, [isMobile]);


const [currentSlideNo, setCurrentSlideNo] = useState(1);
  const [totalSides, setTotalSlides] = useState(5);
function moveSlide(e) {
  e.preventDefault();
  // console.log( currentSlideNo);
  if (e.target.id === "right_btn") {
    if(currentSlideNo===totalSides)
    {
      setCurrentSlideNo(1)
    }
    else{
      setCurrentSlideNo(currentSlideNo + 1);
    }
  } else if (e.target.id === "left_btn" ) {
    if(currentSlideNo===1)
    {
      setCurrentSlideNo(totalSides)
    }
    else{
      setCurrentSlideNo(currentSlideNo - 1);
    }
  }
}
  
  const [visibleRowIndex, setVisibleRowIndex] = useState(0);
  function changeSlide(){
    setVisibleRowIndex((prevIndex) => (prevIndex + 1) % 5);
  }
  useEffect(() => {
    
  }, [visibleRowIndex]);

  return (
    <div className="w-100">
      {/* <SideBar /> */}
      
      
      <div className={style.fullcol}>
        <div className="mt-3">
          <h5 className={`${style.fulltitle} `}>
            Sale Manager Milestone {yearlyData.title}
          </h5>
          {viewer === "MasterAdmin" && (
            <h6 className={`${style.fulltitle} `}>
              {sale_mgm_name}&nbsp;&nbsp;{sale_mgm_pan}
            </h6>
          )}
        </div>
        <table className={`${style.mytable} ${style.mobile_optimised}`}>
          <thead>
            <tr >
              <th scope="col" style={{ visibility: "hidden" }}>
                Period
              </th>
              <th scope="col">Target</th>
              <th scope="col">Sales</th>
              <th scope="col">Target Achieved</th>
              <th scope="col">Difference</th>
              {/* <th scope="col">Incentive</th> */}
            </tr>
          </thead>
          
          <tbody>
          {isMobile&&<i className="fa-solid fa-chevron-left" id="left_btn" onClick={moveSlide}></i> }   
            <tr className={`${currentSlideNo === 1 ? style.visible : ''}`}>
              <td data-th="">{yearlyData.title}</td>
              <td data-th="Target">{saleTargetDate!==null?yearlyData.saletarget:0}</td>
              <td data-th="Sales">{yearlyData.totalsale}</td>
              <td
                data-th="%of Target"
                className={
                  yearlyData.salepercent >= 75 && yearlyData.salepercent < 100
                    ? `${style.orange}`
                    : yearlyData.salepercent >= 100 && style.green
                }
              >
                {saleTargetDate!==null?yearlyData.salepercent:0} %
              </td>
              <td
                data-th="Difference"
                className={
                  yearlyData.salepercent >= 75 && yearlyData.salepercent < 100
                    ? `${style.orange}`
                    : yearlyData.salepercent >= 100 && style.green
                }
              >
                {saleTargetDate!==null?Math.abs(yearlyData.difference):0}
              </td>
              
            </tr>
            <tr className={`${currentSlideNo === 2 ? style.visible : ''}`}>
              <td data-th="">{quarterlyData.title}</td>
              <td data-th="Target">{saleTargetDate!==null?quarterlyData.saletarget:0}</td>
              <td data-th="Sales">{quarterlyData.totalsale}</td>
              <td
                data-th="%of Target"
                className={
                  quarterlyData.salepercent >= 75 &&
                  quarterlyData.salepercent < 100
                    ? style.orange
                    : quarterlyData.salepercent >= 100 && style.green
                }
              >
                {saleTargetDate!==null?quarterlyData.salepercent:0} %
              </td>
              <td
                data-th="Difference"
                className={
                  quarterlyData.salepercent >= 75 &&
                  quarterlyData.salepercent < 100
                    ? style.orange
                    : quarterlyData.salepercent >= 100 && style.green
                }
              >
                {saleTargetDate!==null?Math.abs(quarterlyData.difference):0}
              </td>
              
            </tr>
            <tr className={`${currentSlideNo === 3 ? style.visible : ''}`}>
              <td data-th="">{monthlyData.title}</td>
              <td data-th="Target">{saleTargetDate!==null?monthlyData.saletarget:0}</td>
              <td data-th="Sales">{monthlyData.totalsale}</td>
              <td
                data-th="%of Target"
                className={
                  monthlyData.salepercent >= 75 && monthlyData.salepercent < 100
                    ? style.orange
                    : monthlyData.salepercent >= 100 && style.green
                }
              >
                {saleTargetDate!==null?monthlyData.salepercent:0} %
              </td>
              <td
                data-th="Difference"
                className={
                  monthlyData.salepercent >= 75 && monthlyData.salepercent < 100
                    ? style.orange
                    : monthlyData.salepercent >= 100 && style.green
                }
              >
                {saleTargetDate!==null?Math.abs(monthlyData.difference):0}
              </td>
              
            </tr>
            <tr className={`${currentSlideNo === 4 ? style.visible : ''}`}>
              <td data-th="">{weeklyData.title}</td>
              <td data-th="Target">{saleTargetDate!==null?weeklyData.saletarget:0}</td>
              <td data-th="Sales">{weeklyData.totalsale}</td>
              <td
                data-th="%of Target"
                className={
                  weeklyData.salepercent >= 75 && weeklyData.salepercent < 100
                    ? style.orange
                    : weeklyData.salepercent >= 100 && style.green
                }
              >
                {saleTargetDate!==null?weeklyData.salepercent:0} %
              </td>
              <td
                data-th="Difference"
                className={
                  weeklyData.salepercent >= 75 && weeklyData.salepercent < 100
                    ? style.orange
                    : weeklyData.salepercent >= 100 && style.green
                }
              >
                {saleTargetDate!==null?Math.abs(weeklyData.difference):0}
              </td>
              
            </tr>
            <tr className={`${currentSlideNo === 5 ? style.visible : ''}`}>
              <td data-th="">{dailyData.title}</td>
              <td data-th="Target">{saleTargetDate!==null?dailyData.saletarget:0}</td>
              <td data-th="Sales">{dailyData.totalsale}</td>
              <td
                data-th="%of Target"
                className={
                  dailyData.salepercent >= 75 && dailyData.salepercent < 100
                    ? style.orange
                    : dailyData.salepercent >= 100 && style.green
                }
              >
                {saleTargetDate!==null?dailyData.salepercent:0} %
              </td>
              <td
                data-th="Difference"
                className={
                  dailyData.salepercent >= 75 && dailyData.salepercent < 100
                    ? style.orange
                    : dailyData.salepercent >= 100 && style.green
                }
              >
                {saleTargetDate!==null?Math.abs(dailyData.difference):0}
              </td>
              
            </tr>
            {isMobile&&<i onClick={moveSlide} className="fa-solid fa-chevron-right" id="right_btn"></i>    }        

          </tbody>
        </table>
        
        <div className={`${style.rtb}`}>
        
          <p>
            <b>As on Date {todate}</b>
          </p>
        </div>
      </div>
      <div className={`${style.workport}`}>
        {/* Left col starts */}
        <div className={`${style.leftcol}`}>
          <div className={`${style.ltop} `}>
            <div className="mt-3">
              <h5 className={`${style.itopheadersmall} `}>{salemgmName}</h5>
            </div>
            <div className="d-flex justify-content-around w-100">
              <div
                className="d-flex flex-column align-items-center"
                style={{ cursor: "pointer" }}
              >
                <h6 className={`${style.itoppara}`}>Total CA</h6>
                <h3
                  className={`${style.itopheaderlarge}`}
                  onClick={() => {
                    Navigate("viewca", {
                      state: {
                        userProfession: "All C.A",
                      },
                    });
                  }}
                >
                  {admincounts}
                </h3>
              </div>
              <div
                className="d-flex flex-column align-items-center"
                style={{ cursor: "pointer" }}
              >
                <h6 className={`${style.itoppara}`}>Total Distributors</h6>
                <h3
                  className={`${style.itopheaderlarge}`}
                  onClick={() => {
                    Navigate("Viewdistributor", {
                      state: {
                        userProfession: "Distributor",
                      },
                    });
                  }}
                >
                  {distributorsCounts}
                </h3>
              </div>
            </div>
            <Link to="sale_reg">
              <input
                type="submit"
                value="ADD DISTRIBUTOR"
                className={` h6 ${style.abtn}`}
              />
            </Link>
            <div className="mb-2">
              <small className={`${style.itopshrink}`}>
                As on date {todate}
              </small>
            </div>
          </div>

          <div className={`${style.lbottom} `}>
            <div className={`${style.lbotcontaint} `}>
              <div className={`${style.rt} `}>
                <h4 className={`${style.lboth2}`}>
                  <b>CA DETAILS</b>
                </h4>
              </div>
              <div className={`${style.tabular} `}>
                <div className={`${style.sinrow}`}>
                  <div className={`${style.title} mt-4 mb-3`}>
                    <h5>CA TYPE</h5>
                  </div>
                  {/* <div className={`${style.value}`}></div> */}
                </div>

                <table className="table  ">
                  <tbody>
                    {admincountscategory.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <b>{item.profession}</b>
                        </td>

                        <td
                          onClick={() => GOTO(item.profession)}
                          style={{ cursor: "pointer" }}
                        >
                          <b>{item.count}</b>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {/* Left Col ends */}

        {/* Right Col starts */}
        <div className={`${style.rightcol}`}>
          <div className={`${style.Rtop}`}>
            <div className={`${style.rtt}`}>
              <h5
                className={`${style.earnings}`}
                style={{ color: "#65b741", fontWeight: "700" }}
              >
                Incentive &nbsp;
                {yearlyData.title}
                &nbsp;(&#8377;) (Sale / Incentive)
              </h5>
            </div>
            

            <div className={`${style.rtm}`}>
              <div className={`${style.rtabular}`}>
                <div className={`${style.rtcol1}`}>
                  <div
                    className={`${style.title} ${
                      currentQuarter === "Q1" && style.lastmonth
                    }`}
                  >
                    <h6 className={style.pb}>Quarter 01</h6>
                    <p>{quarters.q1.name}</p>
                  </div>
                  <div className={`${style.value}`}>
                    <p
                      className={
                        quarters.q1.percent >= 75 && quarters.q1.percent < 100
                          ? style.orange
                          : quarters.q1.percent >= 100
                          ? style.green
                          : style.red
                      }
                    >
                      {quarters.q1.amount}
                      <br style={{"height":"2px"}}/>
                      {saleTargetDate!==null?quarters.q1.incentive:0}
                    </p>
                  </div>
                </div>

                <div className={`${style.rtcol1}`}>
                  <div
                    className={`${style.title} ${
                      currentQuarter === "Q2" && style.lastmonth
                    }`}
                  >
                    <h6 className={style.pb}>Quarter 02</h6>
                    <p>{quarters.q2.name}</p>
                  </div>
                  <div className={`${style.value}`}>
                    <p
                      className={
                        quarters.q2.percent >= 75 && quarters.q2.percent < 100
                          ? style.orange
                          : quarters.q2.percent >= 100
                          ? style.green
                          : style.red
                      }
                    >
                      {quarters.q2.amount}
                      <br />
                      {saleTargetDate!==null?quarters.q2.incentive:0}
                    </p>
                  </div>
                </div>

                <div className={`${style.rtcol1}`}>
                  <div className={`${style.title}`}>
                    <h6 className={style.pb}>Half Year</h6>
                    <p> Q1-Q2</p>
                    <p></p>
                  </div>
                  <div className={`${style.value}`}>
                    <p
                      className={
                        halfYearearnings.halfY01 ? style.green : style.red
                      }
                    >
                      {halfYearearnings.halfY01Amount}
                      <br />
                      {saleTargetDate!==null?halfYearearnings.halfY01:0}
                    </p>
                  </div>
                </div>
              </div>
              

              <div className={`${style.rtabular}`}>
                <div className={`${style.rtcol1}`}>
                  <div
                    className={`${style.title} ${
                      currentQuarter === "Q3" && style.lastmonth
                    }`}
                  >
                    <h6 className={style.pb}>Quarter 03</h6>
                    <p>{quarters.q3.name}</p>
                  </div>
                  <div className={`${style.value}`}>
                    <p
                      className={
                        quarters.q3.percent >= 75 && quarters.q3.percent < 100
                          ? style.orange
                          : quarters.q3.percent >= 100
                          ? style.green
                          : style.red
                      }
                    >
                      {quarters.q3.amount}
                      <br />
                      {saleTargetDate!==null?quarters.q3.incentive:0}
                    </p>
                  </div>
                </div>

                <div className={`${style.rtcol1}`}>
                  <div
                    className={`${style.title} ${
                      currentQuarter === "Q4" && style.lastmonth
                    }`}
                  >
                    <h6 className={style.pb}>Quarter 04</h6>
                    <p>{quarters.q4.name}</p>
                  </div>
                  <div className={`${style.value}`}>
                    <p
                      className={
                        quarters.q4.percent >= 75 && quarters.q4.percent < 100
                          ? style.orange
                          : quarters.q4.percent >= 100
                          ? style.green
                          : style.red
                      }
                    >
                      {quarters.q4.amount}
                      <br />
                      {saleTargetDate!==null?quarters.q4.incentive:0}
                    </p>
                  </div>
                </div>

                <div className={`${style.rtcol1}`}>
                  <div className={`${style.title}`}>
                    <h6 className={style.pb}>Half Year</h6>
                    <p>Q3-Q4</p>
                  </div>
                  <div className={`${style.value}`}>
                    <p
                      className={
                        halfYearearnings.halfY02 > 0 ? style.green : style.red
                      }
                    >
                      {halfYearearnings.halfY02Amount}
                      <br />
                      {saleTargetDate!==null?halfYearearnings.halfY02:0}
                    </p>
                  </div>
                </div>
              </div>
              

              <div className={`${style.rtabular}`}>
                <div className={`${style.rtcol1}`}>
                  <div className={`${style.title}`}>
                    <h6 className={style.pb}>Yearly</h6>
                  </div>
                  <div className={`${style.value}`}>
                    <p className={`${style.pv}`}>{saleTargetDate?earnings.yearly:0}</p>
                  </div>
                </div>

                <div className={`${style.rtcol1}`}>
                  <div className={`${style.title}`}>
                    <h6 className={style.pb}>Total</h6>
                  </div>
                  <div className={`${style.value}`}>
                    {/* <p className={`${style.pv}`}>{earnings.totalearnings}</p> */}
                    <p>Upcomming...</p>
                  </div>
                </div>

                <div className={`${style.rtcol1}`}>
                  <div className={`${style.title}`}>
                    <h6 className={style.pb}>Unpaid</h6>
                  </div>
                  <div className={`${style.value}`}>
                    {/* <p className={`${style.pv}`}>{earnings.unpaid}</p> */}
                    <p>Upcomming...</p>

                  </div>
                </div>
              </div>
            </div>
            <div className={`${style.rtb}`}>
              <p>
                <b>As on Date {todate}</b>
              </p>
            </div>
          </div>

          {/* .......................... */}
          {/* <div className={`${style.Rmiddle}`}> */}

          <div className={`${style.Rtop}`}>
            <div className={`${style.rtt}`}>
              <h5
                className={`${style.earnings}`}
                style={{ color: "#1f288c", fontWeight: "700" }}
              >
                OVERALL SALE (&#8377;)
              </h5>
            </div>
            <div className={`${style.rtm}`}>
              <div className={`${style.rtabular} mt-3`}>
                <div className={`${style.rtcol1}`}>
                  <div className={`${style.title}`}>
                    <h6 className={`${style.pb}`}>Total Sale</h6>
                  </div>
                  <div
                    className={`${style.value} d-flex justify-content-center`}
                    style={{ cursor: "pointer" }}
                  >
                    <h6 className={`${style.pv}`}>{salesData.totalsale}</h6>
                  </div>
                </div>
                <div className={`${style.rtcol1}`}>
                  <div className={`${style.title}`}>
                    <h6 className={`${style.pb}`}>Group Sale</h6>
                  </div>
                  <div
                    className={`${style.value}  d-flex justify-content-center`}
                    style={{ cursor: "pointer" }}
                  >
                    <h6 className={`${style.pv}`}>{salesData.groupsale}</h6>
                  </div>
                </div>
                <div className={`${style.rtcol1}`}>
                  <div className={`${style.title}`}>
                    <h6 className={`${style.pb}`}>Individual Sale</h6>
                  </div>
                  <div
                    className={`${style.value}  d-flex justify-content-center`}
                    style={{ cursor: "pointer" }}
                  >
                    <h6 className={`${style.pv}`}>
                      {salesData.individualsale}
                    </h6>
                  </div>
                </div>
              </div>
            </div>
            <div className={`${style.rtb}`}>
              <p>
                <b>As on Date {todate}</b>
              </p>
            </div>
          </div>

          {/* </div> */}
          {/* .......................... */}

          <div className={`${style.Rbottom}`}>
            <div className={`${style.rbt}`}>
              <h5 className={`${style.renewal}`}>UPCOMMING RENEWALS</h5>
            </div>

            <div className={`${style.rbm}`}>
              <div className={`${style.rtabular}`}>
                <div className={`${style.rbcol1}`}>
                  <div className={`${style.title}`}>
                    <span className={`${style.p}`}>Today</span>
                  </div>
                  <div
                    className={`${style.value} d-flex justify-content-center `}
                    onClick={() => GOTOuserList("Today's Renewal")}
                    style={{ cursor: "pointer" }}
                  >
                    <span className={`${style.pvr}`}>{adminRenewal.Today}</span>
                  </div>
                </div>
                <div className={`${style.rbcol2}`}>
                  <div className={`${style.title}`}>
                    <span className={`${style.p}`}>Tomorrow</span>
                  </div>
                  <div
                    className={`${style.value} d-flex justify-content-center`}
                    onClick={() => GOTOuserList("Tomorrow's Renewal")}
                    style={{ cursor: "pointer" }}
                  >
                    <span className={`${style.pvdr}`}>
                      {adminRenewal.Tomorrow}
                    </span>
                  </div>
                </div>
                <div className={`${style.rbcol3}`}>
                  <div className={`${style.title}`}>
                    <span className={`${style.p}`}>Week</span>
                  </div>
                  <div
                    className={`${style.value} d-flex justify-content-center`}
                    onClick={() => GOTOuserList("Week's Renewal")}
                    style={{ cursor: "pointer" }}
                  >
                    <span className={`${style.pvy}`}>{adminRenewal.Weak}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className={`${style.rbb}`}>
              <div className={`${style.rtabular}`}>
                <div className={`${style.rbcol1}`}>
                  <div className={`${style.title}`}>
                    <p className={`${style.p}`}>Month</p>
                  </div>
                  <div
                    className={`${style.value} d-flex justify-content-center`}
                    onClick={() => GOTOuserList("Month's Renewal")}
                    style={{ cursor: "pointer" }}
                  >
                    <p className={`${style.pv} text-warning`}>
                      {adminRenewal.Month}
                    </p>
                  </div>
                </div>
                <div className={`${style.rbcol2}`}>
                  <div className={`${style.title}`}>
                    <p className={`${style.p}`}>3 Months</p>
                  </div>
                  <div
                    className={`${style.value} d-flex justify-content-center`}
                    onClick={() => GOTOuserList("3 Months's Renewal")}
                    style={{ cursor: "pointer" }}
                  >
                    <p className={`${style.pv}`}>{adminRenewal.threeMonth}</p>
                  </div>
                </div>
                <div className={`${style.rbcol3}`}>
                  <div className={`${style.title}`}>
                    <p className={`${style.p}`}>6 Months</p>
                  </div>
                  <div
                    className={`${style.value} d-flex justify-content-center`}
                    onClick={() => GOTOuserList("6 Months's Renewal")}
                    style={{ cursor: "pointer" }}
                  >
                    <p className={`${style.pv}`}>{adminRenewal.sixMonth}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Right Col ends */}

        {/* className={`${style.name}`} */}
      </div>
    </div>
  );
}

export default SalesDash;
