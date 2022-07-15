import { Redirect } from "react-router-dom"
import {useEffect, useState} from 'react'
import Header from './Header'
import Axios from 'axios';
export default function Users(props){
    
    
    let [row,setRow]=useState([]);

    const handleClickDelete = (event, param) => {
        
        Axios.post("http://localhost:3002/api/delete",{"id":param}).then(()=>{
            Axios.get("http://localhost:3002/api/get").then((response)=>setRow(response.data)) 
        })
      };
      const handleClickUpdate= (event, param,stat) => {
        console.log(param,stat)
        if(!stat)
        Axios.post("http://localhost:3002/api/Yadmin",{"id":param}).then(()=>{
            Axios.get("http://localhost:3002/api/get").then((response)=>setRow(response.data)) 

        })
        else Axios.post("http://localhost:3002/api/Nadmin",{"id":param}).then(()=>{
            Axios.get("http://localhost:3002/api/get").then((response)=>setRow(response.data)) 
        })
      };
    
    // const interval1 = setInterval(handleClickDelete,50);
    // const interval2 = setInterval(handleClickUpdate,50);
    //   useEffect(() => {
    //     return () => {
    //         clearInterval(interval1)
    //         clearInterval(interval2)
    //     }
    //   }, [])
    
    

    // elarifamine1@gmail.com
    useEffect(() => {
        Axios.get("http://localhost:3002/api/get").then((response)=>setRow(response.data))    
        //Runs on every render
      },[]);

    if(!props.authorized){
        return <Redirect to="/"/>
    }
    
    
    let idrow=row.map((res)=>{
        
        return(
            
            <tr >
            
            <th>{res.nom}</th>
            <th>{res.prenom}</th>
            <th>{res.email}</th>
            <th>{res.password}</th>
            <th><button className="users--button" onClick={event => handleClickUpdate(event, res.id,res.statut)}>{res.statut ? "admin" : "pas admin"}</button></th>
            <th><button className="users--button" onClick={event => handleClickDelete(event, res.id)}>Supprimer</button></th>
            </tr>
        )
    })
   
    return (
    <>
    <Header/>
    
    
    <table className="user--table   ">
    <tbody>
        <tr>
            <th>NOM</th>
            <th>PRENOM</th>
            <th>EMAIL</th>
            <th>PASSWORD</th>
            <th>ADMIN</th>
            <th>DELETE</th>
        </tr>
       {idrow}
       <tr>
      
        
       </tr>
    </tbody>
    </table>
    
    
    </>
    )
}