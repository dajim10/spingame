import React, { useState, useEffect } from 'react';
import './App.css';
import seedrandom from 'seedrandom';
import reward1 from './assets/reward1.png';
import reward2 from './assets/reward2.png';
import reward3 from './assets/reward3.png';

const App = () => {
  const [rotations, setRotations] = useState([]);
  const [currentRotationIndex, setCurrentRotationIndex] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [spinCount, setSpinCount] = useState(0);

  useEffect(() => {
    generateRandomRotations();
  }, []);

  const generateRandomRotations = () => {
    const numRotations = 100;
    const weights = [0.05, 0, 0.05, 0, 0.05, 0.02];

    const rng = seedrandom('yourSeed');
    const weightedRotations = weights.reduce((acc, weight, index) => {
      return acc.concat(Array.from({ length: Math.floor(numRotations * weight) }, () => rng() * 600000));
    }, []);

    const shuffledRotations = weightedRotations.sort(() => rng() - 0.5);

    setRotations(shuffledRotations);
  };

  // const handleSpin = () => {
  //   if (spinning) {
  //     // If already spinning, return without doing anything
  //     return;
  //   }

  //   setSpinning(true);

  //   if (rotations.length === 0) {
  //     generateRandomRotations();
  //   }

  //   const nextRotation = rotations[currentRotationIndex];
  //   setCurrentRotationIndex((prevIndex) => (prevIndex + 1) % rotations.length);

  //   if (currentRotationIndex % 2 === 0) {
  //     setRotation((prevRotation) => prevRotation + nextRotation);
  //   } else {
  //     // Handle div positions 1, 3, and 5 (no rewards)
  //     // You can set a different action or leave it empty
  //   }

  //   // Allow spinning again after a certain duration
  //   setTimeout(() => {
  //     setSpinning(false);
  //   }, /* Set the duration in milliseconds, e.g., 2000 for 2 seconds */);
  // };
  const handleSpin = () => {
    if (spinning) {
      // If already spinning, return without doing anything
      return;
    }

    setSpinning(true);

    if (rotations.length === 0) {
      generateRandomRotations();
    }

    const nextRotation = rotations[currentRotationIndex];
    setCurrentRotationIndex((prevIndex) => (prevIndex + 1) % rotations.length);

    if (currentRotationIndex % 2 === 0) {
      setRotation((prevRotation) => prevRotation + nextRotation);

      // Check for rewards (you can customize this condition based on your logic)
      if (spinCount >= 10 && (currentRotationIndex === 0 || currentRotationIndex === 2 || currentRotationIndex === 4)) {
        alert("Congratulations! You've won a reward!");
      }
    } else {
      // Handle div positions 1, 3, and 5 (no rewards)
      // You can set a different action or leave it empty
    }

    // Allow spinning again after a certain duration
    setTimeout(() => {
      setSpinning(false);
    }, /* Set the duration in milliseconds, e.g., 2000 for 2 seconds */);

    // Always increment the spin count
    setSpinCount((prevCount) => prevCount + 1);
  };



  return (
    <>
      <div className="stoper" style={{ marginTop: '20px' }}></div>
      <div className="container" style={{ transform: `rotate(${rotation}deg)` }}>
        <div className="one">
          <img src={reward1} alt="" width={50} />
        </div>
        <div className="two">2</div>
        <div className="three">
          <img src={reward2} alt="" width={50} />
        </div>
        <div className="four">4</div>
        <div className="five">
          <img src={reward3} alt="" width={50} />
        </div>
        <div className="six">6</div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '30px' }}>
        <button id="spin" className="button-container" onClick={handleSpin}>
          Double Click to Spin
        </button>
      </div>
    </>
  );
};

export default App;
