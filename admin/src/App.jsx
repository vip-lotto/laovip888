import { useState,useEffect } from "react"
import Winners from "./components/Winners"
import Dashboard from "./components/Dashboard"
import Members from "./components/Members"
import Withdraw from "./components/Withdraw"

function App() {

  const [isLogin,setIsLogin] =
    useState(false)

  const [username,setUsername] =
    useState("")

  const [password,setPassword] =
    useState("")

  const [page,setPage] =
    useState("dashboard")

  // LOGIN
  const handleLogin = () => {

    if(

      username === "adminlaovip"
      &&
      password === "888999"

    ){

      setIsLogin(true)

    }else{

      alert("รหัสไม่ถูกต้อง")

    }

  }

  // LOGOUT
  const handleLogout = () => {

    setIsLogin(false)

  }

  // LOGIN PAGE
  if(!isLogin){

    return (

      <div style={{
        background:"#000",
        minHeight:"100vh",
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
      }}>

        <div style={{
          width:"400px",
          background:"#111",
          padding:"30px",
          borderRadius:"20px",
          border:"1px solid gold"
        }}>

          <h1 style={{
            color:"gold",
            textAlign:"center",
            marginBottom:"30px"
          }}>
            ADMIN LOGIN
          </h1>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e)=>
              setUsername(e.target.value)
            }
            style={inputStyle}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>
              setPassword(e.target.value)
            }
            style={inputStyle}
          />

          <button
            onClick={handleLogin}
            style={btnStyle}
          >
            เข้าสู่ระบบ
          </button>

        </div>

      </div>

    )

  }

  // ADMIN PANEL
  return (

    <div style={{
      background:"#000",
      minHeight:"100vh",
      color:"white"
    }}>

      {/* TOPBAR */}
      <div style={{
        background:"#111",
        padding:"20px",
        borderBottom:"1px solid gold",
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center"
      }}>

        <h1 style={{
          color:"gold"
        }}>
          ADMIN PANEL
        </h1>

        <button
          onClick={handleLogout}
          style={{
            padding:"12px 20px",
            background:"red",
            color:"white",
            border:"none",
            borderRadius:"10px",
            cursor:"pointer",
            fontWeight:"bold"
          }}
        >
          ออกจากระบบ
        </button>

      </div>

      {/* MENU */}
      <div style={{
        display:"flex"
      }}>

        {/* SIDEBAR */}
        <div style={{
          width:"250px",
          background:"#111",
          minHeight:"100vh",
          padding:"20px",
          borderRight:"1px solid gold"
        }}>

          <MenuButton
            text="📊 Dashboard"
            onClick={()=>setPage("dashboard")}
          />

          <MenuButton
            text="👥 ดูสมาชิก"
            onClick={()=>setPage("members")}
          />

          <MenuButton
            text="💸 ถอนเงิน"
            onClick={()=>setPage("withdraw")}
          />

          <MenuButton
            text="🎰 ตรวจหวย"
            onClick={()=>setPage("lottery")}
          />

          <MenuButton
            text="📜 ประวัติรายวัน"
            onClick={()=>setPage("history")}
          />

          <MenuButton
            text="🏆 ผู้ถูกรางวัล"
            onClick={()=>setPage("winners")}
          />  

          <MenuButton
            text="⚙️ ตั้งค่าเวลา"
            onClick={()=>setPage("settings")}
          />

          <MenuButton
            text="💰 อัตราจ่าย"
            onClick={()=>setPage("rates")}
          />

        </div>

        {/* CONTENT */}
        <div style={{
          flex:1,
          padding:"30px"
        }}>

          {
            page === "dashboard" && (
              <Dashboard setPage={setPage} />
           )
          }

          {
           page === "members" && (
            <Members setPage={setPage} />
           )
          }

          {

            page === "withdraw" && (
              <Withdraw />
            )

          }

          {

            page === "lottery" && (

              <Lottery />

            )

          }

          

            {

            page === "history" && (

              <History />

            )
          }

          {
            page === "winners" && (
              <Winners />
            )
          }

            {

            page === "settings" && (

              <Settings />

            )

          }

            {

            page === "rates" && (

              <Rates />

            )

          }
          

        </div>

      </div>

    </div>

  )

}


// MEMBERS



