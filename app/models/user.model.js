import db from '../config/db.config.js'
import bcrypt from 'bcryptjs'

const User={
    create: (user,result)=>{
        const hashedPassword=bcrypt.hashSync(user.password,8);
        db.query('INSER INTO users (username , email, password) VALUES (?,?,?)'),
        [user.username,user.email,hashedPassword],
        (err,res)=>{
            if(err) return result(err,null);
            

        }
    }
}