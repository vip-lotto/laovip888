const express = require("express")
const cors = require("cors")
const fs = require("fs")

const app = express()

app.use(cors())
app.use(express.json())

// =====================
// REGISTER
// =====================
app.post("/register",(req,res)=>{

  const users = JSON.parse(
    fs.readFileSync(
      __dirname + "/data/users.json"
    )
  )

  const newUser = {

    id:req.body.id,
    username:req.body.username,
    phone:req.body.phone,
    password:req.body.password,
    balance:0

  }

  users.push(newUser)

  fs.writeFileSync(
    __dirname + "/data/users.json",
    JSON.stringify(users,null,2)
  )

  res.json({
    success:true,
    message:"สมัครสมาชิกสำเร็จ"
  })

})


// =====================
// LOGIN
// =====================
app.post("/login",(req,res)=>{

  const users = JSON.parse(
    fs.readFileSync(
      __dirname + "/data/users.json"
    )
  )

  const user = users.find(

    u =>

      u.username === req.body.username
      &&
      u.password === req.body.password

  )

  if(user){

    res.json({
      success:true,
      user
    })

  }else{

    res.json({
      success:false
    })

  }

})


// =====================
// USERS
// =====================
app.get("/users",(req,res)=>{

  const users = JSON.parse(
    fs.readFileSync(
      __dirname + "/data/users.json"
    )
  )

  res.json(users)

})


// =====================
// ADD BALANCE
// =====================
app.post("/add-balance",(req,res)=>{

  const { id, amount } = req.body

  const users = JSON.parse(
    fs.readFileSync(
      __dirname + "/data/users.json"
    )
  )

  const user = users.find(
    u => u.id === id
  )

  if(user){

    user.balance += Number(amount)

    fs.writeFileSync(
      __dirname + "/data/users.json",
      JSON.stringify(users,null,2)
    )

  }

  res.json({
    success:true
  })

})


// =====================
// DEDUCT BALANCE
// =====================
app.post("/deduct-balance",(req,res)=>{

  const { id, amount } = req.body

  const users = JSON.parse(
    fs.readFileSync(
      __dirname + "/data/users.json"
    )
  )

  const user = users.find(
    u => u.id === id
  )

  if(!user){

    return res.json({
      success:false,
      message:"ไม่พบผู้ใช้"
    })

  }

  if(user.balance < Number(amount)){

    return res.json({
      success:false,
      message:"เครดิตไม่พอ"
    })

  }

  user.balance -= Number(amount)

  fs.writeFileSync(

    __dirname + "/data/users.json",

    JSON.stringify(
      users,
      null,
      2
    )

  )

  res.json({

    success:true,
    balance:user.balance

  })

})


// =====================
// DELETE USER
// =====================
app.post("/delete-user",(req,res)=>{

  const { id } = req.body

  let users = JSON.parse(
    fs.readFileSync(
      __dirname + "/data/users.json"
    )
  )

  users = users.filter(
    u => u.id !== id
  )

  fs.writeFileSync(
    __dirname + "/data/users.json",
    JSON.stringify(users,null,2)
  )

  res.json({
    success:true
  })

})


// =====================
// GET RESULT
// =====================

// ดูการตั้งค่า
app.get("/settings",(req,res)=>{

  const settings = JSON.parse(
    fs.readFileSync(
      __dirname + "/data/settings.json"
    )
  )

  res.json(settings)

})


// บันทึกการตั้งค่า
app.post("/save-settings",(req,res)=>{

  fs.writeFileSync(

    __dirname + "/data/settings.json",

    JSON.stringify(
      req.body,
      null,
      2
    )

  )

  res.json({
    success:true
  })

})


// =====================
// SERVER
// =====================

app.get("/bets",(req,res)=>{

  const bets = JSON.parse(
    fs.readFileSync(
      __dirname + "/data/bets.json"
    )
  )

  res.json(bets)

})


