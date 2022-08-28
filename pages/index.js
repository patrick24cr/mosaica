// import { signOut } from '../utils/auth';
// import { useAuth } from '../utils/context/authContext';

import { useState } from 'react';

// hard coded issues:
// scoreFontSize, viewwidth proportions in CSS grids (60vw currently)

function Home() {
  // const { user } = useAuth();
  const columns = ['a', 'b', 'c', 'd', 'e'];
  const rows = ['1', '2', '3', '4', '5'];
  const calculatedTileNames = [];
  for (let y = 0; y < rows.length; y++) {
    for (let x = 0; x < columns.length; x++) {
      calculatedTileNames.push(`${columns[x]}${rows[y]}`);
    }
  }
  const [selected, setSelected] = useState('initial');
  const scoreFontSize = () => {
    const heightAsLimit = 20 / rows.length;
    const widthAsLimit = 20 / columns.length;
    return Math.min(heightAsLimit, widthAsLimit);
  };
  const scoreLineHeight = () => 60 / rows.length;
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
  const colorAssociations = {
    a1: 7,
    a2: 6,
    a3: 7,
    a4: 4,
    a5: 3,
    a6: 2,
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
            <div key={letter} id={`syntax--${letter}`} className="syntaxItem" style={{ width: `${100 / columns.length}%` }}>{letter}</div>
          ))}
        </div>
        <div className="verbContainer">
          {rows.map((number) => (
            <div key={number} id={`verb--${number}`} className="verbItem" style={{ lineHeight: `${60 / rows.length}vw` }}>{number}</div>
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
                className={`tile grade${colorAssociations[tile] ? colorAssociations[tile] : '0'}${tile === selected ? ' selected' : ''}`}
              />
              <div
                role="button"
                tabIndex={0}
                className="scoreContainer"
                id={`hover--${tile}`}
                onClick={(e) => handleSelect(e)}
                onMouseEnter={(e) => highlightElements(e)}
                onMouseLeave={(e) => unHighlightElements(e)}
                onKeyDown={() => console.warn('no keyboard support yet')}
                style={{ fontSize: `${scoreFontSize()}vw`, lineHeight: `${scoreLineHeight()}vw` }}
              >
                {colorAssociations[tile] ? colorAssociations[tile] : 0}
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
