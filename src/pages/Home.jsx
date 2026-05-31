import {
  useState,
  useEffect
} from "react"

import {
  useNavigate
} from "react-router-dom"

import {
  FaDice,
  FaHistory,
  FaBullhorn,
  FaMoon,
  FaHome,
  FaUser,
  FaMoneyBillWave,
  FaVideo,
  FaTrophy
} from "react-icons/fa"

function Home() {

  const navigate = useNavigate()

  // ADS
  const ads = [
    "/ads02.png",
    "/ads03.png"
  ]

  const [currentAd, setCurrentAd] =
    useState(0)

  useEffect(() => {

    const interval = setInterval(() => {

      setCurrentAd((prev) =>

        prev === ads.length - 1
          ? 0
          : prev + 1

      )

    }, 3000)

    return () =>
      clearInterval(interval)

  }, [])

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
          fontSize:"40px"
        }}>
          หน้าหลัก
        </h1>

      </div>

      {/* MENU CARD */}
      <div style={{
        background:"#111",
        borderRadius:"25px",
        padding:"20px",
        marginTop:"25px",
        border:"1px solid gold",
        boxShadow:
          "0 0 20px rgba(255,215,0,0.2)"
      }}>

        <div style={{
          display:"grid",
          gridTemplateColumns:"1fr 1fr",
          gap:"15px"
        }}>

          {/* แทงหวย */}
          <button
            onClick={() =>
              navigate("/bet")
            }
            style={cardStyle}
          >
            <FaDice size={30} />
            <br />
            แทงหวย
          </button>

          {/* ดูผลหวย */}
          <button
            onClick={() =>
              navigate("/result")
            }
            style={cardStyle}
          >
            <FaBullhorn size={30} />
            <br />
            ดูผลหวย
          </button>

          {/* ถ่ายทอดสด */}
          <button
            onClick={() =>
              navigate("/live")
            }
            style={cardStyle}
          >
            <FaVideo size={30} />
            <br />
            ถ่ายทอดสด
          </button>

          {/* ประวัติ */}
          <button
            onClick={() =>
              navigate("/history")
            }
            style={cardStyle}
          >
            <FaHistory size={30} />
            <br />
            ประวัติแทง
          </button>

          {/* ทำนายฝัน */}
          <button
            onClick={() =>
              navigate("/dream")
            }
            style={cardStyle}
          >
            <FaMoon size={30} />
            <br />
            ทำนายฝัน
          </button>

          {/* การเงิน */}
          <button
            onClick={() =>
              navigate("/finance")
            }
            style={moneyStyle}
          >
            <FaMoneyBillWave size={30} />
            <br />
            การเงิน
          </button>

          <button
  onClick={() =>
    navigate("/winners")
  }
  style={{
    ...cardStyle,
    gridColumn:"1 / span 2"
  }}
>
  🏆
  <br />
  ผลรางวัล
</button>


        </div>

      </div>

      {/* ADS SLIDE */}
      <div style={{
        marginTop:"25px",
        borderRadius:"25px",
        overflow:"hidden",
        border:"1px solid gold",
        boxShadow:
          "0 0 20px rgba(255, 136, 0, 0.3)"
      }}>

        <img
          src={ads[currentAd]}
          alt="ads"
          style={{
            width:"100%",
            height:"400px",
            objectFit:"cover",
            transition:"0.5s"
          }}
        />

      </div>

      {/* BOTTOM MENU */}
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

const cardStyle = {
  background:"#1a1a1a",
  border:"1px solid gold",
  borderRadius:"20px",
  padding:"30px 10px",
  color:"gold",
  fontWeight:"bold",
  fontSize:"18px",
  cursor:"pointer"
}

const moneyStyle = {
  background:"#1a1a1a",
  border:"1px solid gold",
  borderRadius:"20px",
  padding:"30px 10px",
  color:"gold",
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

export default Home