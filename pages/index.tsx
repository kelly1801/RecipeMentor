import { Layout } from "@/components";
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const { user } = useUser();

  return (
    <Layout>
      <section className="animate__animated animate__slideInDown h-full w-full py-12  md:pt-0 lg:py-8 px-8 md:px-24 bg-orange-100/40 flex flex-col-reverse lg:flex-row lg:justify-between">
        <div className=" w-full h-full lg:w-1/2 flex flex-col lg:px-12 gap-12 lg:gap-4 items-center justify-center">
          <h1 className="text-4xl text-orange-400 font-bold text-center">
            Welcome to RecipeMentor, {user?.name?.split(" ")[0]}
          </h1>

          <p className="text-lg ">
            RecipeMentor is your personal recipe generator and culinary
            companion. Are you tired of searching through countless recipes to
            find something that suits your available ingredients? Look no
            further! With RecipeMentor, you can effortlessly discover delicious
            recipes based on the ingredients you have on hand.
          </p>

          <Link
            href="recipe/generate"
            className="btn w-full text-center font-bold my-2"
          >
            Let&apos;s cook
          </Link>
        </div>

        <Image
          className="rounded-2xl lg:rounded-full md:hidden object-cover shadow-md shadow-orange-100"
          src={"/thinking.webp"}
          alt="pensative women on a fridge"
          width={400}
          height={400}
        />
      </section>
    </Layout>
  );
}
