import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { DefaultUi, Player, Youtube } from "@vime/react";
import { CaretRight, DiscordLogo, FileArrowDown, Lightning } from "phosphor-react";

import '@vime/core/themes/default.css'

const GET_LESSON_BY_SLUG = gql`
  query GetLessonBySlug($slug:String) {
    lesson(where: {slug: $slug}) {
      description
      title
      videoId
      teacher {
        bio
        avatarURL
        name
      }
    }
  }
`

interface GetLessonBySlugResponse {
  lesson: {
    description: string;
    title: string;
    videoId: string;
    teacher: {
      bio: string;
      avatarURL: string;
      name: string;
    }
  }
}

export function Video() {

  const { lessonSlug } = useParams<{ lessonSlug: string }>()

  const { data } = lessonSlug
    ? useQuery<GetLessonBySlugResponse>(GET_LESSON_BY_SLUG, {
      variables: {
        slug: lessonSlug,
      }
    })
    : { data: null }

  if (lessonSlug == null || data == null) return <div className="flex-1" />

  return (
    <div className="flex-1">

      <div className="bg-black flex justify-center">
        <div className="w-full h-full max-w-[1100px] max-h-[60vh] aspect-video">
          <Player>
            <Youtube key={data?.lesson.videoId} videoId={data?.lesson.videoId} />
            <DefaultUi />
          </Player>
        </div>
      </div>

      <div className="p-8 max-w-[1100px] mx-auto">
        <div className="flex items-start gap-16">
          <div className="flex-1">
            <h1 className="text-2xl font-bold">
              {data?.lesson.title}
            </h1>
            <p className="mt-4 text-gray-200 leading-relaxed">
              {data?.lesson.description}
            </p>
            <div className="flex items-center gap-4 mt-6">
              <img
                className="w-16 h-16 rounded-full border-2 border-blue-500"
                src={data?.lesson.teacher.avatarURL}
                alt="Imagem de perfil do professor"
              />
              <div className="leading-relaxed">
                <strong className="text-2xl font-bold block">{data?.lesson.teacher.name}</strong>
                <span className="text-sm text-gray-200 block">{data?.lesson.teacher.bio}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <a href="" className="p-4 rounded bg-green-500 flex items-center justify-center gap-2 font-bold uppercase hover:bg-green-700 transition-colors">
              <DiscordLogo size={24} />
              Comunidade do discord
            </a>
            <a href="" className="p-4 rounded border border-blue-500 text-blue-500 flex items-center justify-center gap-2 font-bold uppercase hover:bg-blue-500 hover:text-gray-900 transition-colors">
              <Lightning size={24} />
              Acesse o desafio
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 mt-20">
          <a href="" className="bg-gray-700 rounded overflow-hidden flex items-stretch gap-6 hover:bg-gray-600 transition-colors">
            <div className="bg-green-700 h-full p-6 flex items-center">
              <FileArrowDown size={40} />
            </div>
            <div className="py-6 leading-relaxed">
              <strong className="text-2xl">
                Material complementar
              </strong>
              <p className="text-sm text-gray-200 mt-2">
                Acesse o material complementar para acelerar o seu desenvolvimento
              </p>
            </div>
            <div className="h-full p-6 flex items-center">
              <CaretRight size={24} />
            </div>
          </a>
          <a href="" className="bg-gray-700 rounded overflow-hidden flex items-stretch gap-6 hover:bg-gray-600 transition-colors">
            <div className="bg-green-700 h-full p-6 flex items-center">
              <FileArrowDown size={40} />
            </div>
            <div className="py-6 leading-relaxed">
              <strong className="text-2xl">
                Wallpapers exclusivos
              </strong>
              <p className="text-sm text-gray-200 mt-2">
                Baixe wallpapers exclusivos do Ignite Lab e personalize a sua máquina
              </p>
            </div>
            <div className="h-full p-6 flex items-center">
              <CaretRight size={24} />
            </div>
          </a>
        </div>

      </div>
    </div>
  )
}