'use client'
import { cn } from '@/lib/utils'
import { Chapter } from '@prisma/client'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'

type Props = { chapter: Chapter, chapterIndex: number }

const ChapterCard = ({ chapter, chapterIndex }: Props) => {
  const [success, setSucess] = React.useState<boolean | null>(null)
  const { mutate: getChapterInfo, isLoading } = useMutation(
    {
      mutationFn: async () => {
        const response = await axios.post('/api/chapter/getInfo')
        return response.data
      }
    }
  )
  return (
    <div key={chapter.id} className={cn('px-4 py-2 mt-2 rounded flex justify-between',
      {
        'bg-secondary': success === null,
        'bg-red-400': success === false,
        'bg-green-500': success === true
      })}>
      <h5>Chapter {chapterIndex + 1} : {chapter.name}</h5>
    </div>
  )
}

export default ChapterCard