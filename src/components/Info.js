import { useContext, useEffect, useState } from "react";
import { MyContext } from "../contexts/MyContext";
import { auth, db } from '../firebase-config'
import { signOut } from 'firebase/auth';
import '../css/Info.css'
import { Link } from "react-router-dom";
import { getFirestore, addDoc, collection, deleteDoc, get, doc, getDoc, updateDoc, getDocs, where } from "firebase/firestore" 
import me from '../img/me.jpg' 
import { async } from "@firebase/util";
// import '../css/Login.css'

export const Info = () => {
    
    
    const { setIsLogged } = useContext(MyContext);

    // const [phones, setPhone] = useState("")
    // const [addresss, setAddress] = useState("")
    // const [university, setUniversity] = useState("")
    // const [classes, setClass] = useState("")
    // const [studentid, setStudentId] = useState("")
    // const [studentemail, setStudentEmail] = useState("")
    // const [password, setPassword] = useState("")
 
    // const [users, setUsers] = useState([])
    // const usersCollectionRef = collection(db, "users")
    
    // useEffect(() => {
    //     const getUsers = async () => {
    //         const data = await getDocs(usersCollectionRef);
    //         setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id}))) 
    //     }
    //     getUsers(); 
    //     console.log(users)
        
    // },[])
    
    const logout = async () => {
        await signOut(auth);
        setIsLogged(false);
        localStorage.clear();
    }

    // const handleUpdate = async (id) => {
    //     const userDoc = doc(db, "users", id);
    //     await updateDoc(userDoc, {phone: phones, address: addresss, university: university, class: classes, studentid: studentid, studentemail: studentemail})
    // } 

    return (
        <div className="Info-page">  
            <div className="Info-form">
                    {/* <span className="Info-username"></span> */}
                    <div className="Info-img-holder">
                        <img src={me} alt="img"></img>
                    </div>
                    <table>
                        <tbody>
                            <tr>
                                <th>Fullname</th>
                                <td>
                                    <input type="text" defaultValue="Nguyễn Minh Huy" disabled/>
                                </td>
                            </tr>
                            <tr>
                                <th>Email</th>
                                <td>
                                    <input type="email" defaultValue="nguyenminhhuy.0938745593@gmail.com" disabled/>
                                </td>
                            </tr>
                            <tr>
                                <th>Phone</th>
                                <td>
                                    <input type="text" defaultValue="0938745593" disabled/>
                                </td>
                            </tr>
                            <tr>
                                <th>Address</th>
                                <td>
                                    <input type="text" disabled defaultValue="Ho Chi Minh city, Viet Nam" />
                                </td>
                            </tr>
                            <tr>
                                <th>University</th>
                                <td>
                                    <input type="text" disabled defaultValue="Ho Chi Minh city University of Education" />
                                </td> 
                            </tr>
                            <tr>
                                <th>Class</th>
                                <td>
                                    <input type="text" disabled defaultValue="46.01.CNTT.A"/>
                                </td>  
                            </tr>
                            <tr>
                                <th>Student Id</th>
                                <td>
                                    <input type="text" disabled defaultValue="46.01.104.065"/>
                                </td>  
                            </tr>
                            <tr>
                                <th>Student Email</th>
                                <td>
                                    <input type="text"disabled defaultValue="4601104065@student.hcmue.edu.vn" />
                                </td>  
                            </tr>
                            {/* <tr>
                                <th>Password</th>
                                <td>
                                    <input type="password" disabled placeholder="Type to change password" />
                                </td>  
                            </tr> */}
                            <tr>
                                <td colSpan="1">
                                    {/* <button className="update-btn" onClick={() => {
                                        handleUpdate(user.id)
                                    }}>
                                        UPDATE
                                    </button>  */}
                                        <Link onClick={() => {
                                            logout();
                                        }} className="logout-btn logout-link" to="/login">LOG OUT</Link> 
                                </td> 
                            </tr>
                        </tbody>
                    </table> 
            </div> 
        </div>
    );
}