import Panel from "@/components/dashboard/Panel";
import Headline from "@/components/ui/Headline";
import QRGeneratorForm from "@/components/forms/QRGeneratorForm";

export default function Page() {
  return (
    <Panel className="gap-y-2xl relative flex flex-col">
      <header className="gap-y-xs pb-sm border-b-outline flex flex-col border-b border-dashed">
        <Headline>QR Generator</Headline>
        <p className="text-foreground-secondary text-sm">
          Enjoy the benefits of sharing via QR codes.
        </p>
      </header>

      <QRGeneratorForm />
    </Panel>
  );
}
