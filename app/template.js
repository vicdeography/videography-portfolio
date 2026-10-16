// Re-created on every page change, so each new page fades in instead of swapping in abruptly.
export default function Template({ children }) {
  return <div className="page-fade">{children}</div>;
}
