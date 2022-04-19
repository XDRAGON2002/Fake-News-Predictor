import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import styles from '../styles/Home.module.css';
import {Message,Chat,InsertChart} from '@mui/icons-material';
import Link from 'next/link';

const drawerWidth = 80;

export default function NavDrawer() {
  return (
    <Box sx={{ display: 'flex'}}>
      <CssBaseline />
      <Drawer 
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            borderRadius: "0px 10px 10px 0px",
            background: "linear-gradient(to right, #890695 , #4b0294) !important",
            width: drawerWidth,
            overflowX: "hidden",
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <List className={styles.listitem}>
          {['Inbox', 'Starred'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                
                {index%2===0 && <Link href="/"><Chat style={{ color: "white" }} className={styles.svg_icons} data-testid="home"/></Link>}
                {index%2===1 && <Link href="/news"><InsertChart style={{ color: "white" }} className={styles.svg_icons} data-testid="news"/></Link>}
              </ListItemIcon>
            </ListItem>
          ))}
        </List>

      </Drawer>
      
    </Box>
  );
}