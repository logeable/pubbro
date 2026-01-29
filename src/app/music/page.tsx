'use client'

import { useState, useEffect, useRef } from 'react'
import './music-player.css'

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(0)
  const audioContextRef = useRef<AudioContext | null>(null)
  const oscillatorRef = useRef<OscillatorNode | null>(null)
  const gainNodeRef = useRef<GainNode | null>(null)

  const happyMelodies = [
    { name: '欢乐颂', notes: ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'], rhythm: [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 1] },
    { name: '阳光旋律', notes: ['C4', 'E4', 'G4', 'C5', 'G4', 'E4', 'C4'], rhythm: [0.75, 0.75, 0.75, 1.5, 0.75, 0.75, 1.5] },
    { name: '快乐进行曲', notes: ['C4', 'C4', 'G4', 'G4', 'A4', 'A4', 'G4'], rhythm: [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 1] }
  ]

  const noteFrequencies: { [key: string]: number } = {
    'C4': 261.63, 'D4': 293.66, 'E4': 329.63, 'F4': 349.23,
    'G4': 392.00, 'A4': 440.00, 'B4': 493.88, 'C5': 523.25
  }

  const initAudio = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    }
  }

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

  const playMelody = async (melodyIndex: number) => {
    const melody = happyMelodies[melodyIndex]
    if (!melody) return

    setIsPlaying(true)

    for (let i = 0; i < melody.notes.length; i++) {
      if (!isPlaying) break
      const note = melody.notes[i]
      const duration = melody.rhythm[i]
      const frequency = noteFrequencies[note]

      if (frequency) {
        await playNote(frequency, duration)
        await new Promise(resolve => setTimeout(resolve, 100)) // 音符间短暂停顿
      }
    }

    setIsPlaying(false)
  }

  const handlePlay = async () => {
    initAudio()
    if (audioContextRef.current?.state === 'suspended') {
      await audioContextRef.current.resume()
    }

    if (isPlaying) {
      setIsPlaying(false)
    } else {
      playMelody(currentTrack)
    }
  }

  const nextTrack = () => {
    const nextIndex = (currentTrack + 1) % happyMelodies.length
    setCurrentTrack(nextIndex)
    if (isPlaying) {
      setIsPlaying(false)
      setTimeout(() => playMelody(nextIndex), 200)
    }
  }

  const prevTrack = () => {
    const prevIndex = currentTrack === 0 ? happyMelodies.length - 1 : currentTrack - 1
    setCurrentTrack(prevIndex)
    if (isPlaying) {
      setIsPlaying(false)
      setTimeout(() => playMelody(prevIndex), 200)
    }
  }

  useEffect(() => {
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-yellow-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-4xl mb-4">🎵</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">欢乐音乐播放器</h1>
          <p className="text-gray-600">用代码生成的欢快旋律</p>
        </div>

        {/* Track Info */}
        <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl p-6 mb-6">
          <div className="text-center">
            <div className="text-lg font-semibold text-gray-800 mb-2">
              {happyMelodies[currentTrack].name}
            </div>
            <div className="text-sm text-gray-600">
              纯音乐 • 欢快节拍
            </div>
          </div>
        </div>

        {/* Visualizer */}
        <div className="flex justify-center space-x-2 mb-8">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`w-2 bg-gradient-to-t from-blue-500 to-purple-500 rounded-full transition-all duration-300 ${
                isPlaying ? 'animate-pulse' : 'h-4'
              }`}
              style={{
                height: isPlaying ? `${Math.random() * 40 + 20}px` : '16px',
                animationDelay: `${i * 0.1}s`
              }}
            />
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center space-x-6 mb-6">
          <button
            onClick={prevTrack}
            className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
            disabled={isPlaying}
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
            </svg>
          </button>

          <button
            onClick={handlePlay}
            className="p-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full hover:from-blue-600 hover:to-purple-600 transition-all transform hover:scale-105 shadow-lg"
          >
            {isPlaying ? (
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
            onClick={nextTrack}
            className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
            disabled={isPlaying}
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
            </svg>
          </button>
        </div>

        {/* Track List */}
        <div className="space-y-2">
          <div className="text-sm font-medium text-gray-700 mb-3">播放列表：</div>
          {happyMelodies.map((melody, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg cursor-pointer transition-all ${
                index === currentTrack
                  ? 'bg-blue-100 border-2 border-blue-300'
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
              onClick={() => {
                setCurrentTrack(index)
                if (isPlaying) {
                  setIsPlaying(false)
                  setTimeout(() => playMelody(index), 200)
                }
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    index === currentTrack ? 'bg-blue-500' : 'bg-gray-300'
                  }`} />
                  <span className="text-sm font-medium">{melody.name}</span>
                </div>
                {index === currentTrack && isPlaying && (
                  <div className="flex space-x-1">
                    <div className="w-1 h-4 bg-blue-500 rounded animate-pulse" />
                    <div className="w-1 h-4 bg-blue-500 rounded animate-pulse" style={{animationDelay: '0.1s'}} />
                    <div className="w-1 h-4 bg-blue-500 rounded animate-pulse" style={{animationDelay: '0.2s'}} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">
            🎵 用 Web Audio API 生成的纯音乐
          </p>
          <div className="flex justify-center space-x-4">
            <a href="/" className="text-blue-600 hover:text-blue-800 text-sm">🏠 首页</a>
            <a href="/news" className="text-blue-600 hover:text-blue-800 text-sm">📰 新闻</a>
            <a href="/story" className="text-blue-600 hover:text-blue-800 text-sm">🎭 故事</a>
          </div>
        </div>
      </div>
    </div>
  )
}