import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Deposit() {

  const navigate = useNavigate()

  const user = JSON.parse(
    localStorage.getItem("user")
  )

  const [showWithdraw, setShowWithdraw] =
    useState(false)

  const [amount, setAmount] =
    useState("")

  // ถอนเงิน
  const withdrawMoney = async () => {

    // ยังไม่ผูกบัญชี
    if (!user.bankNumber) {

      alert(
        "กรุณาผูกเลขบัญชีที่หน้าโปรไฟล์\nหากทำไม่ถูกกรุณาติดต่อแอดมิน"
      )

      return
    }

    // ไม่ใส่จำนวนเงิน
    if (!amount) {
      alert("กรุณาใส่จำนวนเงิน")
      return
    }

    // เงินไม่พอ
    if (
      Number(amount) > Number(user.balance)
    ) {
      alert("ยอดเงินไม่พอ")
      return
    }

    // ตัดเงิน
    await fetch(
  "http://localhost:3001/withdraw",
  {
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      username:user.username,
      userId:user.id,
      amount:Number(amount),
      bankName:user.bankName,
      bankOwner:user.bankOwner,
      bankNumber:user.bankNumber
    })
  }
)

    alert(
      "ส่งคำขอถอนเงินสำเร็จ\nระบบกำลังตรวจสอบ"
    )

    

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
        fontSize:"55px",
        marginBottom:"25px"
      }}>
        การเงิน
      </h1>

      {/* BALANCE */}
      <div style={{
        background:"#111",
        border:"1px solid gold",
        borderRadius:"20px",
        padding:"25px",
        textAlign:"center",
        marginBottom:"25px"
      }}>

        <div style={{
          color:"#aaaaaa",
          marginBottom:"10px",
          fontSize:"22px"
        }}>
          ยอดเงินคงเหลือ
        </div>

        <div style={{
          color:"#e6b000",
          fontSize:"55px",
          fontWeight:"bold"
        }}>
          {user.balance} บาท
        </div>

      </div>

      {/* BUTTONS */}
      <div style={{
        display:"flex",
        gap:"15px",
        marginBottom:"25px"
      }}>

        {/* เติมเงิน */}
        <button
          onClick={() =>
            window.open(
              "https://lin.ee/oQnuNZU",
              "_blank"
            )
          }
          style={{
            flex:1,
            padding:"18px",
            background:"#007fc8",
            border:"none",
            borderRadius:"15px",
            color:"white",
            fontWeight:"bold",
            fontSize:"20px",
            cursor:"pointer"
          }}
        >
          เติมเงิน
        </button>

        {/* ถอนเงิน */}
        <button
          onClick={() =>
            setShowWithdraw(true)
          }
          style={{
            flex:1,
            padding:"18px",
            background:"#d50000",
            border:"none",
            borderRadius:"15px",
            color:"white",
            fontWeight:"bold",
            fontSize:"20px",
            cursor:"pointer"
          }}
        >
          ถอนเงิน
        </button>

      </div>

      {/* ถอนเงิน */}
      {
        showWithdraw && (

          <div style={{
            background:"#111",
            border:"1px solid gold",
            borderRadius:"20px",
            padding:"20px"
          }}>

            <h2 style={{
              color:"gold",
              textAlign:"center",
              marginBottom:"20px"
            }}>
              ถอนเงิน
            </h2>

            {/* BANK */}
            <div style={{
              marginBottom:"20px",
              fontSize:"20px",
              textAlign:"center"
            }}>

              เลขบัญชี:

              <span style={{
                color:"gold",
                fontWeight:"bold"
              }}>
                {" "}
                {
                  user.bankNumber
                  || "ยังไม่ผูกบัญชี"
                }
              </span>

            </div>

            {/* INPUT */}
            <input
              type="number"
              placeholder="กรอกจำนวนเงิน"
              value={amount}
              onChange={(e)=>
                setAmount(e.target.value)
              }
              style={{
                width:"100%",
                padding:"18px",
                borderRadius:"15px",
                border:"none",
                fontSize:"20px",
                marginBottom:"20px"
              }}
            />

            {/* BTN */}
            <button
              onClick={withdrawMoney}
              style={{
                width:"100%",
                padding:"18px",
                background:"gold",
                border:"none",
                borderRadius:"15px",
                color:"#000",
                fontWeight:"bold",
                fontSize:"20px",
                cursor:"pointer"
              }}
            >
              ยืนยันถอนเงิน
            </button>

            {/* HELP */}
            <div style={{
              marginTop:"20px",
              color:"#aaa",
              textAlign:"center",
              lineHeight:"35px"
            }}>
              หากทำไม่ถูก<br />
              กรุณาติดต่อแอดมิน
            </div>

            {/* CONTACT ADMIN */}
            <button
              onClick={() =>
                window.open(
                  "https://lin.ee/oQnuNZU",
                  "_blank"
                )
              }
              style={{
                width:"100%",
                marginTop:"20px",
                padding:"16px",
                background:"#05b9aa",
                border:"none",
                borderRadius:"15px",
                color:"white",
                fontWeight:"bold",
                fontSize:"18px",
                cursor:"pointer"
              }}
            >
              📞 ติดต่อแอดมิน
            </button>

          </div>

        )
      }

    </div>

  )
}

export default Deposit