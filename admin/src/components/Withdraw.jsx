import { useEffect, useState } from "react"

function Withdraw() {

  const [withdraws,setWithdraws] = useState([])

  const loadWithdraws = async() => {

    const res = await fetch(
      "http://localhost:3001/withdraws"
    )

    const data = await res.json()

    setWithdraws(data)

  }

  useEffect(() => {
    loadWithdraws()
  }, [])

  return (

    <div>

      <h1
        style={{
          color:"gold",
          textAlign:"center",
          marginBottom:"30px"
        }}
      >
        💸 ถอนเงิน
      </h1>

      {withdraws.map(item => (

        <div
          key={item.id}
          style={{
            background:"#111",
            border:"1px solid gold",
            borderRadius:"15px",
            padding:"20px",
            marginBottom:"20px",
            color:"white"
          }}
        >

          <p>👤 {item.username}</p>

          <p>🆔 {item.userId}</p>

          <p>💰 {item.amount} บาท</p>

          <p>🏦 {item.bankName}</p>

          <p>📄 {item.bankNumber}</p>

          <p>👤 {item.bankOwner}</p>

          <p>
            สถานะ :
            <span
              style={{
                color:
                  item.status === "approved"
                    ? "lime"
                    : item.status === "rejected"
                    ? "red"
                    : "orange"
              }}
            >
              {" "}
              {item.status}
            </span>
          </p>

          {item.status === "pending" && (

            <div
              style={{
                display:"flex",
                gap:"10px",
                marginTop:"15px"
              }}
            >

              <button
                onClick={async()=>{

                  await fetch(
                    "http://localhost:3001/approve-withdraw",
                    {
                      method:"POST",
                      headers:{
                        "Content-Type":"application/json"
                      },
                      body:JSON.stringify({
                        id:item.id
                      })
                    }
                  )

                  alert("อนุมัติสำเร็จ")

                  loadWithdraws()

                }}
                style={{
                  background:"green",
                  color:"white",
                  border:"none",
                  padding:"10px 20px",
                  borderRadius:"10px",
                  cursor:"pointer"
                }}
              >
                ✅ อนุมัติ
              </button>

              <button
                onClick={async()=>{

                  await fetch(
                    "http://localhost:3001/reject-withdraw",
                    {
                      method:"POST",
                      headers:{
                        "Content-Type":"application/json"
                      },
                      body:JSON.stringify({
                        id:item.id
                      })
                    }
                  )

                  alert("ปฏิเสธสำเร็จ")

                  loadWithdraws()

                }}
                style={{
                  background:"red",
                  color:"white",
                  border:"none",
                  padding:"10px 20px",
                  borderRadius:"10px",
                  cursor:"pointer"
                }}
              >
                ❌ ปฏิเสธ
              </button>

            </div>

          )}

        </div>

      ))}

    </div>

  )

}

export default Withdraw