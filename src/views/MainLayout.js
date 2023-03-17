import React, {useEffect, useState} from "react";
import axios from "axios";
import Header from "./Header";
import Controls from "./Controls";
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import ResultsList from "./ResultsList";
import DiffView from "./DiffView";
import {format} from "date-fns";

const MainLayout = () => {
  const API_URL = process.env.NODE_ENV === "development" ? process.env.REACT_APP_API_URL_TEST : process.env.REACT_APP_API_URL_BUILD
  const [results, setResults] = useState([])
  const [total, setTotal] = useState(0)
  const [lastPage, setLastPage] = useState(0)
  const [eventTypes, setEventTypes] = useState([])
  const [auditableTypes, setAuditableTypes] = useState([])
  const [searchCriteria, setSearchCriteria] = useState({
    page: 0,
    auditable_type: "",
    event: "",
    old_values: "",
    new_values: "",
    auditable_id: "",
    created_at: ""
  })
  const [selectedResult, setSelectedResult] = useState()

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  const loadItems = () => {
    const params = new URLSearchParams(searchCriteria).toString()
    axios.get(API_URL+"search?"+params).then(response => {
      if (response.status === 200) {
        setResults(response.data.data)
        setTotal(response.data.total)
        setLastPage(response.data.last_page)
      }
    })
  }

  const loadEventTypes = () => {
    axios.get(API_URL+"search/event-types").then(response => {
      if (response.status === 200) {
        setEventTypes(response.data)
      }
    })
  }

  const loadAuditableTypes = () => {
    axios.get(API_URL+"search/auditable-types").then(response => {
      if (response.status === 200) {
        setAuditableTypes(response.data)
      }
    })
  }

  useEffect(() => {
    loadEventTypes()
    loadAuditableTypes()
  }, [])

  useEffect(() => {
    loadItems()
  }, [searchCriteria])

  return (
    <>
      <Header/>
      <Controls
        searchCriteria={searchCriteria}
        setSearchCriteria={setSearchCriteria}
        eventTypes={eventTypes}
        auditableTypes={auditableTypes}
      />
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <ResultsList results={results} resultSelected={setSelectedResult}/>
        </Grid>
        <Grid item xs={8}>
          {selectedResult && <DiffView item={selectedResult}/>}
        </Grid>
      </Grid>
    {/*<div>{JSON.stringify(results)}</div>*/}
    {/*<h1>{total}</h1>*/}
    {/*<h2>{lastPage}</h2>*/}
    {/*  <h3>{JSON.stringify(auditableTypes)}</h3>*/}
    {/*  <h4>{JSON.stringify(eventTypes)}</h4>*/}
    </>
  )
}

export default MainLayout