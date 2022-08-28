// import { signOut } from '../utils/auth';
// import { useAuth } from '../utils/context/authContext';

import { useState } from 'react';

function Home() {
  // const { user } = useAuth();

  const columns = ['a', 'b', 'c', 'd', 'e'];
  const rows = ['1', '2', '3', '4', '5'];

  const gradeTable = {
    a1: 7,
    a2: 6,
    a3: 7,
    a4: 4,
    a5: 3,
    a7: 1,
    b1: 5,
    b2: 4,
    b3: 3,
    b4: 3,
    b5: 4,
    c1: 4,
    c2: 3,
    c3: 4,
    c4: 2,
    c5: 2,
    d1: 4,
    d2: 5,
    d3: 2,
    d4: 3,
    d5: 1,
    e1: 5,
    e2: 4,
    e3: 3,
    e4: 2,
    e5: 1,
  };

  const lessonCategories = {
    1: 'regular verbs',
    2: 'irregular verbs',
    3: 'irregular verbs 2',
    4: 'irregular verbs 3',
    5: 'sooo irregular',
    a: 'present',
    b: 'objects',
    c: 'preterite',
    d: 'imperfect',
    e: 'future',
  };

  const calculatedTileNames = [];
  for (let y = 0; y < rows.length; y++) {
    for (let x = 0; x < columns.length; x++) {
      calculatedTileNames.push(`${columns[x]}${rows[y]}`);
    }
  }
  const [selected, setSelected] = useState('initial');

  // begin hard-coded sizing constants
  const scoreFontSize = () => {
    const heightAsLimit = 20 / rows.length;
    const widthAsLimit = 20 / columns.length;
    return Math.min(heightAsLimit, widthAsLimit);
  };
  const labelFontSize = () => {
    const heightAsLimit = 10 / rows.length;
    const widthAsLimit = 10 / columns.length;
    return Math.min(heightAsLimit, widthAsLimit);
  };
  const scoreLineHeight = () => 60 / rows.length;
  const verbItemLineHeight = () => 60 / rows.length;
  const syntaxItemLineHeight = () => 10;
  // end hard-coded sizing constants

  const highlightElements = (e) => {
    const tileName = e.target.id.split('--')[1];
    const score = document.getElementById(`hover--${tileName}`);
    const syntax = document.getElementById(`syntax--${tileName[0]}`);
    const verb = document.getElementById(`verb--${tileName[1]}`);
    score.classList.add('highlightedScore');
    syntax.classList.add('highlightedSyntaxItem');
    verb.classList.add('highlightedVerbItem');
  };
  const unHighlightElements = (e) => {
    const tileName = e.target.id.split('--')[1];
    const score = document.getElementById(`hover--${tileName}`);
    const syntax = document.getElementById(`syntax--${tileName[0]}`);
    const verb = document.getElementById(`verb--${tileName[1]}`);
    score.classList.remove('highlightedScore');
    syntax.classList.remove('highlightedSyntaxItem');
    verb.classList.remove('highlightedVerbItem');
  };
  const handleSelect = (e) => {
    const tileName = e.target.id.split('--')[1];
    if (tileName === selected) {
      setSelected('');
    } else {
      setSelected(tileName);
    }
  };

  return (
    <div className="container1">
      <div className="navigationButtonsContainer">
        <div className="logo">Mosaica</div>
        <div className="navBarSpacer" />
        <button className="button1" type="button" onClick={() => console.warn('profile')}>
          Profile
        </button>
        <button className="button1" type="button" onClick={() => console.warn('groups')}>
          Groups
        </button>
      </div>
      <div className="metaGridContainer">
        <div className="syntaxContainer">
          {columns.map((letter) => (
            <div key={letter} id={`syntax--${letter}`} className="syntaxItem" style={{ width: `${100 / columns.length}%`, lineHeight: `${syntaxItemLineHeight()}vw`, fontSize: `${labelFontSize()}vw` }}>{lessonCategories[letter] ? lessonCategories[letter] : letter}</div>
          ))}
        </div>
        <div className="verbContainer">
          {rows.map((number) => (
            <div key={number} id={`verb--${number}`} className="verbItem" style={{ lineHeight: `${verbItemLineHeight()}vw`, fontSize: `${labelFontSize()}vw` }}>{lessonCategories[number] ? lessonCategories[number] : number}</div>
          ))}
        </div>
        <div
          className="lessonGridContainer"
          style={{ gridTemplateColumns: `repeat(${columns.length}, 1fr)` }}
        >
          <div className="lessonGridBackground" />
          {calculatedTileNames.map((tile) => (
            <div className="metaTile" key={tile}>
              <div
                key={`tile--${tile}`}
                id={`tile--${tile}`}
                className={`tile grade${gradeTable[tile] ? gradeTable[tile] : '0'}${tile === selected ? ' selected' : ''}`}
              />
              <div
                role="button"
                tabIndex={0}
                className={`scoreContainer${tile === selected ? ' selectedScore' : ''}`}
                id={`hover--${tile}`}
                onClick={(e) => handleSelect(e)}
                onMouseEnter={(e) => highlightElements(e)}
                onMouseLeave={(e) => unHighlightElements(e)}
                onKeyDown={() => console.warn('no keyboard support yet')}
                style={{ fontSize: `${scoreFontSize()}vw`, lineHeight: `${scoreLineHeight()}vw` }}
              >
                {gradeTable[tile] ? gradeTable[tile] : 0}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="lessonButtonsContainer">
        <button className="button1" type="button" onClick={() => console.warn(selected)}>
          Start
        </button>
      </div>
    </div>
  );
}

export default Home;
