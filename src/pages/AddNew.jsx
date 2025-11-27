import React, { useState } from 'react'
import { Container, Typography } from '@mui/material'
import PostForm from '../components/PostForm'
import { createArticle } from '../api/client'
import { STATUS } from '../utils/helpers'
import { useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'

export default function AddNew() {

const { enqueueSnackbar } = useSnackbar()
    
const [values, setValues] = useState({ title: '', category: '', content: '' })
const navigate = useNavigate()


function onChange(e) {
const { name, value } = e.target
setValues((s) => ({ ...s, [name]: value }))
}


async function publish() {
 try {
    await createArticle({ ...values, status: STATUS.PUBLISHED })
    enqueueSnackbar("Berhasil publish!", { variant: "success" })
    navigate("/all-posts")
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
    await createArticle({ ...values, status: STATUS.DRAFT })
    enqueueSnackbar("Berhasil draft!", { variant: "success" })
    navigate("/all-posts")
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
<Typography variant="h4" gutterBottom>Add New</Typography>
<PostForm values={values} onChange={onChange} onPublish={publish} onSaveDraft={saveDraft} />
</Container>
)
}   