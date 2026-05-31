import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Dream() {

  const navigate = useNavigate()

  const [dream, setDream] = useState("")
  const [results, setResults] = useState([])

  // สุ่มเลข
  const randomNumber = (length) => {

    let result = ""

    for (let i = 0; i < length; i++) {
      result += Math.floor(Math.random() * 10)
    }

    return result
  }

  // ทำนายฝัน
  const predictDream = () => {

    if (!dream) {
      alert("กรุณาพิมพ์ความฝัน")
      return
    }

    const numbers = [

      {
        type:"2 ตัว",
        number: randomNumber(2)
      },

      {
        type:"3 ตัว",
        number: randomNumber(3)
      },

      {
        type:"2 ตัว",
        number: randomNumber(2)
      },

      {
        type:"3 ตัว",
        number: randomNumber(3)
      },

      {
        type:"3 ตัว",
        number: randomNumber(3)
      }

    ]

    setResults(numbers)

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
        🔮 ทำนายฝัน
      </h1>

      {/* INPUT */}
      <div style={{
        background:"#111",
        border:"1px solid gold",
        borderRadius:"20px",
        padding:"20px",
        marginBottom:"25px"
      }}>

        <input
          type="text"
          placeholder="พิมพ์ความฝันของคุณ..."
          value={dream}
          onChange={(e)=>setDream(e.target.value)}
          style={{
            width:"100%",
            padding:"18px",
            borderRadius:"15px",
            border:"none",
            fontSize:"18px",
            marginBottom:"15px"
          }}
        />

        <button
          onClick={predictDream}
          style={{
            width:"100%",
            padding:"18px",
            background:"gold",
            color:"#000",
            border:"none",
            borderRadius:"15px",
            fontWeight:"bold",
            fontSize:"20px",
            cursor:"pointer"
          }}
        >
          ทำนายเลข
        </button>

      </div>

      {/* RESULT */}
      {
        results.length > 0 && (

          <div style={{
            background:"#111",
            border:"1px solid gold",
            borderRadius:"20px",
            padding:"20px"
          }}>

            <h2 style={{
              color:"gold",
              textAlign:"center",
              marginBottom:"20px",
              fontSize:"35px"
            }}>
              🎯 เลขเสี่ยงโชค
            </h2>

            {
              results.map((item,index)=>(

                <div
                  key={index}
                  style={{
                    background:"#1a1a1a",
                    borderRadius:"15px",
                    padding:"18px",
                    marginBottom:"15px",
                    textAlign:"center"
                  }}
                >

                  <div style={{
                    color:"#aaa",
                    marginBottom:"10px",
                    fontSize:"18px"
                  }}>
                    {item.type}
                  </div>

                  <div style={{
                    color:"gold",
                    fontSize:"45px",
                    fontWeight:"bold",
                    letterSpacing:"5px"
                  }}>
                    {item.number}
                  </div>

                </div>

              ))
            }

          </div>

        )
      }

    </div>

  )
}

export default Dream