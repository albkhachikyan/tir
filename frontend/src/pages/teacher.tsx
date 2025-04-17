import { CONFIG } from "../config-global";
import { TeacherView } from "../sections/teacher/view";

export default function Page() {
  return (
    <>
      <title>{`Teacher - ${CONFIG.appName}`}</title>

      <TeacherView />
    </>
  );
}
