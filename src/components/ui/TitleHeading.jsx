export default function TitleHeading({ title, description = "" }) {
  return <div className="mb-4 bg-[var(--secondary)] p-6 text-center">
    <h1 className="flex items-center !text-white justify-center gap-2 text-3xl">
      {title}
    </h1>
    <p className="mt-2 text-gray-600 text-center !text-white">
      {description}
    </p>
  </div>
}