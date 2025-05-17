// https://www.youtube.com/watch?v=v0cTo4eGAOM
export const VideoPreview = ({ videolink }: { videolink: string }) => {
  return (
    <>
      <section className="bg-green-700 px-4 py-16">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="mb-8 text-3xl font-bold text-white">
            Program Preview
          </h2>
          <div className="aspect-video overflow-hidden rounded-lg bg-black/10">
            {/* <iframe
                width="100%"
                height="100%"
                src={videolink}
                title="Program Preview"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="border-0"
              /> */}
            <iframe
              width="100%"
              height="100%"
              src={videolink}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>
    </>
  );
};
