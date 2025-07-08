import Link from "next/link";
import { FaGithub } from "react-icons/fa";

export default function SocialLogin() {
  return (
    <>
      <div className="flex flex-col gap-3">
        <Link
          className="primary-btn flex w-96 h-10 items-center justify-center gap-2"
          href="/github/start"
        >
          <FaGithub className="text-2xl" />
          <span>Continue with Github</span>
        </Link>
      </div>
    </>
  );
}
