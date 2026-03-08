import CreateLinkDialog from "../forms/CreateLinkDialog";
import LinkMissingIcon from "../icons/LinkMissingIcon";
import Headline from "../ui/Headline";

export default function NoLinks() {
  return (
    <div className="gap-y-md my-auto flex flex-col items-center">
      <LinkMissingIcon />
      <Headline className="text-lg sm:text-lg">
        You have not created any links
      </Headline>

      <CreateLinkDialog label="Create Link" />
    </div>
  );
}
