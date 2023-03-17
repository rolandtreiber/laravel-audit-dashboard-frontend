import React from "react";
import {Box, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import Grid from "@mui/material/Grid";
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const Controls = ({searchCriteria, setSearchCriteria, eventTypes, auditableTypes}) => {

  const handleEventChange = (e) => {
    setSearchCriteria({...searchCriteria, event: e.target.value})
  };

  const handleAuditableChange = (e) => {
    setSearchCriteria({...searchCriteria, auditable_type: e.target.value})
  };

  const handleOldValueChange = (e) => {
    setSearchCriteria({...searchCriteria, old_values: e.target.value})
  };

  const handleNewValueChange = (e) => {
    setSearchCriteria({...searchCriteria, new_values: e.target.value})
  };

  const handleAuditableIdChange = (e) => {
    setSearchCriteria({...searchCriteria, auditable_id: e.target.value})
  };

  const handleCreatedAtChange = (e) => {
    setSearchCriteria({...searchCriteria, created_at: e})
  };

  return (
    <Box sx={{ flexGrow: 1, marginTop: 2, marginBottom: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <FormControl fullWidth>
            <InputLabel id="event-type-label">Event Type</InputLabel>
              <Select
                labelId="event-type-label"
                id="event-select"
                value={searchCriteria.event}
                label="Age"
                onChange={handleEventChange}
              >
                <MenuItem key="unselected-event" value={""}>select</MenuItem>
                {eventTypes.map(item => <MenuItem key={item} value={item}>{item}</MenuItem>)}
              </Select>
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <FormControl fullWidth>
            <InputLabel id="auditable-type-label">Auditable Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={searchCriteria.auditable_type}
              label="Auditable Type"
              onChange={handleAuditableChange}
            >
              <MenuItem key="unselected-auditable-type" value={""}>select</MenuItem>
              {auditableTypes.map(item => <MenuItem key={item} value={item}>{item}</MenuItem>)}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <FormControl fullWidth>
            <TextField id="outlined-basic" label="Old Value" variant="outlined" value={searchCriteria.old_values} onChange={handleOldValueChange} />
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <FormControl fullWidth>
            <TextField id="outlined-basic" label="New Value" variant="outlined"  value={searchCriteria.new_values} onChange={handleNewValueChange} />
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <FormControl fullWidth>
            <TextField id="outlined-basic" label="Model Id" variant="outlined" value={searchCriteria.auditable_id} onChange={handleAuditableIdChange} />
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <FormControl fullWidth>
            <DatePicker onChange={(e) => handleCreatedAtChange(e.format('YYYY-MM-DD'))} />
          </FormControl>
        </Grid>

      </Grid>
    </Box>
  )
}

export default Controls