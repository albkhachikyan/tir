import { CONFIG } from "../config-global";
import { PupilView } from "../sections/pupil/view";

export default function Page() {
  return (
    <>
      <title>{`Teacher - ${CONFIG.appName}`}</title>

      <PupilView />
    </>
  );
}
