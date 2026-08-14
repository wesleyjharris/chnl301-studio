export default function AboutSection() {
  return (
    <section id="about-us" className="pt-32 pb-20 bg-dark-tertiary">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-2 text-gray-400">About Chnl301</h2>
          <p className="text-gray-400 text-xl mb-4">Our Story</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white mb-4">
                A Collective Vision
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                Chnl301 is more than a music collective—it's a creative movement that brings together diverse voices and innovative sounds. Born from the shared vision of artists who believe in pushing boundaries and creating authentic connections through music.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                Our collective represents the convergence of different musical traditions, cultural backgrounds, and artistic perspectives, creating a unique sonic landscape that resonates across communities and generations.
              </p>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white mb-4">
                Our Mission
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                We create music that bridges cultures, sparks conversations, and builds connections. Through our diverse artistic expressions, we aim to foster understanding and unity while staying true to our individual creative voices.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                From experimental hip-hop to cross-cultural soundscapes, we explore the full spectrum of musical possibility, always with the goal of creating meaningful experiences for our listeners.
              </p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-dark-secondary p-8 rounded-xl">
                <h4 className="text-xl font-bold text-white mb-4">Innovation</h4>
                <p className="text-gray-300">
                  Pushing creative boundaries and exploring new sonic territories through collaborative artistry.
                </p>
              </div>
              <div className="bg-dark-secondary p-8 rounded-xl">
                <h4 className="text-xl font-bold text-white mb-4">Authenticity</h4>
                <p className="text-gray-300">
                  Staying true to our individual voices while creating something greater together.
                </p>
              </div>
              <div className="bg-dark-secondary p-8 rounded-xl">
                <h4 className="text-xl font-bold text-white mb-4">Connection</h4>
                <p className="text-gray-300">
                  Building bridges across cultures and communities through the universal language of music.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}