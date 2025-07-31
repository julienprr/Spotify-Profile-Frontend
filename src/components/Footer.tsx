const Footer = () => {
  return (
    <footer className="w-full border-t border-muted bg-background py-6 text-center text-sm text-muted-foreground">
      <p>
        Site developed by <span className="font-semibold text-foreground">julienprr</span>. Contact me at{' '}
        <a href="mailto:julienptt@example.com" className="underline hover:text-foreground">
          perrierjulien22@gmail.com
        </a>{' '}
        or visit my{' '}
        <a
          href="https://github.com/julienprr"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-foreground"
        >
          GitHub
        </a>
        .
      </p>
    </footer>
  );
};

export default Footer;
