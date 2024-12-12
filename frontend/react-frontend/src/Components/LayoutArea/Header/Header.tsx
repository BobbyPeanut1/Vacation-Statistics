import css from "./Header.module.css";

export function Header(): JSX.Element {
    return (
        <div className={css.Header}>
			<span>EasyTour</span>
        </div>
    );
}
