import React, {useEffect, useState} from "react";
import axios from "axios";
import Header from "./Header";
import Controls from "./Controls";
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import ResultsList from "./ResultsList";
import DiffView from "./DiffView";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {Box, Alert} from "@mui/material";
import BeforeState from "./BeforeState";
import AfterState from "./AfterState";
import 'react-json-pretty/themes/monikai.css';

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
  const [selectedTab, setSelectedTab] = useState(2)

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

  const handleTabSelected = (event, newValue) => {
    setSelectedTab(newValue)
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

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            {children}
          </Box>
        )}
      </div>
    );
  }

  return (
    <>
      <Header/>
      <Controls
        searchCriteria={searchCriteria}
        setSearchCriteria={setSearchCriteria}
        eventTypes={eventTypes}
        auditableTypes={auditableTypes}
        setSelectedResult={setSelectedResult}
      />
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <ResultsList
            total={total}
            lastPage={lastPage}
            searchCriteria={searchCriteria}
            setSearchCriteria={setSearchCriteria}
            results={results}
            resultSelected={setSelectedResult}
          />
        </Grid>
        <Grid item xs={8}>
          {selectedResult ? (
            <>
              <Tabs value={selectedTab} onChange={handleTabSelected} aria-label="tabs-for-display-options">
                <Tab label="Before state" />
                <Tab label="After state" />
                <Tab label="Difference" />
              </Tabs>
              <TabPanel value={selectedTab} index={0}>
                <BeforeState data={selectedResult.old_values}/>
              </TabPanel>
              <TabPanel value={selectedTab} index={1}>
                <AfterState data={selectedResult.new_values}/>
              </TabPanel>
              <TabPanel value={selectedTab} index={2}>
                <DiffView item={selectedResult}/>
              </TabPanel>
            </>
          ) : (<Alert severity="info">No item is selected</Alert>)}
        </Grid>
      </Grid>
    </>
  )
}

export default MainLayout