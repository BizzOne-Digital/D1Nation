type Props = {
  children: React.ReactNode;
};

/** Public site pages ship their own marketing chrome (header/footer). */
export function MarketingLayoutSwitch({ children }: Props) {
  return <main className="min-w-0 flex-1 w-full overflow-x-clip bg-white">{children}</main>;
}
