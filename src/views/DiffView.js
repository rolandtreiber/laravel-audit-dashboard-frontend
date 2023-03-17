import React from "react";
import {Diff, Hunk, parseDiff} from "react-diff-view";
import {diffLines, formatLines} from "unidiff";
import {Card, CardHeader} from "@mui/material";

const DiffView = ({item}) => {
  const EMPTY_HUNKS = [];
  const oldV = JSON.stringify(JSON.parse(item.old_values), null, 2)
  const newV = JSON.stringify(JSON.parse(item.new_values), null, 2)
  const diffText = formatLines(diffLines(oldV, newV));
  const [diff] = diffText && parseDiff(diffText, {nearbySequences: 'zip'});

  return (
    <Card>
      <CardHeader title="Difference"/>
    <div>
      {item ? <Diff viewType="split" diffType='' hunks={diff.hunks || EMPTY_HUNKS}>
      {hunks =>
         hunks.map(hunk => (
             <Hunk key={hunk.content} hunk={hunk} />
         ))
     }
    </Diff> : <p>No item is selected</p>}
    </div>
    </Card>
  )
}

export default DiffView