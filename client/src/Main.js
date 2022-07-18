import { Redirect,useNavigate } from "react-router-dom"

import {useEffect, useState,createContext} from 'react'
import Header from './Header'
import Axios from 'axios';
import Img from './img/folder.png'
import { useHistory } from "react-router-dom";

export default function Main(props){

    let history=useHistory();

    let [row,setRow]=useState([]);
    let [inputproc,setInputproc]=useState('')
    
    function addproc(){
        
        Axios.post('http://localhost:3002/api/addproc',{
                
              "processus":inputproc

        }).then((response)=>{
            if(!response.data.message){
               
                
                
                Axios.get("http://localhost:3002/api/getproc",{  }).then((response)=>{
                  
                setRow(response.data)})
                 
               
        }
       
           
        })

    }
    function handleClickDelete(event,id){
        Axios.post("http://localhost:3002/api/procdelete",{"id":id}).then(()=>{
            Axios.get("http://localhost:3002/api/getproc",{  }).then((response)=>{
                
                setRow(response.data)})}) 
    }
    function tofichier(id){
 
      
       
        history.push(`/Fichier/${id}`);
    }
    useEffect(() => {
        
        Axios.get("http://localhost:3002/api/getproc",{  }).then((response)=>{setRow(response.data)})    
        //Runs on every render
      },[]);
    return( 
    <>
    <Header/>

    <div className="main--container">
    {row.map((temp)=> (<div className="contain--img stop"> <img src={Img} width="30px"></img>   <div className="pad" onClick={()=>(tofichier(temp.id_processus))} >{temp.libellé}</div> <button className="users--button" onClick={event => handleClickDelete(event, temp.id_processus)}>Supprimer</button></div>))}
   

    </div>
    <div className="center--form">
    <h3>libellé</h3>
    <input type="text" onChange={(e)=>{setInputproc(e.target.value)}}></input>
    <button onClick={addproc} className="auth--submit">Confirmer</button>
    </div>
    {/* <button onClick="addproc" className="auth--submit centerbutton">Ajouter un processus</button> */}
    </>)
}