export default function Title({mt="", title, description=""}) {
    return <div className={`mb-4 mt-${mt}`}>
        <h2 className="flex items-center gap-2 text-2xl">
            <span className="h-10 w-1.5 bg-[var(--primary)] rounded"></span>
            {title}
          </h2>
          <p className="mt-2 text-gray-600">
            {description}
          </p>
    </div>
}