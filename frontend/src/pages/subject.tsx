import { CONFIG } from "../config-global";
import { SubjectView } from "../sections/subject/view";

export default function Page() {
  return (
    <>
      <title>{`Subject - ${CONFIG.appName}`}</title>

      <SubjectView />
    </>
  );
}
