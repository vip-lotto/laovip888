import { useNavigate } from "react-router-dom"
import { useState,useEffect } from "react"

function Result() {

  const navigate = useNavigate()

const [results,setResults] = useState([])

  useEffect(()=>{

  fetch("https://laovip888.onrender.com/result")
    .then(res=>res.json())
    .then(data=>{

      const formatted = data.map(item => ({

        date:item.date,

        first:item.result5,

        top3:item.threeTop,

        top2:item.twoTop,

        bottom2:item.twoBottom

      }))

      setResults(formatted)

    })

},[])

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
          fontWeight:"bold",
          fontSize:"16px"
        }}
      >
        ← ย้อนกลับ
      </button>

      {/* LOGO */}
      <div style={{
        textAlign:"center"
      }}>

        <img
          src="/ads01.png"
          alt="logo"
          style={{
            width:"140px",
            borderRadius:"20px",
            boxShadow:"0 0 20px gold"
          }}
        />

        <h1 style={{
          color:"gold",
          fontSize:"50px",
          marginTop:"15px"
        }}>
          📢 ผลหวย
        </h1>

      </div>

      {/* RESULTS */}
      {
        results.map((item,index)=>(

          <div
            key={index}
            style={{
              background:"#111",
              border:"1px solid gold",
              borderRadius:"20px",
              padding:"25px",
              marginTop:"20px",
              boxShadow:
                index === 0
                ? "0 0 20px rgba(255,215,0,0.3)"
                : "none"
            }}
          >

            {/* ล่าสุด */}
            {
              index === 0 && (

                <div style={{
                  color:"#00e676",
                  fontSize:"22px",
                  fontWeight:"bold",
                  marginBottom:"15px"
                }}>
                  🔥 ผลหวยล่าสุด
                </div>

              )
            }

            {/* DATE */}
            <div style={{
              color:"#aaa",
              marginBottom:"15px",
              fontSize:"18px",
              textAlign:"center"
            }}>
              วันที่: {item.date}
            </div>

            {/* TABLE */}
            <table style={{
              width:"100%",
              borderCollapse:"collapse",
              background:"#fff",
              color:"#000",
              borderRadius:"10px",
              overflow:"hidden"
            }}>

              <tbody>

                <tr>
                  <td style={tdStyle}>
                    เลข 5 ตัว
                  </td>

                  <td style={tdStyle}>
                    {item.first}
                  </td>
                </tr>

                <tr>
                  <td style={tdStyle}>
                    เลข 4 ตัว
                  </td>

                  <td style={tdStyle}>
                    {item.first?.slice(1)}
                  
                  </td>
                </tr>

                <tr>
                  <td style={tdStyle}>
                    เลข 3 ตัว
                  </td>

                  <td style={tdStyle}>
                    {item.top3}
                  </td>
                </tr>

                <tr>
                  <td style={tdStyle}>
                    เลข 2 ตัวบน
                  </td>

                  <td style={tdStyle}>
                    {item.top2}
                  </td>
                </tr>

                <tr>
                  <td style={tdStyle}>
                    เลข 2 ตัวล่าง
                  </td>

                  <td style={tdStyle}>
                    {item.bottom2}
                  </td>
                </tr>

              </tbody>

            </table>

          </div>

        ))
      }

    </div>

  )
}

const tdStyle = {
  border:"1px solid #999",
  padding:"18px",
  textAlign:"center",
  fontSize:"28px",
  fontWeight:"bold"
}

export default Result