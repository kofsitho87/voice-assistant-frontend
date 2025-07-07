"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Phone, Hospital, ArrowRight, Sparkles } from "lucide-react"

const hospitals = [
  { value: "wisedental", label: "와이즈덴탈", active: true },
  { value: "gangnam-medical", label: "강남메디컬센터" },
  { value: "yonsei-hospital", label: "연세대학교병원" },
  { value: "samsung-medical", label: "삼성서울병원" },
  { value: "asan-medical", label: "서울아산병원" },
  { value: "bundang-seoul", label: "분당서울대학교병원" },
]

export default function Page() {
  const [selectedHospital, setSelectedHospital] = useState<string>("")
  const [phoneNumber, setPhoneNumber] = useState<string>("")
  const [isValid, setIsValid] = useState<boolean>(false)
  const router = useRouter()

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d]/g, "")
    let formatted = value

    if (value.length >= 3) {
      formatted = `${value.slice(0, 3)}-${value.slice(3)}`
    }
    if (value.length >= 7) {
      formatted = `${value.slice(0, 3)}-${value.slice(3, 7)}-${value.slice(7, 11)}`
    }

    setPhoneNumber(formatted)
    setIsValid(selectedHospital !== "" && value.length >= 10)
  }

  const handleHospitalChange = (value: string) => {
    setSelectedHospital(value)
    setIsValid(value !== "" && phoneNumber.replace(/[^\d]/g, "").length >= 10)
  }

  const handleNext = () => {
    if (isValid) {
      // Navigate to step 2 with the selected data
      router.push(`/${selectedHospital}?phone=${phoneNumber.replace(/-/g, "")}`)
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900'>
      <div className='container mx-auto px-4 py-8'>
        <div className='mx-auto max-w-2xl'>
          {/* Header */}
          <div className='mb-12 text-center'>
            <div className='mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10'>
              <Sparkles className='h-8 w-8 text-primary' />
            </div>
            <h1 className='mb-4 font-bold text-4xl text-gray-900 dark:text-white'>AI 의료 상담 서비스</h1>
            <p className='text-gray-600 text-lg dark:text-gray-300'>원하는 병원을 선택하고 전화번호를 입력하세요</p>
          </div>

          {/* Main Form Card */}
          <div className='mb-8 rounded-2xl border border-gray-200 bg-white p-8 shadow-xl dark:border-gray-700 dark:bg-gray-800'>
            <div className='space-y-8'>
              {/* Hospital Selection */}
              <div className='space-y-3'>
                <label className='flex items-center gap-2 font-semibold text-gray-700 text-sm dark:text-gray-300'>
                  <Hospital className='h-4 w-4' />
                  병원 선택
                </label>
                <Select value={selectedHospital} onValueChange={handleHospitalChange}>
                  <SelectTrigger className='h-12 w-full text-base'>
                    <SelectValue placeholder='상담받을 병원을 선택해주세요' />
                  </SelectTrigger>
                  <SelectContent>
                    {hospitals.map((hospital) => (
                      <SelectItem key={hospital.value} value={hospital.value} disabled={!hospital.active}>
                        {hospital.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Phone Number Input */}
              <div className='space-y-3'>
                <label className='flex items-center gap-2 font-semibold text-gray-700 text-sm dark:text-gray-300'>
                  <Phone className='h-4 w-4' />
                  전화번호
                </label>
                <div className='relative'>
                  <input
                    type='tel'
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                    placeholder='010-1234-5678'
                    className={`h-12 w-full rounded-full border-2 px-4 pr-12 text-base transition-all duration-200 focus:outline-none focus:ring-3 focus:ring-primary/20 ${
                      phoneNumber && phoneNumber.replace(/[^\d]/g, "").length >= 10
                        ? "border-green-300 bg-green-50 dark:border-green-600 dark:bg-green-900/20"
                        : "border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-700"
                    }`}
                    maxLength={13}
                  />
                  <div className='-translate-y-1/2 absolute top-1/2 right-4 transform'>
                    {phoneNumber && phoneNumber.replace(/[^\d]/g, "").length >= 10 && (
                      <div className='flex h-5 w-5 items-center justify-center rounded-full bg-green-500'>
                        <svg className='h-3 w-3 text-white' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
                <p className='text-gray-500 text-xs dark:text-gray-400'>상담 연결을 위한 전화번호를 입력해주세요</p>
              </div>
            </div>
          </div>

          {/* Next Button */}
          <div className='text-center'>
            <Button
              onClick={handleNext}
              disabled={!isValid}
              size='lg'
              className={`h-14 w-full rounded-full font-semibold text-lg transition-all duration-300 ${
                isValid
                  ? "transform bg-primary text-white shadow-lg hover:scale-105 hover:bg-primary-hover hover:shadow-xl"
                  : "cursor-not-allowed bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400"
              }`}
            >
              {isValid ? (
                <>
                  상담 연결하기
                  <ArrowRight className='ml-2 h-5 w-5' />
                </>
              ) : (
                "병원과 전화번호를 선택해주세요"
              )}
            </Button>
          </div>

          {/* Info Section */}
          <div className='mt-12 rounded-xl bg-blue-50 p-6 dark:bg-blue-900/20'>
            <h3 className='mb-3 font-semibold text-blue-900 text-lg dark:text-blue-100'>🤖 AI 의료 상담 서비스 안내</h3>
            <ul className='space-y-2 text-blue-800 text-sm dark:text-blue-200'>
              <li>• 24시간 언제든지 의료 상담이 가능합니다</li>
              <li>• AI가 초기 증상을 분석하고 적절한 진료과를 안내해드립니다</li>
              <li>• 응급상황 시 즉시 응급실로 연결해드립니다</li>
              <li>• 개인정보는 안전하게 보호됩니다</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
