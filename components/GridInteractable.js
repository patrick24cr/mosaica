import React from 'react';
// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// import { useAuth } from '../utils/context/authContext';
// import { getScoresByUid } from '../api/scores';
import PropTypes from 'prop-types';

function GridInteractable({ scores, selected, setSelected }) {
  const columns = ['a', 'b', 'c', 'd', 'e'];
  const rows = ['1', '2', '3', '4', '5'];

  const lessonCategories = {
    1: 'test 1',
    2: 'test 2',
    3: 'test 3',
    4: 'test 4',
    5: 'test 5',
    a: 'test a',
    b: 'test b',
    c: 'test c',
    d: 'test d',
    e: 'test e',
  };

  const calculatedTileNames = [];
  for (let y = 0; y < rows.length; y++) {
    for (let x = 0; x < columns.length; x++) {
      calculatedTileNames.push(`${columns[x]}${rows[y]}`);
    }
  }

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
              className={`tile grade${scores[tile] ? scores[tile] : '0'}${tile === selected ? ' selected' : ''}`}
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
              {scores[tile] ? scores[tile] : 0}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

GridInteractable.propTypes = {
  scores: PropTypes.objectOf(PropTypes.number),
  selected: PropTypes.string,
  setSelected: PropTypes.func,
};

GridInteractable.defaultProps = {
  scores: {},
  selected: '',
  setSelected: (() => 0),
};

export default GridInteractable;
