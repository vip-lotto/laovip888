import { useNavigate } from "react-router-dom"

function Receipt() {

  const navigate = useNavigate()

  const receipt = JSON.parse(
    localStorage.getItem("receipt")
  )

  if (!receipt) {
    return (
      <div style={{
        background:"#000",
        minHeight:"100vh",
        color:"white",
        padding:"20px"
      }}>
        ไม่มีใบเสร็จ (โพย)
      </div>
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

      {/* TITLE */}
      <h1 style={{
        color:"gold",
        textAlign:"center",
        marginBottom:"20px",
        fontSize:"50px",
        fontWeight:"bold"
      }}>
        🧾 ใบเสร็จ ( โพย )
      </h1>

      {/* RECEIPT */}
      <div style={{
        background:"#111",
        border:"1px solid gold",
        borderRadius:"20px",
        padding:"25px"
      }}>

        {/* LOGO */}
        <div style={{
          textAlign:"center",
          marginBottom:"20px"
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

        </div>

        {/* INFO */}
        <div style={textStyle}>
          เลขใบบิล:
          <span style={gold}>
            {" "} {receipt.billNumber}
          </span>
        </div>

        <div style={textStyle}>
          วันที่:
          <span style={gold}>
            {" "} {receipt.date}
          </span>
        </div>

        <div style={textStyle}>
          เวลาแทง:
          <span style={gold}>
            {" "} {receipt.time}
          </span>
        </div>

        <div style={textStyle}>
          หวยออก:
          <span style={gold}>
            {" "} {receipt.lottoTime}
          </span>
        </div>

        <hr style={{
          margin:"20px 0",
          borderColor:"#333"
        }}/>

        {/* รายการแทง */}
        <h2 style={{
          color:"gold",
          marginBottom:"15px"
        }}>
           รายการแทงหวย
        </h2>

        {
          receipt.bets.map((item,index)=>(

            <div
              key={index}
              style={{
                background:"#1a1a1a",
                padding:"20px",
                borderRadius:"15px",
                marginBottom:"15px",
                border:"1px solid #333"
              }}
            >

              {/* 3 ตัวบน */}
              {
                item.threeTop && (
                  <div style={rowStyle}>

                    <div style={numberStyle}>
                      3 ตัวบน:
                      <span style={gold}>
                        {" "} {item.threeTop}
                      </span>
                    </div>

                    <div style={priceStyle}>
                      จำนวน:
                      <span style={gold}>
                        {" "} {item.price} บาท
                      </span>
                    </div>

                  </div>
                )
              }

              {/* 2 ตัวบน */}
              {
                item.twoTop && (
                  <div style={rowStyle}>

                    <div style={numberStyle}>
                      2 ตัวบน:
                      <span style={gold}>
                        {" "} {item.twoTop}
                      </span>
                    </div>

                    <div style={priceStyle}>
                      จำนวน:
                      <span style={gold}>
                        {" "} {item.price} บาท
                      </span>
                    </div>

                  </div>
                )
              }

              {/* 2 ตัวล่าง */}
              {
                item.twoBottom && (
                  <div style={rowStyle}>

                    <div style={numberStyle}>
                      2 ตัวล่าง:
                      <span style={gold}>
                        {" "} {item.twoBottom}
                      </span>
                    </div>

                    <div style={priceStyle}>
                      จำนวน:
                      <span style={gold}>
                        {" "} {item.price} บาท
                      </span>
                    </div>

                  </div>
                )
              }

            </div>

          ))
        }

        <hr style={{
          margin:"20px 0",
          borderColor:"#333"
        }}/>

        {/* TOTAL */}
        <h2 style={{
          color:"#00e676",
          textAlign:"right",
          fontSize:"35px"
        }}>
          รวมทั้งหมด {receipt.total} บาท
        </h2>

        {/* SUCCESS */}
        <div style={{
          marginTop:"25px",
          textAlign:"center",
          color:"#00e676",
          fontWeight:"bold",
          fontSize:"28px"
        }}>
          ✔ ซื้อหวยสำเร็จ
        </div>

      </div>

      {/* BUTTON */}
      <button
        onClick={() => navigate("/home")}
        style={{
          width:"100%",
          marginTop:"20px",
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
         กลับหน้าหลัก
      </button>

    </div>
  )
}

const textStyle = {
  marginBottom:"12px",
  fontSize:"20px"
}

const numberStyle = {
  fontSize:"32px",
  fontWeight:"bold"
}

const priceStyle = {
  fontSize:"28px",
  fontWeight:"bold"
}

const rowStyle = {
  display:"flex",
  justifyContent:"space-between",
  alignItems:"center",
  flexWrap:"wrap",
  gap:"10px"
}

const gold = {
  color:"gold",
  fontWeight:"bold"
}

export default Receipt