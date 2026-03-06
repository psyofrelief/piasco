import Headline from "@/components/ui/Headline";

export default function Page() {
  return (
    <div className="gap-y-xl flex flex-col">
      <header className="gap-y-xs flex flex-col">
        <Headline>Reset Your Password?</Headline>
        <p className="text-foreground-secondary">
          Enter your new desired password below.
        </p>
      </header>
    </div>
  );
}
