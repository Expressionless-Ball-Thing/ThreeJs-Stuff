import CatalogCard from "../components/CatalogCard";
import ContainerWrapper from "../components/ContainerWrapper";

export default function Home() {

  return (
    <>
      <ContainerWrapper>
        <main className="bg-gray-50 dark:bg-gray-900 flex flex-col justify-center px-8">
          <div className="flex flex-col justify-center items-start max-w-2xl border-gray-200 dark:border-gray-700 mx-auto pb-16">
            <div className="flex flex-col items-start mb-8">
              <div className="py-4">
                <h1 className="font-bold text-3xl md:text-5xl tracking-tight text-black dark:text-white">
                  Hello There!
                </h1>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                After some time figuring out how Three Js, I now create this
                site, where I dump my ThreeJs creations for the world to see.
                <br />
                <br />
                This place also serves as a testing ground for nextJs, Tailwind
                and Framer Motion.
              </p>
              <div className="flex flex-row w-full color">
                <div className="flex-grow-[1] p-2 font-semibold">Stack:</div>
                <div className="flex-grow-[3] p-2">
                  React, Framer Motion, ThreeJs, TailwindCSS
                </div>
              </div>
            </div>

            <h3 className="font-bold text-2xl md:text-4xl tracking-tight mb-6 text-black dark:text-white">
              Catalog
            </h3>
            <div className="w-full max-w-2xl grid grid-cols-1 sm:grid-cols-3 gap-3">
              <CatalogCard />
            </div>
          </div>
        </main>
      </ContainerWrapper>
    </>
  );
}
