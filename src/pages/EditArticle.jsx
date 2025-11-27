import React, { useEffect, useState } from 'react'
import { Container, Typography } from '@mui/material'
import PostForm from '../components/PostForm'
import { fetchArticle, updateArticle } from '../api/client'
import { STATUS } from '../utils/helpers'
import { useParams, useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'

export default function EditArticle() {
    const { enqueueSnackbar } = useSnackbar()

const { id } = useParams()
const [values, setValues] = useState({ title: '', category: '', content: '' })
const navigate = useNavigate()


useEffect(() => {
load() // eslint-disable-next-line react-hooks/exhaustive-deps
}, [id]) 


async function load() {
try {
    const res = await fetchArticle(id)
    console.log("teswt", res.data)
setValues({ title: res.data.data.title, category: res.data.data.category, content: res.data.data.content })
} catch (err) {
console.error(err)
console.error("API Error:", err)

      // Ambil pesan error backend
      const apiMsg =
        err.response?.data?.error?.msg ||
        err.response?.data?.message ||
        "Terjadi kesalahan pada server."

      // Tampilkan toast
      enqueueSnackbar(apiMsg, { variant: "error" })
}
}


function onChange(e) {
const { name, value } = e.target
setValues((s) => ({ ...s, [name]: value }))
}


async function publish() {
try {
await updateArticle(id, { ...values, status: STATUS.PUBLISHED })
navigate('/all-posts')
} catch (err) {
    console.error(err)

    const msg =
      err.response?.data?.error?.msg ||
      err.response?.data?.message ||
      "Gagal publish."

    enqueueSnackbar(msg, { variant: "error" })
  }
}


async function saveDraft() {
    try {
await updateArticle(id, { ...values, status: STATUS.DRAFT })
navigate('/all-posts')
} catch (err) {
    console.error(err)

    const msg =
      err.response?.data?.error?.msg ||
      err.response?.data?.message ||
      "Gagal draft."

    enqueueSnackbar(msg, { variant: "error" })
  }
}


return (
<Container>
<Typography variant="h4" gutterBottom>Edit Article</Typography>
<PostForm values={values} onChange={onChange} onPublish={publish} onSaveDraft={saveDraft} />
</Container>
)
}