app.post("/save-bet",(req,res)=>{

  const bets = JSON.parse(
    fs.readFileSync(
      __dirname + "/data/bets.json"
    )
  )

  bets.push(req.body)

  fs.writeFileSync(
    __dirname + "/data/bets.json",
    JSON.stringify(
      bets,
      null,
      2
    )
  )

  res.json({
    success:true
  })

})

// =====================
// GET RATES
// =====================
app.get("/rates",(req,res)=>{

  const rates = JSON.parse(
    fs.readFileSync(
      __dirname + "/data/rates.json"
    )
  )

  res.json(rates)

})


// =====================
// SAVE RATES
// =====================
app.post("/save-rates",(req,res)=>{

  fs.writeFileSync(

    __dirname + "/data/rates.json",

    JSON.stringify(
      req.body,
      null,
      2
    )

  )

  res.json({
    success:true
  })

})


// =====================
// SERVER
// =====================
// =====================
// GET RESULT
// =====================
app.get("/result",(req,res)=>{

  const result = JSON.parse(
    fs.readFileSync(
      __dirname + "/data/results.json"
    )
  )

  res.json(result)

})


// =====================
// SAVE RESULT
// =====================
// =====================
// DAILY REPORT
// =====================

// =====================
// WINNERS
// =====================
app.get("/winners",(req,res)=>{

  const winners = JSON.parse(
    fs.readFileSync(
      __dirname + "/data/winners.json"
    )
  )

  res.json(winners)

})

app.get("/winners-history",(req,res)=>{

  const winnersHistory = JSON.parse(
    fs.readFileSync(
      __dirname + "/data/winners-history.json"
    )
  )

  res.json(winnersHistory)

})

app.get("/daily-report",(req,res)=>{

  const reports = JSON.parse(
    fs.readFileSync(
      __dirname + "/data/daily-report.json"
    )
  )

  res.json(reports)

})

