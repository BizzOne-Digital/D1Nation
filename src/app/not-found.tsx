import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen min-w-0 flex-col items-center justify-center overflow-x-clip bg-d1-charcoal px-4">
      <Container className="text-center">
        <p className="font-display text-8xl text-d1-orange/40">404</p>
        <h1 className="mt-4 font-display text-4xl text-d1-off-white">Page not found</h1>
        <p className="mt-3 text-d1-muted">This route isn&apos;t on our playbook.</p>
        <Button href="/" className="mt-8">Back to Home</Button>
      </Container>
    </div>
  );
}
