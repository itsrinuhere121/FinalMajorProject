import Head from "./Head";
import EmailIcon from '@mui/icons-material/Email';
import React, {useEffect, useState } from 'react';
import Body from "./Body";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ListItem from '@mui/material/ListItem';
import LinkIcon from '@mui/icons-material/Link';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton/IconButton';
import List from '@mui/material/List';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import axios from "axios";
import PushPinIcon from '@mui/icons-material/PushPin';
import Typography from '@mui/material/Typography'
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import LogoutIcon from '@mui/icons-material/Logout';
export default function App(){
  const ip="http://127.0.0.1:8080"
  const[userId,setUserId]=useState("");
  const[status,setStatus]=useState("login");
  const [home,setHome]=useState(false);
  const[library,setlibrary]=useState(false);
  const[alerts,setalerts]=useState(false);
  const[dashboard,setDashboard]= useState(false);
  const[alertData,setalertData] = useState([]);
  const[uploadpin,setUploadpin] = useState(false);//dashboard
  const[dashboardpins,setdashboardpins] = useState(false);//dashboard
  const[dashboardprofile,setdashboardprofile] = useState(false);//dashboard
  const[userPins,setUserPins] = useState([]);
 //home part start
 useEffect(()=>{
        console.log("use effect of alert data",alertData)
        console.log("size",alertData.length)
        },[alertData])
 useEffect(()=>{
        const storedValue = localStorage.getItem('userid');
        console.log(storedValue);
       // if(storedValue===undefined) setUserId(storedValue);
 },[])
 useEffect(()=>{
  console.log("Received ID",userId);
 },[userId])
 const getalertss=async()=>{
  await axios.get(ip+"/alert").then((response)=>{
    setalertData(response.data);
    console.log(response.data)
  }).catch((error)=>{
    console.log("Get alert Error",error);
  })
 }
 const openhome=async ()=>{
    await getalertss();
    await setHome(true);
 }
 const handleHomeClose=()=>{
    setHome(false);
 }
 //home part close

 const [open, setOpen] = useState(false);
 const handleClickOpen = () => {
       setOpen(true);
     };
     const handleClose = () => {
       setOpen(false);
     };
   const [username,setUsername] = useState("");
   const[password,setPassword] = useState("");
   const[repass,setrepass] = useState("");
   axios.defaults.headers.post['Content-Type'] ='application/json';
   const login=async()=>{
       console.log("Username is :",username);
       console.log("password is ",password);
       await axios.get("http://127.0.0.1:8080/user",{
        params:{
          "username":username,
          "password":password
        }
      }).then((response)=>{
        console.log(response.status);
        if(response.status !== 404){
          setUserId(response.data.id);
        
          setOpen(false);
          setDashboard(true);
          alert("successfully Authenticated");
          setStatus("signedIn")
        }else{
          setStatus("Login");
          alert("try again");
        }
      }).catch((error)=>{
        console.log(error);
      })
      if(userId!==null){
        
      }else{
       
      }
   }
  const axiosCreateAccount=async()=>{
//rest Actions performs
if(username!=="" &&password!==""){
  console.log("Axois create account called ",username,password);
 await axios.post(ip+"/user",{
      username:username,
      password:password
  }).then((res)=>{
    console.log(res);
    if(res.status===201){
      alert("succesfully created account.")
      setdialogcreateAccount(false);
    }else{
      alert("failed to create account");

    }
  
    
  }).catch((error)=>{
    console.log(error);
  })
  
}else{
  alert("Enter username and password");
}

   }
   const[valid,setvalid]=useState("");
   useEffect(()=>{
    if(password===repass && password!=="" && repass!==""){
      setvalid("matched")
    }else{
      setvalid("Not matched");
    }
   },[password,repass])
   const [dialogCreateAccount,setdialogcreateAccount] = useState(false);
   const CreateAccount =()=>{
       //to create a new account
       //Dialog renderes
      setdialogcreateAccount(true);
   }
   const action=(objec)=>{
    console.log(objec)
    if(objec==="login"){
      console.log(userId);
      if(userId===""){
        handleClickOpen()
      }else{
        setDashboard(true);
        setStatus("signed In");
      }
         //here the authentication and autherizaation access as userid
    }else if(objec==="home"){
          openhome();
    }else if(objec ==="alert"){
      getalertss();
      setalerts(true);
    }else if(objec==="library"){
      setlibrary(true);
    }
}
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
const[changepass,setchnagepass]=useState("");
const [title,setTitle]=useState("");
const[description,setDescription]=useState("");
const[links,setLinks]=useState("");
  return <>
  <Head action={action} status={status}></Head>
  <Body></Body>
  <div>
  <Dialog 
        open={open} 
        onClose={handleClose}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description">         
        <DialogTitle>Sign In</DialogTitle>
        <DialogContent>
          <DialogContentText>
            to create content use Admin Generated Credentials.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="username"
            type="username"
            fullWidth
            variant="standard"
            onChange={(e)=>{
              setUsername(e.target.value);
            }}
          />
           <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            onChange={(e)=>{
              setPassword(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={CreateAccount}>Create Account</Button>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={login}>Login</Button>
        </DialogActions>
      </Dialog>
    
  </div>
  <div className="CreateAccountBox">
    <Dialog open={dialogCreateAccount} onClose={()=>setdialogcreateAccount(false)}>
      <DialogTitle> Create a new Account</DialogTitle>
      <DialogContent>
        <Typography>Enter a user name</Typography>
        <TextField onChange={(e)=>{
          setUsername(e.target.value);
        }}></TextField>
        <Typography>Enter a password</Typography>
        <TextField onChange={(e)=>{setPassword(e.target.value)}}></TextField>
        <Typography>Enter again the password</Typography>
        <TextField onChange={(e)=>{setrepass(e.target.value)}}></TextField>
        <Typography>Both passwords are {valid}</Typography>
        <Button onClick={(axiosCreateAccount)}>submit</Button>
      </DialogContent>
    </Dialog>
  </div>
  <div className="Home">
        <Dialog open={home} onClose={handleHomeClose}>
        <DialogTitle sx={{fontsize:55,textAlign:"Center"}}>College Commodity Trend</DialogTitle>
        <DialogContent>
        <DialogContentText sx={{color:"#068DA9"}}>
         Latest Trend in Our college
          </DialogContentText>
          <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {
            alertData.map((i,index)=>{
              
            return index===alertData.length-1&&<>
            <ListItem key={index} disableGutters sx={{borderColor: 'grey.500' }}>
            <DialogContentText sx={{border:"1px ",borderRadius:'5px',padding:'10px'}}> Title is :{i.title}  </DialogContentText>
             <br/>
              <ListItemText sx={{border:"1px ",borderRadius:'5px',padding:'20px'}}>{i.description}<br/>Posted @{i.created}</ListItemText>
              
            <AttachFileIcon onClick={()=>{
                console.log("media attach ment Clicked")
              }}/>
            </ListItem>
            </>
            })
            }
          </List>
        </DialogContent>
    </Dialog>
  </div>
  <div className="Alerts" >
  <Dialog open={alerts} onClose={()=>{
      setalerts(false);
  }}
  sx={{borderColor:'#2B2A4C'}}>
        <DialogTitle sx={{color:'#2B3467',textAlign:'Center'}}>WALL</DialogTitle>
        <DialogContent>
        <DialogContentText>
        Top posts
          </DialogContentText>
          <List sx={{ width: '100%', maxWidth: 360,bgcolor:'#EEE2DE', borderColor: '#EA906C'  }}>
            {
            alertData.map((i,index)=>{
            return <>
            <ListItem key={index} disableGutters sx={{borderColor: 'grey.500' }}>
            <DialogContentText sx={{border:"1px ",borderColor: 'grey.500' ,borderRadius:'5px',padding:'10px'}}>
               {i.title}
            </DialogContentText>
             <br/>
              <ListItemText sx={{border:"1px ",borderRadius:'5px',padding:'20px'}}>{i.description}<br/>Posted @{i.created}</ListItemText>
              
            <AttachFileIcon onClick={()=>{
                console.log("media attach ment Clicked")
              }}/>
            </ListItem>
            </>
            })
            }
          </List>
        </DialogContent>
    </Dialog>
  </div>
  <div className="library">
  <Dialog open={library} onClose={()=>{
        setlibrary(false);
  }}>
        <DialogTitle>library</DialogTitle>
        <DialogContent>
        <DialogContentText>
         Latest Information From vaagdevi college of Engineering
          </DialogContentText>
          <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          <ListItem
           key={1}
          disableGutters>
        
            <ListItemText>TCs is Hiring for Freshers please check out below Doucmentation last date for registration is 31 august 2023
           <br/>
            posted date is  12-12-2023
            </ListItemText>
            <IconButton aria-label="post"
            onClick={()=>{
              console.log("external clicked")
            }}>
            <LinkIcon/>
              </IconButton>
              <AttachFileIcon onClick={()=>{
                console.log("media attach ment Clicked")
              }}/>
          </ListItem>
          </List>
        </DialogContent>
    </Dialog>
  </div>
  <div className="Alertsviewer">

  </div>
  <div className="Dashboard">
    <Dialog open={dashboard} onClose={()=>{
      setDashboard(false);}}>
            <DialogTitle sx={{color:'#2B3467',textAlign:'Center'}}>Dashboard </DialogTitle>
                <DialogContent>
                    <List >
                     
                      <ListItem> 
                            <AddCircleOutlineIcon/>
                            <Button onClick={()=>{
                              console.log("view posts cliekd",userId);
                              axios.get(ip+"/userpins/"+userId).then((response)=>{
                                  console.log(response);
                                  if(response.status===200){
                                    setUserPins(response.data);
                                    setdashboardpins(true);
                                  }else{
                                    alert("client Eror");
                                  }
                                  
                              }).catch((error)=>{
                                console.log(error);
                              })
                            }
                            }>View Posts</Button> 
                      </ListItem>
                      <ListItem>
                            <AccountBoxIcon/>
                            <Button onClick={()=>{
                              setdashboardprofile(true);
                             
                              //to change the password
                              console.log("to change password profile option");
                              
                            }}>Profile</Button>
                      </ListItem>
                      <ListItem>
                            <EmailIcon/>
                            <Button 
                            sx={{color:'#2B3467',textAlign:'Center',padding:'12px'}}
                            onClick={()=>{setUploadpin(true)}}>Create Post</Button>
                      </ListItem>
                        <ListItem>
                              <Button onClick={()=>{
                                                      //localStorage.removeItem('userid');
                                                      //setUserId("")
                                                      setHome(false);
                                                      window.location.reload();
                                                      }}> <LogoutIcon/> Logout</Button>
                          </ListItem>
                    </List>
                </DialogContent>
              </Dialog>
              <Dialog open={uploadpin}onClose={()=>{setUploadpin(false)}}>
                <DialogTitle>Upload a pin/Post</DialogTitle>
                <DialogContent>
                    <Typography>Title of the Pin</Typography>
                    <TextField onChange={(e)=>{
                      setTitle(e.target.value)
                    }}></TextField>
                    <Typography>Description of Pin</Typography>
                    <TextField onChange={(e)=>{
                      setDescription(e.target.value);
                    }}></TextField>
                    <Typography>Any Link</Typography>
                    <TextField onChange={(e)=>{
                      setLinks(e.target.value);
                    }}></TextField>
                    <Button onClick={async()=>{
                        await axios.post(ip+"/alert",{
                            title:title,
                            description:description,
                            links,links,
                            userid:userId
                        }).then((response)=>{
                          console.log(response.status);
                          if(response.status===201){
                            alert("created");
                            setUploadpin(false)
                          }else{
                            alert("failed to Upload a file");
                          }
                        }).catch((error)=>{
                          console.log(error);
                        })
                    }}>submit</Button>
                </DialogContent>
                
              </Dialog>
              <Dialog open={dashboardpins} onClose={()=>{
                setdashboardpins(false)
              }}>
               <DialogTitle><PushPinIcon/>{username+"  "}pins</DialogTitle>
                <DialogContent>
                {userPins.map((i,index)=>{
                  return<>
                  <List key={index}>
                    <Typography sx={{fontSize:32}}>{i.title}</Typography>
                     <Typography>{"Description  :"+i.description}<Button onClick={async()=>{
                        console.log(i.alertid);
                       await axios.delete(ip+"/alert/"+i.alertid).then((response)=>{
                        console.log(response.status);
                        setdashboardpins(false);
                      }).catch((error)=>{

                        console.log(error);
                        alert(error);
                      })
                     }}>Delete</Button></Typography>                     
                     </List>
                  
                  </>
                })}
              </DialogContent>
              </Dialog>
              <Dialog open={dashboardprofile} onClose={()=>{
                                setdashboardprofile(false);
                                }} sx={{borderRadius:1}}>
                                  <DialogTitle sx={{textAlign:"Center",fontsize:32}}>hey {username},youre profile</DialogTitle>
                                  <DialogContent>
                                    <List  sx={{p:3}}>
                                      <ListItem>
                                        <ListItemText primary=" Enter new password :"></ListItemText>
                                        <TextField onChange={(e)=>{
                                            setchnagepass(e.target.value);
                                            }}></TextField>
                                      </ListItem>
                                    <ListItem> 
                                      <ListItemText primary="Enter current password :"></ListItemText>
                                      <TextField onChange={(e)=>{

                                      }}></TextField></ListItem>
                                 
                                  <Button onClick={()=>{
                                    console.log("change the password as user request");
                                  }}>change new password</Button>
                                    </List>
                                 
                                  </DialogContent>
                               
                                </Dialog>
  </div>
  </>
}