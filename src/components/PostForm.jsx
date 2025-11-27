import React from 'react'
import { TextField, Button, Stack } from '@mui/material'


export default function PostForm({ values, onChange, onPublish, onSaveDraft }) {
return (
<form>
<Stack spacing={2}>
<TextField label="Title" name="title" value={values.title} onChange={onChange} fullWidth />
<TextField label="Category" name="category" value={values.category} onChange={onChange} fullWidth />
<TextField
label="Content"
name="content"
value={values.content}
onChange={onChange}
multiline
rows={8}
fullWidth
/>


<Stack direction="row" spacing={2}>
<Button variant="contained" onClick={onPublish}>Publish</Button>
<Button variant="outlined" onClick={onSaveDraft}>Draft</Button>
</Stack>
</Stack>
</form>
)
}