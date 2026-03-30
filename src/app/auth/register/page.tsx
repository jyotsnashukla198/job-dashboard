import { connectDB } from "@/lib/mongo"
import bcrypt from 'bcryptjs'
import User from '@/models/User'
import { redirect } from 'next/navigation'
import styles from './register.module.css'

async function registerUser(formData:FormData){
    "use server"
     const name= formData.get("name")
     const email = formData.get("email")
     const password = formData.get("password")
    if (!password) return
     const role = formData.get("role")
     const hashed = await bcrypt.hash(password.toString(), 10)
     await connectDB();
     await User.create({
        name,
        email,
        password:hashed,
        role
     })
     redirect('/auth/login') ;
}
export default function RegisterPage(){
    return (
        <div className={styles.container}>
            <h1 className={styles.registerHeading}>Register</h1>
            <form className={styles.form}  action={registerUser}>
                <div>
                    <input className={styles.input} type="text" name="name" placeholder="name"></input>
                    <input className={styles.input} type="email" name="email" placeholder="name"></input>
                    <input className={styles.input} type="password" name="password" placeholder="name"></input>
                    <select className={styles.input} name="role" defaultValue="">
                        <option value="" disabled>Select role</option>
                        <option value="seeker">Job Seeker</option>
                        <option value="employer">Employer</option>
                    </select>
                    <button type="submit" className={styles.button}>Register</button>
                </div>
            </form>
        </div>
    )
}