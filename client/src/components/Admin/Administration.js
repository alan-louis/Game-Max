import React, { useEffect, useState, useContext  } from 'react';
import { useSelector, useDispatch  } from 'react-redux';
import { getUsers} from "../../actions/users.actions";
import { getUser} from "../../actions/user.actions";
import Cookies from 'js-cookie';
import axios from 'axios';
// import { CSVLink, CSVDownload } from "react-csv";
import  { Redirect } from 'react-router-dom';
import { UidContext } from '../../components/AppContext';
// import Csv from './Csv';
// import { setDisableUserFalse, setDisableUserTrue } from '../../../controllers/user.controller';

import check from '../../img/check.svg';
import disabledIco from '../../img/disabled.svg';
// import bin from '../img/bin.svg';
import pen from '../../img/pen.svg';
// import cross from '../img/cross.svg';
import cross2 from '../../img/cross2.svg'; //choisir
// import thumb from '../img/thumb.svg';
import info from '../../img/info.svg';
// import skull from '../img/skull.svg';
// import skull2 from '../img/skull2.svg';
import skull3 from '../../img/skull3.svg';
// import skull4 from '../img/skull4.svg';
import heart from '../../img/heart.svg';

const Administration = () => {

    const [refreshData,setRefreshData] = useState(0);
    const uid = useContext(UidContext)

    const dispatch = useDispatch ();
    //me user
    const user = useSelector((state) => state.userReducer);
    useEffect(()=>{
        dispatch(getUser())
        // console.log("ce que user.isAdmin contient avant la condition du redirect: ")
        // console.log(user.isAdmin)
        // fonctionne MAIS si un admin tape l'url ca va le redirect
        // if(user.isAdmin === undefined || user.isAdmin !== true){
        //     console.log("premier passage")
        //     window.location.href = "/"; //marche dans le useeffect
        //     return <Redirect to='/'  /> // ne marche que en dehors du useeffect
        // }

        // if(user.isAdmin === undefined){
        //     console.log("premier passage")
        //     window.location.href = "/";
        //     return <Redirect to='/'  />
        // }
        // if(user.isAdmin !== true){
        //     console.log("deuxieme passage")
        //     window.location.href = "/home";
        //     return <Redirect to='/Home'  />
        // }
    }, [])


    //all users
    const users = useSelector((state) => state.usersReducer);
    useEffect(()=>{
        dispatch(getUsers())
    }, [refreshData])
    

    const [role,setRole] = useState("Studio"); //add user
    const [roleUser,setRoleUser] = useState("Studio"); //modify user
    const [adressUser,setAdressUser] = useState(""); //modify user adress
    const [modifying,setModifying] = useState('');
    // const [csvToSend,setCsvToSend] = useState([]);
    
    // if(user.isAdmin === undefined || user.isAdmin !== true){
    //     return <Redirect to='/Home'  />
    // }

    // const [csvData,setCsvData] = useState([]);
    
    //download CSV
    // const csvData = [
    //             ["firstname", "lastname", "email"],
    //             [csvToSend[0], csvToSend[1], csvToSend[3]],
    //             ["Raed", "Labes", "rl@smthing.co.com"],
    //             ["Yezzi", "Min l3b", "ymin@cocococo.com"]
    //         ];

    // const setCsvToSendFunction = (email) => {
    //     setCsvToSend(email)
    //     console.log("tableau de emails:")
    //     console.log(csvToSend)
    // }
    // const dlCsv = () => {
    //     const csvData = [
    //         ["firstname", "lastname", "email"],
    //         [csvToSend[0], csvToSend[1], csvToSend[3]],
    //         ["Raed", "Labes", "rl@smthing.co.com"],
    //         ["Yezzi", "Min l3b", "ymin@cocococo.com"]
    //     ];
    // }

    // useEffect(() => {
    //     const csvData = [
    //                 ["firstname", "lastname", "email"],
    //                 // [csvToSend[0], csvToSend[1], csvToSend[3]],
    //                 ["Raed", "Labes", "rl@smthing.co.com"],
    //                 ["Yezzi", "Min l3b", "ymin@cocococo.com"]
    //             ];
    //   }, []);

    // role d'un non valid??
    const handleRole = (data) =>{
        setRole(data);
        setRefreshData(refreshData+1)
    }

    //disable et enable un user
    const disable = (id) => {
        return axios({
            method:"patch",
            headers : { Authorization : "Bearer "+Cookies.get('jwt') },
            url: `${process.env.REACT_APP_API_URL}api/user/disabled/` + id,
          }).then(response => {
            setRefreshData(refreshData+1)
          })
        
    }

    const enable = (id) => {
        return axios({
            method:"patch",
            headers : { Authorization : "Bearer "+Cookies.get('jwt') },
            url: `${process.env.REACT_APP_API_URL}api/user/enabled/` + id,
          }).then(response => {
            setRefreshData(refreshData+1)
          })
          
    }

    // modifier le role d'un user
    const modify = (id,role,adresse) => {
       if(modifying === ''){
        setModifying(id)
       }else{
        setModifying('')
       }

       handleRoleUser(role)
       setAdressUser(adresse)
       setRefreshData(refreshData+1)
    }

    // valider la modification du user
    // on attends la modif du back pour envoyer les donn??es
    const setModify = (id) => {
        setModifying('')
        return axios({
            method:"patch",
            headers : { Authorization : "Bearer "+Cookies.get('jwt') },
            url: `${process.env.REACT_APP_API_URL}api/user/role/` + id,
            data: {role:roleUser,adresse:adressUser}
          }).then(response => {
            setRefreshData(refreshData+1)
          })
    }

    //quand role modifi?? dans liste d??roulante
    const handleRoleUser = (data) =>{
        setRoleUser(data);
    }

    //quand adresse modifi??e dans liste d??roulante
    const handleAdressUser = (data) =>{
        setAdressUser(data);
    }
    

    //valider le role d'un nouveau user
    const validate = (id) => {
        return axios({
            method:"patch",
            headers : { Authorization : "Bearer "+Cookies.get('jwt') },
            url: `${process.env.REACT_APP_API_URL}api/user/role/` +id,
            data: {role:role}
          }).then(response => {
            setRefreshData(refreshData+1)
          })
    }

    //supprimer un user definitivement
    const deleteUser = (id) => {
        if (window.confirm("GAME OVER: Voulez-vous supprimer cet utilisateur de mani??re d??finitive?")) {
            return axios({
                method:"delete",
                headers : { Authorization : "Bearer "+Cookies.get('jwt') },
                url: `${process.env.REACT_APP_API_URL}api/user/` + id
              }).then(response => {
                setRefreshData(refreshData+1)
              })
        } 
    }

    
    // bloc info admin
    const showHTD = () => { //a mettre en react 
        if(document.getElementById("howToDoContent").style.display === "none" || document.getElementById("howToDoContent").style.display === '' || document.getElementById("howToDoContent").style.display === null){
            document.getElementById("howToDoContent").style.display = "block";
        }else{
            document.getElementById("howToDoContent").style.display = "none";
        }
    };




    return (
         <>
         {console.log("combien de return?")}
         {/* {user.isAdmin !== undefined && user.isAdmin === true ? */}
         {uid? 
        <div className="administrationContainer">
            <div className="adminBigBlock">
                <div id="howToDoContent">
                    <p><b>Aide pour admin</b></p>
                    <p>Cette section est divis??e en trois parties:</p>
                    <ol className="ordonnedList">
                        <li>Utilisateurs en attentes</li>
                        <li>Utilisateurs valid??s</li>
                        <li>Utilisateurs d??sactiv??s</li>
                    </ol>
                    <p>
                        1. Ici sont r??pertori??s les utilisateurs qui ont cr???? un compte mais n'ont pas encore acc??s au site. Pour leur donner acc??s il vous suffit de cliquer sur l'icone "V". Pour refuser la demande et donc supprimer leur compte cliquer sur "X"
                    </p>
                    <p>
                        2. Ici sont r??pertori??s les utilisateurs qui ont cr???? un compte et ont ??t?? valid?? par un admin. Ils ont libre acc??s au site. Pour d??sactiver un compte cliquez sur le poubelle. Pour modifier le r??le d'un compte cliquez sur le crayon puis sur le "V".
                    </p>
                    <p>
                        3. Ici sont r??pertori??s les utilisateurs qui ont ??t?? d??sactiv??s. Ils n'ont plus acc??s au site. Pour les r??activer, appuyez sur le pouce en l'air.
                    </p>
                </div>
                <div className="adminSubTitle">
                    <b>Utilisateurs en attente</b>
                    <div  className="howToDo"  onClick={() => showHTD()}>
                        <b>Comment faire ?</b>
                        <img src={info} alt="info" title="Plus d'infos" className="adminIconEvent"/>
                    </div>
                </div>
                <div className="adminBlock">
                    <div className="adminSection adminSectionTitle">
                        Nom
                    </div>
                    <div className="adminSection adminSectionTitle">
                        R??le
                    </div>
                    <div className="adminSection adminSectionTitle">
                        Actions
                    </div>
                </div>
                {users.map((val)=>{
                return(
                    <>
                    {val.role === '' ?
                    <div className="adminBlock">
                        <div className="adminSection">{val.pseudo}</div>
                        <div className="adminSection">
                            <select className="adminRoleSelect" onChange={(e) => handleRole(e.target.value)}>
                                <option value="Studio" selected>Studio</option>
                                <option value="Expert">Expert</option>
                                <option value="Sponsor">Sponsor</option>
                                <option value="Partenaire">Partenaire</option>
                            </select>
                        </div>
                        <div className="adminSection">
                            <img className="adminIconEvent" src={check} alt="add" title="Valider la demande" onClick={() => validate(val._id)}/>
                            <img className="adminIconEvent" src={cross2} alt="delete" title="Supprimer la demande"  onClick={() => deleteUser(val._id)}/>
                        </div>
                    </div>
                     :
                     ''
                     }
                    </>
                    )          
                })}
            </div>
            <div className="adminBigBlock">
                <div className="adminSubTitle">
                    <b>Utilisateurs valid??s</b>
                    {/* <CSVLink onClick={dlCsv}>Download me</CSVLink>; */}
                    {/* <CSVLink data={csvData}>T??l??charger emails en excel</CSVLink> */}
                </div>
                <div className="adminBlock">
                    <div className="adminSection adminSectionTitle">
                        Nom
                    </div>
                    <div className="adminSection adminSectionTitle">
                        R??le
                    </div>
                    <div className="adminSection adminSectionTitle">
                        Adresse
                    </div>
                    <div className="adminSection adminSectionTitle">
                        Company
                    </div>
                    <div className="adminSection adminSectionTitle">
                        Membres
                    </div>
                    <div className="adminSection adminSectionTitle">
                        Actions
                    </div>
                </div>
                {users.map((val)=>{
                    // setCsvToSend([val.email])
                    // setCsvToSendFunction(val.email)
                    // console.log("setter val mail")
                    // console.log(csvToSend)
                return(
                    <>
                    {val.role !== '' && val.isDisabled !== true && val._id !== user._id ?
                    <div key={val._id} className="adminBlock">
                        <div className="adminSection">{val.pseudo}</div>
                        {/* {setCsvToSend([...val.email])} */}
                        {/* {setCsvToSend([val.email])} */}
                        {/* {() => setCsvToSendFunction(val.email)} */}
                        {/* {val.email !== undefined ? setCsvToSendFunction(val.email) : ''} */}
                        <div className="adminSection">
                            <select className="adminRoleSelect" onChange={(e) => handleRoleUser(e.target.value)} disabled={modifying !== '' && modifying === val._id ? '' : 'disabled' }>
                                <option value="Studio" selected={val.role === "Studio" ? "selected" : ""}>Studio</option>
                                <option value="Expert" selected={val.role === "Expert" ? "selected" : ""}>Expert</option>
                                <option value="Sponsor" selected={val.role === "Sponsor" ? "selected" : ""}>Sponsor</option>
                                <option value="Partenaire" selected={val.role === "Partenaire" ? "selected" : ""}>Partenaire</option>
                            </select>    
                        </div>
                        <div className="adminSection">
                           <input type="text" defaultValue={val.adresse} onChange={(e) => handleAdressUser(e.target.value)}/> 
                        </div>
                        <div className="adminSection">{val.company}</div>
                        <div className="adminSection">{val.membres}</div>
                        <div className="adminSection">
                            <img src={disabledIco} alt="poubelle" title="D??sactiver" className="adminIconEvent" onClick={() => disable(val._id)}/>
                            {modifying === val._id ?
                                <img src={check} alt="valider" title="Valider la modification" className="adminIconEvent" onClick={() => setModify(val._id)}/>
                                :
                                <img src={pen} alt="crayon" title="Modifier" className="adminIconEvent" onClick={() => modify(val._id,val.role,val.adresse)}/>
                            }
                            
                        </div>
                    </div>
                    : ''}
                    </>
                    )          
                })}
            </div>

            <div className="adminBigBlock">
                <div className="adminSubTitle">
                    <b>Utilisateurs d??sactiv??s</b>
                </div>
                <div className="adminBlock">
                    <div className="adminSection adminSectionTitle">
                        Nom
                    </div>
                    <div className="adminSection adminSectionTitle">
                        R??le
                    </div>
                    <div className="adminSection adminSectionTitle">
                        Actions
                    </div>
                </div>
                {users.map((val)=>{
                return(
                    <>
                    {val.isDisabled === true ?
                    <div key={val._id} className="adminBlock disable">
                        <div className="adminSection">{val.pseudo}</div>
                        <div className="adminSection">{val.role}</div>
                        <div className="adminSection">
                            <img src={heart} alt="poubelle" title="R??-activer" className="adminIconEvent"  onClick={() => enable(val._id)}/>
                            <img className="adminIconEvent" src={skull3} alt="delete" title="Supprimer l'utilisateur DEFINITIVEMENT"  onClick={() => deleteUser(val._id)}/>
                        </div>
                    </div>

                     : ''
                     }
                    </>
                    )          
                })}
            </div>
            
            {/* <Csv /> */}
           
        </div>
        :
        '' //il faudra faire ??a sur la navbar aussi
        //mais du coup en fait ??a marche vu que le render se fait plusieurs fois et que le dernier render a tjrs les infos charg??es, pas besoin du useeffect comme dans home (meme si le useeffect permet de mettre un loading jusqu'a ce que les donn??es soient charg??es)
        // <Redirect to='/' /> 
        }
        </>
    );
};

export default Administration;