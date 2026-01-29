'use client'

import { useState, useEffect, useRef } from 'react'
import { Layout, Card, Button } from '@/components'
import './music-player.css'

interface MusicTrack {
  id: number
  name: string
  url: string
  duration?: string
}

const musicTracks: MusicTrack[] = [
  {
    id: 1,
    name: 'Sunny Happy Background Music',
    url: '/happy-music.mp3',
    duration: '2:07'
  },
  {
    id: 2,
    name: 'Web Audio Generated - 欢乐颂',
    duration: '0:08'
  },
  {
    id: 3,
    name: 'Web Audio Generated - 阳光旋律',
    duration: '0:08'
  },
  {
    id: 4,
    name: 'Web Audio Generated - 快乐进行曲',
    duration: '0:08'
  }
]

export default function MusicPlayerPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(0)
  const [audioUrl, setAudioUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const oscillatorRef = useRef<OscillatorNode | null>(null)
  const gainNodeRef = useRef<GainNode | null>(null)

  // Web Audio API 音符频率映射
  const noteFrequencies: { [key: string]: number } = {
    'C4': 261.63, 'D4': 293.66, 'E4': 329.63, 'F4': 349.23,
    'G4': 392.00, 'A4': 440.00, 'B4': 493.88, 'C5': 523.25
  }

  // 初始化音频播放
  const initAudioPlayer = async () => {
    if (!audioRef.current) {
      audioRef.current = new Audio()
    }
  }

  // 播放真实音频文件
  const playRealAudio = async () => {
    if (!audioRef.current) return
    
    try {
      setIsLoading(true)
      const track = musicTracks[currentTrack]
      
      if (currentTrack === 0) {
        // 播放真实音频文件
        audioRef.current.src = track.url
        await audioRef.current.play()
      } else {
        // 播放 Web Audio API 生成的音乐
        await playWebAudioMusic(currentTrack - 1)
      }
      
      setIsPlaying(true)
      setIsLoading(false)
    } catch (error) {
      console.error('播放失败:', error)
      setIsLoading(false)
    }
  }

  // 播放 Web Audio API 生成的音乐
  const playWebAudioMusic = async (melodyIndex: number) => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    }

    if (audioContextRef.current.state === 'suspended') {
      await audioContextRef.current.resume()
    }

    // 停止之前的音频
    if (oscillatorRef.current) {
      oscillatorRef.current.stop()
    }

    // 不同旋律的音符配置
    const melodies = [
      {
        name: '欢乐颂',
        notes: ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'],
        rhythm: [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 1]
      },
      {
        name: '阳光旋律',
        notes: ['C4', 'E4', 'G4', 'C5', 'G4', 'E4', 'C4'],
        rhythm: [0.75, 0.75, 0.75, 1.5, 0.75, 0.75, 1.5]
      },
      {
        name: '快乐进行曲',
        notes: ['C4', 'C4', 'G4', 'G4', 'A4', 'A4', 'G4'],
        rhythm: [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 1]
      }
    ]

    const melody = melodies[melodyIndex]
    if (!melody) return

    // 播放旋律
    for (let i = 0; i < melody.notes.length; i++) {
      if (!isPlaying) break // 允许中断
      
      const note = melody.notes[i]
      const duration = melody.rhythm[i]
      const frequency = noteFrequencies[note]

      if (frequency) {
        await playNote(frequency, duration)
        await new Promise(resolve => setTimeout(resolve, 100))
      }
    }
  }

  // 播放单个音符
  const playNote = async (frequency: number, duration: number) => {
    if (!audioContextRef.current) return

    const oscillator = audioContextRef.current.createOscillator()
    const gainNode = audioContextRef.current.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContextRef.current.destination)

    oscillator.frequency.setValueAtTime(frequency, audioContextRef.current.currentTime)
    oscillator.type = 'sine'

    gainNode.gain.setValueAtTime(0.3, audioContextRef.current.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + duration)

    oscillator.start(audioContextRef.current.currentTime)
    oscillator.stop(audioContextRef.current.currentTime + duration)

    return new Promise(resolve => setTimeout(resolve, duration * 1000))
  }

  // 播放控制
  const handlePlay = async () => {
    await initAudioPlayer()
    
    if (isPlaying) {
      // 停止播放
      if (audioRef.current) {
        audioRef.current.pause()
      }
      if (oscillatorRef.current) {
        oscillatorRef.current.stop()
      }
      setIsPlaying(false)
    } else {
      // 开始播放
      await playRealAudio()
    }
  }

  // 切换曲目
  const handleTrackChange = async (index: number) => {
    if (isPlaying) {
      setIsPlaying(false)
      if (audioRef.current) {
        audioRef.current.pause()
      }
      if (oscillatorRef.current) {
        oscillatorRef.current.stop()
      }
    }
    setCurrentTrack(index)
  }

  // 清理函数
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
      }
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [])

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-yellow-50 flex items-center justify-center p-4">
        <Card className="p-8 max-w-md w-full music-card">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="text-4xl mb-4 music-note">🎵</div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">音乐播放器</h1>
            <p className="text-gray-600">yt-dlp + ffmpeg 强力组合</p>
          </div>

          {/* Track Info */}
          <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl p-6 mb-6">
            <div className="text-center">
              <div className="text-lg font-semibold text-gray-800 mb-2">
                {musicTracks[currentTrack].name}
              </div>
              <div className="text-sm text-gray-600">
                {musicTracks[currentTrack].duration}
              </div>
            </div>
          </div>

          {/* Visualizer */}
          <div className="flex justify-center space-x-2 mb-8">
            <div className="equalizer">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`equalizer-bar ${isPlaying ? 'playing' : 'stopped'}`}
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center space-x-6 mb-6">
            <button
              onClick={() => handleTrackChange(Math.max(0, currentTrack - 1))}
              className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
              disabled={isLoading}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
              </svg>
            </button>

            <button
              onClick={handlePlay}
              className="p-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full hover:from-blue-600 hover:to-purple-600 transition-all transform hover:scale-105 shadow-lg play-button"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="w-8 h-8 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              ) : isPlaying ? (
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                </svg>
              ) : (
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              )}
            </button>

            <button
              onClick={() => handleTrackChange(Math.min(musicTracks.length - 1, currentTrack + 1))}
              className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
              disabled={isLoading}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
              </svg>
            </button>
          </div>

          {/* Track List */}
          <div className="space-y-2 mb-6">
            <div className="text-sm font-medium text-gray-700 mb-3">播放列表：</div>
            {musicTracks.map((track, index) => (
              <div
                key={track.id}
                className={`p-3 rounded-lg cursor-pointer transition-all ${
                  index === currentTrack
                    ? 'bg-blue-100 border-2 border-blue-300'
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
                onClick={() => handleTrackChange(index)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${
                      index === currentTrack ? 'bg-blue-500' : 'bg-gray-300'
                    }`} />
                    <span className="text-sm font-medium">{track.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">{track.duration}</span>
                    {index === currentTrack && isPlaying && (
                      <div className="flex space-x-1">
                        <div className="w-1 h-4 bg-blue-500 rounded animate-pulse" />
                        <div className="w-1 h-4 bg-blue-500 rounded animate-pulse" style={{animationDelay: '0.1s'}} />
                        <div className="w-1 h-4 bg-blue-500 rounded animate-pulse" style={{animationDelay: '0.2s'}} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Audio Element */}
          <audio ref={audioRef} onEnded={() => setIsPlaying(false)} />

          {/* Footer */}
          <div className="text-center pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-4">
              🎵 yt-dlp + ffmpeg 强力组合 • 真实音频文件
            </p>
            <div className="flex justify-center space-x-4">
              <a href="/" className="text-blue-600 hover:text-blue-800 text-sm">🏠 首页</a>
              <a href="/news" className="text-blue-600 hover:text-blue-800 text-sm">📰 新闻</a>
              <a href="/story" className="text-blue-600 hover:text-blue-800 text-sm">🎭 故事</a>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  )
}