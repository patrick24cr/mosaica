// import { signOut } from '../utils/auth';
// import { useAuth } from '../utils/context/authContext';

function Home() {
  // const { user } = useAuth();
  const grid = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
  const colorPalette = {
    five: '#FA1CFF',
    four: '#B91BF0',
    three: '#7B23D2',
    two: '#43189F',
    one: '#2D0582',
  };
  const colorAssociations = {
    0: colorPalette.five,
    1: colorPalette.four,
    2: colorPalette.five,
    3: colorPalette.four,
    4: colorPalette.four,
    5: colorPalette.five,
    6: colorPalette.four,
    7: colorPalette.three,
    8: colorPalette.three,
    9: colorPalette.four,
    10: colorPalette.three,
    11: colorPalette.three,
    12: colorPalette.two,
    13: colorPalette.two,
    14: colorPalette.two,
    15: colorPalette.four,
    16: colorPalette.four,
    17: colorPalette.three,
    18: colorPalette.three,
    19: colorPalette.one,
    20: colorPalette.five,
    21: colorPalette.four,
    22: colorPalette.three,
    23: colorPalette.two,
    24: colorPalette.one,
  };

  return (
    <div className="container1">
      <h1>Mosaica</h1>
      <div
        className="container2"
        // className="text-center d-flex flex-column justify-content-center align-content-center"
        // style={{
        //   height: '90vh',
        //   padding: '30px',
        //   maxWidth: '400px',
        //   margin: '0 auto',
        // }}
      >
        <div className="gridWrapper">
          {grid.map((tile) => <div key={`tile${tile}`} className={`tile${tile}`} style={{ backgroundColor: `${colorAssociations[tile]}` }} />)}
        </div>
        {/* <button className="btn btn-danger btn-lg copy-btn" type="button" onClick={signOut}>
          Sign Out
        </button> */}
      </div>
    </div>
  );
}

export default Home;