app.post("/save-result",(req,res)=>{

  let results = JSON.parse(
    fs.readFileSync(
      __dirname + "/data/results.json"
    )
  )

  const newResult = {
    date:new Date().toLocaleDateString(),
    ...req.body
  }

  results.unshift(newResult)

  console.log("SAVE RESULT WORKING")

  if(results.length > 30){
    results = results.slice(0,30)
  }

  fs.writeFileSync(
    __dirname + "/data/results.json",
    JSON.stringify(results,null,2)
  )

  // =====================
// DAILY REPORT
// =====================

const bets = JSON.parse(
  fs.readFileSync(
    __dirname + "/data/bets.json"
  )
)
const rates = JSON.parse(
  fs.readFileSync(
    __dirname + "/data/rates.json"
  )
)

let winners = []

let payTotal = 0

const today = new Date().toLocaleDateString()

let betTotal = 0

bets.forEach(bet => {

  betTotal += Number(
    bet.total || 0
  )

})

// =====================
// CHECK WINNERS
// =====================
console.log("RESULT BODY =", req.body)
console.log("PAY BEFORE =", payTotal)

bets.forEach(bet => {

  bet.bets.forEach(item => {

    // 3 ตัวบน
    if(
      item.threeTop &&
      item.threeTop === req.body.threeTop
    ){

      const win =
        Number(item.price) *
        rates.threeTop

      payTotal += win

      winners.push({

  userId:bet.userId,

  username:bet.username,

  number:item.threeTop,

  prize:"3 ตัวบน",

  bet:item.price,

  win

})

    }

    // 2 ตัวบน
    if(
      item.twoTop &&
      item.twoTop === req.body.twoTop
    ){

      const win =
        Number(item.price) *
        rates.twoTop

      payTotal += win

      winners.push({

  userId:bet.userId,

  username:bet.username,

        number:item.twoTop,

        prize:"2 ตัวบน",

        bet:item.price,

        win

      })

    }

    // 2 ตัวล่าง
    if(
      item.twoBottom &&
      item.twoBottom === req.body.twoBottom
    ){

      const win =
        Number(item.price) *
        rates.twoBottom

      payTotal += win

      winners.push({

  userId:bet.userId,

  username:bet.username,

        number:item.twoBottom,

        prize:"2 ตัวล่าง",

        bet:item.price,

        win

      })

    }

  })

})

console.log("WINNERS =", winners)
console.log("PAY AFTER =", payTotal)

console.log("REPORT LOADED")

let reports = JSON.parse(
  fs.readFileSync(
    __dirname + "/data/daily-report.json"
  )
)

reports.unshift({

  date:today,

  betTotal,

  payTotal,

  profit:betTotal - payTotal

})

fs.writeFileSync(
  __dirname + "/data/daily-report.json",
  JSON.stringify(reports,null,2)
)

fs.writeFileSync(
  __dirname + "/data/winners.json",
  JSON.stringify(winners,null,2)
)

let winnersHistory = JSON.parse(
  fs.readFileSync(
    __dirname + "/data/winners-history.json"
  )
)

winners.forEach(item => {

  winnersHistory.unshift({

    date:today,

    result:req.body.result5,

    ...item

  })

})
const users = JSON.parse(
  fs.readFileSync(
    __dirname + "/data/users.json"
  )
)

winners.forEach(item => {

  const user = users.find(
  u => u.id === item.userId
)

  if(user){

    user.balance += Number(item.win)

  }

})

fs.writeFileSync(
  __dirname + "/data/users.json",
  JSON.stringify(users,null,2)
)

console.log(
  "WINNERS HISTORY =",
  winnersHistory
)

fs.writeFileSync(
  __dirname + "/data/winners-history.json",
  JSON.stringify(winnersHistory,null,2)
)

// =====================
// MOVE BETS TO HISTORY
// =====================

let history = JSON.parse(
  fs.readFileSync(
    __dirname + "/data/history.json"
  )
)

bets.forEach(bet => {

  history.unshift({

    result:req.body.result5,

    closeDate:today,

    ...bet

  })

})

console.log("HISTORY COUNT =", history.length)

fs.writeFileSync(
  __dirname + "/data/history.json",
  JSON.stringify(history,null,2)
)

// =====================
// CLEAR BETS
// =====================

fs.writeFileSync(
  __dirname + "/data/bets.json",
  JSON.stringify([],null,2)
)

console.log("REPORT SAVED")
  res.json({
    success:true
  })

})

app.post("/save-bank",(req,res)=>{

  console.log("SAVE BANK =", req.body)

  const users = JSON.parse(
    fs.readFileSync(
      __dirname + "/data/users.json"
    )
  )

  const index = users.findIndex(
    u => u.id === req.body.id
  )

  console.log("FOUND INDEX =", index)

  if(index !== -1){

    users[index].bankOwner =
      req.body.bankOwner

    users[index].bankName =
      req.body.bankName

    users[index].bankNumber =
      req.body.bankNumber

    fs.writeFileSync(
      __dirname + "/data/users.json",
      JSON.stringify(users,null,2)
    )

    console.log("BANK SAVED")
  }

  res.json({
    success:true
  })

})

app.post("/change-password",(req,res)=>{

  console.log("CHANGE PASSWORD =", req.body)

  const users = JSON.parse(
    fs.readFileSync(
      __dirname + "/data/users.json"
    )
  )

  const index = users.findIndex(
    u => u.id === req.body.id
  )

  console.log("FOUND USER =", index)

  if(index !== -1){

    users[index].password =
      req.body.password

    fs.writeFileSync(
      __dirname + "/data/users.json",
      JSON.stringify(users,null,2)
    )

    console.log("PASSWORD SAVED")
  }

  res.json({
    success:true
  })

})

