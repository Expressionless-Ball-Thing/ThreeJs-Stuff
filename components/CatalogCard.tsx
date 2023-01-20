import Link from "next/link";

export default function CatalogCard() {
  return (
    <div className="transform hover:scale-110 transition-all rounded-xl w-full bg-gradient-to-r p-1 from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]">
      <div className="flex flex-col justify-between h-full bg-white dark:bg-gray-900 rounded-xl p-4">
        <h1 className=" text-center font-bold text-lg pb-4">Words Display</h1>
        <p className=" text-ellipsis font-mono pb-4">
          Words displayed on the surface of a sphere, with added mouse rotate
        </p>

        <div className="flex flex-col gap-2">
          <Link
            href={`/stuff/stub`}
            className=" flex justify-center items-center w-full h-6 bg-gray-600 transform hover:scale-110 transition-all text-center rounded-lg"
          >
            Link
          </Link>
          <Link
            href={`/commentary/stub`}
            className=" flex justify-center items-center w-full h-6 bg-gray-600 transform hover:scale-110 transition-all text-center rounded-lg"
          >
            Commentary
          </Link>
        </div>
      </div>

      {/* <button
              aria-label="Toggle Dark Mode"
              type="button"
              className=" w-9 h-9 bg-gray-200 rounded-lg dark:bg-gray-600 flex items-center justify-center hover:ring-2 ring-gray-300 transition-all"
              onClick={() => {
                setTheme(resolvedTheme === "dark" ? "light" : "dark");
              }}
            > */}
    </div>
  );
}
