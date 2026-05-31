import { useEffect,useState } from "react"
import { useNavigate } from "react-router-dom"

function Winners(){

  const navigate = useNavigate()

  const [winners,setWinners] = useState([])
  const [message,setMessage] = useState("")
  

  useEffect(()=>{

  const user = JSON.parse(
    localStorage.getItem("user")
  )

  fetch("http://localhost:3001/bets")
  .then(res=>res.json())
  .then(history=>{

      const myBets = history.filter(
      item => item.userId === user.id
    )

    const betStatus = myBets.length > 0

    fetch(
      "http://localhost:3001/winners-history"
    )
    .then(res=>res.json())
    .then(data=>{

      const myWins = data.filter(
        item => item.userId === user.id
      )

      setWinners(myWins)

      if(myWins.length > 0){

  setMessage("winner")

}
else if(betStatus){

  setMessage("waiting")

}
else{

  fetch("http://localhost:3001/history")
  .then(res=>res.json())
  .then(history=>{

    const myHistory = history.filter(
      item => item.userId === user.id
    )

    if(myHistory.length > 0){

      setMessage("lose")

    }else{

      setMessage("nobet")

    }

  })

}
    })

  })

},[])

  return(

    <div
      style={{
        background:"#000",
        minHeight:"100vh",
        color:"white",
        padding:"20px",
        paddingBottom:"50px"
      }}
    >

      <button
  onClick={() => navigate("/home")}
  style={{
    background:"#111",
    border:"1px solid gold",
    color:"gold",
    padding:"14px 28px",
    borderRadius:"16px",
    cursor:"pointer",
    fontWeight:"bold",
    fontSize:"18px",
    display:"block",
    margin:"0 auto 25px",
    boxShadow:"0 0 15px rgba(255,215,0,0.3)",
    transition:"0.3s"
  }}
>
  ← ย้อนกลับ
</button>

      <h1
        style={{
          color:"gold",
          textAlign:"center",
          fontSize:"50px"
        }}
      >
        🏆 ผลรางวัล LAOVIP
      </h1>
      

      {message === "nobet" && (

  <div
    style={{
      background:"#111",
      border:"1px solid gold",
      borderRadius:"20px",
      padding:"30px",
      marginTop:"20px",
      textAlign:"center"
    }}
  >

    <h2
      style={{
        color:"gold"
      }}
    >
      🎯 ยังไม่มีรายการแทงหวย
    </h2>

    <p>
      ใกล้ถึงเวลาออกรางวัลแล้ว
    </p>

    <p>
      คุณอาจเป็นผู้โชคดีคนต่อไป
    </p>

    <p>
       เลือกเลขที่ชอบแล้วมาลุ้นรางวัลกับ LAO-VIP
    </p>

  </div>

)}

      {/* WAITING */}
{message === "waiting" && (

  <div
    style={{
      background:"#111",
      border:"1px solid gold",
      borderRadius:"20px",
      padding:"30px",
      marginTop:"20px",
      textAlign:"center"
    }}
  >

    <h2 style={{color:"#00d4ff"}}>
      ⏳ กำลังรอประกาศผลหวย
    </h2>

    <p>
      คุณได้ส่งโพยเรียบร้อยแล้ว
    </p>

    <p>
       ระบบบันทึกรายการแทงของคุณแล้ว
    </p>

    <p>
      โปรดรอผลรางวัลหลังเวลาปิดรับแทง
    </p>

    <p>
       ขอให้โชคดี
    </p>

  </div>

)}

      {/* LOSE */}
      {message === "lose" && (

        

        <div
          style={{
            background:"#111",
            border:"1px solid gold",
            borderRadius:"20px",
            padding:"30px",
            marginTop:"20px",
            textAlign:"center"
          }}
        >

          <h2
            style={{
              color:"orange"
            }}
          >
            😢 งวดนี้ยังไม่ถูกรางวัล
          </h2>

          <p>
            ไม่เป็นไรนะ ❤️
          </p>

          <p>
            คุณเข้าใกล้การเป็นผู้โชคดีแล้ว
          </p>

          <p>
             งวดหน้าอาจเป็นคุณ
          </p>

          <p>
             เลือกเลขที่ชอบ
            แล้วกลับมาลุ้นรางวัลกับ LAO-VIP
          </p>

        </div>

      )}

      {/* WINNER */}
      {message === "winner" && (

        winners.map((item,index)=>(

          <div
            key={index}
            style={{
              background:"#111",
              border:"1px solid gold",
              borderRadius:"20px",
              padding:"25px",
              marginTop:"20px"
            }}
          >

            <h2
              style={{
                color:"#00ff66",
                textAlign:"center"
              }}
            >
              🎉 คุณคือผู้โชคดี
            </h2>

            <p>
              🏆 รางวัล : {item.prize}
            </p>

            <p>
              🎯 เลขที่ถูก : {item.number}
            </p>

            <p>
              💵 ยอดแทง : {item.bet} บาท
            </p>

            <p
              style={{
                color:"gold",
                fontWeight:"bold",
                fontSize:"22px"
              }}
            >
              💰 รับเงินรางวัล : {item.win} บาท
            </p>

            <p>
              📅 {item.date}
            </p>

          </div>

        ))

      )}

      {/* INFO */}
      <div
        style={{
          background:"#111",
          border:"1px solid gold",
          borderRadius:"20px",
          padding:"20px",
          marginTop:"20px",
          textAlign:"center"
        }}
      >

        <h2
          style={{
            color:"gold"
          }}
        >
           LAO-VIP
        </h2>

        <p>
          ลุ้นรางวัลใหญ่ทุกวัน
        </p>

        <p>
          💰 จ่ายจริง 100%
        </p>

        <p>
          ⚡ ถอนเงินรวดเร็ว
        </p>

        <p>
          🏆 มีผู้โชคดีทุกงวด
        </p>

      </div>

      {/* BET BUTTON */}
      <button
        onClick={() => navigate("/bet")}
        style={{
          width:"100%",
          padding:"18px",
          marginTop:"20px",
          background:"gold",
          color:"#000",
          border:"none",
          borderRadius:"15px",
          fontWeight:"bold",
          fontSize:"20px",
          cursor:"pointer"
        }}
      >
        🎲 ไปแทงหวย
      </button>

      {/* POSTER */}
      <img
  src="/ads01.png"
  alt="LAO VIP"
  style={{
    width:"100%",
    maxWidth:"500px",
    height:"500px",
    objectFit:"cover",
    borderRadius:"20px",
    border:"1px solid gold",
    boxShadow:"0 0 20px rgba(255,215,0,.3)",
    display:"block",
    margin:"20px auto"
  }}
/>

    </div>

  )

}

export default Winners

