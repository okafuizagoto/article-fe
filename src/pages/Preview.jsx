import React, { useEffect, useState } from 'react'
import {
  Container,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Stack,
  Pagination,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Box
} from '@mui/material'
import { fetchPublished } from '../api/client'
import { useSnackbar } from 'notistack'

export default function Preview() {
const { enqueueSnackbar } = useSnackbar()

  const [posts, setPosts] = useState([])
  const [page, setPage] = useState(1)
  const [length, setLength] = useState(5)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, length])

  async function load() {
    setLoading(true)
    try {
      const res = await fetchPublished(page, length)

      let items = Array.isArray(res.data) ? res.data : []
      let total = null
      if (!Array.isArray(res.data) && typeof res.data === 'object') {
        if (Array.isArray(res.data.data)) items = res.data.data
        else if (Array.isArray(res.data.items)) items = res.data.items
        else if (Array.isArray(res.data)) items = res.data

        total = res.data?.total ?? res.data?.totalCount ?? null
      }

      if (!total && res.headers && res.headers['x-total-count']) {
        const h = res.headers['x-total-count']
        if (typeof h === 'string' && /^\d+$/.test(h)) total = parseInt(h, 10)
      }

      if (!total) {
        total = items.length
      }

      const pages = Math.max(1, Math.ceil(res.metadata / length))

      console.log("pages", pages)
      console.log("total", total)
      console.log("res.metadata", res.metadata)

      setPosts(items)
      setTotalPages(pages)
    } catch (err) {
      console.error("API Error:", err)

      const apiMsg =
        err.response?.data?.error?.msg ||
        err.response?.data?.message ||
        "Terjadi kesalahan pada server."

      enqueueSnackbar(apiMsg, { variant: "error" })
      setPosts([])
      setTotalPages(1)
    } finally {
      setLoading(false)
    }
  }

  const computeIndex = (indexOnPage) => {
    return (page - 1) * length + indexOnPage + 1
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Preview — Published</Typography>

      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel id="rows-per-page-label">Rows</InputLabel>
          <Select
            labelId="rows-per-page-label"
            value={length}
            label="Rows"
            onChange={(e) => { setPage(1); setLength(Number(e.target.value)) }}
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
          </Select>
        </FormControl>

        <Typography variant="body2">
          {loading ? 'Loading...' : `Page ${page} of ${totalPages}`}
        </Typography>
      </Stack>

      <Paper sx={{ mb: 2 }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>No.</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Content</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {posts.length ? (
                posts.map((p, i) => (
                  <TableRow key={p.id ?? p._id ?? `${page}-${i}`}>
                    <TableCell>{computeIndex(i)}</TableCell>
                    <TableCell>{p.title || '(untitled)'}</TableCell>
                    <TableCell>{p.category || '-'}</TableCell>
                    <TableCell sx={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>
                      {p.content || '-'}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ py: 4 }}>
                    <em>No published posts to display.</em>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </Paper>

      <Stack alignItems="center" sx={{ mt: 3 }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(_, v) => setPage(v)}
          color="primary"
        />
      </Stack>
    </Container>
  )
}
