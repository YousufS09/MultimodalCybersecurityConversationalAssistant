export default function Card({ children, className = "" }) {
  return <section className={`glass-card rounded-3xl p-5 ${className}`}>{children}</section>;
}