function Lottery(){

  const [bets,setBets] = useState([])

  const [fullResult,setFullResult] = useState("")

  const saveResult = async () => {

  if(fullResult.length !== 5){

    alert("กรอกผลหวย 5 ตัว")

    return

  }

  await fetch(

    "https://laovip888.onrender.com/save-result",

    {

      method:"POST",

      headers:{
        "Content-Type":"application/json"
      },

      body:JSON.stringify({

        result5:fullResult,

        threeTop:fullResult.slice(2,5),

        twoTop:fullResult.slice(3,5),

        twoBottom:fullResult.slice(0,2)

      })

    }

  )

  alert("บันทึกผลหวยเรียบร้อย")

}

  const summary3Top = {}
  const summary2Top = {}
  const summary2Bottom = {}

  bets.forEach(bet => {

    bet.bets.forEach(item => {

    // 3 ตัวบน
    if(item.threeTop){

      if(!summary3Top[item.threeTop]){

        summary3Top[item.threeTop] = 0

      }

      summary3Top[item.threeTop] +=
        Number(item.price)

    }

    // 2 ตัวบน
    if(item.twoTop){

      if(!summary2Top[item.twoTop]){

        summary2Top[item.twoTop] = 0

      }

      summary2Top[item.twoTop] +=
        Number(item.price)

    }

    // 2 ตัวล่าง
    if(item.twoBottom){

      if(!summary2Bottom[item.twoBottom]){

        summary2Bottom[item.twoBottom] = 0

      }

      summary2Bottom[item.twoBottom] +=
        Number(item.price)

    }

  })

})

  const loadBets = async () => {

    const res = await fetch(
      "https://laovip888.onrender.com/bets"
    )

    const data = await res.json()

    setBets(data)

  }

  useEffect(()=>{

    loadBets()

    const interval = setInterval(()=>{
      loadBets()
    },3000)

    return ()=>clearInterval(interval)

  },[])

  return (

    <div>

       <h1 style={{
   color:"gold"
 }}>
   🎰 รายการแทงหวย
 </h1>

 <div
 style={{
   background:"#111",
   border:"1px solid gold",
   borderRadius:"15px",
   padding:"20px",
   marginBottom:"20px"
 }}
 >

 <h3 style={{color:"gold"}}>
 ผลหวย 5 ตัว
 </h3>

 <input
   type="text"
   maxLength={5}
   value={fullResult}
   onChange={(e)=>
     setFullResult(
       e.target.value.replace(/\D/g,"")
     )
   }
   placeholder="12345"
   style={{
     width:"100%",
     padding:"12px",
     fontSize:"20px"
   }}
 />
<button
  onClick={saveResult}
  style={{
    width:"100%",
    padding:"15px",
    marginTop:"15px",
    background:"green",
    color:"white",
    border:"none",
    borderRadius:"10px",
    fontSize:"18px",
    cursor:"pointer",
    fontWeight:"bold"
  }}
>
  💾 บันทึกผลหวย
</button>
 {
   fullResult.length === 5 && (
     <div style={{
       marginTop:"15px",
       color:"white",
       lineHeight:"35px"
     }}>
       <div>3 ตัวบน : {fullResult.slice(2,5)}</div>
       <div>2 ตัวบน : {fullResult.slice(3,5)}</div>
       <div>2 ตัวล่าง : {fullResult.slice(0,2)}</div>
     </div>
   )
 }

 </div>

 <div
 style={{
    background:"#111",
    border:"1px solid gold",
    borderRadius:"15px",
    padding:"20px",
    marginBottom:"20px"
  }}
>

  <h1 style={{
    color:"gold"
  }}>
    📊 สรุปยอดรวม
  </h1>

  <h2>3 ตัวบน</h2>

  {

    Object.entries(summary3Top).map(
      ([number,total])=>(

        <p key={number}>

          {number} = {total} บาท

        </p>

      )
    )

  }

  <h2>2 ตัวบน</h2>

  {

    Object.entries(summary2Top).map(
      ([number,total])=>(

        <p key={number}>

          {number} = {total} บาท

        </p>

      )
    )

  }

  <h2>2 ตัวล่าง</h2>

  {

    Object.entries(summary2Bottom).map(
      ([number,total])=>(

        <p key={number}>

          {number} = {total} บาท

        </p>

      )
    )

  }

</div>

      {bets.map((bet,index)=>(

        <div
          key={index}
          style={{
            background:"#111111",
            border:"1px solid gold",
            borderRadius:"15px",
            padding:"20px",
            marginBottom:"15px"
          }}
        >

          <h3>👤 {bet.username}</h3>

          <p>🆔 {bet.userId}</p>

          <p>💰 รวม {bet.total} บาท</p>

          {bet.bets.map((item,i)=>(

            <div key={i}>

              <p>3 ตัวบน : {item.threeTop}</p>

              <p>2 ตัวบน : {item.twoTop}</p>

              <p>2 ตัวล่าง : {item.twoBottom}</p>

              <p>จำนวน : {item.price} บาท</p>

              <hr />

            </div>

          ))}

        </div>

      ))}

    </div>

  )

}

