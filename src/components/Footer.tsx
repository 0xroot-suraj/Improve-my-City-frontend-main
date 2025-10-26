import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-heading font-semibold text-foreground mb-4">Improve My City</h3>
            <p className="text-sm text-muted-foreground">
              Mumbai's civic engagement platform for a better city.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-muted-foreground hover:text-primary">About</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-primary">Contact</Link></li>
              <li><Link to="/faq" className="text-muted-foreground hover:text-primary">FAQ</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/terms" className="text-muted-foreground hover:text-primary">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
              <li><Link to="/disclaimer" className="text-muted-foreground hover:text-primary">Disclaimer</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-4">Contact Us</h4>
            <p className="text-sm text-muted-foreground">
              Mumbai ABC Corporation<br />
              Mahapalika Marg, Mumbai<br />
              Phone: 1800-123-4567<br />
              Email: support@improvemycity.in
            </p>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© 2025 Improve My City: Mumbai. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
