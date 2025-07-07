"use client"

import { Phone, Mic, Volume2, MessageCircle, MoreHorizontal, Contact } from "lucide-react"

interface WelcomeProps {
  disabled: boolean
  phoneNumber: string
  onStartCall: () => void
}

export const Welcome = ({ disabled, phoneNumber, onStartCall, ref }: React.ComponentProps<"div"> & WelcomeProps) => {
  return (
    <div
      ref={ref}
      inert={disabled}
      className='fixed inset-0 z-10 mx-auto flex h-svh flex-col bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900'
    >
      {/* 상단 상태바 영역 */}
      <div className='flex items-center justify-between p-4 text-sm text-white/80'>
        <div className='flex items-center gap-1'>
          <div className='h-1 w-1 rounded-full bg-white'></div>
          <div className='h-1 w-1 rounded-full bg-white'></div>
          <div className='h-1 w-1 rounded-full bg-white/50'></div>
        </div>
        <span className='font-medium'>음성 상담</span>
        <div className='flex items-center gap-1'>
          <div className='h-3 w-6 rounded-sm border border-white/50'>
            <div className='mt-0.5 ml-0.5 h-1 w-4 rounded-full bg-white'></div>
          </div>
        </div>
      </div>

      {/* 메인 통화 화면 */}
      <div className='flex flex-1 flex-col items-center justify-center px-8'>
        {/* 상대방 정보 */}
        <div className='mb-12 text-center'>
          <div className='mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-blue-600 shadow-2xl'>
            <span className='font-bold text-4xl text-white'>W</span>
          </div>
          <h1 className='mb-2 font-light text-3xl text-white'>와이즈덴탈</h1>
          <p className='text-lg text-white/70'>{phoneNumber}</p>
          <p className='mt-2 text-sm text-white/50'>AI 의료 상담사</p>
        </div>

        {/* 발신 준비 상태 */}
        <div className='mb-8 text-lg text-white/60'>상담 연결 준비 중...</div>
      </div>

      {/* 상단 제어 버튼들 */}
      <div className='mb-8 flex items-center justify-center space-x-8'>
        <button className='flex h-14 w-14 items-center justify-center rounded-full bg-white/10 opacity-50 backdrop-blur-sm transition-all'>
          <Contact className='h-6 w-6 text-white' />
        </button>
        <button className='flex h-14 w-14 items-center justify-center rounded-full bg-white/10 opacity-50 backdrop-blur-sm transition-all'>
          <MessageCircle className='h-6 w-6 text-white' />
        </button>
        <button className='flex h-14 w-14 items-center justify-center rounded-full bg-white/10 opacity-50 backdrop-blur-sm transition-all'>
          <MoreHorizontal className='h-6 w-6 text-white' />
        </button>
      </div>

      {/* 하단 주요 제어 버튼들 */}
      <div className='mb-12 flex items-center justify-center space-x-12'>
        <button className='flex h-16 w-16 items-center justify-center rounded-full bg-white/10 opacity-50 backdrop-blur-sm transition-all'>
          <Volume2 className='h-7 w-7 text-white' />
        </button>

        {/* 전화 걸기 버튼 */}
        <button
          onClick={onStartCall}
          className='flex h-20 w-20 transform items-center justify-center rounded-full bg-green-500 shadow-2xl transition-all hover:scale-105 hover:bg-green-600'
        >
          <Phone className='h-8 w-8 text-white' />
        </button>

        <button className='flex h-16 w-16 items-center justify-center rounded-full bg-white/10 opacity-50 backdrop-blur-sm transition-all'>
          <Mic className='h-7 w-7 text-white' />
        </button>
      </div>

      {/* 하단 슬라이드 인디케이터 */}
      <div className='flex justify-center pb-6'>
        <div className='h-1 w-32 rounded-full bg-white/30'></div>
      </div>
    </div>
  )
}
