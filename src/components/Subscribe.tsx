import { gql, useMutation } from "@apollo/client";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IgniteLogo } from "./IgniteLogo";
import { ReactLogo } from "./ReactLogo";

const CREATE_SUBSCRIBER_MUTATION = gql`
  mutation CreateSubscriber($name: String!, $email: String!) {
    createSubscriber(data: {name: $name, email: $email}) {
      id
    }
  }
`

export function Subscribe() {

  const navigate = useNavigate()

  const [formName, setFormName] = useState('')
  const [formEmail, setFormEmail] = useState('')

  const [createSubscriber, { loading }] = useMutation(CREATE_SUBSCRIBER_MUTATION)

  async function handleSubscribe(e: FormEvent) {
    e.preventDefault()

    await createSubscriber({
      variables: {
        name: formName,
        email: formEmail,
      }
    })

    navigate('/event')
  }

  return (
    <div className="relative h-full bg-blur bg-cover bg-no-repeat flex flex-col items-center justify-between p-8 overflow-hidden">
      <div className="absolute top-[30%]">
        <ReactLogo />
      </div>
      <div className="w-full max-w-[1100px] flex items-center justify-between mt-20 mx-auto z-10">
        <div className="w-full max-w-[640px]">
          <IgniteLogo />
          <h1 className="mt-8 text-[2.5rem] text-gray-100 font-medium leading-tight">
            Construa uma <strong className="text-blue-500">aplicação completa</strong>, do zero, com <strong className="text-blue-500">React</strong>
          </h1>
          <p className="mt-4 text-gray-200 leading-relaxed">
            Em apenas uma semana você vai dominar na prática uma das tecnologias mais utilizadas e com alta demanda para acessar as melhores oportunidades do mercado.
          </p>
        </div>
        <div className="p-8 bg-gray-700 border border-gray-500 rounded">
          <strong className="text-2xl text-gray-100 mb-6 block">
            Inscreva-se gratuitamente
          </strong>
          <form onSubmit={handleSubscribe} className="w-full flex flex-col gap-2">
            <input
              className="bg-gray-900 rounded px-5 h-14"
              type="text"
              placeholder="Seu nome completo"
              onChange={e => setFormName(e.target.value)}
              value={formName}
            />
            <input
              className="bg-gray-900 rounded px-5 h-14"
              type="email"
              placeholder="Seu melhor e-mail"
              onChange={e => setFormEmail(e.target.value)}
              value={formEmail}
            />
            <button
              className="mt-4 py-4 bg-green-500 rounded uppercase font-bold text-sm hover:bg-green-700 transition-colors disabled:opacity-50"
              disabled={loading}
              type="submit"
            >
              Garantir minha vaga
            </button>
          </form>
        </div>
      </div>
      <div className="z-10">
        <img className="w-full max-w-[1100px]" src="/src/assets/code-mockup.png" alt="" />
      </div>
    </div>

  )
}