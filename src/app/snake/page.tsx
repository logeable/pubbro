'use client'

import { useState, useEffect, useRef } from 'react'
import { Layout } from '@/components'
import './high-speed-train-snake.css'

// 高铁配置
const GRID_SIZE = 20
const INITIAL_SNAKE = [{ x: 10, y: 10 }]
const INITIAL_FOOD = { x: 15, y: 15 }
const GAME_SPEED = 120 // 高铁速度更快

const DIRECTIONS = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 }
}

export default function HighSpeedTrainSnakePage() {
  const [snake, setSnake] = useState(INITIAL_SNAKE)
  const [food, setFood] = useState(INITIAL_FOOD)
  const [direction, setDirection] = useState(DIRECTIONS.RIGHT)
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [speed, setSpeed] = useState(200) // 高铁速度，单位：km/h
  const [station, setStation] = useState("北京南站")
  const [destination, setDestination] = useState("上海虹桥站")

  const gameLoopRef = useRef<NodeJS.Timeout | null>(null)

  // 高铁站点数据
  const stations = [
    { name: "北京南站", color: "#FF6B35", icon: "🚄" },
    { name: "济南西站", color: "#F7931E", icon: "🚉" },
    { name: "南京南站", color: "#FFD23F", icon: "🚉" },
    { name: "上海虹桥站", color: "#06FFA5", icon: "🚄" }
  ]

  // 游戏循环 - 高铁速度
  useEffect(() => {
    if (!isPlaying || isPaused || gameOver) {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current)
        gameLoopRef.current = null
      }
      return
    }

    gameLoopRef.current = setInterval(() => {
      moveSnake()
    }, GAME_SPEED)

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current)
      }
    }
  }, [isPlaying, isPaused, gameOver])

  // 移动蛇 - 高铁风格
  const moveSnake = () => {
    setSnake(prevSnake => {
      const head = prevSnake[0]
      const newHead = {
        x: head.x + direction.x,
        y: head.y + direction.y
      }

      // 高铁隧道检查（边界）
      if (newHead.x < 0 || newHead.x >= 20 || newHead.y < 0 || newHead.y >= 20) {
        setGameOver(true)
        setIsPlaying(false)
        return prevSnake
      }

      // 高铁碰撞检查
      if (prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
        setGameOver(true)
        setIsPlaying(false)
        return prevSnake
      }

      const newSnake = [newHead, ...prevSnake]
      let newFood = food
      let newScore = score
      let newSpeed = speed

      // 高铁餐食（食物）
      if (newHead.x === food.x && newHead.y === food.y) {
        newScore += 10
        newSpeed = Math.max(120, speed - 2) // 速度提升，最高时速
        
        // 生成新餐食
        do {
          newFood = {
            x: Math.floor(Math.random() * 20),
            y: Math.floor(Math.random() * 20)
          }
        } while (newSnake.some(segment => segment.x === newFood.x && segment.y === newFood.y))
      } else {
        newSnake.pop()
      }

      setFood(newFood)
      setScore(newScore)
      setSpeed(newSpeed)
      return newSnake
    })
  }

  // 高铁控制台操作
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isPlaying || isPaused) return

      switch (e.key) {
        case 'ArrowUp':
        case 'w':
          if (direction.y === 0) setDirection(DIRECTIONS.UP)
          break
        case 'ArrowDown':
        case 's':
          if (direction.y === 0) setDirection(DIRECTIONS.DOWN)
          break
        case 'ArrowLeft':
        case 'a':
          if (direction.x === 0) setDirection(DIRECTIONS.LEFT)
          break
        case 'ArrowRight':
        case 'd':
          if (direction.x === 0) setDirection(DIRECTIONS.RIGHT)
          break
        case ' ':
          e.preventDefault()
          setIsPaused(!isPaused)
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [isPlaying, isPaused, direction])

  // 高铁触控操作
  const handleTouch = (e: React.TouchEvent) => {
    if (!isPlaying || isPaused) return
    
    const touch = e.touches[0]
    const startX = touch.clientX
    const startY = touch.clientY
    
    const handleTouchEnd = (e: TouchEvent) => {
      const endX = e.changedTouches[0].clientX
      const endY = e.changedTouches[0].clientY
      
      const deltaX = endX - startX
      const deltaY = endY - startY
      const minDistance = 30
      
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minDistance) {
        // 水平轨道切换
        if (deltaX > 0 && direction.x === 0) {
          setDirection(DIRECTIONS.RIGHT)
        } else if (deltaX < 0 && direction.x === 0) {
          setDirection(DIRECTIONS.LEFT)
        }
      } else if (Math.abs(deltaY) > minDistance) {
        // 垂直轨道切换
        if (deltaY > 0 && direction.y === 0) {
          setDirection(DIRECTIONS.DOWN)
        } else if (deltaY < 0 && direction.y === 0) {
          setDirection(DIRECTIONS.UP)
        }
      }
      
      document.removeEventListener('touchend', handleTouchEnd)
    }
    
    document.addEventListener('touchend', handleTouchEnd)
  }

  // 高铁动态站点
  useEffect(() => {
    if (score > 0 && score % 50 === 0) {
      const currentIndex = stations.findIndex(s => s.name === station)
      const nextIndex = (currentIndex + 1) % stations.length
      setStation(stations[nextIndex].name)
      setDestination(stations[(nextIndex + 1) % stations.length].name)
    }
  }, [score, station])

  // 渲染高铁网格
  const renderGrid = () => {
    const cells = []
    for (let y = 0; y < 20; y++) {
      for (let x = 0; x < 20; x++) {
        const isSnake = snake.some(segment => segment.x === x && segment.y === y)
        const isFood = food.x === x && food.y === y
        const isHead = snake[0].x === x && snake[0].y === y

        let cellClass = 'train-cell'
        if (isFood) cellClass += ' train-food'
        if (isSnake) {
          cellClass += isHead ? ' train-head' : ' train-body'
        }

        cells.push(
          <div
            key={`${x}-${y}`}
            className={cellClass}
            style={{
              width: `${100 / 20}%`,
              height: `${100 / 20}%`
            }}
          />
        )
      }
    }
    return cells
  }

  // 高铁控制台
  const startGame = () => {
    setSnake(INITIAL_SNAKE)
    setFood(INITIAL_FOOD)
    setDirection(DIRECTIONS.RIGHT)
    setGameOver(false)
    setScore(0)
    setSpeed(200)
    setStation("北京南站")
    setDestination("上海虹桥站")
    setIsPlaying(true)
    setIsPaused(false)
  }

  const pauseGame = () => {
    setIsPaused(!isPaused)
  }

  const resetGame = () => {
    setSnake(INITIAL_SNAKE)
    setFood(INITIAL_FOOD)
    setDirection(DIRECTIONS.RIGHT)
    setGameOver(false)
    setScore(0)
    setSpeed(200)
    setStation("北京南站")
    setDestination("上海虹桥站")
    setIsPlaying(false)
    setIsPaused(false)
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-800 via-blue-900 to-slate-900 flex items-center justify-center p-4">
        <div className="max-w-4xl mx-auto w-full text-center">
          {/* 高铁头部 */}
          <div className="mb-8">
            <div className="text-6xl mb-4">🚄</div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              高铁贪吃蛇
            </h1>
            <p className="text-lg text-blue-200 mb-6">
              中国铁路风格的经典游戏
            </p>
            
            {/* 高铁信息面板 */}
            <div className="flex justify-center items-center space-x-6 mb-6">
              <div className="bg-red-600 rounded-lg px-4 py-2">
                <div className="text-white text-sm">{station}</div>
              </div>
              <div className="text-white text-xl">→</div>
              <div className="bg-green-600 rounded-lg px-4 py-2">
                <div className="text-white text-sm">{destination}</div>
              </div>
              <div className="bg-blue-600 rounded-lg px-4 py-2">
                <div className="text-white text-sm">{speed} km/h</div>
              </div>
            </div>
          </div>

          {/* 高铁控制台 */}
          <div className="flex justify-center items-center space-x-6 mb-6">
            <div className="bg-gray-800 rounded-lg px-6 py-3 shadow-lg">
              <div className="text-2xl font-bold text-yellow-400">{score}</div>
              <div className="text-sm text-gray-300">里程积分</div>
            </div>
            <div className="bg-gray-800 rounded-lg px-6 py-3 shadow-lg">
              <div className="text-2xl font-bold text-green-400">{snake.length}</div>
              <div className="text-sm text-gray-300">车厢数量</div>
            </div>
            <div className="bg-gray-800 rounded-lg px-6 py-3 shadow-lg">
              <div className="text-2xl font-bold text-blue-400">
                {isPlaying ? (isPaused ? '⏸️' : '▶️') : '⏹️'}
              </div>
              <div className="text-sm text-gray-300">运行状态</div>
            </div>
          </div>

          {/* 高铁轨道（游戏区域） */}
          <div className="flex justify-center mb-6">
            <div
              className="train-track"
              style={{
                width: 'min(80vw, 400px)',
                height: 'min(80vw, 400px)',
                maxWidth: '400px',
                maxHeight: '400px'
              }}
              onTouchStart={handleTouch}
            >
              {renderGrid()}
            </div>
          </div>

          {/* 高铁控制台 */}
          <div className="flex flex-col items-center space-y-4">
            {!isPlaying ? (
              <button
                onClick={startGame}
                className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg font-semibold hover:from-red-700 hover:to-red-800 transition-all transform hover:scale-105 shadow-lg"
              >
                🚄 启动列车
              </button>
            ) : (
              <div className="flex space-x-4">
                <button
                  onClick={pauseGame}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
                >
                  {isPaused ? '▶️ 继续' : '⏸️ 暂停'}
                </button>
                <button
                  onClick={resetGame}
                  className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors shadow-md"
                >
                  🔄 重置
                </button>
              </div>
            )}

            {gameOver && (
              <div className="bg-red-900 border border-red-600 rounded-lg p-4 text-center shadow-xl">
                <h3 className="text-lg font-semibold text-red-200 mb-2">列车紧急停车！</h3>
                <p className="text-red-300 mb-2">最终里程积分: {score}</p>
                <p className="text-red-300 text-sm">车厢数量: {snake.length}</p>
              </div>
            )}

            {/* 高铁操作说明 */}
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 text-center max-w-md">
              <h4 className="font-semibold text-blue-200 mb-2">高铁操作指南</h4>
              <div className="text-sm text-gray-300 space-y-1">
                <p>🚄 <strong>手机:</strong> 滑动屏幕切换轨道</p>
                <p>🎮 <strong>控制台:</strong> 方向键或WASD控制</p>
                <p>⏸️ <strong>紧急制动:</strong> 空格键</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}