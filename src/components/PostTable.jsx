import React from 'react'
import { Table, TableHead, TableRow, TableCell, TableBody, IconButton, Tooltip } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

export default function PostTable({ posts = [], onEdit, onTrash }) {
  const list = Array.isArray(posts) ? posts : []

  if (!list.length) {
    return (
      <div style={{ padding: 12 }}>
        <em>No posts to display.</em>
      </div>
    )
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Title</TableCell>
          <TableCell>Content</TableCell>
          <TableCell>Category</TableCell>
          <TableCell align="right">Action</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {list.map((p) => (
          <TableRow key={p.id ?? p._id ?? JSON.stringify(p).slice(0, 20)}>
            <TableCell>{p.title || '(untitled)'}</TableCell>
            <TableCell>{p.content || '-'}</TableCell>
            <TableCell>{p.category || '-'}</TableCell>
            <TableCell align="right">
              <Tooltip title="Edit">
                <IconButton size="small" onClick={() => onEdit && onEdit(p)}>
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Trash">
                <IconButton size="small" onClick={() => onTrash && onTrash(p)}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
