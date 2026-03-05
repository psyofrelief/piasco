import Button from "../ui/Button";
import Headline from "../ui/Headline";

export default function NoLinks() {
  return (
    <div className="gap-y-md my-auto flex flex-col items-center">
      <div className="size-lg bg-accent" />
      <Headline className="sm:text-lg">You have not created any links</Headline>
      <Button>Create First Link</Button>
    </div>
  );
}
