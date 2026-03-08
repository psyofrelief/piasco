import Headline from "@/components/ui/Headline";
import Section from "@/components/ui/Section";
import CodeBlock from "@/components/ui/CodeBlock";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "API",
};

export default function Page() {
  return (
    <Section className="gap-y-xl px-sm border-outline mx-auto flex max-w-250 flex-col border border-dashed border-b-transparent">
      <header className="gap-y-xs flex flex-col">
        <Headline>API Documentation</Headline>
        <p className="text-foreground-secondary">
          Integrate Piasco into your own workflows using our REST API.
        </p>
      </header>

      <div className="gap-y-lg flex flex-col">
        <h3 className="text-lg font-medium">Authentication</h3>
        <p>
          All requests require a Bearer token in the Authorization header. You
          can generate these in your{" "}
          <span>
            <Link
              className="underline underline-offset-3"
              href={"/dashboard/settings"}
            >
              Account Settings
            </Link>
          </span>
          .
        </p>
        <CodeBlock
          language="bash"
          code="Authorization: Bearer ps_your_api_key"
        />
        <p className="text-destructive text-xs font-medium italic">
          Note: API keys are only shown once upon generation and are stored as
          secure hashes.
        </p>
      </div>

      <div className="border-outline pt-lg border-t border-dashed" />

      <div className="gap-y-xl flex flex-col">
        {/* Create Link */}
        <div className="gap-y-md flex flex-col">
          <div className="gap-x-sm flex items-center">
            <span className="bg-primary/10 text-primary rounded px-2 py-1 text-xs font-bold">
              POST
            </span>
            <code className="font-mono text-sm">/api/links</code>
          </div>
          <p className="text-sm">Create a new shortened link.</p>

          <p className="text-xs font-semibold tracking-wider uppercase">
            Payload
          </p>
          <CodeBlock
            language="json"
            code={`{
  "destination": "https://example.com",
  "slug": "custom-alias"
}`}
          />
        </div>

        {/* Delete Link */}
        <div className="gap-y-md flex flex-col">
          <div className="gap-x-sm flex items-center">
            <span className="bg-destructive/10 text-destructive px-xs rounded py-1 text-xs font-bold">
              DELETE
            </span>
            <code className="font-mono text-sm">/api/links/[id]</code>
          </div>
          <p className="text-sm">
            Permanently remove a shortened link by its ID.
          </p>
        </div>
      </div>

      <div className="bg-popover gap-y-xs p-lg flex flex-col rounded">
        <h4 className="text-sm font-semibold">Base URL</h4>
        <CodeBlock language="bash" code="https://p-s.co" />
      </div>
    </Section>
  );
}
