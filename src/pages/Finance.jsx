import { useNavigate } from "react-router-dom"
import { useEffect,useState } from "react"

function Finance() {

  const navigate = useNavigate()

  const [history,setHistory] = useState([])

  const user = JSON.parse(
    localStorage.getItem("user")
  )

  const loadHistory = async() => {

    const res = await fetch(
      "https://laovip888.onrender.com/finance-history"
    )

    const data = await res.json()

    const userHistory = data.filter(
  item => item.userId === user.id
)
    setHistory(userHistory)

  }

  useEffect(() => {
    loadHistory()
  }, [])

  return (
    <div style={{
      background:"#000",
      minHeight:"100vh",

      color:"white",
      padding:"20px"
    }}>

      <button
        onClick={() => navigate("/home")}
        style={{
          background:"#111",
          border:"1px solid gold",
          color:"gold",
          padding:"12px 20px",
          borderRadius:"12px",
          marginBottom:"20px",
          cursor:"pointer"
        }}
      >
        ← ย้อนกลับ
      </button>

      <h1 style={{
        color:"gold",
        textAlign:"center",
        marginBottom:"20px",
        fontSize:"45px"
      }}>
        💰 การเงิน
      </h1>

      <div style={{
        background:"#111",
        padding:"25px",
        borderRadius:"20px",
        border:"1px solid gold",
        textAlign:"center",
        marginBottom:"25px"
      }}>

        <div style={{
          color:"#999",
          marginBottom:"10px"
        }}>
          ยอดเงินคงเหลือ
        </div>

        <h1 style={{
          color:"#00e676",
          fontSize:"50px"
        }}>
          {user?.balance} บาท
        </h1>

      </div>

      <button
        onClick={() => navigate("/deposit")}
        style={{
          width:"100%",
          padding:"18px",
          background:"#00c853",
          color:"white",
          border:"none",
          borderRadius:"18px",
          fontWeight:"bold",
          fontSize:"20px",
          marginBottom:"15px",
          cursor:"pointer"
        }}
      >
        💸 เติมเงิน
      </button>

      <button
        onClick={() => navigate("/withdraw")}
        style={{
          width:"100%",
          padding:"18px",
          background:"#ff1744",
          color:"white",
          border:"none",
          borderRadius:"18px",
          fontWeight:"bold",
          fontSize:"20px",
          marginBottom:"20px",
          cursor:"pointer"
        }}
      >
        🏦 ถอนเงิน
      </button>

      <div
        style={{
          background:"#111",
          border:"1px solid gold",
          borderRadius:"20px",
          padding:"20px"
        }}
      >

        <h2
          style={{
            color:"red",
            textAlign:"center",
            fontSize:"40px"
          }}
        >
           ประวัติทางการเงิน
        </h2>

        {history.map(item => (

          <div
            key={item.id}
            style={{
              borderBottom:"1px solid #333",
              padding:"15px 0"
            }}
          >

            <p>
              {item.type === "deposit"
                ? "🟢 ฝากเงิน"
                : "🔴 ถอนเงิน"}
            </p>

            <p>
              จำนวน : {item.amount} บาท
            </p>

            <p>
  สถานะ :
  <span
    style={{
      color:
        item.status === "approved"
        ? "lime"
        : item.status === "rejected"
        ? "red"
        : "orange"
    }}
  >
    {" "}
    {
      item.status === "approved"
      ? "ธุรกรรมถอนเสร็จ"

      : item.status === "rejected"
      ? "ธุรกรรมถอนถูกยกเลิก"

      : "กำลังตรวจสอบ"
    }
  </span>
</p>

            <p
              style={{
                color:"#999"
              }}
            >
              {item.date}
            </p>

          </div>

        ))}

      </div>

    </div>
  )
}

export default Finance