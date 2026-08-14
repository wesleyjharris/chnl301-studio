import { Instagram, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-dark-primary py-12 border-t border-dark-tertiary">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div className="text-2xl font-bold text-spotify-green mb-4">Chnl301</div>
            <p className="text-muted mb-4">
              A collective pushing the boundaries of modern music
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-muted hover:text-spotify-green transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="text-xl" />
              </a>
              <a 
                href="https://www.youtube.com/@CHNL301" 
                className="text-muted hover:text-spotify-green transition-colors"
                aria-label="YouTube"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Youtube className="text-xl" />
              </a>
            </div>
          </div>
          

          
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <p className="text-muted mb-4">For all inquiries, please contact us!</p>
            <div className="space-y-2 text-muted">
              <p>
                <span className="font-medium">Email:</span>{' '}
                <a href="mailto:chnl301music@gmail.com" className="text-spotify-green hover:underline">
                  chnl301music@gmail.com
                </a>
              </p>
              <p>
                <span className="font-medium">Phone:</span>{' '}
                <a href="tel:+18185649339" className="text-spotify-green hover:underline">
                  (818) 564-9339
                </a>
              </p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-dark-tertiary mt-8 pt-8 text-center text-muted">
          <p>&copy; 2025 Chnl301. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
