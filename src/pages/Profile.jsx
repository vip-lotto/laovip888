import {
  useState,
  useEffect
} from "react"

import { useNavigate } from "react-router-dom"

import {
  FaUser,
  FaWallet,
  FaLock,
  FaUniversity,
  FaHome
} from "react-icons/fa"

function Profile() {

  const navigate = useNavigate()

  const [user,setUser] = useState(
  JSON.parse(
    localStorage.getItem("user")
  )
)

  // ADS
  const ads = [
    "/ads02.png",
    "/ads03.png"
  ]

  const [currentAd, setCurrentAd] =
    useState(0)

  // SHOW
  const [showPassword,setShowPassword] =
    useState(false)

  const [showBank,setShowBank] =
    useState(false)

  // PASSWORD
  const [oldPassword,setOldPassword] =
    useState("")

  const [newPassword,setNewPassword] =
    useState("")

  const [confirmPassword,setConfirmPassword] =
    useState("")

  // BANK
  const [bankOwner,setBankOwner] =
    useState(user?.bankOwner || "")

  const [bankName,setBankName] =
    useState(user?.bankName || "")

  const [bankNumber,setBankNumber] =
    useState(user?.bankNumber || "")

  const [showPopup,setShowPopup] =
  useState(false)

  const [popupText,setPopupText] =
  useState("")

  useEffect(()=>{

  const loadUser = async()=>{

    try{

      const currentUser = JSON.parse(
        localStorage.getItem("user")
      )

      if(!currentUser) return

      const res = await fetch(
        "http://localhost:3001/users"
      )

      const users = await res.json()

      const latestUser = users.find(
        u => u.id === currentUser.id
      )

      if(latestUser){

        setUser(latestUser)

        localStorage.setItem(
          "user",
          JSON.stringify(latestUser)
        )

      }

    }catch(error){

      console.log(error)

    }

  }

  loadUser()

  const interval = setInterval(
    loadUser,
    3000
  )

  return ()=>clearInterval(interval)

},[])

  return (

    <div style={{
      background:"#000",
      minHeight:"100vh",
      color:"white",
      padding:"20px",
      paddingBottom:"100px"
    }}>

      {/* LOGO */}
      <div style={{
        textAlign:"center"
      }}>

        <img
          src="/ads01.png"
          alt="logo"
          style={{
            width:"150px",
            borderRadius:"20px",
            boxShadow:"0 0 20px gold"
          }}
        />

        <h1 style={{
          color:"gold",
          marginTop:"15px",
          fontSize:"55px"
        }}>
          โปรไฟล์
        </h1>

      </div>

      {/* PROFILE */}
      <div style={{
        background:"#111",
        border:"1px solid gold",
        borderRadius:"20px",
        padding:"25px",
        marginTop:"20px",
        textAlign:"center"
      }}>

        {/* ID */}
        <div style={{
          marginBottom:"15px",
          fontSize:"28px",
          fontWeight:"bold"
        }}>
          <FaUser />
          {" "}
          ID:
          {" "}
          {user?.id}
        </div>

        {/* USERNAME */}
        <div style={{
          marginBottom:"15px",
          fontSize:"24px"
        }}>
          👤 ชื่อผู้ใช้:
          {" "}
          {user?.username}
        </div>

        {/* BALANCE */}
        <div style={{
          fontSize:"30px",
          color:"#08f36a",
          fontWeight:"bold"
        }}>
          <FaWallet />
          {" "}
          ยอดเงิน:
          {" "}
          {user?.balance}
          {" "}
          บาท
        </div>

        {/* BANK */}
        <div style={{
          marginTop:"20px",
          color:"gold",
          fontSize:"20px",
          lineHeight:"35px"
        }}>

          🏦 บัญชี:
          {" "}

          {
            user?.bankNumber
            || "ยังไม่ผูกบัญชี"
          }

          <br />

          👤 ชื่อ:
          {" "}

          {
            user?.bankOwner || "-"
          }

          <br />

          🏦 ธนาคาร:
          {" "}

          {
            user?.bankName || "-"
          }

        </div>

      </div>

      {/* CHANGE PASSWORD */}
      <button
        onClick={() =>
          setShowPassword(!showPassword)
        }
        style={btnStyle}
      >
        <FaLock />
        {" "}
        เปลี่ยนรหัสผ่าน
      </button>

      {
        showPassword && (

          <div style={boxStyle}>

            <input
              type="password"
              placeholder="รหัสเก่า"
              value={oldPassword}
              onChange={(e)=>
                setOldPassword(
                  e.target.value
                )
              }
              style={inputStyle}
            />

            <input
              type="password"
              placeholder="สร้างรหัสใหม่"
              value={newPassword}
              onChange={(e)=>
                setNewPassword(
                  e.target.value
                )
              }
              style={inputStyle}
            />

            <input
              type="password"
              placeholder="ยืนยันรหัสใหม่"
              value={confirmPassword}
              onChange={(e)=>
                setConfirmPassword(
                  e.target.value
                )
              }
              style={inputStyle}
            />

            <button
              onClick={async() => {

                // เช็ครหัสเก่า
                if (
                  oldPassword !==
                  user.password
                ) {

                  setPopupText(
                    "รหัสเก่าไม่ถูกต้อง"
                )
                  setShowPopup(true)

                  return

                }

                // เช็ครหัสใหม่
                if (
                  newPassword !==
                  confirmPassword
                ) {

                  setPopupText(
                    "ยืนยันรหัสไม่ตรงกัน"
                )
                  setShowPopup(true)

                  return

                }

                // UPDATE
                await fetch(
                  "http://localhost:3001/change-password",
                {
                    method:"POST",
                    headers:{
                    "Content-Type":"application/json"
                  },
                  body:JSON.stringify({
                    id:user.id,
                    password:newPassword
                })
              }
            )

            setPopupText(
              "เปลี่ยนรหัสผ่านสำเร็จ"
            )
            setShowPopup(true)

            // window.location.reload()


                setShowPassword(false)

              }}
              style={saveBtn}
            >
              บันทึกรหัสผ่าน
            </button>

          </div>

        )
      }

      {/* BANK BUTTON */}
      <button
        onClick={() =>
          setShowBank(!showBank)
        }
        style={btnStyle}
      >
        <FaUniversity />
        {" "}

        {
          user?.bankNumber
          ? "แก้ไขบัญชีธนาคาร"
          : "ผูกบัญชีธนาคาร"
        }

      </button>

      {
        showBank && (

          <div style={boxStyle}>

            <input
              type="text"
              placeholder="ชื่อเจ้าของบัญชี"
              value={bankOwner}
              onChange={(e)=>
                setBankOwner(
                  e.target.value
                )
              }
              style={inputStyle}
            />

            <select
              value={bankName}
              onChange={(e)=>
                setBankName(
                  e.target.value
                )
              }
              style={inputStyle}
            >

              <option value="">
                เลือกธนาคาร
              </option>

              <option>
                ธนาคารกสิกรไทย (KBank)
              </option>

              <option>
                ธนาคารกรุงไทย (KTB)
              </option>

              <option>
                ธนาคารไทยพาณิชย์ (SCB)
              </option>

              <option>
                ธนาคารกรุงเทพ (BBL)
              </option>

              <option>
                ธนาคารกรุงศรีอยุธยา (BAY)
              </option>

              <option>
                ธนาคารทหารไทยธนชาต (TTB)
              </option>

              <option>
                ธนาคารออมสิน
              </option>

              <option>
                ธนาคารเพื่อการเกษตรและสหกรณ์ (ธ.ก.ส.)
              </option>

              <option>
                ธนาคารยูโอบี (UOB)
              </option>

              <option>
                ธนาคารซีไอเอ็มบีไทย (CIMB)
              </option>

              <option>
                ธนาคารแลนด์แอนด์เฮ้าส์
              </option>

              <option>
                ธนาคารเกียรตินาคินภัทร (KKP)
              </option>

              <option>
                ธนาคารไอซีบีซี (ICBC)
              </option>

              <option>
                ธนาคารไทยเครดิต
              </option>

              <option>
                ธนาคารซิตี้แบงก์ (Citibank)
              </option>

              <option>
                ธนาคารสแตนดาร์ดชาร์เตอร์ด
              </option>

              <option>
                ธนาคารอิสลามแห่งประเทศไทย
              </option>

              <option>
                ธนาคารอาคารสงเคราะห์ (GHB)
              </option>

              <option>
                ธนาคารเพื่อการส่งออกและนำเข้าแห่งประเทศไทย (EXIM)
              </option>

            </select>

            <input
              type="text"
              placeholder="เลขบัญชี"
              value={bankNumber}
              onChange={(e)=>
                setBankNumber(
                  e.target.value
                )
              }
              style={inputStyle}
            />

            <button
              onClick={async() => {

                await fetch(
                  "http://localhost:3001/save-bank",
                {
                    method:"POST",
                    headers:{
                      "Content-Type":"application/json"
              },
              body:JSON.stringify({
                id:user.id,
                bankOwner,
                bankName,
                bankNumber
              })
            }
          )

              setPopupText(
                "บันทึกบัญชีสำเร็จ"
              )
              setShowPopup(true)

              setUser({
              ...user,
              bankOwner,
              bankName,
              bankNumber
            })



              setShowBank(false)



// window.location.reload()

              }}
              style={saveBtn}
            >
              บันทึกบัญชี
            </button>

          </div>

        )
      }

      {/* LOGOUT */}
      <button
        onClick={() => {

          localStorage.removeItem(
            "isLogin"
          )

          navigate("/")

        }}
        style={{
          ...btnStyle,
          background:"#8b0000"
        }}
      >
        ออกจากระบบ
      </button>

      {/* ADS */}
      <div style={{
        marginTop:"25px",
        borderRadius:"25px",
        overflow:"hidden",
        border:"1px solid gold",
        boxShadow:
          "0 0 20px rgba(255,215,0,0.3)"
      }}>

        <img
          src={ads[currentAd]}
          alt="ads"
          style={{
            width:"100%",
            height:"350px",
            objectFit:"cover",
            transition:"0.5s"
          }}
        />

      </div>

      {/* BOTTOM */}

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
        onClick={() =>
          setShowPopup(false)
        }
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

      <div style={{
        position:"fixed",
        bottom:"0",
        left:"0",
        width:"100%",
        background:"#111",
        borderTop:"1px solid gold",
        display:"flex",
        justifyContent:"space-around",
        padding:"15px"
      }}>

        <button
          onClick={() =>
            navigate("/home")
          }
          style={bottomBtn}
        >
          <FaHome />
          <br />
          หน้าหลัก
        </button>

        <button
          onClick={() =>
            navigate("/profile")
          }
          style={bottomBtn}
        >
          <FaUser />
          <br />
          โปรไฟล์
        </button>

      </div>

    </div>

  )
}

const btnStyle = {
  width:"100%",
  padding:"18px",
  background:"#222",
  color:"gold",
  border:"1px solid gold",
  borderRadius:"15px",
  marginTop:"15px",
  fontSize:"18px",
  fontWeight:"bold",
  cursor:"pointer"
}

const boxStyle = {
  background:"#111",
  border:"1px solid gold",
  borderRadius:"20px",
  padding:"20px",
  marginTop:"15px"
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

const saveBtn = {
  width:"100%",
  padding:"15px",
  background:"gold",
  border:"none",
  borderRadius:"12px",
  color:"#000",
  fontWeight:"bold",
  fontSize:"18px",
  cursor:"pointer"
}

const bottomBtn = {
  background:"none",
  border:"none",
  color:"gold",
  fontSize:"16px",
  fontWeight:"bold",
  cursor:"pointer"
}

export default Profile