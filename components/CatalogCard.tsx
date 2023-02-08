import Link from "next/link";

export default function CatalogCard({
  stuffLink,
  commentaryLink = "stub",
  title,
  description,
}: {
  stuffLink: String;
  commentaryLink: String;
  title: String;
  description: String;
}) {
  return (
    <Link href={`/stuff/${stuffLink}`}>
      <div className="transform hover:scale-110 transition-all rounded-xl w-full bg-gradient-to-r p-1 from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]">
        <div className="flex flex-col justify-between h-full md:h-64 bg-white dark:bg-gray-900 rounded-xl p-4">
          <h1 className=" text-center font-bold text-lg pb-4">{title}</h1>
          <p className=" text-ellipsis font-mono pb-4">{description}</p>

          <div className="flex flex-col gap-2">
            {commentaryLink !== "stub" ? (
              <Link
                href={`/commentary/stub`}
                className=" flex justify-center items-center w-full h-6 bg-gray-600 transform hover:scale-110 transition-all text-center rounded-lg text-white"
              >
                Commentary
              </Link>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
