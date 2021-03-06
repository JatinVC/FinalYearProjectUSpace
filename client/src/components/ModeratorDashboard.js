import React, {useState} from 'react'
import UserDashboard from './UserDashboard';
import {Button} from '@material-ui/core';
import {TextField} from '@material-ui/core';
import {Grid} from '@material-ui/core';
import Axios from 'axios';
import { buildURL } from '../_helpers/url-builder';
import {Link} from 'react-router-dom';
export default function ModeratorDashboard() {
    const [category, setCategory] = useState({
        catName: '',
        catDesc: ''
    });

    const handleChange = (event) => {
        setCategory({...category, [event.target.name]:event.target.value});
        event.preventDefault();
    };

    function createCat(){
        let requestPayload = {
            catName: category.catName,
            catDesc: category.catDesc
        }
        Axios.post(buildURL('/api/discussion/createcat'), requestPayload)
        .then(res=>{
            if(res.data.success){
                console.log('category created successfully');
            }
        })
    }

    return (
        <div>
            <Grid container direction="row">
                <Grid item xs={3}>
                    <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="catName"
                    label="Category Name"
                    name="catName"
                    value={category.catName}
                    onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="catDesc"
                    label="Category Description"
                    name="catDesc"
                    value={category.catDesc}
                    onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={3}>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={createCat}
                    >
                        Create Category
                    </Button>
                </Grid>
            </Grid>
            <Grid>
                <Button
                    component={Link}
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    to='/announcement/create'
                >
                    Create Announcement
                </Button>
            </Grid>
            <UserDashboard></UserDashboard>
        </div>
    )
}
