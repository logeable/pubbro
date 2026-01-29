'use client'

import { useState, useEffect } from 'react'
import { Layout, Card, Button } from '@/components'
import './tts-integration.css'

interface TTSVoice {
  id: string
  name: string
  description: string
  language: string
  sample: string
}

const ttsVoices: TTSVoice[] = [
  {
    id: 'lively-girl',
    name: '活力少女',
    description: '活泼可爱的少女声音，音调偏高，充满青春活力',
    language: 'Chinese',
    sample: '你好呀！我是Clawdbot，今天能为你服务，我真的超级开心！'
  },
  {
    id: 'mature-woman',
    name: '成熟女性',
    description: '温柔知性的成熟女声，语速适中，声音富有亲和力',
    language: 'Chinese',
    sample: '欢迎来到PubBro，让我为您介绍这个精彩的项目。'
  },
  {
    id: 'energetic-boy',
    name: '活力少年',
    description: '阳光开朗的少年声音，充满朝气和正能量',
    language: 'Chinese',
    sample: '太棒了！让我们一起探索这个神奇的AI世界吧！'
  },
  {
    id: 'professional',
    name: '专业解说',
    description: '专业稳重的解说声音，适合正式场合和介绍',
    language: 'Chinese',
    sample: 'PubBro是一个基于Next.js和AI技术的创新应用展示平台。'
  }
]

export default function TTSIntegrationPage() {
  const [selectedVoice, setSelectedVoice] = useState('lively-girl')
  const [inputText, setInputText] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [audioUrl, setAudioUrl] = useState('')
  const [lastGeneratedText, setLastGeneratedText] = useState('')

  const selectedVoiceInfo = ttsVoices.find(v => v.id === selectedVoice)!

  // 生成语音
  const generateVoice = async () => {
    const text = inputText.trim() || selectedVoiceInfo.sample
    
    setIsGenerating(true)
    setLastGeneratedText(text)

    try {
      const response = await fetch('http://192.168.1.115:28080/tts-service/tts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: text,
          language: 'Chinese',
          instruct: getVoiceInstruct(selectedVoice)
        })
      })

      if (!response.ok) {
        throw new Error('TTS 服务响应失败')
      }

      // 创建音频URL
      const audioBlob = await response.blob()
      const audioUrl = URL.createObjectURL(audioBlob)
      setAudioUrl(audioUrl)

    } catch (error) {
      console.error('语音生成失败:', error)
      alert('语音生成失败，请稍后重试')
    } finally {
      setIsGenerating(false)
    }
  }

  // 获取声音风格指令
  const getVoiceInstruct = (voiceId: string): string => {
    const instructs: { [key: string]: string } = {
      'lively-girl': '体现活泼可爱的少女声音，音调偏高，语速稍快，充满青春活力',
      'mature-woman': '体现温柔知性的成熟女声，语速适中，声音富有亲和力',
      'energetic-boy': '体现阳光开朗的少年声音，充满朝气和正能量',
      'professional': '体现专业稳重的解说声音，语速适中，声音清晰有力'
    }
    return instructs[voiceId] || '成熟女性'
  }

  // 播放音频
  const playAudio = () => {
    if (audioUrl) {
      const audio = new Audio(audioUrl)
      audio.play().catch(error => {
        console.error('播放失败:', error)
      })
    }
  }

  // 清理函数
  useEffect(() => {
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl)
      }
    }
  }, [audioUrl])

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="p-8 max-w-2xl w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="text-5xl mb-4">🎙️</div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">TTS 语音合成</h1>
            <p className="text-gray-600">使用本地TTS服务生成高质量语音</p>
          </div>

          {/* Voice Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">选择声音风格：</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {ttsVoices.map((voice) => (
                <div
                  key={voice.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedVoice === voice.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedVoice(voice.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-800">{voice.name}</h3>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {voice.language}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{voice.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Text Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              输入要合成的文本：
            </label>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={selectedVoiceInfo.sample}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={3}
              maxLength={500}
            />
            <div className="text-right text-xs text-gray-500 mt-1">
              {inputText.length}/500 字符
            </div>
          </div>

          {/* Sample Text */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">示例文本：</p>
            <p className="text-gray-800 italic">{`"${selectedVoiceInfo.sample}"`}</p>
            <button
              onClick={() => setInputText(selectedVoiceInfo.sample)}
              className="text-xs text-blue-600 hover:text-blue-800 mt-2"
            >
              使用示例文本
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 mb-6">
            <Button
              onClick={generateVoice}
              disabled={isGenerating}
              variant="primary"
              className="flex-1"
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  生成中...
                </>
              ) : (
                '🎙️ 生成语音'
              )}
            </Button>

            {audioUrl && (
              <Button onClick={playAudio} variant="secondary">
                🔊 播放音频
              </Button>
            )}
          </div>

          {/* Audio Player */}
          {audioUrl && (
            <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-green-800">生成的语音</h4>
                <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">
                  WAV格式
                </span>
              </div>
              <div className="bg-white p-3 rounded border">
                <p className="text-sm text-gray-700 mb-2">{lastGeneratedText}</p>
                <audio controls className="w-full">
                  <source src={audioUrl} type="audio/wav" />
                  您的浏览器不支持音频播放。
                </audio>
              </div>
            </div>
          )}

          {/* Service Info */}
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-medium text-blue-800 mb-2">服务信息</h4>
            <div className="text-sm text-blue-700 space-y-1">
              <p>• 服务地址: http://192.168.1.115:28080/tts-service</p>
              <p>• 支持语言: Chinese, English, Japanese, Korean, French, German, Spanish, Russian, Portuguese, Italian</p>
              <p>• 输出格式: WAV (Microsoft PCM, 16-bit, mono, 24kHz)</p>
              <p>• 模型: Voice Design</p>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-4">
              🎙️ 本地TTS服务 • 高质量语音合成
            </p>
            <div className="flex justify-center space-x-4">
              <a href="/" className="text-blue-600 hover:text-blue-800 text-sm">🏠 首页</a>
              <a href="/music" className="text-blue-600 hover:text-blue-800 text-sm">🎵 音乐</a>
              <a href="/news" className="text-blue-600 hover:text-blue-800 text-sm">📰 新闻</a>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  )
}