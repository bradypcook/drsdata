{/**Two F1 APIs: OpenF1 API and FastF1 API */}

export default function BotInfo({ boxes } ) {
  return (
    <section className="relative bg-black text-white py-12 px-4">
      <div className="max-w-3xl mx-auto space-y-10">
        {boxes.map((box, index) => (
          <div
            key={index}
            className="bg-zinc-800 p-6 rounded-xl shadow-lg text-center flex flex-col items-center space-y-4"
          >
           <h2 className="text-3xl font-bold">{box.header_one}</h2>
           <p className="text-gray-300">{box.description_one}</p>
            <hr className="w-full border-gray-600 my-4" />
           <h2 className="text-3xl font-bold">{box.header_two}</h2>
           <p className="text-gray-300">{box.description_two}</p>

            {box.buttonText && box.buttonLink && (
              <a
                href={box.buttonLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-full transition duration-300"
              >
                {box.buttonText}
              </a>
            )}

          </div>
        ))}
      </div>
    </section>
  );
}