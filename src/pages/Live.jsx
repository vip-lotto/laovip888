import { useNavigate } from "react-router-dom"

function Live() {

  const navigate = useNavigate()

  return (
    <div style={{
      background:"#000",
      minHeight:"100vh",
      color:"white",
      padding:"20px"
    }}>

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

      <h1 style={{
        color:"gold",
        textAlign:"center",
        fontSize:"50px"
      }}>
        📺 ถ่ายทอดสด
      </h1>

      <div style={{
        background:"#111",
        border:"1px solid gold",
        borderRadius:"20px",
        padding:"20px",
        marginTop:"20px",
        textAlign:"center"
      }}>

        <iframe
          width="100%"
          height="650"
          src="https://laostars.com/"
          title="live"
          frameBorder="0"
          allowFullScreen
          style={{
            borderRadius:"15px"
          }}
        />

      </div>

    </div>
  )
}

export default Live