import React from "react";
import {Card, CardContent, CardHeader, Chip} from "@mui/material";
import { format } from 'date-fns'

const ResultsList = ({results, resultSelected}) => {

  const eventColors = {
    created: "success",
    updated: "primary",
    deleted: "warning"
  }
  const resultItem = (item) => {
    const color = eventColors[item.event] ? eventColors[item.event] : "default";

    return (<Card style={{marginBottom: 5}}>
      <CardHeader title={item.id + " - " + item.auditable_type} style={{paddingBottom: 0}}/>
      <CardContent style={{paddingTop: 0, paddingBottom: 0}}>
        <p><small>{item.auditable_id}</small></p>

        <Chip label={item.event} color={color}/><Chip label={item.ip_address} color={"secondary"}/>
        <p><small>Created at: <strong>{format(new Date(item.created_at), 'dd-mm-yyyy HH:mm:ss')}</strong></small></p>
      </CardContent>
    </Card>)
  }

  return (
    <ul style={{listStyleType: "none", paddingLeft: 0}}>
      {results.map(item => <li onClick={() => resultSelected(item)} style={{paddingLeft: 0}}>{resultItem(item)}</li>)}
    </ul>
  )
}

export default ResultsList