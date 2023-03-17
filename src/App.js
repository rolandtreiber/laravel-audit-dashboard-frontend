import {parseDiff, Diff, Hunk} from 'react-diff-view';
import {diffLines, formatLines} from 'unidiff';
import 'react-diff-view/style/index.css';
import MainLayout from "./views/MainLayout";
import {Box, Container, CssBaseline} from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
function App() {
    const EMPTY_HUNKS = [];

    const oldText = '[\n' +
        '    {\n' +
        '        "age": "22",\n' +
        '        "name": "Niroj"\n' +
        '    },\n' +
        '    {\n' +
        '        "age": "20",\n' +
        '        "name": "Dey"\n' +
        '    }\n' +
        ']\n';
    const newText = '[\n' +
        '    {\n' +
        '        "age": "22",\n' +
        '        "name": "Niroj"\n' +
        '    },\n' +
        '    {\n' +
        '        "age": "20",\n' +
        '        "name": "Dey1"\n' +
        '    }\n' +
        ']\n';

    const diffText = formatLines(diffLines(oldText, newText), {context: 3});
    const [diff] = parseDiff(diffText, {nearbySequences: 'zip'});

  return (
    <div className="App">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CssBaseline />
        <Container maxWidth="xl">
          <MainLayout/>
        </Container>
      </LocalizationProvider>
    </div>
  );
}

export default App;
