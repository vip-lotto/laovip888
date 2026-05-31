import { useEffect, useState } from "react"

function History() {

  const [reports,setReports] = useState([])

  useEffect(()=>{

    fetch("https://laovip888.onrender.com/daily-report")
      .then(res=>res.json())
      .then(data=>{

        setReports(data)

      })

  },[])

  return (

    <div>

      <h1 style={{
        color:"gold",
        marginBottom:"20px"
      }}>
        📜 ประวัติรายวัน
      </h1>

      {
        reports.map((item,index)=>(

          <div
            key={index}
            style={{
              background:"#111",
              border:"1px solid gold",
              borderRadius:"15px",
              padding:"20px",
              marginBottom:"20px",
              color:"white"
            }}
          >

            <h3 style={{
              color:"gold"
            }}>
              📅 {item.date}
            </h3>

            <div>
              💰 ยอดรับ : {item.betTotal} บาท
            </div>

            <div>
              💸 ยอดจ่าย : {item.payTotal} บาท
            </div>

            <div
              style={{
                color:"#00ff66",
                fontWeight:"bold",
                marginTop:"10px"
              }}
            >
              📈 กำไร : {item.profit} บาท
            </div>

          </div>

        ))
      }

    </div>

  )

}

export default History