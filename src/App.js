import {parseDiff, Diff, Hunk} from 'react-diff-view';
import {diffLines, formatLines} from 'unidiff';
import 'react-diff-view/style/index.css';

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
      <header className="App-header">
          <Diff viewType="split" diffType='' hunks={diff.hunks || EMPTY_HUNKS}>
              {hunks =>
                  hunks.map(hunk => (
                      <Hunk key={hunk.content} hunk={hunk} />
                  ))
              }
          </Diff>
      </header>
    </div>
  );
}

export default App;
