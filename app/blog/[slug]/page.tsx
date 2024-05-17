import { fullBlog } from "@/app/lib/interface";
import { client, urlFor } from "@/app/lib/sanity";
import { PortableText, PortableTextComponents } from "next-sanity";
import Image from "next/image";
import YouTubePlayer from "@/app/components/YouTubePlayer";

export const revalidate = 30; // revalidate at most 30 seconds

async function getData(slug: string) {
  const query = `
    *[_type == 'blog' && slug.current == '${slug}']{
        "currentSlug": slug.current,
          title,
          content,
          titleImage
      }[0]`;
  const data = await client.fetch(query);
  return data;
}

export default async function BlogArticle({
  params,
}: {
  params: { slug: string };
}) {
  const data: fullBlog = await getData(params.slug);
  console.log(data);
  const serializers: PortableTextComponents = {
    types: {
      youtube: ({ value }: { value: { url: string } }) => {
        return <YouTubePlayer url={value.url} />;
      },
    },
  };
  return (
    <div className="mt-8">
      <h1>
        <span className="block text-base text-center text-primary font-semibold tracking-wide uppercase">
          Answering Legal - Blog
        </span>
        <span className="mt-2 block text-3xl text-center leading-8 font-bold tracking-tight sm:text-4xl">
          {data.title}
        </span>
      </h1>
      <Image
        src={urlFor(data.titleImage).url()}
        width={800}
        height={500}
        alt="Title image"
        priority
        className="rounded-lg mt-8 border"
      ></Image>
      <div className="mt-16 prose hover:prose-blue prose-lg ">
        <PortableText value={data.content} components={serializers} />
      </div>
    </div>
  );
}
