import { CheckCircle, Lock } from 'phosphor-react'
import { isPast, format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Link, useParams } from 'react-router-dom';

interface LessonProps {
  title: string;
  slug: string;
  availableAt: Date;
  type: 'live' | 'class';
}

export function Lesson(props: LessonProps) {

  const { lessonSlug } = useParams<{ lessonSlug: string }>()

  const isLessonSelected = lessonSlug === props.slug
  const isLessonAvailable = isPast(props.availableAt)
  const availableAtFormatted = format(props.availableAt, "EEEE' • 'd' de 'MMMM' • 'k'h'mm", { locale: ptBR }).replace(/^\w/, c => c.toUpperCase())

  return (
    <Link to={`/event/lesson/${props.slug}`} className="group">
      <span className="text-gray-300">
        {availableAtFormatted}
      </span>
      <div
        className={`relative z-20 rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500 ${isLessonSelected && 'bg-green-500'}`}
      >
        {isLessonSelected && <div className={`absolute -left-[6.875px] top-1/2 -translate-y-1/2 rotate-45 w-[13.75px] h-[13.75px] bg-green-500 z-10 ${isLessonSelected ? "opacity-100" : "opacity-0"}`} />}
        <header className="flex items-center justify-between">
          {
            isLessonAvailable
              ? <span className={`flex items-center gap-2 text-sm font-medium ${isLessonSelected ? 'text-white' : 'text-blue-500'}`}>
                <CheckCircle size={20} />
                Conteúdo liberado
              </span>
              : <span className="flex items-center gap-2 text-sm text-orange-500 font-medium">
                <Lock size={20} />
                Em breve
              </span>
          }
          <span className={`rounded border py-[0.125rem] px-2 text-xs text-white font-bold ${isLessonSelected ? 'border-white' : 'border-green-300'}`}>
            {props.type === 'live' ? 'AO VIVO' : 'AULA PRÁTICA'}
          </span>
        </header>
        <span className={`font-bold mt-4 block ${isLessonSelected ? 'text-white' : 'text-gray-200'}`}>
          {props.title}
        </span>
      </div>
    </Link>
  )
}