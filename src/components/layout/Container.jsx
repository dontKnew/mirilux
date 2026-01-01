export default function Container({ py=10, children }) {
  return (
    <section className={`md:max-w-7xl mx-auto px-4 py-${py}`}>
      {children}
    </section>
  );
}