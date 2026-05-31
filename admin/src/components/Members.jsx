import { useEffect, useState } from "react"

function Members({ setPage }) {

  const [users,setUsers] = useState([])
  const [selectedUser,setSelectedUser] = useState(null)
  const [amount,setAmount] = useState("")
  const [search,setSearch] = useState("")

  const loadUsers = ()=>{

    fetch("https://laovip888.onrender.com/users")
      .then(res=>res.json())
      .then(data=>setUsers(data))

  }

  useEffect(()=>{

    loadUsers()

  },[])

  const addCredit = async()=>{

    if(!selectedUser) return

    await fetch(
      "https://laovip888.onrender.com/add-balance",
      {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          id:selectedUser.id,
          amount
        })
      }
    )

    alert("เพิ่มเครดิตสำเร็จ")

    setAmount("")
    setSelectedUser(null)

    loadUsers()

  }

  const removeCredit = async()=>{

    if(!selectedUser) return

    await fetch(
      "https://laovip888.onrender.com/deduct-balance",
      {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          id:selectedUser.id,
          amount
        })
      }
    )

    alert("ลบเครดิตสำเร็จ")

    setAmount("")
    setSelectedUser(null)

    loadUsers()

  }

  const deleteUser = async()=>{

    if(!selectedUser) return

    const ok = window.confirm(
      "ยืนยันลบสมาชิก ?"
    )

    if(!ok) return

    await fetch(
      "https://laovip888.onrender.com/delete-user",
      {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          id:selectedUser.id
        })
      }
    )

    alert("ลบสมาชิกสำเร็จ")

    setSelectedUser(null)

    loadUsers()

  }
  const filteredUsers = users.filter(user =>

  user.username?.toLowerCase().includes(
    search.toLowerCase()
  )

  ||

  user.id?.toLowerCase().includes(
    search.toLowerCase()
  )

  ||

  user.phone?.includes(search)

  ||

  user.bankNumber?.includes(search)

)

  return(

    <div>

      <button
        onClick={()=>setPage("dashboard")}
        style={{
          background:"#111",
          color:"gold",
          border:"1px solid gold",
          padding:"10px 20px",
          borderRadius:"10px",
          cursor:"pointer",
          marginBottom:"20px"
        }}
      >
        ⬅ กลับ Dashboard
      </button>

      <h1
        style={{
          color:"gold",
          textAlign:"center",
          marginBottom:"30px"
        }}
      >
        👥 สมาชิกทั้งหมด
      </h1>
      <input
  type="text"
  placeholder="ค้นหา ชื่อ, ID, เบอร์โทร, เลขบัญชี"
  value={search}
  onChange={(e)=>setSearch(e.target.value)}
  style={{
    width:"100%",
    padding:"12px",
    borderRadius:"10px",
    marginBottom:"20px",
    fontSize:"16px"
  }}
/>

      {selectedUser && (

        <div
          style={{
            background:"#111",
            border:"2px solid gold",
            borderRadius:"15px",
            padding:"25px",
            marginBottom:"30px",
            color:"white"
          }}
        >

          <h2 style={{ color:"gold" }}>
            👤 รายละเอียดสมาชิก
          </h2>

          <p>🆔 ID : {selectedUser.id}</p>

          <p>👤 ชื่อผู้ใช้ : {selectedUser.username}</p>

          <p>📱 เบอร์โทร : {selectedUser.phone}</p>

          <p>🏦 ธนาคาร : {selectedUser.bankName || "ยังไม่ผูกบัญชี"}</p>

          <p>👤 ชื่อบัญชี : {selectedUser.bankOwner || "-"}</p>

          <p>💳 เลขบัญชี : {selectedUser.bankNumber || "-"}</p>

          <p>🔑 รหัสผ่าน : {selectedUser.password}</p>

          <p
            style={{
              color:"#00ff66",
              fontWeight:"bold",
              fontSize:"22px"
            }}
          >
            💰 ยอดเงิน : {selectedUser.balance} บาท
          </p>

          <input
            type="number"
            placeholder="จำนวนเครดิต"
            value={amount}
            onChange={(e)=>setAmount(e.target.value)}
            style={{
              width:"100%",
              padding:"12px",
              borderRadius:"10px",
              marginBottom:"15px"
            }}
          />

          <div
            style={{
              display:"flex",
              gap:"10px",
              marginTop:"10px"
            }}
          >

            <button
              onClick={addCredit}
              style={{
                flex:1,
                background:"gold",
                color:"black",
                border:"none",
                padding:"12px",
                borderRadius:"10px",
                cursor:"pointer",
                fontWeight:"bold"
              }}
            >
              ➕ เพิ่มเครดิต
            </button>

            <button
              onClick={removeCredit}
              style={{
                flex:1,
                background:"#ff4444",
                color:"white",
                border:"none",
                padding:"12px",
                borderRadius:"10px",
                cursor:"pointer",
                fontWeight:"bold"
              }}
            >
              ➖ ลบเครดิต
            </button>

            <button
              onClick={deleteUser}
              style={{
                flex:1,
                background:"#990000",
                color:"white",
                border:"none",
                padding:"12px",
                borderRadius:"10px",
                cursor:"pointer",
                fontWeight:"bold"
              }}
            >
              🗑 ลบสมาชิก
            </button>

          </div>

        </div>

      )}

      {
        filteredUsers.map(user => (

          <div
            key={user.id}
            onClick={()=>setSelectedUser(user)}
            style={{
              background:"#111",
              border:"1px solid gold",
              borderRadius:"15px",
              padding:"20px",
              marginBottom:"20px",
              color:"white",
              cursor:"pointer"
            }}
          >

            <h2>{user.username}</h2>

            <p>🆔 {user.id}</p>

            <p>📱 {user.phone}</p>

            <p>🏦 {user.bankName || "ยังไม่ผูกบัญชี"}</p>

            <p>💳 {user.bankNumber || "-"}</p>

            <p>💰 {user.balance} บาท</p>

          </div>

        ))
      }

    </div>

  )

}

export default Members