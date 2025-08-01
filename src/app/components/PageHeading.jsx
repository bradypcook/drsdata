// usage: <PageHeading title='Projects'/>

export default function PageHeading({ title }) {
  return (
    <div className="h-[30vh] flex flex-col justify-center items-center bg-gradient-to-b from-red-600 to-black text-white px-4 text-center">
      <div className="max-w-2xl">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold">{title}</h1>
      </div>
    </div>
  );
}