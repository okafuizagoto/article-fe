import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import AllPosts from './pages/AllPosts'
import AddNew from './pages/AddNew'
import EditArticle from './pages/EditArticle'
import Preview from './pages/Preview'
import { AppBar, Toolbar, Button, Container } from '@mui/material'

export default function App() {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/all-posts">All Posts</Button>
          <Button color="inherit" component={Link} to="/add-new">Add New</Button>
          <Button color="inherit" component={Link} to="/preview">Preview</Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 3 }}>
        <Routes>
          <Route path="/" element={<AllPosts />} />
          <Route path="/all-posts" element={<AllPosts />} />
          <Route path="/add-new" element={<AddNew />} />
          <Route path="/edit/:id" element={<EditArticle />} />
          <Route path="/preview" element={<Preview />} />
        </Routes>
      </Container>
    </div>
  )
}
