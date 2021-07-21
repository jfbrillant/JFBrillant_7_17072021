import React from "react";

export default function Footer() {
  return (
    <footer>
      <div className="bg-light shadow">
        <div className="container">
          <div className="row py-3">
            <div className="col">
              <ul className="list-inline text-center ">
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
