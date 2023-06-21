import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Toolbar from '@mui/material/Toolbar';
import axios from 'axios';
import React, { useState,useEffect } from 'react';
import {Dialog,DialogTitle,DialogContent} from '@mui/material/';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
export default function Body(props){ 
  const ip="http://127.0.0.1:8080";
 const[trendData,settrendData]= useState([]);
 const[trendsKeyList,settrendsKeyList]=useState([]);
 const[pinPreview,setpinPreview]=useState(false);
 const[pin,setPin]=useState([]);
 useEffect(()=>{
   axios.get(ip+"/trends").then((response)=>{
    const data = response.data;
    settrendData(data.reverse());
    //console.log(response.data);
  }).catch((error)=>{
    console.log(error);
  })
 },[])
  const[listtrends,setlisttrends]= useState(false);
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2028' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary     
  }));
    return <>
    <Box>
    <Box component="main" sx={{ p: 3 , bgcolor: 'background.paper' , }} >
        <Toolbar />
        <Typography sx={{textAlign:"Center",fontSize:32,border:"32px solid white",color:"#E55807"}}>
          Fostering Collaboration and Empowering Students <br/>Building a Vibrant Student Community</Typography>
      </Box>
    </Box>
    <Box sx={{bgcolor:'background.paper',p:4}}>
            <Typography sx={{textAlign:"Center",fontsize:32}}>Trends in commodity.</Typography>
            <List>
              {
              trendData.map((item,index)=>{
                return <>
                 <ListItem key={item.matchedwords}>
                  <Typography></Typography>
                 <ListItemText
                primary= {"Trends related with "+item.matchedwords.slice(1,-1)} sx={{fontSize:13}}/>
                <Typography>{item.created}</Typography>
                <Button onClick={()=>{
                  console.log("Clicked item is "+item.matchedwords.slice(2,-1))
                  axios.get(ip+"/trend/"+item.matchedwords.slice(2,-1)).then((response)=>{
                    settrendsKeyList(response.data);
                    console.log("END POINT : trend/hash",response.data);
                    setlisttrends(true);
                  }).catch((error)=>{
                    console.log(error);
                  })
                  
                }} >view pins</Button>
          </ListItem>
                </>
              })}
            </List>
       
      
    </Box>
    <Box>   
    <Box sx={{ width: '100%'}}>
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <Item>
            What is We connect?<br/>
            <br/>
          One Place 
          <br/>one Platform 
          <br/>
          connecting  group of Minds into a commodity. <br/>
          <Typography sx={{fontSize:32}}>#connect To #Weconnect</Typography>
          <br/>
          </Item>
        </Grid>
       
        <Grid item xs={6} >
          <Item sx={{textAlign:"center",fontSize:12}}>
          A thriving student community plays a crucial role in shaping a vibrant educational environment.
          <br/> It serves as a platform where ideas flourish, problems find solutions, and thoughts are shared. 
          In this app, we will delve into the importance of nurturing a strong student community and explore how it can foster collaboration, empower students, and create an environment conducive to growth and development.
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
            <Typography>
            A student community provides a fertile ground for the generation and exchange of ideas. It encourages students to think creatively, challenge conventional wisdom, and explore innovative solutions to problems. By organizing workshops, seminars, and brainstorming sessions, students can engage in stimulating discussions that lead to groundbreaking ideas. This collaborative approach can inspire individuals to think beyond the boundaries of their disciplines and foster interdisciplinary collaboration.
            </Typography>
          </Item>
        </Grid>

        <Grid item xs={6}>
          <Item> <Typography>
          Sharing Thoughts and Perspectives:</Typography>
A student community acts as a melting pot of diverse thoughts, perspectives, and experiences. It brings together students from various backgrounds, cultures, and disciplines. By creating opportunities for sharing thoughts, whether through writing, public speaking, or online platforms, students can broaden their horizons, learn from one another, and foster mutual understanding. This exchange of ideas fosters tolerance, empathy, and a rich learning environment.
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
      <Typography> Raising and Addressing Problems:</Typography>   
A vibrant student community provides a safe space for students to raise and discuss the challenges they face. It enables them to voice their concerns, seek guidance, and collaborate on finding solutions. By organizing forums, open discussions, and support networks, students can address common problems together. This collective problem-solving approach not only empowers individuals but also strengthens the community as a whole.
          </Item>
        </Grid>
       <Grid item xs={6}><Item>A vibrant and inclusive student community is the bedrock of an enriching educational journey. It nurtures creativity, collaboration, and empowerment among students. By embracing a culture of idea-sharing, problem-solving, and thought-exchange, students can truly maximize their potential. As students, let us actively participate in building a strong community, supporting one another, and shaping the future together. Remember, it is through collaboration and shared experiences that we can create a student community that inspires and empowers us all.</Item></Grid>
      </Grid>
      <Item sx={{ 
            backgroundImage: 'url(./images/image.jpg)',
            backgroundSize: 'cover'}}> <CardContent >
            <Typography sx={{ fontSize: 32 }} color="text.secondary" gutterBottom>
              We connect 
            </Typography>
            <Typography variant="h5" component="div">
              A student Handler Application.
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
             Where student can access the college alerts and Library.
            </Typography>
            <Typography variant="body2">
              user can create a pin,user can upload digital media content.
              Pin can be a blog,<br/>pin can update ,<br/>pin can be Query,<br/>pin can Riseing Question ,<br/>pin can share.
              <br />
              {'"#WECONNECT"'}
            </Typography>
          </CardContent>
          <CardActions sx={{textAlign:"Center",float:"Center",padding:8,paddingleft:22,paddingright:32}}>
            <Button size="small"sx={{float:"Center"}}>Learn More</Button>
            <Button size="small">Queries</Button>
            <Button>Home</Button>
          </CardActions></Item>
   </Box>
   </Box>
   <Dialog open={listtrends} onClose={()=>setlisttrends(false)}>
      <DialogTitle> Trends with </DialogTitle>
      <DialogContent>
        <Typography>Top Pins </Typography>
          {trendsKeyList.map((val,index)=>{
            return <>
           <Typography>{index} : {val.title}</Typography>
            <Button onClick={
              async()=>{
               await axios.get(ip+"/alert/"+val.alertId).then((response)=>{
                  
                  if(response.status===200){
                    setPin(response.data);
                    console.log(response.data);
                    setpinPreview(true);
                  }
                }).catch((error)=>{
                  console.log("Error while getting alert",error);
                })
      
              }
            }> View Pin</Button>
           
        
          </>
        })}
      </DialogContent>
    </Dialog>
    <Dialog open={pinPreview}onClose={()=>{
      setpinPreview(false);
    }}>
      <DialogTitle>Preview pin</DialogTitle>
      <DialogContent>         
            <Typography>{pin.title}</Typography>
            <Typography>{pin.description}</Typography>
            <Typography>{pin.links}</Typography>
            <Typography>Posted at {pin.created}</Typography>
           
      

      </DialogContent>
    </Dialog>
    </>
}