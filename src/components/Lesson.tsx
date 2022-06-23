import { CheckCircle, Lock } from 'phosphor-react'
import { isPast, format } from "date-fns"
import { ptBR } from "date-fns/locale"

interface LessonProps {
  title: string;
  slug: string;
  availableAt: Date;
  type: 'live' | 'class';
}

export function Lesson(props: LessonProps) {

  const isLessonAvailable = isPast(props.availableAt)
  const availableAtFormatted = format(props.availableAt, "EEEE' • 'd' de 'MMMM' • 'k'h'mm", { locale: ptBR }).replace(/^\w/, c => c.toUpperCase())

  return (
    <a href="">
      <span className="text-gray-300">
        {availableAtFormatted}
      </span>
      <div className="rounded border border-gray-500 p-4 mt-2">
        <header className="flex items-center justify-between">
          {
            isLessonAvailable
              ? <span className="flex items-center gap-2 text-sm text-blue-500 font-medium">
                <CheckCircle size={20} />
                Conteúdo liberado
              </span>
              : <span className="flex items-center gap-2 text-sm text-orange-500 font-medium">
                <Lock size={20} />
                Em breve
              </span>
          }
          <span className="rounded border border-green-300 py-[0.125rem] px-2 text-xs text-white font-bold">
            {props.type === 'live' ? 'AO VIVO' : 'AULA PRÁTICA'}
          </span>
        </header>
        <span className="text-gray-200 font-bold mt-4 block">
          {props.title}
        </span>
      </div>
    </a>
  )
}