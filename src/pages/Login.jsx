import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Login() {

  const navigate = useNavigate()

  const [username, setUsername] =
    useState("")

  const [password, setPassword] =
    useState("")

  const [showPopup,setShowPopup] =
  useState(false)

const [popupText,setPopupText] =
  useState("")

  // LOGIN
  const handleLogin = async () => {

    try {

      const res = await fetch(

        "http://localhost:3001/login",

        {

          method:"POST",

          headers:{
            "Content-Type":"application/json"
          },

          body:JSON.stringify({

            username,
            password

          })

        }

      )

      const data = await res.json()

      // LOGIN SUCCESS
      if(data.success){

        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        )

        localStorage.setItem(
          "isLogin",
          "true"
        )

        // เข้า HOME ทันที
        navigate("/home")

      }

      // LOGIN FAILED
      else {

        setPopupText(
  "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง"
)
setShowPopup(true)

      }

    } catch(error){

      setPopupText(
  "เชื่อมต่อเซิร์ฟเวอร์ไม่ได้"
)
setShowPopup(true)

      console.log(error)

    }

  }

  return (

    <div style={{
      background:
        "radial-gradient(circle,#111,#000)",
      minHeight:"100vh",
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      padding:"20px"
    }}>

      {/* CARD */}
      <div style={{
        width:"380px",
        background:"#111",
        border:"2px solid gold",
        borderRadius:"30px",
        padding:"35px",
        boxShadow:
          "0 0 35px rgba(255,215,0,0.4)"
      }}>

        {/* LOGO */}
        <div style={{
          textAlign:"center"
        }}>

          <img
            src="/ads01.png"
            alt="logo"
            style={{
              width:"220px",
              borderRadius:"20px",
              boxShadow:"0 0 30px gold"
            }}
          />

        </div>

        {/* TITLE */}
        <h1 style={{
          color:"gold",
          textAlign:"center",
          marginTop:"25px",
          fontSize:"50px",
          textShadow:"0 0 15px gold"
        }}>
          LAO-VIP
        </h1>

        <p style={{
          color:"white",
          textAlign:"center",
          marginBottom:"30px",
          fontSize:"20px"
        }}>
          เว็บหวยออนไลน์ VIP
        </p>

        {/* USERNAME */}
        <input
          type="text"
          placeholder="ชื่อผู้ใช้"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
          style={inputStyle}
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="รหัสผ่าน"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          style={inputStyle}
        />

        {/* LOGIN */}
        <button
          onClick={handleLogin}
          style={loginBtn}
        >
          เข้าสู่ระบบ
        </button>

        {/* REGISTER */}
        <button
          onClick={() =>
            navigate("/register")
          }
          style={registerBtn}
        >
          สมัครสมาชิก
        </button>

        {/* LINE */}
        <button
          onClick={() =>
            window.open(
              "https://lin.ee/oQnuNZU",
              "_blank"
            )
          }
          style={lineBtn}
        >
          ติดต่อแอดมิน LINE
        </button>

        {/* FOOTER */}
        <div style={{
          textAlign:"center",
          color:"#777",
          marginTop:"25px",
          fontSize:"13px"
        }}>
          © 2026 LAO-VIP
          ALL RIGHTS RESERVED
        </div>

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
              onClick={() => setShowPopup(false)}
              style={{
                background:"gold",
                color:"#000",
                border:"none",
                padding:"12px 40px",
                borderRadius:"12px",
                fontWeight:"bold",
                cursor:"pointer"
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
  padding:"16px",
  borderRadius:"15px",
  border:"1px solid #444",
  background:"#0a0a0a",
  color:"white",
  fontSize:"16px",
  marginBottom:"15px",
  outline:"none",
  boxSizing:"border-box"
}

const loginBtn = {
  width:"100%",
  padding:"16px",
  background:
    "linear-gradient(90deg,#d4af37,#ffd700)",
  border:"none",
  borderRadius:"15px",
  color:"black",
  fontWeight:"bold",
  fontSize:"20px",
  cursor:"pointer",
  boxShadow:
    "0 0 20px rgba(255,215,0,0.5)"
}

const registerBtn = {
  width:"100%",
  padding:"16px",
  marginTop:"15px",
  background:"#1a1a1a",
  border:"1px solid gold",
  borderRadius:"15px",
  color:"gold",
  fontWeight:"bold",
  fontSize:"18px",
  cursor:"pointer"
}

const lineBtn = {
  width:"100%",
  padding:"16px",
  marginTop:"15px",
  background:"#00c853",
  border:"none",
  borderRadius:"15px",
  color:"white",
  fontWeight:"bold",
  fontSize:"18px",
  cursor:"pointer"
}

export default Login