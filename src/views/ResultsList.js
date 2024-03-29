import React, {useState} from "react";
import {Card, CardActions, CardContent, CardHeader, Chip, Snackbar, Alert} from "@mui/material";
import { format } from 'date-fns'
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {CopyToClipboard} from "react-copy-to-clipboard/src";

const ResultsList = ({selectedResult, results, resultSelected, searchCriteria, setSearchCriteria, total, lastPage}) => {
  const [copiedId, setCopiedId] = useState("")
  const [open, setOpen] = useState(false)

  const handlePageChange = (e, v) => {
    setSearchCriteria({...searchCriteria, page: v-1})
  }

  const eventColors = {
    created: "success",
    updated: "primary",
    deleted: "warning"
  }

  const handleIdCopied = (text) => {
    setCopiedId(text)
    setOpen(true)
  }

  const resultItem = (item) => {
    const color = eventColors[item.event] ? eventColors[item.event] : "default";

    return (<Card style={{marginBottom: 5, cursor: "pointer", backgroundColor: item.id === selectedResult?.id ? "lightgray" : "white"}}>
      <CardHeader title={item.id + " - " + item.auditable_type} style={{paddingBottom: 0}}/>
      <CardContent style={{paddingTop: 0, paddingBottom: 0}}>
        <ul style={{paddingLeft: 20}}>
          <li><small>Model Id: <strong>{item.auditable_id}</strong></small> <CopyToClipboard text={item.auditable_id}
                                                                                             onCopy={() => handleIdCopied(item.auditable_id)}><ContentCopyIcon style={{color:"blue", fontSize: 14}}/></CopyToClipboard><br/></li>
          <li><small>User Id: <strong>{item.user_id}</strong></small><br/></li>
          <li><small>Created at: <strong>{format(new Date(item.created_at), 'dd-mm-yyyy HH:mm:ss')}</strong></small></li>
        </ul>
        <CardActions>
          <Chip label={item.event} color={color}/>
          <Chip label={item.ip_address} color={"secondary"}/>
          <Chip label={item.user_agent} color={"default"}/>
        </CardActions>
      </CardContent>
    </Card>)
  }

  return (
    <Stack spacing={2}>
      <Pagination style={{alignSelf: "center"}} count={lastPage+1} page={searchCriteria.page+1} onChange={handlePageChange} />
      <Snackbar open={open} autoHideDuration={3000} onClose={() => setOpen(false)}>
        <Alert onClose={() => setOpen(false)} severity="success" sx={{ width: '100%' }}>
          Model ID: <strong>{copiedId}</strong> is copied to the clipboard
        </Alert>
      </Snackbar>
      <small>Total: {total}</small>
      <ul style={{listStyleType: "none", paddingLeft: 0}}>
        {results.map(item => <li key={"auditable-"+item.id} onClick={() => resultSelected(item)} style={{paddingLeft: 0}}>{resultItem(item)}</li>)}
      </ul>
    </Stack>
  )
}

export default ResultsList