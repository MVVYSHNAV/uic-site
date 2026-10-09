export function SiteFooter() {
  return (
    <footer>
      <a className="logo" href="#top">
        uic<span>®</span>
      </a>
      <p>
        Unique Identity Crafting.
        <br />
        Distinctive by intention.
      </p>
      <span>
        © <span>{new Date().getFullYear()}</span> UIC
      </span>
      <a href="#top">BACK TO TOP ↑</a>
    </footer>
  );
}
