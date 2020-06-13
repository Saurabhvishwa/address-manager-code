import React from 'react';
import './App.css';
import { Route , Switch , withRouter} from 'react-router-dom';
import axios from 'axios';


// components
import Navigation from './component/navigation';
import Add from './component/add';
import Show from './component/show';

// material-ui
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createTheme from '@material-ui/core/styles/createMuiTheme';

// page router
const theme = createTheme({
  palette: {
    primary: {
      light: '#e0f7fa',
      main: '#0097a7',
      dark: '#006064',
      contrastText: '#fff',
    },
    secondary: {
      light: '#bbdefb',
      main: '#2196f3',
      dark: '#0d47a1',
      contrastText: '#fff',
    },
  },
  typography:{
    fontFamily:'Quicksand'
  },
})


const Theme = {
  ...theme,
  
  overrides:{
    MuiExpansionPanelSummary:{
      content:{
        justifyContent:'center'
      }
    },
  MuiTypography:{
    h4:{
      [theme.breakpoints.down('sm')]:{
        fontSize:'1.5rem'
      }
    },
    h5:{
      [theme.breakpoints.down('sm')]:{
        fontSize:'1rem'
      }
    },
    h6:{
      [theme.breakpoints.down('sm')]:{
        fontSize:'1rem'
      }
    },
    subtitle1:{
      [theme.breakpoints.down('sm')]:{
        fontSize:'0.9rem'
      }
    },
    body1:{
      [theme.breakpoints.down('sm')]:{
        fontSize:'0.8rem'
      }
    },
    body2:{
      [theme.breakpoints.down('sm')]:{
        fontSize:'0.7rem'
      }
    },
    caption:{
      [theme.breakpoints.down('sm')]:{
        fontSize:'0.7rem'
      }
    }
  }
}
}

axios.defaults.baseURL = "https://us-central1-address-manager-1998.cloudfunctions.net/api"

function App() {
  return (
    <div className="App">
      <MuiThemeProvider theme={Theme}>
        <div>
          <Navigation/>
        </div>
        <div className='content'>
          <Switch>
            <Route exact path ='/' render = {() => <Add/>}/>
            <Route exact path ='/show' render = {() => <Show/>}/>
          </Switch>
        </div>
      </MuiThemeProvider>
    </div>
  );
}

export default withRouter(App);