function History(){

  const [reports,setReports] = useState([])

  useEffect(()=>{

    fetch("https://laovip888.onrender.com/daily-report")
      .then(res=>res.json())
      .then(data=>{

        setReports(data)

      })

  },[])

  return (

    <div>

      <h1 style={{
        color:"gold",
        marginBottom:"20px"
      }}>
        📜 ประวัติรายวัน
      </h1>

      {

        reports.map((item,index)=>(

          <div
            key={index}
            style={{
              background:"#111",
              border:"1px solid gold",
              borderRadius:"15px",
              padding:"20px",
              marginBottom:"20px",
              color:"white"
            }}
          >

            <h3 style={{
              color:"gold"
            }}>
              📅 {item.date}
            </h3>

            <p>
              💰 ยอดรับ : {item.betTotal} บาท
            </p>

            <p>
              💸 ยอดจ่าย : {item.payTotal} บาท
            </p>

            <p style={{
              color:"#00ff66",
              fontWeight:"bold"
            }}>
              📈 กำไร : {item.profit} บาท
            </p>

          </div>

        ))

      }

    </div>

  )

}

function Rates(){

  const [threeTop,setThreeTop] =
    useState(850)

  const [twoTop,setTwoTop] =
    useState(70)

  const [twoBottom,setTwoBottom] =
    useState(70)

  useEffect(()=>{

    fetch(
      "https://laovip888.onrender.com/rates"
    )
    .then(res=>res.json())
    .then(data=>{

      setThreeTop(data.threeTop)
      setTwoTop(data.twoTop)
      setTwoBottom(data.twoBottom)

    })

  },[])

  const saveRates = async () => {

    await fetch(

      "https://laovip888.onrender.com/save-rates",

      {

        method:"POST",

        headers:{
          "Content-Type":"application/json"
        },

        body:JSON.stringify({

          threeTop,
          twoTop,
          twoBottom

        })

      }

    )

    alert("บันทึกอัตราจ่ายเรียบร้อย")

  }

  return (

    <div>

      <h1 style={{
        color:"gold"
      }}>
        💰 อัตราจ่าย
      </h1>

      <p>3 ตัวบน</p>

      <input
        type="number"
        value={threeTop}
        onChange={(e)=>
          setThreeTop(
            Number(e.target.value)
          )
        }
        style={inputStyle}
      />

      <p>2 ตัวบน</p>

      <input
        type="number"
        value={twoTop}
        onChange={(e)=>
          setTwoTop(
            Number(e.target.value)
          )
        }
        style={inputStyle}
      />

      <p>2 ตัวล่าง</p>

      <input
        type="number"
        value={twoBottom}
        onChange={(e)=>
          setTwoBottom(
            Number(e.target.value)
          )
        }
        style={inputStyle}
      />

      <button
        onClick={saveRates}
        style={btnStyle}
      >
        บันทึกอัตราจ่าย
      </button>

    </div>

  )

}
function Settings(){

  const [closeTime,setCloseTime] =
    useState("21:00")

  const [lottoTime,setLottoTime] =
    useState("21:30")

  useEffect(()=>{

    fetch(
      "https://laovip888.onrender.com/settings"
    )
    .then(res=>res.json())
    .then(data=>{

      setCloseTime(data.closeTime)
      setLottoTime(data.lottoTime)

    })

  },[])

  const saveSettings = async () => {

    await fetch(

      "https://laovip888.onrender.com/save-settings",

      {

        method:"POST",

        headers:{
          "Content-Type":"application/json"
        },

        body:JSON.stringify({

          closeTime,
          lottoTime

        })

      }

    )

    alert("บันทึกเวลาเรียบร้อย")

  }

  return (

    <div>

      <h1 style={{
        color:"gold"
      }}>
        ⚙️ ตั้งค่าเวลา
      </h1>

      <p>เวลาปิดรับแทง</p>

      <input
        type="time"
        value={closeTime}
        onChange={(e)=>
          setCloseTime(e.target.value)
        }
        style={inputStyle}
      />

      <p>เวลาออกผล</p>

      <input
        type="time"
        value={lottoTime}
        onChange={(e)=>
          setLottoTime(e.target.value)
        }
        style={inputStyle}
      />

      <button
        onClick={saveSettings}
        style={btnStyle}
      >
        บันทึกเวลา
      </button>

    </div>

  )

}

// MENU BUTTON
function MenuButton({ text,onClick }){

  return (

    <button
      onClick={onClick}
      style={{
        width:"100%",
        padding:"15px",
        marginBottom:"15px",
        background:"#222",
        color:"white",
        border:"1px solid gold",
        borderRadius:"12px",
        cursor:"pointer",
        fontSize:"16px",
        fontWeight:"bold"
      }}
    >
      {text}
    </button>

  )

}

const inputStyle = {

  width:"100%",
  padding:"15px",
  marginBottom:"15px",
  borderRadius:"10px",
  border:"none",
  fontSize:"16px",
  boxSizing:"border-box"

}

const btnStyle = {

  width:"100%",
  padding:"15px",
  background:"gold",
  color:"#0c0c0c",
  border:"none",
  borderRadius:"10px",
  fontWeight:"bold",
  fontSize:"18px",
  cursor:"pointer"

}

export default App