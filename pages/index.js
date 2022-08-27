// import { signOut } from '../utils/auth';
// import { useAuth } from '../utils/context/authContext';

import { useState } from 'react';

function Home() {
  // const { user } = useAuth();
  const width = ['a', 'b', 'c', 'd', 'e'];
  const height = ['1', '2', '3', '4', '5'];
  const calculatedTileNames = [];
  for (let y = 0; y < height.length; y++) {
    for (let x = 0; x < width.length; x++) {
      calculatedTileNames.push(`${width[x]}${height[y]}`);
    }
  }
  const [selected, setSelected] = useState('initial');
  const handleSelect = (e) => {
    const tileName = e.target.id.split('--')[1];
    setSelected(tileName);
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
      <h1>Mosaica</h1>
      <div className="container2">
        <div className="gridWrapper" style={{ gridTemplateColumns: `repeat(${height.length}, 2fr)` }}>
          {calculatedTileNames.map((tile) => (
            <div key={`tile${tile}`} id={`tile--${tile}`} className={`tile grade${colorAssociations[tile] ? colorAssociations[tile] : '0'}${tile === selected ? ' selected' : ''}`}>
              <div role="button" tabIndex={0} className="hoverContainer" id={`hover--${tile}`} onClick={(e) => handleSelect(e)} onKeyDown={console.warn('no keyboard support yet')}>
                {colorAssociations[tile] ? colorAssociations[tile] : 0}
              </div>
            </div>
          ))}
        </div>
        {/* <button className="btn btn-danger btn-lg copy-btn" type="button" onClick={signOut}>
          Sign Out
        </button> */}
      </div>
    </div>
  );
}

export default Home;
