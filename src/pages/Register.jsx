import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Register() {

  const navigate = useNavigate()

  const [username,setUsername] =
    useState("")

  const [phone,setPhone] =
    useState("")

  const [password,setPassword] =
    useState("")

  const [confirmPassword,setConfirmPassword] =
    useState("")

  const [showPopup,setShowPopup] =
  useState(false)

const [popupText,setPopupText] =
  useState("")  

  // สมัครสมาชิก
  const handleRegister = async () => {

    // เช็คข้อมูล
    if (
      !username ||
      !phone ||
      !password ||
      !confirmPassword
    ) {

      setPopupText("กรุณากรอกข้อมูลให้ครบ")
      setShowPopup(true)

      return
    }

    // รหัสไม่ตรง
    if (password !== confirmPassword) {

      setPopupText("ยืนยันรหัสผ่านไม่ตรงกัน")
      setShowPopup(true)

      return
    }

    // สุ่มเลขไอดี
    const userId =
      "VIP-" +
      Math.floor(
        1000 + Math.random() * 9000
      )

    // USER
    const user = {

      id:userId,

      username,

      phone,

      password,

      balance:0

    }

    try {

      // SEND TO BACKEND
      const res = await fetch(

        "http://localhost:3001/register",

        {

          method:"POST",

          headers:{
            "Content-Type":"application/json"
          },

          body:JSON.stringify(user)

        }

      )

      const data = await res.json()

      setPopupText(data.message)
      setShowPopup(true)

      

    } catch(error) {

      setPopupText("เชื่อมต่อเซิร์ฟเวอร์ไม่ได้")
      setShowPopup(true)

      console.log(error)

    }

  }

  return (

    <div style={{
      background:"#000",
      minHeight:"100vh",
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      padding:"20px"
    }}>

      {/* CARD */}
      <div style={{
        width:"100%",
        maxWidth:"420px",
        background:"#111",
        padding:"30px",
        borderRadius:"25px",
        border:"1px solid gold",
        boxShadow:
          "0 0 20px rgba(255,215,0,0.3)"
      }}>

        {/* LOGO */}
        <div style={{
          textAlign:"center",
          marginBottom:"25px"
        }}>

          <img
            src="/ads01.png"
            alt="logo"
            style={{
              width:"220px",
              borderRadius:"25px",
              boxShadow:"0 0 35px gold"
            }}
          />

          <h1 style={{
            color:"gold",
            fontSize:"55px",
            marginTop:"20px",
            fontWeight:"bold",
            textShadow:"0 0 20px gold"
          }}>
            LAO-VIP
          </h1>

          <div style={{
            color:"white",
            fontSize:"24px",
            marginTop:"10px"
          }}>
            เว็บหวยออนไลน์ VIP
          </div>

        </div>

        {/* TITLE */}
        <h1 style={{
          color:"gold",
          textAlign:"center",
          marginBottom:"25px",
          fontSize:"45px"
        }}>
          สมัครสมาชิก
        </h1>

        {/* USERNAME */}
        <input
          type="text"
          placeholder="ชื่อผู้ใช้"
          value={username}
          onChange={(e)=>
            setUsername(e.target.value)
          }
          style={inputStyle}
        />

        {/* PHONE */}
        <input
          type="text"
          placeholder="เบอร์โทร"
          value={phone}
          onChange={(e)=>
            setPhone(e.target.value)
          }
          style={inputStyle}
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="สร้างรหัสผ่าน"
          value={password}
          onChange={(e)=>
            setPassword(e.target.value)
          }
          style={inputStyle}
        />

        {/* CONFIRM PASSWORD */}
        <input
          type="password"
          placeholder="ยืนยันรหัสผ่าน"
          value={confirmPassword}
          onChange={(e)=>
            setConfirmPassword(
              e.target.value
            )
          }
          style={inputStyle}
        />

        {/* REGISTER */}
        <button
          onClick={handleRegister}
          style={btnStyle}
        >
          สมัครสมาชิก
        </button>

        {/* BACK */}
        <button
          onClick={() => navigate("/")}
          style={backStyle}
        >
          ← กลับหน้าเข้าสู่ระบบ
        </button>

      </div>
        
        {showPopup && (

      <div
        style={{
          position:"fixed",
          top:0,
          left:0,
          width:"100%",
          height:"100%",
          background:"rgba(0,0,0,0.7)",
          display:"flex",
          justifyContent:"center",
          alignItems:"center",
          zIndex:9999
        }}
      >

        <div
          style={{
            background:"#111",
            border:"2px solid gold",
            borderRadius:"20px",
            padding:"30px",
            width:"90%",
            maxWidth:"450px",
            textAlign:"center",
            color:"white"
          }}
        >

          <h2 style={{color:"gold"}}>
            🔔 แจ้งเตือน
          </h2>

          <p style={{fontSize:"20px"}}>
            {popupText}
          </p>

          <button
            onClick={() => {

              setShowPopup(false)

              if(
                popupText.includes("สำเร็จ")
              ){
                navigate("/")
              }

          }}
        >
          ตกลง
          </button>

        </div>

      </div>

    )}
      
    </div>

  )
}

const inputStyle = {
  width:"100%",
  padding:"15px",
  marginBottom:"15px",
  borderRadius:"12px",
  border:"none",
  fontSize:"18px",
  boxSizing:"border-box"
}

const btnStyle = {
  width:"100%",
  padding:"15px",
  background:"gold",
  color:"#000",
  border:"none",
  borderRadius:"15px",
  fontWeight:"bold",
  fontSize:"18px",
  cursor:"pointer"
}

const backStyle = {
  width:"100%",
  padding:"15px",
  marginTop:"15px",
  background:"#222",
  color:"white",
  border:"none",
  borderRadius:"15px",
  fontWeight:"bold",
  fontSize:"18px",
  cursor:"pointer"
}

export default Register