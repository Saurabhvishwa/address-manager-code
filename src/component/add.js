import React, { Component } from 'react';
import axios from 'axios';

// material-ui
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import Autocomplete from '@material-ui/lab/Autocomplete';

const styles = theme => ({
    grid:{
        // border:'1px solid black'
        position:'relative',
        width:"20%",
        [theme.breakpoints.down('sm')]:{
            width:'85%'
        }
    },
    title:{
        marginTop:theme.spacing(4),
        marginBottom:theme.spacing(4),
        textAlign:'center'
    },
    form:{
        display:"flex",
        flexDirection:"column",
        height:450,
        justifyContent:'space-between'
    },
    progress:{
        position:'absolute'
    },
    alert:{
        width:'-webkit-fill-available',
        position:'absolute',
        zIndex:10,
        display:'flex',
        justifyContent:'center'
    }
})

class add extends Component {
    constructor(){
        super();
        this.state = {
            errors:{},
            type:'',
            house:'',
            area:'',
            city:'',
            pincode:'',
            state:'',
            loading:false,
            saved:false,
            areaList:[]
        }
        this.alert = null
    }
    handleChange = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.name]:e.target.value,
            errors:{}
        })
        
         if(e.target.name === 'pincode' && e.target.value.length >= 6){
            this.setState({areaList:[]})
            axios.get(`https://api.postalpincode.in/pincode/${e.target.value}`)
            .then(res => {
                if(res.status >=200 && res.status<300){
                    if(res.data[0].PostOffice){
                        res.data[0].PostOffice.map(city => this.setState({
                            areaList:[...this.state.areaList,city.Name]
                        }))
                        this.setState({
                            area:this.state.areaList[0],
                            state:res.data[0].PostOffice[0].State,
                            city:res.data[0].PostOffice[0].Region
                        })
                    }
                    else{
                        this.setState({
                            errors:{pincode:"Invalid Pincode"}
                        })
                    }
                }
            })
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({loading:true})
        this.setState({errors:{}})
        const data = {
            type:this.state.type,
            houseinfo:this.state.house,
            area:this.state.area,
            city:this.state.city,
            pincode:this.state.pincode,
            state:this.state.state
        }
        axios.post('/add' , data)
        .then(res => {
            console.log(res.data)
            if(res.status>=200 || res.status<300){
                this.setState({
                    errors:{},
                    type:'',
                    house:'',
                    area:'',
                    city:'',
                    pincode:'',
                    state:'',
                    loading:false,
                    saved:true,
                    areaList:[]

                })
                this.hideAlert()
            }else throw new Error({error:"Something went wrong"})
        })
        .catch(error => {
            if(error.message === 'Request failed with status code 500' || error.message === 'Network Error'){
                this.setState({
                    loading:false,
                    errors:{error:error.message}
                })
                this.hideAlert();
            }
            else{
                this.setState({
                    errors:error.response.data.errors,
                    loading:false
                })
            }
            
        })
    }
    hideAlert = () => {
        setTimeout(() => this.setState({
            saved:false,
            errors:{}
        }),3000)
    }
    handleOption = (e,newValue) => {
        this.setState({area:newValue})
    }
    render() {
        const {classes} = this.props;
        const {errors , loading , saved , areaList} = this.state;
        return (
            <Grid className={classes.grid}>
                { saved && <Alert className={classes.alert} severity="success">Your address has successfully saved.</Alert>}
                { errors.error && <Alert className={classes.alert} severity="error">Something went wrong. Try again.</Alert>}
                <div className={classes.title}>

                    <Typography variant='h4' color='inherit'>
                        Add New Address
                    </Typography>
                </div>
                <div>
                    <form className={classes.form} noValidate autoComplete="off">

                        <TextField helperText={errors.type ? errors.type : ''} error={errors.type ? true : false} size='small' name='type' value={this.state.type} onChange={this.handleChange} 
                        id="addresstitle" label="Address Type" variant='standard' color='secondary' />

                        <TextField helperText={errors.houseinfo ? errors.houseinfo : ''} error={errors.houseinfo ? true : false} size='small' name='house' value={this.state.house} onChange={this.handleChange} 
                        id="house" label="House No. / Building No." variant="standard" color='secondary' />

                        <TextField helperText={errors.pincode ? errors.pincode : ''} error={errors.pincode ? true : false} size='small' name='pincode' value={this.state.pincode} onChange={this.handleChange} 
                        type='text' id="pincode" label="Pincode" variant="standard" color='secondary' />    

                        <Autocomplete
                            id="area"
                            name='area'
                            value={this.state.area}
                            onChange={this.handleOption}
                            options={areaList}
                            getOptionSelected={(option) => option}
                            style={{ width: '-webkit-fill-available' }} size='small'
                            renderInput={(params) => <TextField {...params} 
                            helperText={errors.area ? errors.area : ''} error = {errors.area ? true : false} 
                            label="Area" variant="standard" color='secondary' />}
                        />

                        <TextField helperText={errors.city ? errors.city : ''} error={errors.city ? true : false} size='small' name='city' value={this.state.city} onChange={this.handleChange} 
                        id="city" label="City" variant="standard" color='secondary' />

                        <TextField helperText={errors.state ? errors.state : ''} error={errors.state ? true : false} size='small' name='state' value={this.state.state} onChange={this.handleChange} 
                        id="state" label="State" variant="standard" color='secondary' />

                        
                        
                        <Button variant='outlined' color='primary' size='large' onClick={this.handleSubmit} style={{position:'relative'}} disabled={loading}>
                            Save Address
                            {
                                loading && <CircularProgress size={30} className={classes.progress} />
                            }
                        </Button>
                        
                    </form>
                    
                </div>
            </Grid>
        );
    }
}

export default withStyles(styles)(add);