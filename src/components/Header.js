import React from 'react'
import { AppBar, Tab, Toolbar, Typography, Button, Box, Tabs } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { authActions } from '../store';

function Header() {
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const isLoggedIn = useSelector(state => state.isLoggedIn);

  return (
    <AppBar
      position="sticky"
      sx={{ background: "blue" }} >
      <Toolbar>
        <Typography variant="h4">BlogsApp</Typography>
        {isLoggedIn && <Box display="flex" marginLeft="auto" marginRight="auto">
          <Tabs
            textColor='inherit'
            value={value}
            onChange={(e, val) => setValue(val)}>
            <Tab
              LinkComponent={Link} to='/blogs'
              label="All Blogs" />
            <Tab
              LinkComponent={Link} to='/myBlogs'
              label="My Blogs" />
            <Tab
              LinkComponent={Link} to='/blogs/add'
              label="Add Blogs" />
          </Tabs>
        </Box>}

        <Box display="flex" marginLeft="auto">

          {!isLoggedIn && <>   <Button
            LinkComponent={Link} to='/auth'
            variant="contained"
            sx={{ margin: 1, borderRadius: 10 }}
            color="warning">login</Button>

            <Button
              LinkComponent={Link} to='/auth'
              variant="contained"
              sx={{ margin: 1, borderRadius: 10 }}
              color="warning">Signup</Button>  </>}

          {isLoggedIn && <Button
            onClick={() => dispatch(authActions.logout())}
            LinkComponent={Link} to='/auth'
            variant="contained"
            sx={{ margin: 1, borderRadius: 10 }}
            color="warning">Logout</Button>}

        </Box>

      </Toolbar>
    </AppBar>
  )
}

export default Header
