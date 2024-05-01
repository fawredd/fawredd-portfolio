'use client';

import { Card, CardHeader,CardBody,  CardFooter } from '@nextui-org/card';
import { Divider } from "@nextui-org/divider";
import { Button } from '@nextui-org/button';
import {Input} from "@nextui-org/input";
import {Spinner} from "@nextui-org/spinner";
import {Code} from "@nextui-org/code";

import { useState } from "react";
import { sendQuestion } from "./actions";
import { FormEvent } from 'react'
import clsx from 'clsx';

interface Message {
  id: string;
  text: string;
  owner: 'user' | 'bot';
}

export default function ChatPage({ className }:{className: string}) {
  const [loading, setLoading] = useState(0)
  const [messages, setMessages] = useState<Message[]>(
    [
      {id:"0A",text:"Hello",owner:"bot"},
      {id:"1A",text:"Ask me what you want to know about me.",owner:"bot"},
    ]
  )
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

    setMessages(messages => messages.concat({
      id: Math.random().toString(36).slice(2),
      text: answer,
      owner: "bot",
    }))
    setLoading(0);
  }  
  
  return (
    <>
      <form onSubmit={handleSubmit} className={className}>
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
          <CardBody className="relative max-h-[300px] overflow-y-auto">
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
          </CardBody>
          <Divider/>
          <CardFooter className="flex flex-row items-center justify-around gap-0 flex-grow-0 mb-1">
              <Input type="text" label="Question?" size="sm" variant="underlined" name="question" />
              <Button type="submit" size="sm">Send{(loading)?(<Spinner size="sm" color="success" />):(null)}</Button>
          </CardFooter>
        </Card>
      </div>
      </form>
    </>
  )
}