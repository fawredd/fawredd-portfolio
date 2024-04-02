"use client"
import { Card, CardHeader,CardBody,  CardFooter } from '@nextui-org/card';
import { Image } from '@nextui-org/image';
import { Link } from '@nextui-org/link';
import { Button } from '@nextui-org/button';
import { Chip } from "@nextui-org/chip";
import { Divider } from "@nextui-org/divider";

import { Project_Interface } from '@/app/lib/data';

export const Project = ({ project }: { project: Project_Interface }) => {
  let tiempo = 4;
  return (
    <div className={`flipBorder flipAnimation-${tiempo} h-auto`}>
      <Card
        key={project.uuid}
        classNames={{ base: 'after' }}
        className="group"
        fullWidth
        isHoverable
        radius="sm"
      >
        <CardHeader className="relative flex flex-col dark:text-green-500 dark:bg-black/75 light:bg-green-500 light:text-black">
          <div className="text-lg font-bold">{project.project_title}</div>
        </CardHeader>
        <CardBody className="relative h-fit overflow-hidden grow-0">
          <Image
            alt={project.project_title}
            className="w-full dark:opacity-80 aspect-[2]"
            src={project.project_image}
            radius="none"
          />
          
        </CardBody>
        <Divider/>
        <CardFooter className="flex flex-col items-center justify-between gap-3 mb-3 grow-1">
          <div className="flex flex-row w-full flex-nowrap justify-between">
          <Button
            href={project.project_homepage}
            as={Link}
            color="default"
            showAnchorIcon
            variant="bordered"
            size="sm"
            className="mb-3 mr-3 z-[11] border-green-500 dark:bg-black/30"
            isExternal
            isDisabled={!project?.project_homepage?.length}
          >
            Demo
          </Button>
          {(project.project_url.length>0)?(
            <Link
                href={project.project_url}
                className="mb-3 ml-3 w-[32px] h-[32px] border-default-50"
                isExternal
              >
                <Image 
                  alt="Github project link"
                  className="dark:filter dark:invert drop-shadow-lg"
                  src="/img/github-original.svg"
                  radius="none"
                  width={32}
                  height={32}
                />
            </Link>
          ):null}
          </div>
          <div className="text-small p-1 text-wrap">
            {project.project_description}
          </div>
          <div className="flex flex-row flex-wrap gap-2 justify-start h-fit w-full">
            {project.project_languages.map((item)=>(
                <Chip size="sm" radius="sm" variant="bordered" key="item.id">
                  {item.language}
                </Chip>
              ))
            }
            {project.project_topics.map((item, index)=>(
                <Chip size="sm" radius="sm" variant="bordered" key={index}>
                  {item}
                </Chip>
              ))
            }
            
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
