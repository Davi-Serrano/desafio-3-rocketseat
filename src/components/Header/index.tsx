import Link from "next/link"
import style from "./header.module.scss"

export default function Header() {
  return(
    <header className={style.container}>
      <Link href="/">
        <a>
          <img src="/images/Logo.svg" alt="logo" />
        </a>
      </Link>
    </header>
)
}
