import { Link } from "react-router-dom"

export default function FooterLinks({ title, links }) {
  return (
    <div>
      <h3 className="font-medium text-lg mb-4">{title}</h3>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.path}>
            <Link to={link.path} className="text-muted-foreground hover:text-primary transition-colors">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

