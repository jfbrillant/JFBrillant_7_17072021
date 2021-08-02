import "../styles/Footer.scss";
import React from "react";

export default function Footer() {
  return (
    <footer>
      <div className="bg-dark">
        <div className="container">
          <div className="row py-4">
            <div className="col">
              <ul className="list-inline text-center my-0">
                <li className="list-inline-item">À propos</li>
                <li className="list-inline-item">&middot;</li>
                <li className="list-inline-item">Vie privée</li>
                <li className="list-inline-item">&middot;</li>
                <li className="list-inline-item">Conditions d'utilisation</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