app.post("/withdraw",(req,res)=>{

  console.log("WITHDRAW =", req.body)

  const withdraws = JSON.parse(
    fs.readFileSync(
      __dirname + "/data/withdraws.json"
    )
  )

  const financeHistory = JSON.parse(
  fs.readFileSync(
    __dirname + "/data/finance-history.json"
  )
)

  withdraws.unshift({

    id:Date.now(),

    username:req.body.username,

    userId:req.body.userId,

    amount:req.body.amount,

    bankName:req.body.bankName,

    bankOwner:req.body.bankOwner,

    bankNumber:req.body.bankNumber,

    status:"pending",

    date:new Date().toLocaleString()

  })

  financeHistory.unshift({

  id:Date.now(),

  userId:req.body.userId,

  username:req.body.username,

  type:"withdraw",

  amount:req.body.amount,

  status:"pending",

  date:new Date().toLocaleString()

})

  fs.writeFileSync(
    __dirname + "/data/withdraws.json",
    JSON.stringify(withdraws,null,2)
  )

  fs.writeFileSync(
  __dirname + "/data/finance-history.json",
    JSON.stringify(financeHistory,null,2)
  )

  res.json({
    success:true
  })

})

app.get("/withdraws",(req,res)=>{

  const withdraws = JSON.parse(
    fs.readFileSync(
      __dirname + "/data/withdraws.json"
    )
  )

  res.json(withdraws)

})

app.post("/approve-withdraw",(req,res)=>{

  const withdraws = JSON.parse(
    fs.readFileSync(
      __dirname + "/data/withdraws.json"
    )
  )

  const users = JSON.parse(
    fs.readFileSync(
      __dirname + "/data/users.json"
    )
  )

  const withdraw = withdraws.find(
    w => w.id === req.body.id
  )

  if(!withdraw){

    return res.json({
      success:false
    })

  }

  if(withdraw.status !== "pending"){

    return res.json({
      success:false
    })

  }

  const user = users.find(
    u => u.id === withdraw.userId
  )

  if(user){

    user.balance =
      Number(user.balance) -
      Number(withdraw.amount)

    if(user.balance < 0){
      user.balance = 0
    }

  }

  withdraw.status = "approved"

  const financeHistory = JSON.parse(
  fs.readFileSync(
    __dirname + "/data/finance-history.json"
  )
)

const financeItem = financeHistory.find(
  h =>
    h.userId === withdraw.userId &&
    Number(h.amount) === Number(withdraw.amount)
)

if(financeItem){
  financeItem.status = "approved"
}

fs.writeFileSync(
  __dirname + "/data/finance-history.json",
  JSON.stringify(financeHistory,null,2)
)

  fs.writeFileSync(
    __dirname + "/data/users.json",
    JSON.stringify(users,null,2)
  )

  fs.writeFileSync(
    __dirname + "/data/withdraws.json",
    JSON.stringify(withdraws,null,2)
  )

  res.json({
    success:true
  })

})

app.post("/reject-withdraw",(req,res)=>{

  const withdraws = JSON.parse(
    fs.readFileSync(
      __dirname + "/data/withdraws.json"
    )
  )

  const withdraw = withdraws.find(
    w => w.id === req.body.id
  )

  if(withdraw){

    withdraw.status = "rejected"

    const financeHistory = JSON.parse(
  fs.readFileSync(
    __dirname + "/data/finance-history.json"
  )
)

const financeItem = financeHistory.find(
  h =>
    h.userId === withdraw.userId &&
    Number(h.amount) === Number(withdraw.amount)
)

if(financeItem){
  financeItem.status = "rejected"
}

fs.writeFileSync(
  __dirname + "/data/finance-history.json",
  JSON.stringify(financeHistory,null,2)
)

    fs.writeFileSync(
      __dirname + "/data/withdraws.json",
      JSON.stringify(withdraws,null,2)
    )

  }

  res.json({
    success:true
  })

})

app.get("/finance-history",(req,res)=>{

  const history = JSON.parse(
    fs.readFileSync(
      __dirname + "/data/finance-history.json"
    )
  )

  res.json(history)

})

// =====================
// HISTORY
// =====================
app.get("/history",(req,res)=>{

  const history = JSON.parse(
    fs.readFileSync(
      __dirname + "/data/history.json"
    )
  )

  res.json(history)

})

app.listen(3001,()=>{

  console.log(
    "SERVER RUNNING 3001"
  )

})