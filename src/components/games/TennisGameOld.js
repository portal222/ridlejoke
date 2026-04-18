import React, { useState, useEffect, useCallback } from 'react';

const TennisGame = () => {
  const [gameState, setGameState] = useState('menu');
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [ballPosition, setBallPosition] = useState({ x: 400, y: 300 });
  const [ballVelocity, setBallVelocity] = useState({ dx: 6, dy: 4 });
  const [playerPaddle, setPlayerPaddle] = useState({ y: 250 });
  const [computerPaddle, setComputerPaddle] = useState({ y: 250 });
  const [keys, setKeys] = useState({});

  const PADDLE_HEIGHT = 70;
  const PADDLE_WIDTH = 10;
  const BALL_SIZE = 15;
  const GAME_WIDTH = 700;
  const GAME_HEIGHT = 450;
  const PADDLE_SPEED = 8;
  const MAX_SCORE = 10;

  useEffect(() => {
    const handleKeyDown = (e) => setKeys(prev => ({ ...prev, [e.key]: true }));
    const handleKeyUp = (e) => setKeys(prev => ({ ...prev, [e.key]: false }));

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useEffect(() => {
    if (gameState !== 'playing') return;

    const movePlayerPaddle = () => {
      setPlayerPaddle(prev => {
        let newY = prev.y;
        if (keys['ArrowUp'] || keys['w']) {
          newY = Math.max(0, prev.y - PADDLE_SPEED);
        }
        if (keys['ArrowDown'] || keys['s']) {
          newY = Math.min(GAME_HEIGHT - PADDLE_HEIGHT, prev.y + PADDLE_SPEED);
        }
        return { y: newY };
      });
    };

    const interval = setInterval(movePlayerPaddle, 16);
    return () => clearInterval(interval);
  }, [keys, gameState]);

  const updateGame = useCallback(() => {
    if (gameState !== 'playing') return;

    const steps = 4;
    const stepDx = ballVelocity.dx / steps;
    const stepDy = ballVelocity.dy / steps;

    setBallPosition(prev => {
      let newX = prev.x;
      let newY = prev.y;
      let newDx = ballVelocity.dx;
      let newDy = ballVelocity.dy;

      for (let i = 0; i < steps; i++) {
        newX += stepDx;
        newY += stepDy;

        if (newY <= 0) {
          newY = 0;
          newDy = Math.abs(newDy); 
        }
        if (newY >= GAME_HEIGHT - BALL_SIZE) {
          newY = GAME_HEIGHT - BALL_SIZE;
          newDy = -Math.abs(newDy); 
        }

        if (
          newX <= PADDLE_WIDTH &&
          newX + BALL_SIZE >= 0 &&
          newY < playerPaddle.y + PADDLE_HEIGHT &&
          newY + BALL_SIZE > playerPaddle.y
        ) {
          newDx = Math.abs(newDx);
          const hitPos = (newY - playerPaddle.y) / PADDLE_HEIGHT;
          newDy = (hitPos - 0.5) * 10;
          if (Math.abs(newDy) < 2) newDy = newDy < 0 ? -2 : 2;
        }

        if (
          newX + BALL_SIZE >= GAME_WIDTH - PADDLE_WIDTH &&
          newX <= GAME_WIDTH &&
          newY < computerPaddle.y + PADDLE_HEIGHT &&
          newY + BALL_SIZE > computerPaddle.y
        ) {
          newDx = -Math.abs(newDx);
          const hitPos = (newY - computerPaddle.y) / PADDLE_HEIGHT;
          newDy = (hitPos - 0.5) * 10;
          if (Math.abs(newDy) < 2) newDy = newDy < 0 ? -2 : 2;
        }

        if (newX < 0) {
          setComputerScore(prev => prev + 1);
          resetBall();
          return { x: GAME_WIDTH / 2, y: GAME_HEIGHT / 2 };
        }
        if (newX > GAME_WIDTH) {
          setPlayerScore(prev => prev + 1);
          resetBall();
          return { x: GAME_WIDTH / 2, y: GAME_HEIGHT / 2 };
        }
      }

      setBallVelocity({ dx: newDx, dy: newDy });
      return { x: newX, y: newY };
    });

    setComputerPaddle(prev => {
      const targetY = ballPosition.y - PADDLE_HEIGHT / 2;
      const diff = targetY - prev.y;
      if (Math.abs(diff) > 5) {
        const direction = diff > 0 ? 1 : -1;
        const speed = Math.min(Math.abs(diff) * 0.05, PADDLE_SPEED);

        return {
          y: Math.max(
            0,
            Math.min(GAME_HEIGHT - PADDLE_HEIGHT, prev.y + direction * speed))
        };
      }
      return prev;
    });

    if (playerScore >= MAX_SCORE || computerScore >= MAX_SCORE) {
      setGameState('gameOver');
    }
  }, [gameState, ballVelocity, playerPaddle, computerPaddle, ballPosition, playerScore, computerScore]);

  useEffect(() => {
    let animationFrameId;

    const loop = () => {
      updateGame();
      animationFrameId = requestAnimationFrame(loop);
    };

    if (gameState === 'playing') {
      animationFrameId = requestAnimationFrame(loop);
    }

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [updateGame, gameState]);

  const resetBall = () => {
    setBallPosition({ x: GAME_WIDTH / 2, y: GAME_HEIGHT / 2 });
    const dy = (Math.random() * 6 + 3) * (Math.random() > 0.5 ? 1 : -1);
    setBallVelocity({
      dx: Math.random() > 0.5 ? 2 : -2,
      dy: dy === 0 ? 4 : dy

    });
  };

  const startGame = () => {
    setGameState('playing');
    setPlayerScore(0);
    setComputerScore(0);
    resetBall();
  };

  const togglePause = () => {
    setGameState(prev => (prev === 'playing' ? 'paused' : 'playing'));
  };

  const restartGame = () => {
    startGame();
  };

  return (
    <>
      <div className='tennisMain'>
        {gameState === 'menu' && (
          <div>

            <p>Welcome to Tennis game!</p>
            <p>Use the up / down or W / S arrows to move the racket</p>
            <div
              onClick={startGame}
              style={{
                padding: '10px 20px',
                fontSize: '18px',
                backgroundColor: 'green',
                color: 'white',
                borderRadius: '10px',
                cursor: 'pointer',
                display: 'inline-block',
                marginTop: '10px'
              }}
            >
              START
            </div>
          </div>
        )}
        {gameState === 'gameOver' && (
          <div className='endGame'>
            <h3>Result</h3>
            <p>
              🙎🏻‍♂️: {playerScore} – 💻: {computerScore}{' '}
            </p>
            <p style={{ fontWeight: "bold", fontSize: "32px", color: "blue", padding: "25px", textAlign: "center" }}>
              {playerScore >= MAX_SCORE ? 'VICTORY!' : 'DEFEAT!'}

            </p>
            <div
              onClick={restartGame}
              style={{
                padding: '10px 20px',
                fontSize: '18px',
                backgroundColor: '#44336',
                color: 'white',
                borderRadius: '10px',
                cursor: 'pointer',
                display: 'inline-block',
                marginTop: '10px'
              }}
            >
              RESTART
            </div>
          </div>
        )}
        {(gameState === 'playing' || gameState === 'paused') && (
          <>
            <div
              style={{
                position: 'relative',
                width: GAME_WIDTH,
                height: GAME_HEIGHT,
                backgroundColor: 'black',
                margin: '20px auto'
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  left: GAME_WIDTH / 2 - 2,
                  top: 0,
                  width: 4,
                  height: GAME_HEIGHT,
                  backgroundImage: 'linear-gradient(rgb(152, 160, 164) 50%, transparent 50%)',
                  backgroundSize: '4px 20px',
                  backgroundRepeat: 'repeat-y'
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  left: ballPosition.x,
                  top: ballPosition.y,
                  width: BALL_SIZE,
                  height: BALL_SIZE,
                  backgroundColor: 'white',
                  borderRadius: '50%'
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  top: playerPaddle.y,
                  width: PADDLE_WIDTH,
                  height: PADDLE_HEIGHT,
                  backgroundColor: '#1565c0'
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  right: 0,
                  top: computerPaddle.y,
                  width: PADDLE_WIDTH,
                  height: PADDLE_HEIGHT,
                  backgroundColor: '#feb867'
                }}
              />
            </div>

            <div style={{ color: 'white', textAlign: 'center', fontSize: '24px' }}>
              🙎🏻‍♂️: {playerScore} | 💻: {computerScore}
            </div>

            <div
              onClick={togglePause}
              style={{
                padding: '10px 20px',
                fontSize: '18px',
                backgroundColor: '#44336',
                color: 'white',
                borderRadius: '10px',
                cursor: 'pointer',
                display: 'inline-block',
                marginTop: '10px'
              }}
            >
              {gameState === 'playing' ? 'Pause' : 'Continue'}
            </div>

            <div
              onClick={() => setGameState('menu')}
              style={{
                padding: '10px 20px',
                fontSize: '18px',
                backgroundColor: '#44336',
                color: 'white',
                borderRadius: '10px',
                cursor: 'pointer',
                display: 'inline-block',
                marginTop: '10px',
                marginLeft: '10px'
              }}
            >
              MENI
            </div>
          </>
        )}
        <div className='pickTrivia'>
          {gameState === 'playing' && (
            <div style={{ marginTop: '10px' }}>
              Kontrole: Use the up / down or W / S arrows to move the racket.
              <br />
           The first to collect {MAX_SCORE} points wins!
            </div>
          )}
        </div>
      </div>
    </>
  );
}; export default TennisGame; 