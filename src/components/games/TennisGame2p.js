import React, { useState, useEffect, useCallback } from 'react';
import hitscore from '../../../public/assets/sounds/score.mp3';
import applause from '../../../public/assets/sounds/applause2.mp3';
import hitraket from '../../../public/assets/sounds/hit-a-ball.mp3';
import hitraket2 from '../../../public/assets/sounds/impact.mp3';
import shrink from '../../../public/assets/sounds/shrink.mp3';
import powerspeed from '../../../public/assets/sounds/bostspeed.mp3';

const TennisGame2p = () => {
    const [gameState, setGameState] = useState('menu');
    const [playerScore, setPlayerScore] = useState(0);
    const [player2Score, setPlayer2Score] = useState(0);

    const [ballPosition, setBallPosition] = useState({ x: 400, y: 300 });
    const [ballVelocity, setBallVelocity] = useState({ dx: 6, dy: 4 });

    const [playerPaddle, setPlayerPaddle] = useState({ y: 250 });
    const [player2Paddle, setPlayer2Paddle] = useState({ y: 250 });

    const [player1PaddleHeight, setPlayer1PaddleHeight] = useState(70);
    const [player2PaddleHeight, setPlayer2PaddleHeight] = useState(70);

    const [keys, setKeys] = useState({});

    const [speedPowerUp, setSpeedPowerUp] = useState(null);
    const [shrinkPowerUp, setShrinkPowerUp] = useState(null);
    const [boostFactor, setBoostFactor] = useState(1);

    const PADDLE_HEIGHT = 70;
    const PADDLE_WIDTH = 10;
    const BALL_SIZE = 15;
    const GAME_WIDTH = Math.min(window.innerWidth * 0.9, 700);
    const GAME_HEIGHT = Math.min(window.innerHeight * 0.6, 450);
    const PADDLE_SPEED = 8;
    const MAX_SCORE = 10;
    const [muted, setMuted] = useState(false);

    const playSound = (src) => {
        if (muted) return;
        const audio = new Audio(src);
        audio.play().catch(err => console.log("Audio error:", err));
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (["ArrowUp", "ArrowDown", "w", "s"].includes(e.key)) {
                e.preventDefault();
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
    }, []);

    useEffect(() => {
        if (gameState !== 'playing') return;

        const movePaddles = () => {

            setPlayerPaddle(prev => {
                let newY = prev.y;
                if (keys['w']) newY = Math.max(0, prev.y - PADDLE_SPEED);
                if (keys['s']) newY = Math.min(GAME_HEIGHT - PADDLE_HEIGHT, prev.y + PADDLE_SPEED);
                return { y: newY };
            });

            setPlayer2Paddle(prev => {
                let newY = prev.y;
                if (keys['ArrowUp']) newY = Math.max(0, prev.y - PADDLE_SPEED);
                if (keys['ArrowDown']) newY = Math.min(GAME_HEIGHT - PADDLE_HEIGHT, prev.y + PADDLE_SPEED);
                return { y: newY };
            });
        };

        const interval = setInterval(movePaddles, 16);
        return () => clearInterval(interval);
    }, [keys, gameState, player1PaddleHeight, player2PaddleHeight]);

    useEffect(() => {
        if (gameState !== 'playing') return;

        const spawnInterval = setInterval(() => {
            const x = Math.random() * (GAME_WIDTH - 30) + 15;
            const y = Math.random() * (GAME_HEIGHT - 30) + 15;
            if (Math.random() > 0.5) {
                setSpeedPowerUp({ x, y });
            } else {
                setShrinkPowerUp({ x, y });
            }
        }, 12000);

        return () => clearInterval(spawnInterval);
    }, [gameState]);

    const updateGame = useCallback(() => {
        if (gameState !== 'playing') return;

        const steps = 2;
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
                    playSound.currentTime = 0
                    playSound(hitraket2);
                }
                if (newY >= GAME_HEIGHT - BALL_SIZE) {
                    newY = GAME_HEIGHT - BALL_SIZE;
                    newDy = -Math.abs(newDy);
                    playSound.currentTime = 0
                    playSound(hitraket2);
                }

                if (
                    newX <= PADDLE_WIDTH &&
                    newX + BALL_SIZE >= 0 &&
                    newY < playerPaddle.y + player1PaddleHeight &&
                    newY + BALL_SIZE > playerPaddle.y
                ) {
                    newDx = Math.abs(newDx);
                    const hitPos = (newY - playerPaddle.y) / PADDLE_HEIGHT;
                    newDy = (hitPos - 0.5) * 10;
                    if (Math.abs(newDy) < 2) newDy = newDy < 0 ? -2 : 2;
                    playSound.currentTime = 0
                    playSound(hitraket);
                }

                if (
                    newX + BALL_SIZE >= GAME_WIDTH - PADDLE_WIDTH &&
                    newX <= GAME_WIDTH &&
                    newY < player2Paddle.y + player2PaddleHeight &&
                    newY + BALL_SIZE > player2Paddle.y
                ) {
                    newDx = -Math.abs(newDx);
                    const hitPos = (newY - player2Paddle.y) / PADDLE_HEIGHT;
                    newDy = (hitPos - 0.5) * 10;
                    if (Math.abs(newDy) < 2) newDy = newDy < 0 ? -2 : 2;
                    playSound.currentTime = 0
                    playSound(hitraket);
                }

                if (newX < 0) {
                    setPlayer2Score(prev => prev + 1);
                    playSound.currentTime = 0;
                    playSound(hitscore);
                    resetBall();
                    return { x: GAME_WIDTH / 2, y: GAME_HEIGHT / 2 };
                }
                if (newX > GAME_WIDTH) {
                    setPlayerScore(prev => prev + 1);
                    playSound.currentTime = 0;
                    playSound(hitscore);
                    resetBall();
                    return { x: GAME_WIDTH / 2, y: GAME_HEIGHT / 2 };
                }

                if (
                    speedPowerUp &&
                    ballPosition.x < speedPowerUp.x + 45 &&
                    ballPosition.x + BALL_SIZE > speedPowerUp.x &&
                    ballPosition.y < speedPowerUp.y + 25 &&
                    ballPosition.y + BALL_SIZE > speedPowerUp.y
                ) {
                    setBallVelocity(prev => ({
                        dx: prev.dx * 6,
                        dy: prev.dy * 6
                    }));
                    setBoostFactor(1.01);
                    setSpeedPowerUp(null);

                    playSound.currentTime = 0
                    playSound(powerspeed);

                    setTimeout(() => {
                        setBallVelocity(prev => {
                            const angle = Math.atan2(prev.dy, prev.dx);
                            const speed = Math.sqrt(prev.dx * prev.dx + prev.dy * prev.dy);
                            const normalSpeed = speed / boostFactor;
                            return {
                                dx: Math.cos(angle) * normalSpeed,
                                dy: Math.sin(angle) * normalSpeed
                            };
                        });
                        setBoostFactor(1);
                    }, 5000);
                }

                if (
                    shrinkPowerUp &&
                    ballPosition.x < shrinkPowerUp.x + 70 &&
                    ballPosition.x + BALL_SIZE > shrinkPowerUp.x &&
                    ballPosition.y < shrinkPowerUp.y + 20 &&
                    ballPosition.y + BALL_SIZE > shrinkPowerUp.y
                ) {
                    if (ballVelocity.dx > 0) {
                        setPlayer2PaddleHeight(40);
                        playSound.currentTime = 0
                        playSound(shrink);
                        setTimeout(() => setPlayer2PaddleHeight(70), 5000);
                    } else {
                        setPlayer1PaddleHeight(40);
                        playSound.currentTime = 0
                        playSound(shrink);
                        setTimeout(() => setPlayer1PaddleHeight(70), 5000);
                    }
                    setShrinkPowerUp(null);
                }

                if (playerScore >= MAX_SCORE || player2Score >= MAX_SCORE) {
                    setGameState('gameOver');
                    playSound(applause);
                }
            }

            setBallVelocity({ dx: newDx, dy: newDy });
            return { x: newX, y: newY };
        });

    }, [gameState, ballVelocity, playerPaddle, player2Paddle, ballPosition, playerScore, player2Score, speedPowerUp, boostFactor]);

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
        setPlayer2Score(0);
        resetBall();
    };

    const togglePause = () => {
        setGameState(prev => (prev === 'playing' ? 'paused' : 'playing'));
    };


    // const restartGame = () => {
    //     startGame();
    // };

    return (
        <>
            <div className='tennisMain'>
                {gameState === 'menu' && (
                    <div>
                        <p>Welcome to Tennis game!</p>
                        <p> Controls: for player one, use the keys W and S, for player two use the arrow keys.</p>
                        <div
                            onClick={startGame}
                            style={{
                                padding: '10px 20px',
                                fontSize: '18px',
                                backgroundColor: 'green',
                                color: '#ff8f00',
                                borderRadius: '10px',
                                cursor: 'pointer',
                                display: 'inline-block',
                                margin: '10px'
                            }}
                        >
                            START
                        </div>
                    </div>
                )}

                {gameState === 'gameOver' && (
                    <div>
                        <h3>Result:</h3>
                        <p style={{ fontSize: "30px" }}>
                            👮‍♂️: {playerScore} – 👨‍🎓: {player2Score}{' '}
                        </p>
                        <p style={{ fontWeight: "bold", fontSize: "32px", color: "blue", padding: "25px", textAlign: "center" }}>
                            {playerScore >= MAX_SCORE ? 'PLAYER ONE WIN!' : 'PLAYER TWO WIN!'}
                        </p>
                        <div
                            onClick={startGame}
                            style={{
                                padding: '10px 20px',
                                fontSize: '18px',
                                backgroundColor: '#44336',
                                color: 'green',
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
                                margin: 'auto'
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
                                    backgroundColor: boostFactor > 1 ? 'yellow' : 'white',
                                    borderRadius: '50%'
                                }}
                            />


                            <div
                                style={{
                                    position: 'absolute',
                                    left: 0,
                                    top: playerPaddle.y,
                                    width: PADDLE_WIDTH,
                                    height: player1PaddleHeight,
                                    backgroundImage: 'linear-gradient(#1565c0, #223794ff, #1565c0)'
                                }}
                            />
                            <div
                                style={{
                                    position: 'absolute',
                                    right: 0,
                                    top: player2Paddle.y,
                                    width: PADDLE_WIDTH,
                                    height: player2PaddleHeight,
                                    backgroundImage: 'linear-gradient(#feb867, #f77a53ff, #feb867)'
                                }}
                            />

                            {speedPowerUp && (
                                <div
                                    style={{
                                        position: 'absolute',
                                        left: speedPowerUp.x,
                                        top: speedPowerUp.y,
                                        width: 45,
                                        height: 25,
                                        fontSize: 14,
                                        paddingTop: 5,
                                        textAlign: 'center',
                                        color: 'white',
                                        backgroundColor: '#c35454ff',
                                        borderRadius: '15%'
                                    }}
                                > speed</div>
                            )}
                            {shrinkPowerUp && (
                                <div
                                    style={{
                                        position: 'absolute',
                                        left: shrinkPowerUp.x,
                                        top: shrinkPowerUp.y,
                                        width: 70,
                                        height: 20,
                                        paddingTop: 5,
                                        fontSize: 14,
                                        textAlign: 'center',
                                        color: 'white',
                                        backgroundColor: '#42bdc5ff',
                                        borderRadius: '10%'
                                    }}
                                >shrink </div>
                            )}
                        </div>

                        <div style={{ color: 'green', textAlign: 'center', fontSize: '26px', marginTop: "15px" }}>
                            👮‍♂️: {playerScore} | 👨‍🎓: {player2Score}
                        </div>
                        <button
                            onClick={() => setMuted(m => !m)}
                            style={{ marginLeft: '10px', fontSize: '14px' }}
                        >
                            {muted ? "Unmute 🔊" : "Mute 🔇"}
                        </button>
                    </>
                )}

                <div>
                    {gameState === 'playing' && (
                        <div style={{ padding: '10px 40px' }}>
                            <p style={{ fontWeight: "bold" }}>
                                The first to collect {MAX_SCORE} points wins!
                            </p>
                            Controls: for player one, use the keys W and S, for player two use the arrow keys.
                        </div>
                    )}
                </div>
                <div
                    onClick={togglePause}
                    style={{
                        padding: '10px 20px',
                        fontSize: '18px',
                        backgroundColor: '#44336',
                        color: 'green',
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
                        color: 'green',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        display: 'inline-block',
                        marginTop: '10px',
                        marginLeft: '10px'
                    }}
                >
                    MENI
                </div>
            </div>
        </>
    );
};
export default TennisGame2p;
