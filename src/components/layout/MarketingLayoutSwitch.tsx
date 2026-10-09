type Props = {
  children: React.ReactNode;
};

/** Public site pages ship their own marketing chrome (header/footer). */
export function MarketingLayoutSwitch({ children }: Props) {
  return (
    <main className="marketing-energy min-w-0 flex-1 w-full max-w-[100vw] bg-white">{children}</main>
  );
}
