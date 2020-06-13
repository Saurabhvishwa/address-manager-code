import React, {Component} from 'react';
import axios from 'axios';

// material-ui
import withStyles from '@material-ui/styles/withStyles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CircularProgress from '@material-ui/core/CircularProgress';
import ArrowRight from '@material-ui/icons/ArrowRight';

const styles = (theme) => ({
  root: {
    marginTop:theme.spacing(4),
    width: '50%',
    textAlign:'center',
    [theme.breakpoints.down('sm')]:{
        width:'90%'
    }
  },
  heading: {
    fontWeight: 800,
    color:'white',
    textShadow:'0 0 30px gray'
  },
  expansion:{
      marginBottom:theme.spacing(2),
      borderRadius:10,
      boxShadow:'none',
      border:'none',
      '&::before':{
          display:'none'
      }
  },
  title:{
      backgroundColor:theme.palette.primary.main,
      borderRadius:'10px 10px 0 0'
  },
  details:{
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      flexDirection:'column',
      backgroundColor:theme.palette.secondary.light,
      borderRadius:'0 0 10px 10px'
  },
  alignDetail:{
      display:'flex',
      width:'80%',
      justifyContent:'space-between',
      marginBottom:theme.spacing(2)
  },
  txtField:{
      display:'flex',
      alignItems:'center'
  }
})

class Show extends Component {
    constructor(){
        super();
        this.state = {
            error:null,
            addresses : [],
            loading:true
        }
    }
    componentDidMount(){
        axios.get('/')
        .then((res) => {
            if(res.status>=200 || res.status<300){
                // console.log(res.data)
                    this.setState({
                        addresses:res.data.data,
                        loading:false
                    })
                
            }else throw new Error({error:"Something went wrong"})
        })
        .catch(error => {
            if(error.message === 'Request failed with status code 500' || error.message === 'Network Error'){
                this.setState({
                    loading:false,
                    error:'Something went wrong , try again.'
                })
            }
            else{
                this.setState({
                    error
                })
            }
        })
    }
    render(){
        const {classes} = this.props;
        const {addresses , loading , error} = this.state;
        const addressList = loading ? (<CircularProgress/>) : (
            error ? (
                <Typography variant='h5' color='error'>Something went wrong. Try again.</Typography>
            ) : (
                addresses.length > 0 ? (
                    addresses.map((address,index) => {
                        return (
                            <ExpansionPanel key={index} className={classes.expansion}>
                                <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                className={classes.title}
                                >
                                <Typography variant='h5' align='center' className={classes.heading}>{address.type}</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails className={classes.details}>
                                    <Typography className={classes.txtField} variant='h6'><b>House No.</b>  <ArrowRight/>  {address.houseinfo}</Typography>
                                    <Typography className={classes.txtField} variant='h6'><b>Area</b>  <ArrowRight/>  {address.area}</Typography>
                                    <Typography className={classes.txtField} variant='h6'><b>City</b>  <ArrowRight/>  {address.city}</Typography>
                                    <Typography className={classes.txtField} variant='h6'><b>Pincode</b>  <ArrowRight/>  {address.pincode}</Typography>
                                    <Typography className={classes.txtField} variant='h6'><b>State</b>  <ArrowRight/>  {address.state}</Typography>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        )
                    })
                ) : (
                    <Typography variant='h6'>No addresses yet.</Typography>
                )
            )
        )
  return (
    <div className={classes.root}>
        {
            addressList
        }
    </div>
  )
    }
}

export default withStyles(styles)(Show)
