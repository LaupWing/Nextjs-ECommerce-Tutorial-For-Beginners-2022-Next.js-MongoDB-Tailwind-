import db from "./db"


const handler = async(req, res)=>{
   await db.connect()
   
}