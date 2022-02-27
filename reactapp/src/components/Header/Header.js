import './Header.css';

export default function Header() {
    return (
        <div className="header">
            <header>
                <img src={require("../media/logo-kanbios 1.png")} alt="logo-kanbios"/>
                <h1>Application de recherche d'entreprises dont le code postal est 33000</h1>
            </header>
        </div>
    )
}