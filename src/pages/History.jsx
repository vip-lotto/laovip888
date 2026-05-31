import { useNavigate } from "react-router-dom"

function History() {

  const navigate = useNavigate()

  const user = JSON.parse(
    localStorage.getItem("user")
  )

  const history =
    (JSON.parse(
      localStorage.getItem("history")
    ) || []).filter(
      item => item.userId === user.id
    )

  return (
    <div style={{
      background:"#000",
      minHeight:"100vh",
      color:"white",
      padding:"20px"
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
          marginBottom:"20px"
        }}
      >
        ← ย้อนกลับ
      </button>

      {/* TITLE */}
      <h1 style={{
        color:"gold",
        textAlign:"center",
        fontSize:"50px",
        marginBottom:"25px"
      }}>
        📜 ประวัติแทงหวย
      </h1>

      {
        history.length === 0 && (

          <div style={{
            background:"#111",
            border:"1px solid gold",
            borderRadius:"20px",
            padding:"25px",
            textAlign:"center",
            fontSize:"24px"
          }}>
            ยังไม่มีประวัติแทงหวย
          </div>

        )
      }

      {
        history
        .filter(item => item?.bets?.length > 0)
        .map((item,index)=>(

          <div
            key={index}
            style={{
              background:"#111",
              border:"1px solid gold",
              borderRadius:"20px",
              padding:"20px",
              marginBottom:"20px"
            }}
          >

            <div style={{
              color:"#aaa",
              marginBottom:"10px"
            }}>
              📅 {item.date} | ⏰ {item.time}
            </div>

            <div style={{
              color:"gold",
              marginBottom:"15px",
              fontWeight:"bold"
            }}>
              🧾 เลขบิล: {item.billNumber}
            </div>

            {
              item.bets?.map((bet,i)=>(

                <div
                  key={i}
                  style={{
                    background:"#1a1a1a",
                    borderRadius:"15px",
                    padding:"15px",
                    marginBottom:"15px"
                  }}
                >

                  {
                    bet.threeTop && (
                      <div style={betStyle}>
                        3 ตัวบน:
                        <span style={gold}>
                          {" "} {bet.threeTop}
                        </span>
                      </div>
                    )
                  }

                  {
                    bet.twoTop && (
                      <div style={betStyle}>
                        2 ตัวบน:
                        <span style={gold}>
                          {" "} {bet.twoTop}
                        </span>
                      </div>
                    )
                  }

                  {
                    bet.twoBottom && (
                      <div style={betStyle}>
                        2 ตัวล่าง:
                        <span style={gold}>
                          {" "} {bet.twoBottom}
                        </span>
                      </div>
                    )
                  }

                  <div style={priceStyle}>
                    จำนวน:
                    <span style={gold}>
                      {" "} {bet.price} บาท
                    </span>
                  </div>

                </div>

              ))
            }

            <div style={{
              textAlign:"right",
              fontSize:"28px",
              fontWeight:"bold",
              color:"#00e676"
            }}>
              รวม {item.total} บาท
            </div>

          </div>

        ))
      }

    </div>

  )
}

const betStyle = {
  fontSize:"28px",
  fontWeight:"bold",
  marginBottom:"10px"
}

const priceStyle = {
  fontSize:"24px",
  fontWeight:"bold"
}

const gold = {
  color:"gold"
}

export default History