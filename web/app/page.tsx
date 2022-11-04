'use client';

import { FormEvent, useCallback, useRef } from "react"
import Image from 'next/image';
import useSWR from 'swr';

import appPreviewImage from '../public/assets/app-nlw-copa-preview.png';
import usersAvatarsExampleImage from '../public/assets/users-avatar-example.png';
import api, { fetcher } from "../lib/axios";
import Loading from "../components/Loading";

type Data = {
  pools: number,
  users: number,
  guesses: number
  isLoading: boolean
}

export function useData(): Data {
  const { data: dataUsers } = useSWR('/users/count', fetcher)
  const { data: dataPools } = useSWR('/pools/count', fetcher)
  const { data: dataGuesses } = useSWR('/guesses/count', fetcher)

  return { 
    isLoading: !dataPools || !dataUsers || !dataGuesses,
    pools: dataPools?.count, 
    users: dataUsers?.count, 
    guesses: dataGuesses?.count,
  };
}

export default function HomePage() {
  const { pools, guesses, users, isLoading } = useData()
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const { data } = await api.post('/pools', { title: inputRef.current?.value })
      navigator.clipboard.writeText(data.code);

      alert('Bolão criado com sucesso, o código foi copiado para a área de transferência!')
    } catch (err) {
      console.log(err)
      alert('Falha ao criar o bolão')
    } finally {
      if (inputRef.current)
        inputRef.current.value = ''
    }
  }, [inputRef.current]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="max-w-[1124px] h-screen mx-auto grid grid-cols-2 gap-28 items-center">
      <main>
        <Image 
          src="/assets/logo.svg"
          alt="Logo da NLW Copa" 
          width={212}
          height={40}
          quality={100}
        />
        <h1 
          className="mt-14 text-white text-5xl font-bold leading-tight"
        >
          Crie seu próprio bolão da copa e compartilhe entre amigos!
        </h1>

        <div className="mt-10 flex items-center gap-2">
          <Image 
            src={usersAvatarsExampleImage} 
            alt="Imagens de usuarios que estão participando dos bolões criados pela NLW Copa" 
            quality={100}
          />

          <strong className="text-gray-100 text-xl">
            <span className="text-ignite-500">+{users} </span>
            pessoas já estão usando
          </strong>
        </div>
        
        <form className="mt-10 flex gap-2" onSubmit={handleSubmit}>
          <input 
            className="flex-1 px-6 py-4 rounded bg-gray-800 border border-gray-600 text-sm text-gray-100"
            type="text" 
            ref={inputRef}
            placeholder="Qual o nome do seu bolão?" 
          />
          <button 
            className="bg-yellow-500 px-6 py-4 rounded font-bold uppercase text-sm text-gray-900 hover:bg-yellow-700 transition-all"
            type="submit"
          >
            Criar meu bolão
          </button>

        </form>

        <p className="mt-4 text-sm text-gray-300 leading-relaxed">
          Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas 🚀
        </p>

        <div className="mt-10 pt-10 border-t border-gray-600 flex">
          <div className="flex-1 flex items-center gap-6">
            <Image 
              width={40}
              height={40}
              src="/assets/icon-check.svg" 
              alt="Icone de confirmado" 
            />

            <div className="flex text-gray-100 flex-col">
              <span className="text-2xl font-bold">+{pools}</span>
              <span>Bolões criados</span>
            </div>
          </div>
          <div className="flex-1 border-l border-gray-600 pl-16 flex gap-6 items-center">
            <Image 
              width={40}
              height={40}
              src="/assets/icon-check.svg" 
              alt="Icone de confirmado" 
            />

            <div className="flex text-gray-100 flex-col">
              <span className="text-2xl font-bold">+{guesses}</span>
              <span>Palpites enviados</span>
            </div>
          </div>
        </div>
      </main>

      <Image 
        src={appPreviewImage} 
        alt="Dois celulares exibindo uma prévia da aplicação móvel do NLW Copa" 
        quality={100}
      />
    </div>
  )
}
