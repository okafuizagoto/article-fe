import React, { useEffect, useState } from 'react'
import { Tabs, Tab, Paper, Box, Container, Typography, CircularProgress } from '@mui/material'
import PostTable from '../components/PostTable'
import { fetchPublished, patchArticle } from '../api/client'
import { STATUS } from '../utils/helpers'
import { useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'

export default function AllPosts() {
  const { enqueueSnackbar } = useSnackbar()

  const [tab, setTab] = useState(0)
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const statuses = [STATUS.PUBLISHED, STATUS.DRAFT, STATUS.TRASHED]

  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab])

  async function load() {
    setLoading(true)
    try {
      const res = await fetchPublished(1, 9999)
      const items = Array.isArray(res.data) ? res.data : []

      const currentStatus = statuses[tab].toLowerCase()
      const filtered = items.filter((p) => (p.status || '').toLowerCase() === currentStatus)

      setPosts(filtered)
    } catch (err) {
      console.error('Load posts failed', err)
      const apiMsg =
        err.response?.data?.error?.msg ||
        err.response?.data?.message ||
        "Terjadi kesalahan pada server."

      enqueueSnackbar(apiMsg, { variant: "error" })
      setPosts([])
    } finally {
      setLoading(false)
    }
  }

  function handleEdit(post) {
    navigate(`/edit/${post.id ?? post._id}`)
  }

  async function handleTrash(post) {
    try {
      await patchArticle(post.id ?? post._id, { status: STATUS.TRASHED })
      load()
    } catch (err) {
      console.error('Trash failed', err)
    }
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>All Posts</Typography>
      <Paper>
        <Tabs value={tab} onChange={(_, v) => setTab(v)}>
          <Tab label="Published" />
          <Tab label="Drafts" />
          <Tab label="Trashed" />
        </Tabs>
        <Box p={2}>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
              <CircularProgress />
            </Box>
          ) : (
            <PostTable posts={posts} onEdit={handleEdit} onTrash={handleTrash} />
          )}
        </Box>
      </Paper>
    </Container>
  )
}
