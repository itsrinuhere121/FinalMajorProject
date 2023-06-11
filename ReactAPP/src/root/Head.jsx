import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
export default function Head(props){
  const drawerWidth = 240;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const navHomeHandler=()=>{    
       props.action("home");
  }
  const alertHandler =()=>{
    props.action("alert");
  }
  const libraryhandler =()=>{
    props.action("library");
  }
  const loginHadler =()=>{
    props.action("login");
  }
  const [open, setOpen] = React.useState(false);
  
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
      We connect
      </Typography>
      <Divider />
      <List>
      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          </Box>
          <ListItem  disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText><Button  onClick={navHomeHandler}>Home</Button></ListItemText>
            </ListItemButton>
            
          </ListItem>
          <ListItem  disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText> <Button onClick={alertHandler}> Alerts</Button></ListItemText>
            </ListItemButton>
            
          </ListItem>
          
          <ListItem  disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText>  <Button onClick={loginHadler}>{props.status}</Button></ListItemText>
            </ListItemButton>
          </ListItem>
      </List>
    </Box>
  );
 // const container = () => window().document.body ;
  return <>
      <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            We connect
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
               <Button  sx={{ color: '#fff' }} onClick={navHomeHandler}>Home</Button>
                <Button sx={{ color: '#fff' }} onClick={alertHandler}> pins</Button>
                
                <Button sx={{ color: '#fff' }}onClick={loginHadler}>{props.status}</Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          //container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      </Box>
      
  </>
}