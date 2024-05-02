'use client';

import { Card, CardHeader,CardBody,  CardFooter } from '@nextui-org/card';
import { Divider } from "@nextui-org/divider";
import { Button } from '@nextui-org/button';
import {Input} from "@nextui-org/input";
import {Spinner} from "@nextui-org/spinner";
import {Code} from "@nextui-org/code";

import { useState, useEffect, useRef } from "react";
import { sendQuestion } from "./actions";
import { FormEvent } from 'react'
import clsx from 'clsx';
import { SiteConfig, siteConfig } from '@/config/site';

interface Message {
  id: string;
  text: string;
  owner: 'user' | 'bot';
}

export default function ChatPage({ className }:{className: string}) {
  const cardBody = useRef<HTMLDivElement>(null)
  const [inputData, setInputData] = useState('')
  const [loading, setLoading] = useState(0)
  const [messages, setMessages] = useState<Message[]>([])
  
  useEffect(() => {
    const savedData = localStorage.getItem('messages')
    if (savedData?.length) {
      setMessages([...messages, ...JSON.parse(savedData)]);
    } else {
      setMessages(siteConfig.aiBotMessages as Message[])
    }
  }, []);
  
  useEffect(()=>{
    if (cardBody.current) {
      cardBody.current.scrollTop = cardBody.current.scrollHeight;
    }
    if (messages.length) localStorage.setItem('messages', JSON.stringify(messages));
  },[messages])

  async function handleSubmit(event: FormEvent<HTMLFormElement>){
    event.preventDefault()
    setLoading(1)
    const formData = new FormData(event.currentTarget)
    setMessages(messages => messages.concat({
      id: Math.random().toString(36).slice(2),
      text: formData.get("question") as string,
      owner: "user",
    }))

    const answer = await sendQuestion(formData.get("question") as string)
    if(answer) {
      setMessages(messages => messages.concat({
        id: Math.random().toString(36).slice(2),
        text: answer,
        owner: "bot",
      }))
    } else {
      setMessages(messages => messages.concat({
        id: Math.random().toString(36).slice(2),
        text: "I'm having trouble fetching data from server right now. Try again in a minute please" ,
        owner: "bot",
      }))
      
    }

    setLoading(0);
    setInputData('')
  }  
  
  return (
    <>
      <div className={className}>
      <div className={`flipBorder flipAnimation-4 max-h-full min-h-full flex-grow max-w-full`}>
        <Card
          key={'ChatCard001'}
          classNames={{ base: 'after' }}
          className="group"
          fullWidth
          radius="sm"
        >
          <CardHeader className="relative flex flex-col dark:text-green-500 dark:bg-black/75 light:bg-green-500 light:text-black">
            <div className="text-lg font-bold">AI Bot</div>
          </CardHeader>
          <CardBody className="relative h-full">
          <div className="max-h-[300px] overflow-y-auto w-full" ref={cardBody}>
            <div className="w-full p-0 m-0 flex flex-col gap-y-1">
            {
              messages.map((message)=>(
                  <Code
                    key={message.id}
                    size="sm"
                    className={clsx("text-wrap",{ "self-end bg-green-700": message.owner === 'bot', "self-start": message.owner === 'user' })}
                  >
                    {message.text}
                  </Code>
              ))
            }
            </div>
          </div>
          </CardBody>
          <Divider/>
          <CardFooter className="flex-grow-0 mb-1">
              <form onSubmit={handleSubmit} className="flex flex-row items-center justify-around gap-0 w-full">
                <Input type="text" label="Question?" size="sm" variant="underlined" name="question" onValueChange={setInputData} value={inputData} />
                <Button type="submit" size="sm" isDisabled={(inputData.trim().length < 3 || loading == 1)}>Send{(loading)?(<Spinner size="sm" color="success" />):(null)}</Button>
              </form>
          </CardFooter>
        </Card>
      </div>
      </div>
    </>
  )
}