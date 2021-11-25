import style from "./header.module.scss"

export default function Header() {
  return(
    <header className={style.container}>
      <img src="/images/Logo.svg" alt="space-travelling" />
    </header>
)
}
