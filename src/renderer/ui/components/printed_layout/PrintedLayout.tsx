import './style/index.scss';
interface PrintedLayoutProps {}
export default function PrintedLayout({}: PrintedLayoutProps) {
  return (
    <div className="printed-layout">
      <div className="printed-layout-header">
        <span>المؤسسة العمومية للصحة الجوارية بموزاية</span>
        <span>ETABLISSEMENT PUBLIC DE SANTE ET PROXIMITE DE MOUZAIA</span>
      </div>
      <span>ORDONNACE</span>
      <div className="info-container">
        <span>Mouzaia, le : 03/02/2022</span>
        <span>Delivre par le Docteur : Aymen Daouadji</span>
        <div className="patient-info">
          <span>a M. : Brahim Aymen</span>
          <span>Age : 24</span>
        </div>
      </div>
      <ul>
        <li>
          ZOMAX 250 CP 1 CP *2 J EN JI PUIS 1 CP /JOUR qsp 5 JOURS (01H30 APRES
          LES REPAS)
        </li>
        <li>
          ZOMAX 250 CP 1 CP *2 J EN JI PUIS 1 CP /JOUR qsp 5 JOURS (01H30 APRES
          LES REPAS)
        </li>
        <li>
          ZOMAX 250 CP 1 CP *2 J EN JI PUIS 1 CP /JOUR qsp 5 JOURS (01H30 APRES
          LES REPAS)
        </li>
        <li>
          ZOMAX 250 CP 1 CP *2 J EN JI PUIS 1 CP /JOUR qsp 5 JOURS (01H30 APRES
          LES REPAS)
        </li>
        <li>
          ZOMAX 250 CP 1 CP *2 J EN JI PUIS 1 CP /JOUR qsp 5 JOURS (01H30 APRES
          LES REPAS) oui
        </li>
      </ul>
      <div className="bottom-info">
        <span>بالقليل من الدم الذي تتبرعون به تنقذون حياة انسان</span>
      </div>
    </div>
  );
}
