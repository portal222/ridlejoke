import React, { useState, useEffect } from 'react';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';

const SpaceShooter = () => {

  const GAME_WIDTH = Math.min(window.innerWidth * 0.9, 550);
  const GAME_HEIGHT = Math.min(window.innerHeight * 0.8, 700);
  const SHIP_WIDTH = 40;
  const SHIP_HEIGHT = 40;

  const [shipX, setShipX] = useState(GAME_WIDTH / 2 - SHIP_WIDTH / 2);
  const [bullets, setBullets] = useState([]);
  const [enemies, setEnemies] = useState([]);
  const [explosions, setExplosions] = useState([]);
  const [boss, setBoss] = useState(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem("highScore");
    return saved ? parseInt(saved, 10) : 0;
  });
  const [lives, setLives] = useState(3);
  const [wave, setWave] = useState(1);
  const [hearts, setHearts] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [paused, setPaused] = useState(false);
  const [muted, setMuted] = useState(false);
  const [keys, setKeys] = useState({});

  const playSound = (src) => {
    if (muted) return;
    const audio = new Audio(src);
    audio.play().catch(err => console.log("Audio error:", err));
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (["ArrowLeft", "ArrowRight", " ", "p", "P"].includes(e.key)) {
        e.preventDefault();
      }
      if (e.key === 'ArrowLeft' && !paused) {
        setShipX((prev) => Math.max(0, prev - 20));
      } else if (e.key === 'ArrowRight' && !paused) {
        setShipX((prev) => Math.min(GAME_WIDTH - SHIP_WIDTH, prev + 20));
      } else if (e.key === ' ' && !paused) {
        setBullets((prev) => [
          ...prev,
          { id: Date.now(), x: shipX + SHIP_WIDTH / 2 - 2, y: GAME_HEIGHT - SHIP_HEIGHT, size: 14 }
        ]);
        playSound("assets/sounds/bull.wav");
      } else if (e.key.toLowerCase() === 'p') {
        setPaused(p => !p);
      }
      setKeys(prev => ({ ...prev, [e.key]: true }));
    };

    const handleKeyUp = (e) => {
      setKeys(prev => ({ ...prev, [e.key]: false }));
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [shipX, paused]);

  useEffect(() => {
    if (paused) return;

    const interval = setInterval(() => {
      if (keys.ArrowLeft) {
        setShipX(prev => Math.max(0, prev - 5));
      }
      if (keys.ArrowRight) {
        setShipX(prev => Math.min(GAME_WIDTH - SHIP_WIDTH, prev + 5));
      }
      if (keys.Space) {
        setBullets(prev => [
          ...prev,
          { id: Date.now(), x: shipX + SHIP_WIDTH / 2 - 2, y: GAME_HEIGHT - SHIP_HEIGHT, size: 14 }
        ]);
        playSound("assets/sounds/bull.wav");
        setKeys(prev => ({ ...prev, Space: false }));
      }
    }, 50);

    return () => clearInterval(interval);
  }, [keys, paused, shipX]);

  useEffect(() => {
    if (paused || gameOver) return;
    const interval = setInterval(() => {
      setBullets((prev) =>
        prev
          .map((b) => ({ ...b, y: b.y - 10 }))
          .filter((b) => b.y > 0)
      );
    }, 50);
    return () => clearInterval(interval);
  }, [paused, gameOver]);

  useEffect(() => {
    if (paused || gameOver) return;
    const interval = setInterval(() => {
      const x = Math.random() * (GAME_WIDTH - 30);
      const sizes = [20, 30, 50];
      const speeds = [5, 3, 2];
      const points = [20, 10, 30];
      const idx = Math.floor(Math.random() * sizes.length);

      setEnemies((prev) => [
        ...prev,
        { id: Date.now(), x, y: 0, size: sizes[idx], speed: Math.min(speeds[idx] + wave, 6), points: points[idx] }
      ]);
    }, Math.max(1500, 2500 - wave * 150)); 
    return () => clearInterval(interval);
  }, [paused, gameOver, wave]);

  useEffect(() => {
    if (paused || gameOver) return;
    const interval = setInterval(() => {
      setEnemies((prev) =>
        prev
          .map((e) => ({ ...e, y: e.y + e.speed }))
          .filter((e) => {
            if (e.y > GAME_HEIGHT - SHIP_HEIGHT) {
              setLives(l => {
                if (l - 1 <= 0) {
                  setGameOver(true);
                  playSound("assets/sounds/end.wav");
                  return 0;
                }
                return l - 1;
              });
              return false;
            }
            return true;
          })
      );
    }, 100);
    return () => clearInterval(interval);
  }, [paused, gameOver]);

  useEffect(() => {
    setEnemies(prevEnemies => {
      const newEnemies = [];
      const newExplosions = [];

      for (const enemy of prevEnemies) {
        let hit = false;
        for (const bullet of bullets) {
          if (
            bullet.x < enemy.x + enemy.size &&
            bullet.x + bullet.size > enemy.x &&
            bullet.y < enemy.y + enemy.size &&
            bullet.y + bullet.size > enemy.y
          ) {
            hit = true;
            setBullets(prev => prev.filter(b => b.id !== bullet.id));
            newExplosions.push({ id: enemy.id, x: enemy.x, y: enemy.y, size: enemy.size });
            playSound("assets/sounds/enem.wav");
            break;
          }
        }
        if (!hit) newEnemies.push(enemy);
      }

      if (newExplosions.length > 0) {
        setScore(s => s + newExplosions.length * 10);
        setExplosions(prev => [...prev, ...newExplosions]);
        newExplosions.forEach(ex => {
          setTimeout(() => {
            setExplosions(prev => prev.filter(e => e.id !== ex.id));
          }, 300);
        });
      }

      return newEnemies;
    });
  }, [bullets]);

  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(() => {
      if (!boss) {
        setBoss({
          id: Date.now(),
          x: GAME_WIDTH / 2 - 40,
          y: 0,
          size: 60,
          speedY: 2,
          speedX: 2,
          direction: 1,
          health: 10
        });

        playSound("assets/sounds/bossIntro.wav");
      }
    }, 20000);
    return () => clearInterval(interval);
  }, [boss, gameOver]);

  useEffect(() => {
    if (gameOver || !boss) return;
    const interval = setInterval(() => {
      setBoss(prev => {
        if (!prev) return null;
        let newX = prev.x + prev.speedX * prev.direction;
        if (newX < 0 || newX > GAME_WIDTH - prev.size) {
          return { ...prev, y: prev.y + prev.speedY, direction: -prev.direction };
        }
        return { ...prev, x: newX, y: prev.y + prev.speedY };
      });
    }, 100);
    return () => clearInterval(interval);
  }, [boss, gameOver]);

  useEffect(() => {
    if (!boss) return;
    let hit = false;
    let newHealth = boss.health;

    for (const bullet of bullets) {
      if (
        bullet.x < boss.x + boss.size &&
        bullet.x + bullet.size > boss.x &&
        bullet.y < boss.y + boss.size &&
        bullet.y + bullet.size > boss.y
      ) {
        hit = true;
        newHealth--;
      }
    }

    if (hit) {
      setBullets(prev =>
        prev.filter(
          b =>
            !(
              b.x < boss.x + boss.size &&
              b.x + b.size > boss.x &&
              b.y < boss.y + boss.size &&
              b.y + b.size > boss.y
            )
        )
      );

      if (newHealth <= 0) {
        setScore(s => s + 100);
        setExplosions(prev => [...prev, { id: boss.id, x: boss.x, y: boss.y, size: boss.size }]);
        playSound("assets/sounds/boss.mp3");

        setBoss(null);
      } else {
        setBoss(prev => ({ ...prev, health: newHealth }));
      }
    }
  }, [bullets, boss]);

  useEffect(() => {
    if (paused || gameOver) return;
    const interval = setInterval(() => {
      const x = Math.random() * (GAME_WIDTH - 30);
      setHearts(prev => [...prev, { id: Date.now(), x, y: 0, size: 30, speed: 3 }]);
    }, 15000);
    return () => clearInterval(interval);
  }, [paused, gameOver]);

  useEffect(() => {
    if (paused || gameOver) return;
    const interval = setInterval(() => {
      setHearts(prev =>
        prev
          .map(h => ({ ...h, y: h.y + h.speed }))
          .filter(h => h.y < GAME_HEIGHT)
      );
    }, 100);
    return () => clearInterval(interval);
  }, [paused, gameOver]);

  useEffect(() => {
    setHearts(prevHearts => {
      const newHearts = [];
      for (const heart of prevHearts) {
        let hit = false;
        for (const bullet of bullets) {
          if (
            bullet.x < heart.x + heart.size &&
            bullet.x + bullet.size > heart.x &&
            bullet.y < heart.y + heart.size &&
            bullet.y + bullet.size > heart.y
          ) {
            hit = true;
            setLives(l => l + 1);
            playSound("assets/sounds/heart.wav");
            setBullets(prev => prev.filter(b => b.id !== bullet.id));
            break;
          }
        }
        if (!hit) newHearts.push(heart);
      }
      return newHearts;
    });
  }, [bullets]);

  useEffect(() => {
    if (score > wave * 100) {
      setWave(w => w + 1);
    }
  }, [score, wave]);

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem("highScore", score);
    }
  }, [score, highScore]);

  const restartGame = () => {
    setShipX(GAME_WIDTH / 2 - SHIP_WIDTH / 2);
    setBullets([]);
    setEnemies([]);
    setExplosions([]);
    setBoss(null);
    setScore(0);
    setLives(3);
    setWave(1);
    setHearts([]);
    setGameOver(false);
    setPaused(false);
  };

  return (
    <>
      <div
        className='game-container'
        style={{
          position: 'relative',
          width: GAME_WIDTH,
          height: GAME_HEIGHT,
          background: '#2c2b2bff',
          overflow: 'hidden',
          border: '2px solid #000000ff'
        }}
      >
        <p style={{ color: 'white', margin: 0 }}>
          Score: {score} | High Score: {highScore}
          <br /> Lives: {lives} | Wave: {wave} {paused && " | PAUSED"}
          <button
            onClick={() => setMuted(m => !m)}
            style={{ marginLeft: '10px', fontSize: '12px' }}
          >
            {muted ? "Unmute 🔊" : "Mute 🔇"}
          </button>
        </p>
        <div
          className="ship"
          style={{
            position: 'absolute',
            bottom: 0,
            left: shipX,
            width: SHIP_WIDTH,
            height: SHIP_HEIGHT,
            fontSize: '42px',
            rotate: '-45deg'
          }}
        >
          🚀
        </div>
        {bullets.map((b) => (
          <div
            key={b.id}
            className="bullet"
            style={{
              position: 'absolute',
              left: b.x,
              top: b.y,
              fontSize: `${b.size}px`,
              rotate: '135deg'
            }}
          >
            🌠
          </div>
        ))}
        {enemies.map((e) => (
          <div
            key={e.id}
            className="enemy"
            style={{
              position: 'absolute',
              left: e.x,
              top: e.y,
              fontSize: `${e.size}px`
            }}
          >
            🛸
          </div>
        ))}
        {explosions.map((ex) => (
          <div
            key={ex.id}
            className="explosion"
            style={{
              position: 'absolute',
              left: ex.x,
              top: ex.y,
              fontSize: `${ex.size}px`
            }}
          >
            🎇
          </div>
        ))}
        {boss && (
          <div
            key={boss.id}
            className="boss"
            style={{
              position: 'absolute',
              left: boss.x,
              top: boss.y,
              fontSize: `${boss.size}px`
            }}
          >
            👾
          </div>
        )}

        {hearts.map((h) => (
          <div
            key={h.id}
            className="heart"
            style={{
              position: 'absolute',
              left: h.x,
              top: h.y,
              fontSize: `${h.size}px`
            }}
          >
            ❤️
          </div>
        ))}
        {/* Game Over */}
        {gameOver && (
          <div
            style={{
              position: 'absolute',
              top: '35%',
              left: '20%',
              width: '60%',
              textAlign: 'center',
              color: 'white',
              background: 'rgba(0,0,0,0.8)',
              padding: '20px',
              border: '2px solid #888'
            }}
          >
            <h2>💥 Game Over</h2>
            <p>Score: {score}</p>
            <p>High Score: {highScore}</p>
            <p>Wave: {wave}</p>
            <p>Lives: {lives}</p>
            <button onClick={restartGame}>Play Again</button>
          </div>
        )}
      </div>


      <div className='game-container'>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '15px', gap: '10px' }}>
          <button
            onTouchStart={() => setKeys(prev => ({ ...prev, ArrowLeft: true }))}
            onTouchEnd={() => setKeys(prev => ({ ...prev, ArrowLeft: false }))}
          >
            <KeyboardArrowLeftOutlinedIcon />
          </button>
          <button
            onTouchStart={() => setKeys(prev => ({ ...prev, Space: true }))}
            onTouchEnd={() => setKeys(prev => ({ ...prev, Space: false }))}
          >
            🔫
          </button>
          <button
            onTouchStart={() => setKeys(prev => ({ ...prev, ArrowRight: true }))}
            onTouchEnd={() => setKeys(prev => ({ ...prev, ArrowRight: false }))}
          >
            <KeyboardArrowRightOutlinedIcon />
          </button>
        </div>
        <p>
          Controls: For PC use the left and right arrow keys on your keyboard and spacebar to shoot. For mobile use the buttons.
        </p>
      </div>

    </>
  );
};
export default SpaceShooter;