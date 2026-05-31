import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

function Bet() {

  const navigate = useNavigate()

  const [threeTop, setThreeTop] = useState("")
  const [twoTop, setTwoTop] = useState("")
  const [twoBottom, setTwoBottom] = useState("")
  const [price, setPrice] = useState("")

  const [bets, setBets] = useState([])

  const [settings,setSettings] = useState({
  lottoTime:"",
  closeTime:""
  
})
const [popupMessage,setPopupMessage] = useState("")
const [showPopup,setShowPopup] = useState(false)
const [showClosePopup,setShowClosePopup] = useState(false)

useEffect(()=>{

  fetch("http://localhost:3001/settings")
    .then(res=>res.json())
    .then(data=>setSettings(data))

},[])

  // เพิ่มโพย
  // เช็กเวลาปิดรับแทง
const addBet = () => {

  const currentTime =
    new Date().getHours().toString().padStart(2,"0")
    + ":" +
    new Date().getMinutes().toString().padStart(2,"0")

  if(currentTime >= settings.closeTime){

    setShowClosePopup(true)

    return

  }

  // เช็กว่าใส่เลขไหม
  if (
    !threeTop &&
    !twoTop &&
    !twoBottom
  ) {
    setPopupMessage("กรุณาใส่ตัวเลข")
    setShowPopup(true)
    return
  }

    // เช็กเลข 3 ตัวบน
    if (threeTop) {

      if (!/^\d+$/.test(threeTop)) {
        setPopupMessage("เลข 3 ตัวบน ต้องเป็นตัวเลขเท่านั้น")
        setShowPopup(true)
        return
      }

      if (threeTop.length !== 3) {
        setPopupMessage("กรุณาป้อนเลข 3 ตัวบนให้ครบ 3 ตัว")
        setShowPopup(true)
        return
      }

    }

    // เช็กเลข 2 ตัวบน
    if (twoTop) {

      if (!/^\d+$/.test(twoTop)) {
        setPopupMessage("เลข 2 ตัวบน ต้องเป็นตัวเลขเท่านั้น")
        setShowPopup(true)
        return
      }

      if (twoTop.length !== 2) {
        setPopupMessage("กรุณาป้อนเลข 2 ตัวบนให้ครบ 2 ตัว")
        setShowPopup(true)
        return
      }

    }

    // เช็กเลข 2 ตัวล่าง
    if (twoBottom) {

      if (!/^\d+$/.test(twoBottom)) {
        setPopupMessage("เลข 2 ตัวล่าง ต้องเป็นตัวเลขเท่านั้น")
        setShowPopup(true)
        return
      }

      if (twoBottom.length !== 2) {
        setPopupMessage("กรุณาป้อนเลข 2 ตัวล่างให้ครบ 2 ตัว")
        setShowPopup(true)
        return
      }

    }

    // เช็กจำนวนเงิน
    if (!price) {
      setPopupMessage("กรุณาใส่จำนวนเงิน")
      setShowPopup(true)
      return
    }

    const newBet = {
      threeTop,
      twoTop,
      twoBottom,
      price
    }

    setBets([...bets, newBet])

    // reset
    setThreeTop("")
    setTwoTop("")
    setTwoBottom("")
    setPrice("")
  }

  // รวมยอด
  const total = bets.reduce(
    (sum, item) => sum + Number(item.price),
    0
  )

  // ซื้อหวย
  const buyLottery = async () => {

  // ไม่มีโพย
  if (bets.length === 0) {
    setPopupMessage("ยังไม่มีโพย")
    setShowPopup(true)
    return
  }

 

 // เช็กเวลาปิดรับแทง
const settingRes = await fetch(
  "http://localhost:3001/settings"
)

const settings = await settingRes.json()

const currentTime =
  new Date().getHours().toString().padStart(2,"0")
  + ":" +
  new Date().getMinutes().toString().padStart(2,"0")

if(currentTime >= settings.closeTime){

  setShowClosePopup(true)

  return

}

// ดึง user
const user = JSON.parse(
  localStorage.getItem("user")
)

// เงินไม่พอ
if (user.balance < total) {
  setPopupMessage("เครดิตไม่เพียงพอ กรุณาเติมเงิน")
  setShowPopup(true)
  return
}

// ตัดเงิน
const res = await fetch(

  "http://localhost:3001/deduct-balance",

  {

    method:"POST",

    headers:{
      "Content-Type":"application/json"
    },

    body:JSON.stringify({

      id:user.id,

      amount:total

    })

  }

)

const data = await res.json()

if(!data.success){

  setPopupMessage(
  data.message || "เครดิตไม่พอ"
)

setShowPopup(true)

  return

}

user.balance = data.balance

localStorage.setItem(

  "user",

  JSON.stringify(user)

)
await fetch(

  "http://localhost:3001/save-bet",

  {

    method:"POST",

    headers:{
      "Content-Type":"application/json"
    },

    body:JSON.stringify({

      userId:user.id,

      username:user.username,

      total,

      bets,

      date:new Date()

    })

  }

)

// เวลา
const now = new Date()

    // เลขบิล
    const billNumber =
      "VIP" +
      Math.floor(
        10000000 + Math.random() * 90000000
      )

    // ใบเสร็จ
    const receipt = {

  userId:user.id,

  username:user.username,

  billNumber,

  date: now.toLocaleDateString(),

  time: now.toLocaleTimeString(),

  lottoTime: settings.lottoTime,

  total,

  bets

}

    // SAVE RECEIPT
    localStorage.setItem(
      "receipt",
      JSON.stringify(receipt)
    )

    // SAVE HISTORY
    const oldHistory =
      JSON.parse(
        localStorage.getItem("history")
      ) || []

    // เพิ่มล่าสุดบนสุด
    oldHistory.unshift(receipt)

    // save history
    localStorage.setItem(
      "history",
      JSON.stringify(oldHistory)
    )

    

    // ล้างโพย
    setBets([])

    // ไปใบเสร็จ
    navigate("/receipt")

  }

  return (

    <div style={{
      background:"#000",
      minHeight:"100vh",
      color:"white",
      padding:"20px",
      paddingBottom:"100px"
    }}>

      {/* BACK */}
      <button
        onClick={() => navigate("/home")}
        style={{
          background:"#111",
          border:"1px solid gold",
          color:"gold",
          padding:"12px 20px",
          borderRadius:"12px",
          marginBottom:"20px",
          cursor:"pointer",
          fontWeight:"bold"
        }}
      >
        ← ย้อนกลับ
      </button>

      {/* TITLE */}
      <h1 style={{
        color:"gold",
        textAlign:"center",
        marginBottom:"20px",
        fontSize:"55px"
      }}>
         แทงหวย
      </h1>
      <div
  style={{
    textAlign:"center",
    marginBottom:"20px",
    fontSize:"20px",
    fontWeight:"bold"
  }}
>

  <div style={{color:"red"}}>
     ปิดรับเวลา : {settings.closeTime}
  </div>

  <div style={{color:"lime"}}>
     ออกผลเวลา : {settings.lottoTime}
  </div>

</div>
      {/* FORM */}
      <div style={{
        background:"#111",
        padding:"20px",
        borderRadius:"20px",
        border:"1px solid gold"
      }}>

        {/* 3 ตัวบน */}
        <input
          type="text"
          placeholder="เลข 3 ตัวบน"
          value={threeTop}
          maxLength={3}
          onChange={(e)=>
            setThreeTop(
              e.target.value.replace(/\D/g,"")
            )
          }
          disabled={twoTop || twoBottom}
          style={{
            ...inputStyle,
            opacity:
              twoTop || twoBottom
              ? 0.5
              : 1
          }}
        />

        {/* 2 ตัวบน */}
        <input
          type="text"
          placeholder="เลข 2 ตัวบน"
          value={twoTop}
          maxLength={2}
          onChange={(e)=>
            setTwoTop(
              e.target.value.replace(/\D/g,"")
            )
          }
          disabled={threeTop || twoBottom}
          style={{
            ...inputStyle,
            opacity:
              threeTop || twoBottom
              ? 0.5
              : 1
          }}
        />

        {/* 2 ตัวล่าง */}
        <input
          type="text"
          placeholder="เลข 2 ตัวล่าง"
          value={twoBottom}
          maxLength={2}
          onChange={(e)=>
            setTwoBottom(
              e.target.value.replace(/\D/g,"")
            )
          }
          disabled={threeTop || twoTop}
          style={{
            ...inputStyle,
            opacity:
              threeTop || twoTop
              ? 0.5
              : 1
          }}
        />

        {/* จำนวนเงิน */}
        <input
          type="number"
          placeholder="จำนวนเงิน"
          value={price}
          onChange={(e)=>setPrice(e.target.value)}
          style={inputStyle}
        />

        {/* เพิ่มโพย */}
        <button
          onClick={addBet}
          style={{
            width:"100%",
            padding:"15px",
            background:"gold",
            color:"#000",
            border:"none",
            borderRadius:"15px",
            fontWeight:"bold",
            fontSize:"18px",
            cursor:"pointer"
          }}
        >
          เพิ่มโพย
        </button>

      </div>

      {/* TABLE */}
      <div style={{
        marginTop:"25px",
        background:"#111",
        borderRadius:"20px",
        padding:"20px",
        border:"1px solid gold"
      }}>

        <table style={{
          width:"100%",
          borderCollapse:"collapse",
          color:"white"
        }}>

          <thead>

            <tr style={{
              background:"#1a1a1a"
            }}>

              <th style={thStyle}>ลำดับ</th>
              <th style={thStyle}>เลข 3 ตัวบน</th>
              <th style={thStyle}>เลข 2 ตัวบน</th>
              <th style={thStyle}>เลข 2 ตัวล่าง</th>
              <th style={thStyle}>จำนวน</th>

            </tr>

          </thead>

          <tbody>

            {
              bets.map((item,index)=>(

                <tr key={index}>

                  <td style={tdStyle}>
                    {index + 1}
                  </td>

                  <td style={tdStyle}>
                    {item.threeTop}
                  </td>

                  <td style={tdStyle}>
                    {item.twoTop}
                  </td>

                  <td style={tdStyle}>
                    {item.twoBottom}
                  </td>

                  <td style={tdStyle}>
                    {item.price}
                  </td>

                </tr>

              ))
            }

          </tbody>

        </table>

        {/* TOTAL */}
        <div style={{
          marginTop:"20px",
          textAlign:"right",
          color:"gold",
          fontSize:"22px",
          fontWeight:"bold"
        }}>
          รวม: {total} บาท
        </div>

      </div>

      {/* BUTTONS */}
      <div style={{
        display:"flex",
        gap:"15px",
        marginTop:"20px"
      }}>

        {/* BUY */}
        <button
          onClick={buyLottery}
          style={{
            flex:1,
            padding:"16px",
            background:"#00c853",
            color:"white",
            border:"none",
            borderRadius:"15px",
            fontWeight:"bold",
            fontSize:"18px",
            cursor:"pointer"
          }}
        >
          ซื้อหวย
        </button>

        {/* CANCEL */}
        <button
          onClick={() => setBets([])}
          style={{
            flex:1,
            padding:"16px",
            background:"#ff1744",
            color:"white",
            border:"none",
            borderRadius:"15px",
            fontWeight:"bold",
            fontSize:"18px",
            cursor:"pointer"
          }}
        >
          ยกเลิก
        </button>

      </div>
          
        {
  showPopup && (

    <div
      style={{
        position:"fixed",
        top:0,
        left:0,
        right:0,
        bottom:0,
        background:"rgba(0,0,0,0.8)",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        zIndex:9999
      }}
    >

      <div
        style={{
          width:"400px",
          background:"#111",
          border:"2px solid gold",
          borderRadius:"20px",
          padding:"30px",
          textAlign:"center"
        }}
      >

        <h2 style={{
          color:"gold",
          marginBottom:"20px"
        }}>
          🔔 แจ้งเตือน
        </h2>

        <p
          style={{
            color:"white",
            fontSize:"20px",
            marginBottom:"25px"
          }}
        >
          {popupMessage}
        </p>

        <button
          onClick={() => {

          setShowPopup(false)
          setPopupMessage("")

          }}
          style={{
            background:"gold",
            color:"#000",
            border:"none",
            padding:"12px 30px",
            borderRadius:"10px",
            cursor:"pointer",
            fontWeight:"bold"
          }}
        >
          ตกลง
        </button>

      </div>

    </div>

  )
}
      {
        showClosePopup && (

          <div
            style={{
              position:"fixed",
              top:0,
              left:0,
              right:0,
              bottom:0,
              background:"rgba(0,0,0,0.8)",
              display:"flex",
              justifyContent:"center",
              alignItems:"center",
              zIndex:9999
            }}
          >

            <div
              style={{
                width:"450px",
                background:"#111",
                border:"2px solid red",
                borderRadius:"20px",
                padding:"30px",
                textAlign:"center"
              }}
            >

              <h2 style={{color:"red"}}>
                ⛔ หมดเวลาแทงหวย
              </h2>

              <p
                style={{
                  color:"white",
                  fontSize:"18px",
                  lineHeight:"35px"
                }}
              >
                หมดเวลาแทงหวยลาววีไอพีวันนี้
                <br/>
                กรุณาแทงหลังหวยออก
                <br/>
                เป็นหวยของวันพรุ่งนี้
              </p>

              <button
                onClick={()=>
                  setShowClosePopup(false)
                }
                style={{
                  background:"red",
                  color:"white",
                  border:"none",
                  padding:"12px 30px",
                  borderRadius:"10px",
                  cursor:"pointer"
                }}
              >
                ตกลง
              </button>

            </div>

          </div>

        )
      }

    </div>

  )
}




const inputStyle = {
  width:"100%",
  padding:"15px",
  borderRadius:"12px",
  border:"none",
  marginBottom:"15px",
  fontSize:"18px"
}

const thStyle = {
  border:"1px solid #444",
  padding:"12px",
  color:"gold"
}

const tdStyle = {
  border:"1px solid #444",
  padding:"12px",
  textAlign:"center"
}

export default Bet