import { useEffect, useState } from "react"

function Dashboard({ setPage }){

  const [users,setUsers] = useState([])
  const [reports,setReports] = useState([])
  const [winners,setWinners] = useState([])

  useEffect(()=>{

    fetch("https://laovip888.onrender.com/users")
      .then(res=>res.json())
      .then(data=>setUsers(data))

    fetch("https://laovip888.onrender.com/daily-report")
      .then(res=>res.json())
      .then(data=>setReports(data))

    fetch("https://laovip888.onrender.com/winners-history")
      .then(res=>res.json())
      .then(data=>setWinners(data))

  },[])

  const totalBalance =
    users.reduce(
      (sum,user)=>
      sum + Number(user.balance || 0),
      0
    )

  const todayReport = reports[0] || {}

  return(

    <div>

      <h1
        style={{
          color:"gold",
          textAlign:"center",
          marginBottom:"30px"
        }}
      >
        📊 Dashboard
      </h1>

      <div
        style={{
          display:"grid",
          gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",
          gap:"20px"
        }}
      >

        <div
          style={card}
          onClick={()=>setPage("members")}
        >
          👥 สมาชิกทั้งหมด
          <h2>{users.length}</h2>
        </div>

        <div
          style={card}
          onClick={()=>setPage("history")}
        >
          💰 เครดิตรวมระบบ
          <h2>{totalBalance} บาท</h2>
        </div>

        <div
          style={card}
          onClick={()=>setPage("history")}
        >
          📥 ยอดรับล่าสุด
          <h2>{todayReport.betTotal || 0} บาท</h2>
        </div>

        <div
          style={card}
          onClick={()=>setPage("history")}
        >
          📤 ยอดจ่ายล่าสุด
          <h2>{todayReport.payTotal || 0} บาท</h2>
        </div>

        <div
          style={card}
          onClick={()=>setPage("history")}
        >
          📈 กำไรล่าสุด
          <h2>{todayReport.profit || 0} บาท</h2>
        </div>

        <div
          style={card}
          onClick={()=>setPage("winners")}
        >
          🏆 ผู้ถูกรางวัลทั้งหมด
          <h2>{winners.length}</h2>
        </div>

      </div>

    </div>

  )

}

const card = {
  background:"#111",
  border:"1px solid gold",
  borderRadius:"15px",
  padding:"25px",
  color:"white",
  textAlign:"center",
  fontSize:"20px"
}

export default Dashboard