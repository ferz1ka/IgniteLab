import { gql, useQuery } from "@apollo/client";
import { Lesson } from "./Lesson"

const GET_LESSONS_QUERY = gql`
  query {
    lessons {
      id
      lessonType
      availableAt
      slug
      title
    }
  }
`

interface getLessonQueryResponse {
  lessons: {
    id: string;
    lessonType: 'live' | 'class';
    availableAt: Date;
    slug: string;
    title: string;
  }[]
}

export function Sidebar() {

  const { data } = useQuery<getLessonQueryResponse>(GET_LESSONS_QUERY)

  return (
    <aside className="w-[348px] bg-gray-700 p-6 border-l border-gray-600">
      <span className="font-bold text-2xl pb-6 mb-6 border-b border-gray-500 block">
        Cronograma de aulas
      </span>

      <div className="flex flex-col gap-8">
        {data?.lessons?.map((lesson: any) => (
          <Lesson key={lesson.id} title={lesson.title} slug={lesson.slug} availableAt={new Date(lesson.availableAt)} type={lesson.lessonType} />
        ))}
      </div>
    </aside>
  )
}