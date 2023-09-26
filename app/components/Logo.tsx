type LogoType = {
  className?: string;
};

function Logo({ className }: LogoType) {
  return (
    <img
      className={className ? className : "h-6 w-6 md:h-10 md:w-10"}
      alt="logo"
      src="/assets/logo.png"
    />
  );
}

export default Logo;
