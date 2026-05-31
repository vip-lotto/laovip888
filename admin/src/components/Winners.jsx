import { useEffect,useState } from "react"

function Winners(){

  const [winners,setWinners] = useState([])

  useEffect(()=>{

    fetch("http://localhost:3001/winners-history")
      .then(res=>res.json())
      .then(data=>{

        setWinners(data)

      })

  },[])

  return(

    <div>

      <h1 style={{
        color:"gold",
        textAlign:"center",
        marginBottom:"30px"
      }}>
        🏆 ผู้ถูกรางวัล
      </h1>

      {
        winners.length === 0 &&
        (
          <h2 style={{
            color:"white",
            textAlign:"center"
          }}>
            ยังไม่มีผู้ถูกรางวัล
          </h2>
        )
      }

      {
        winners.map((item,index)=>(

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

            <h2 style={{
              color:"gold"
            }}>
              👤 {item.username}
            </h2>

            <p>
              🎯 เลข : {item.number}
            </p>

            <p>
              🏆 ประเภท : {item.prize}
            </p>

            <p>
              💵 แทง : {item.bet} บาท
            </p>

            <p style={{
              color:"#00ff66",
              fontWeight:"bold",
              fontSize:"22px"
            }}>
              💰 รับ : {item.win} บาท
            </p>

          </div>

        ))
      }

    </div>

  )

}

export default Winners