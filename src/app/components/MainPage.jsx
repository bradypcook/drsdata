// Manages the main title section on the home page, along with the iframe

const basePath = process.env.NODE_ENV === 'production' ? '/drsdata' : '';

export default function MainPageVideo() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black text-white overflow-hidden">
      <video
        className="absolute inset-0 w-full h-full object-cover opacity-60"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        webkit-playsinline="true"
        controls={false}
        disablePictureInPicture
      >
        <source src={`${basePath}/gp_background.mp4`} type="video/mp4" />
      </video>

      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl sm:text-5xl md:text-8xl font-extrabold">
          DRSdata
        </h1>
        <br />
        <h2 className="text-lg uppercase tracking-widest text-white mb-2">
          F1 stats, all in one place.
        </h2>
      </div>
    </div>
  );
}