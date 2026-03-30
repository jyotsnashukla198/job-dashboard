import { connectDB } from "@/lib/mongo"
import bcrypt from 'bcryptjs'
import User from '@/models/User'
import { signToken } from '@/lib/auth'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import styles from './register.module.css'

async function loginUser(formData:FormData){
    "use server"
    const email = formData.get("name");
    const password = formData.get("password");
    if(!email || !password) return
    await connectDB()
    const user = await User.findOne({email})
    if(!user) return
    const isMatch = await bcrypt.compare(password.toString(), user.password)
    if (!isMatch) return  
    const token = signToken({ id: user._id, role: user.role })
    const cookieStore = await cookies()
    cookieStore.set('token', token, { httpOnly: true }) 
}
export default function LoginPage(){
    return (
        <div>
            <h1>Login</h1>
            <form action={loginUser}>
                <div>
                    <input type="email" name="email" placeholder="name"></input>
                    <input type="password" name="password" placeholder="name"></input>
                    <button type="submit">Register</button>
                </div>
            </form>
        </div>
    )
}
