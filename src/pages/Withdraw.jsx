import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Withdraw(){

  const navigate = useNavigate()

  const [amount,setAmount] = useState("")

  const user = JSON.parse(
    localStorage.getItem("user")
  )

  const submitWithdraw = async() => {

    console.log("CLICK WITHDRAW")

    if(!amount){
      alert("กรอกจำนวนเงิน")
      return
    }

    if(
      !user.bankName ||
      !user.bankOwner ||
      !user.bankNumber
    ){
      alert("กรุณาผูกบัญชีก่อน")
      return
    }

    await fetch(
      "https://laovip888.onrender.com/withdraw",
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

    alert("ส่งคำขอถอนสำเร็จ รอแอดมินอนุมัติ")

    setAmount("")
  }

  return(

    <div
      style={{
        background:"#000",
        minHeight:"100vh",
        color:"white",
        padding:"20px"
      }}
    >

      <button
        onClick={() => navigate("/finance")}
        style={{
          background:"#111",
          color:"gold",
          border:"1px solid gold",
          padding:"10px 20px",
          borderRadius:"10px"
        }}
      >
        ← ย้อนกลับ
      </button>

      <h1
        style={{
          color:"gold",
          textAlign:"center",
          marginTop:"20px"
        }}
      >
        🏦 ถอนเงิน
      </h1>

      <div
        style={{
          background:"#111",
          border:"1px solid gold",
          borderRadius:"15px",
          padding:"20px",
          marginTop:"20px"
        }}
      >

        <p>ธนาคาร : {user.bankName}</p>
        <p>ชื่อบัญชี : {user.bankOwner}</p>
        <p>เลขบัญชี : {user.bankNumber}</p>

        <input
          type="number"
          placeholder="จำนวนเงิน"
          value={amount}
          onChange={(e)=>
            setAmount(e.target.value)
          }
          style={{
            width:"100%",
            padding:"12px",
            borderRadius:"10px",
            marginTop:"15px"
          }}
        />

        <button
          onClick={()=>{
           alert("BUTTON WORK")
            submitWithdraw()
          }}
          style={{
            width:"100%",
            marginTop:"15px",
            background:"gold",
            color:"black",
            border:"none",
            padding:"15px",
            borderRadius:"10px",
            fontWeight:"bold"
          }}
        >
          ยืนยันถอนเงิน
        </button>

      </div>

    </div>

  )

}

export default Withdraw