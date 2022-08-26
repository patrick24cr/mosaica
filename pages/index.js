// import { signOut } from '../utils/auth';
// import { useAuth } from '../utils/context/authContext';

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
  const colorPaletteArray = ['#210360', '#2D0582', '#411899', '#621BBB', '#7B23D2', '#9C15DB', '#DF1EF0', '#FA1CFF'];
  const colorAssociations = {
    a1: 7,
    a2: 6,
    a3: 5,
    a4: 4,
    a5: 3,
    a6: 2,
    a7: 1,
    b1: 5,
    b2: 4,
    b3: 3,
    b4: 3,
    b5: 4,
    c1: 3,
    c2: 3,
    c3: 2,
    c4: 2,
    c5: 2,
    d1: 4,
    d2: 4,
    d3: 3,
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
          {calculatedTileNames.map((tile) => <div key={`tile${tile}`} id={`tile${tile}`} className={`grade${colorAssociations[tile]}`} style={{ backgroundColor: `${colorAssociations[tile] ? colorPaletteArray[colorAssociations[tile]] : colorPaletteArray[0]}` }} />)}
        </div>
        {/* <button className="btn btn-danger btn-lg copy-btn" type="button" onClick={signOut}>
          Sign Out
        </button> */}
      </div>
    </div>
  );
}

export default Home;
